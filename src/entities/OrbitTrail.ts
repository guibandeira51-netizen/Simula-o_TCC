import * as THREE from 'three';

export class OrbitTrail {
    geo: THREE.BufferGeometry;
    positions: Float32Array;
    colors: Float32Array;
    line: THREE.Line;
    maxPts = 12000;
    idx = 0;
    baseColor: THREE.Color;

    constructor(scene: THREE.Scene, colorHex: number = 0xffa500) {
        this.baseColor = new THREE.Color(colorHex);
        this.geo = new THREE.BufferGeometry();
        this.positions = new Float32Array(this.maxPts * 3);
        this.colors = new Float32Array(this.maxPts * 3);
        
        this.geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        this.geo.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
        
        // Uso de ShaderMaterial customizado na linha para um fade perfeito
        const mat = new THREE.LineBasicMaterial({ 
            vertexColors: true, transparent: true, 
            blending: THREE.AdditiveBlending, linewidth: 3 
        });
        
        this.line = new THREE.Line(this.geo, mat);
        scene.add(this.line);
    }

    addPoint(x: number, y: number, z: number) {
        if (this.idx < this.maxPts) {
            this.positions[this.idx * 3] = x;
            this.positions[this.idx * 3 + 1] = y;
            this.positions[this.idx * 3 + 2] = z;
            this.idx++;
        } else {
            // Shift rápido
            this.positions.copyWithin(0, 3, this.maxPts * 3);
            this.positions[(this.maxPts-1)*3] = x;
            this.positions[(this.maxPts-1)*3+1] = y;
            this.positions[(this.maxPts-1)*3+2] = z;
        }

        // Gradiente de energia/cor na trilha
        for(let i=0; i < this.idx; i++) {
            let alpha = i / this.idx; 
            // Calcula fade suavizado (Pow curve)
            alpha = Math.pow(alpha, 1.5);
            let c = this.baseColor.clone().multiplyScalar(alpha);
            this.colors[i*3] = c.r;
            this.colors[i*3+1] = c.g;
            this.colors[i*3+2] = c.b;
        }

        this.geo.setDrawRange(0, this.idx);
        this.geo.attributes.position.needsUpdate = true;
        this.geo.attributes.color.needsUpdate = true;
    }

    clear() {
        this.idx = 0;
        this.geo.setDrawRange(0, 0);
    }
}
