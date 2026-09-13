import { PhysicsEngine } from './physics';
import { GraphicsEngine } from './graphics';

export class UIManager {
    phys: PhysicsEngine;
    gfx: GraphicsEngine;

    // Elements
    elTime = document.getElementById('t-time')!;
    elRadius = document.getElementById('t-radius')!;
    elVel = document.getElementById('t-vel')!;
    elAcc = document.getElementById('t-acc')!;
    elKin = document.getElementById('t-kin')!;
    elPot = document.getElementById('t-pot')!;
    
    chkHalo = document.getElementById('chk-halo') as HTMLInputElement;
    chkDisk = document.getElementById('chk-disk') as HTMLInputElement;
    chkBulge = document.getElementById('chk-bulge') as HTMLInputElement;
    slSpeed = document.getElementById('sl-speed') as HTMLInputElement;
    lblSpeed = document.getElementById('lbl-speed')!;
    
    btnReset = document.getElementById('btn-reset')!;
    btnOrbit = document.getElementById('btn-cam-orbit')!;
    btnSun = document.getElementById('btn-cam-sun')!;

    simSpeed = 5;
    cameraMode: 'orbit' | 'sun' = 'orbit';

    constructor(phys: PhysicsEngine, gfx: GraphicsEngine) {
        this.phys = phys;
        this.gfx = gfx;

        this.chkHalo.addEventListener('change', (e) => this.phys.useHalo = (e.target as HTMLInputElement).checked);
        this.chkDisk.addEventListener('change', (e) => this.phys.useDisk = (e.target as HTMLInputElement).checked);
        this.chkBulge.addEventListener('change', (e) => this.phys.useBulge = (e.target as HTMLInputElement).checked);

        this.slSpeed.addEventListener('input', (e) => {
            this.simSpeed = parseInt((e.target as HTMLInputElement).value);
            this.lblSpeed.innerText = this.simSpeed.toString();
        });

        this.btnReset.addEventListener('click', () => {
            this.phys.reset();
            this.gfx.clearTrail();
        });

        this.btnOrbit.addEventListener('click', () => {
            this.cameraMode = 'orbit';
            this.btnOrbit.classList.add('active');
            this.btnSun.classList.remove('active');
        });

        this.btnSun.addEventListener('click', () => {
            this.cameraMode = 'sun';
            this.btnSun.classList.add('active');
            this.btnOrbit.classList.remove('active');
        });
    }

    updateTelemetry(accMag: number) {
        let r = Math.sqrt(this.phys.x**2 + this.phys.y**2 + this.phys.z**2);
        let v = Math.sqrt(this.phys.vx**2 + this.phys.vy**2 + this.phys.vz**2) / this.phys.KM_S_TO_KPC_GYR;
        let { Ek, Ep } = this.phys.getEnergies();

        this.elTime.innerText = this.phys.t.toFixed(4);
        this.elRadius.innerText = r.toFixed(2);
        this.elVel.innerText = v.toFixed(2);
        this.elAcc.innerText = accMag.toExponential(2);
        this.elKin.innerText = Ek.toExponential(3);
        this.elPot.innerText = Ep.toExponential(3);
    }
}
