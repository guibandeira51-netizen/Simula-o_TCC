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

// Construindo o Universo Visual (Ordem importa para blending)
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
    
    // Physics Loop
    for (let i = 0; i < ui.simSpeed; i++) {
        lastAcc1 = physMain.step(dt);
        if(ui.isSplit) physCompare.step(dt);
        
        stepCounter++;
        if (stepCounter % 8 === 0) {
            trailMain.addPoint(physMain.x, physMain.y, physMain.z);
            if(ui.isSplit) trailCompare.addPoint(physCompare.x, physCompare.y, physCompare.z);
        }
    }

    // Sync Visuals
    sunMain.update(physMain.t, physMain.x, physMain.y, physMain.z);
    if(ui.isSplit) sunCompare.update(physCompare.t, physCompare.x, physCompare.y, physCompare.z);

    // Câmera Track no Sol se ativado (apenas pós-intro)
    if (!gfx.introActive && ui.cameraMode === 'sun') {
        gfx.controls1.target.lerp(sunMain.mesh.position, 0.03);
        if(ui.isSplit) gfx.controls2.target.lerp(sunCompare.mesh.position, 0.03);
    } else if (!gfx.introActive) {
        gfx.controls1.target.lerp({x:0, y:0, z:0}, 0.03);
        if(ui.isSplit) gfx.controls2.target.lerp({x:0, y:0, z:0}, 0.03);
    }

    // Telemetria UI
    let accMag = Math.sqrt(lastAcc1.ax**2 + lastAcc1.ay**2 + lastAcc1.az**2);
    ui.updateTelemetry(accMag);

    if (stepCounter % 60 === 0) {
        let { Ek, Ep } = physMain.getEnergies();
        ui.charts.updateData(physMain.t, Ek, Ep);
    }

    gfx.render(delta);
}

animate();
