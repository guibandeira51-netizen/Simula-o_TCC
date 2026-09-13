import { PhysicsEngine } from './physics';
import { GraphicsEngine } from './graphics';
import { UIManager } from './ui';

const phys = new PhysicsEngine();
const gfx = new GraphicsEngine();
const ui = new UIManager(phys, gfx);

const dt = 0.001; // Passo do Leapfrog da sua simulação (Gyr)
let stepCounter = 0;

function animate(time: number) {
    requestAnimationFrame(animate);

    // Integramos múltiplos passos físicos por frame visual dependendo do slider
    let lastAcc = { ax: 0, ay: 0, az: 0 };
    for (let i = 0; i < ui.simSpeed; i++) {
        lastAcc = phys.step(dt);
        stepCounter++;
        
        // Adiciona rastro a cada 5 passos da física para otimizar memória
        if (stepCounter % 5 === 0) {
            gfx.addTrailPoint(phys.x, phys.y, phys.z);
        }
    }

    // Atualiza Física Visual
    gfx.sunMesh.position.set(phys.x, phys.y, phys.z);

    // Controle Cinematográfico de Câmera
    if (ui.cameraMode === 'sun') {
        // Câmera segue o sol com um offset suave
        const target = gfx.sunMesh.position;
        gfx.controls.target.copy(target);
        gfx.camera.position.lerp(target.clone().add({x: 5, y: -5, z: 5}), 0.02);
    } else {
        // Câmera orbita o centro da galáxia livremente
        gfx.controls.target.lerp({x:0, y:0, z:0}, 0.05);
    }

    // Atualiza Telemetria
    let accMag = Math.sqrt(lastAcc.ax**2 + lastAcc.ay**2 + lastAcc.az**2);
    ui.updateTelemetry(accMag);

    // Renderiza cena
    gfx.render(time * 0.001);
}

// Inicia loop
animate(0);
