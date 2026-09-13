import * as THREE from 'three';
import { PhysicsEngine } from './physics/PhysicsEngine';
import { GraphicsCore } from './graphics/Renderer';
import { Galaxy } from './entities/Galaxy';
import { SunEntity } from './entities/Sun';
import { OrbitTrail } from './entities/OrbitTrail';
import { DeepSpace } from './entities/DeepSpace';
import { UIManager } from './ui/UIManager';

const physMain = new PhysicsEngine();
const physCompare = new PhysicsEngine();
physCompare.useHalo = false;

const gfx = new GraphicsCore();

new DeepSpace(gfx.scene);
new Galaxy(gfx.scene);

const sunMain = new SunEntity(gfx.scene);
const trailMain = new OrbitTrail(gfx.scene, 0xffaa00);

const sunCompare = new SunEntity(gfx.scene);
const trailCompare = new OrbitTrail(gfx.scene, 0xff2255);

sunCompare.mesh.visible = false;
trailCompare.line.visible = false;

const ui = new UIManager(physMain, physCompare);

ui.onResetReq = () => {
    trailMain.clear();
    trailCompare.clear();
};

ui.onSplitToggled = (isSplit) => {
    gfx.splitMode = isSplit;
    sunCompare.mesh.visible = isSplit;
    trailCompare.line.visible = isSplit;
    
    if(isSplit) {
        gfx.camera2.position.copy(gfx.camera1.position);
        gfx.controls2.target.copy(gfx.controls1.target);
    }
    gfx.onResize();
};

const clock = new THREE.Clock();
const dt = 0.001; 
let stepCounter = 0;

function animate() {
    requestAnimationFrame(animate);
    let delta = clock.getDelta();

    let lastAcc1 = {ax:0, ay:0, az:0};
    
    // Loop de integração numérica Leapfrog puro
    for (let i = 0; i < ui.simSpeed; i++) {
        lastAcc1 = physMain.step(dt);
        if(ui.isSplit) physCompare.step(dt);
        
        stepCounter++;
        if (stepCounter % 6 === 0) {
            // ALIMENTAÇÃO DIRETA DA TRILHA COM O VETOR 3D (x, y, z) SEM PROJEÇÕES 2D
            trailMain.addPoint(physMain.x, physMain.y, physMain.z);
            if(ui.isSplit) trailCompare.addPoint(physCompare.x, physCompare.y, physCompare.z);
        }
    }

    // Atualiza posições 3D reais no renderizador
    sunMain.update(physMain.t, physMain.x, physMain.y, physMain.z);
    if(ui.isSplit) sunCompare.update(physCompare.t, physCompare.x, physCompare.y, physCompare.z);

    // Gestão de Câmeras Cinematográficas baseada no modo selecionado na UI
    if (!gfx.introActive) {
        if (ui.cameraMode === 'sun') {
            gfx.controls1.target.lerp(sunMain.mesh.position, 0.04);
            if(ui.isSplit) gfx.controls2.target.lerp(sunCompare.mesh.position, 0.04);
        } else if (ui.cameraMode === 'edge') {
            // Modo Vista Lateral (Edge-on): Alinha a câmera perfeitamente no plano Z=0 olhando de lado para o disco e o Sol
            gfx.controls1.target.lerp(sunMain.mesh.position, 0.04);
            let edgeCamTargetPos = new THREE.Vector3(sunMain.mesh.position.x + 25, sunMain.mesh.position.y - 35, 2.0);
            gfx.camera1.position.lerp(edgeCamTargetPos, 0.03);
            if(ui.isSplit) gfx.controls2.target.lerp(sunCompare.mesh.position, 0.04);
        } else {
            gfx.controls1.target.lerp(new THREE.Vector3(0, 0, 0), 0.04);
            if(ui.isSplit) gfx.controls2.target.lerp(new THREE.Vector3(0, 0, 0), 0.04);
        }
    }

    ui.updateTelemetry(lastAcc1);

    if (stepCounter % 60 === 0) {
        let { Ek, Ep } = physMain.getEnergies();
        ui.charts.updateData(physMain.t, Ek, Ep);
    }

    gfx.render(delta);
}

animate();
