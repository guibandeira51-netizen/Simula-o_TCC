import { PhysicsEngine } from './physics/PhysicsEngine';
import { GraphicsCore } from './graphics/Renderer';
import { Galaxy } from './entities/Galaxy';
import { SunEntity } from './entities/Sun';
import { OrbitTrail } from './entities/OrbitTrail';
import { UIManager } from './ui/UIManager';

// Engines de Física Independente
const physMain = new PhysicsEngine();
const physCompare = new PhysicsEngine();
// Modo Compare não tem matéria escura
physCompare.useHalo = false;

// Engine Gráfica Principal
const gfx = new GraphicsCore();

// Entidades Cenário
const galaxy = new Galaxy(gfx.scene);

// Entidades Principal
const sunMain = new SunEntity(gfx.scene, 0xffaa00);
const trailMain = new OrbitTrail(gfx.scene, 0xffaa00);

// Entidades Comparação
const sunCompare = new SunEntity(gfx.scene, 0xff2255);
const trailCompare = new OrbitTrail(gfx.scene, 0xff2255);

// Esconde as entidades de comparação por padrão
sunCompare.mesh.visible = false;
trailCompare.line.visible = false;

// Interface
const ui = new UIManager(physMain, physCompare);

ui.onResetReq = () => {
    trailMain.clear();
    trailCompare.clear();
};

ui.onSplitToggled = (isSplit) => {
    gfx.splitMode = isSplit;
    sunCompare.mesh.visible = isSplit;
    trailCompare.line.visible = isSplit;
    
    // Sincroniza câmeras ao abrir o split
    gfx.camera2.position.copy(gfx.camera1.position);
    gfx.controls2.target.copy(gfx.controls1.target);
    gfx.onResize();
};

const dt = 0.001;
let stepCounter = 0;

function animate(time: number) {
    requestAnimationFrame(animate);

    let lastAcc1 = {ax:0, ay:0, az:0};
    
    // Atualização Física
    for (let i = 0; i < ui.simSpeed; i++) {
        lastAcc1 = physMain.step(dt);
        if(ui.isSplit) physCompare.step(dt);
        
        stepCounter++;
        
        if (stepCounter % 8 === 0) {
            trailMain.addPoint(physMain.x, physMain.y, physMain.z);
            if(ui.isSplit) trailCompare.addPoint(physCompare.x, physCompare.y, physCompare.z);
        }
    }

    // Sincroniza Visual com Física
    sunMain.update(time*0.001, physMain.x, physMain.y, physMain.z);
    if(ui.isSplit) sunCompare.update(time*0.001, physCompare.x, physCompare.y, physCompare.z);

    // Cinemática de Câmera (Damping suave "NASA Style")
    if (ui.cameraMode === 'sun') {
        const t1 = sunMain.mesh.position;
        gfx.controls1.target.lerp(t1, 0.03);
        
        if(ui.isSplit) {
            const t2 = sunCompare.mesh.position;
            gfx.controls2.target.lerp(t2, 0.03);
        }
    } else {
        gfx.controls1.target.lerp({x:0, y:0, z:0}, 0.03);
        if(ui.isSplit) gfx.controls2.target.lerp({x:0, y:0, z:0}, 0.03);
    }

    // Atualiza Telemetria
    let accMag = Math.sqrt(lastAcc1.ax**2 + lastAcc1.ay**2 + lastAcc1.az**2);
    ui.updateTelemetry(accMag);

    // Atualiza gráfico a cada ~60 frames
    if (stepCounter % 60 === 0) {
        let { Ek, Ep } = physMain.getEnergies();
        ui.charts.updateData(physMain.t, Ek, Ep);
    }

    // Render Pipeline
    gfx.render();
}

animate(0);
