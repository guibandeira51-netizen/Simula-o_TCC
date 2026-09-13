import { PhysicsEngine } from '../physics/PhysicsEngine';
import { ChartsManager } from './ChartsManager';

export class UIManager {
    physMain: PhysicsEngine;
    physCompare: PhysicsEngine;
    charts: ChartsManager;

    elTime = document.getElementById('t-time')!;
    elZDist = document.getElementById('t-zdist')!;
    elZStatus = document.getElementById('t-zstatus')!;
    elPos = document.getElementById('t-pos')!;
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
    btnEdge = document.getElementById('btn-cam-edge')!;
    btnSplit = document.getElementById('btn-split')!;

    simSpeed = 5;
    cameraMode: 'orbit' | 'sun' | 'edge' = 'orbit';
    isSplit = false;

    onResetReq: () => void = () => {};
    onSplitToggled: (active: boolean) => void = () => {};

    constructor(phys1: PhysicsEngine, phys2: PhysicsEngine) {
        this.physMain = phys1;
        this.physCompare = phys2;
        this.charts = new ChartsManager();

        this.chkHalo.addEventListener('change', (e) => { this.physMain.useHalo = (e.target as HTMLInputElement).checked; });
        this.chkDisk.addEventListener('change', (e) => { this.physMain.useDisk = (e.target as HTMLInputElement).checked; });
        this.chkBulge.addEventListener('change', (e) => { this.physMain.useBulge = (e.target as HTMLInputElement).checked; });

        this.slSpeed.addEventListener('input', (e) => {
            this.simSpeed = parseInt((e.target as HTMLInputElement).value);
            this.lblSpeed.innerText = this.simSpeed.toString();
        });

        this.btnReset.addEventListener('click', () => {
            this.physMain.reset();
            this.physCompare.reset();
            this.charts.clear();
            this.onResetReq();
        });

        const setActiveBtn = (activeBtn: HTMLElement) => {
            [this.btnOrbit, this.btnSun, this.btnEdge].forEach(b => b.classList.remove('active'));
            activeBtn.classList.add('active');
        };

        this.btnOrbit.addEventListener('click', () => {
            this.cameraMode = 'orbit';
            setActiveBtn(this.btnOrbit);
        });

        this.btnSun.addEventListener('click', () => {
            this.cameraMode = 'sun';
            setActiveBtn(this.btnSun);
        });

        this.btnEdge.addEventListener('click', () => {
            this.cameraMode = 'edge';
            setActiveBtn(this.btnEdge);
        });

        this.btnSplit.addEventListener('click', () => {
            this.isSplit = !this.isSplit;
            if(this.isSplit) {
                this.btnSplit.classList.add('active');
                document.getElementById('split-divider')?.classList.add('active');
                document.getElementById('split-labels')?.classList.remove('hidden');
            } else {
                this.btnSplit.classList.remove('active');
                document.getElementById('split-divider')?.classList.remove('active');
                document.getElementById('split-labels')?.classList.add('hidden');
            }
            this.onSplitToggled(this.isSplit);
        });
    }

    updateTelemetry(acc: {ax: number, ay: number, az: number}) {
        let x = this.physMain.x;
        let y = this.physMain.y;
        let z = this.physMain.z;
        let absZ = Math.abs(z);

        let vx = this.physMain.vx / this.physMain.KM_S_TO_KPC_GYR;
        let vy = this.physMain.vy / this.physMain.KM_S_TO_KPC_GYR;
        let vz = this.physMain.vz / this.physMain.KM_S_TO_KPC_GYR;

        let { Ek, Ep } = this.physMain.getEnergies();

        this.elTime.innerHTML = `${this.physMain.t.toFixed(4)} <small>Gyr</small>`;
        this.elZDist.innerHTML = `${absZ.toFixed(3)} <small>kpc</small>`;
        
        // Status vertical avaliado fisicamente pelo sinal de z
        if (z > 0.001) {
            this.elZStatus.innerText = "ACIMA DO PLANO GALÁCTICO";
            this.elZStatus.style.color = "#00e5ff";
        } else if (z < -0.001) {
            this.elZStatus.innerText = "ABAIXO DO PLANO GALÁCTICO";
            this.elZStatus.style.color = "#ff3366";
        } else {
            this.elZStatus.innerText = "EXATAMENTE NO PLANO MÉDIO";
            this.elZStatus.style.color = "#00ff88";
        }

        this.elPos.innerHTML = `${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)} <small>kpc</small>`;
        this.elVel.innerHTML = `${vx.toFixed(1)}, ${vy.toFixed(1)}, ${vz.toFixed(1)} <small>km/s</small>`;
        this.elAcc.innerHTML = `${acc.ax.toExponential(1)}, ${acc.ay.toExponential(1)}, ${acc.az.toExponential(1)}`;

        this.elKin.innerText = Ek.toExponential(2);
        this.elPot.innerText = Ep.toExponential(2);
    }
}
