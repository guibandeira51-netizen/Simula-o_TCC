import * as THREE from 'three';

export class OrbitTrail {
    geo: THREE.BufferGeometry;
    positions: Float32Array;
    colors: Float32Array;
    line: THREE.Line;
    maxPts = 20000; // Alta densidade para refletir perfeitamente a oscilação vertical z(t)
    idx = 0;

    constructor(scene: THREE.Scene, colorHex: number) {
        this.geo = new THREE.BufferGeometry();
        this.positions = new Float32Array(this.maxPts * 3);
        this.colors = new Float32Array(this.maxPts * 3);
        
        this.geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        this.geo.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
        
        const mat = new THREE.LineBasicMaterial({ 
            vertexColors: true, transparent: true, 
            blending: THREE.AdditiveBlending, linewidth: 2 
        });
        
        this.line = new THREE.Line(this.geo, mat);
        scene.add(this.line);
    }

    addPoint(x: number, y: number, z: number) {
        // USO DIRETO DO VETOR TRIDIMENSIONAL (x, y, z) DO LEAPFROG - NENHUMA PROJEÇÃO 2D
        if (this.idx < this.maxPts) {
            this.positions[this.idx * 3] = x;
            this.positions[this.idx * 3 + 1] = y;
            this.positions[this.idx * 3 + 2] = z;
            this.idx++;
        } else {
            this.positions.copyWithin(0, 3, this.maxPts * 3);
            this.positions[(this.maxPts-1)*3] = x;
            this.positions[(this.maxPts-1)*3+1] = y;
            this.positions[(this.maxPts-1)*3+2] = z;
        }

        // Gradiente térmico emissivo temporal baseada em shader da trilha 3D
        for(let i=0; i < this.idx; i++) {
            let alpha = i / this.idx; 
            alpha = Math.pow(alpha, 1.8);
            
            let r = 1.0 * alpha;
            let g = 0.65 * alpha;
            let b = 0.2 * alpha;
            
            this.colors[i*3] = r; 
            this.colors[i*3+1] = g; 
            this.colors[i*3+2] = b;
        }

        this.geo.setDrawRange(0, this.idx);
        this.geo.attributes.position.needsUpdate = true;
        this.geo.attributes.color.needsUpdate = true;
    }

    clear() { this.idx = 0; this.geo.setDrawRange(0, 0); }
}
