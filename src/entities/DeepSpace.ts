import * as THREE from 'three';

export class DeepSpace {
    constructor(scene: THREE.Scene) {
        // Starfield background de alta qualidade em múltiplas camadas (Parallax natural)
        this.createLayer(scene, 8000, 1500, 0xaaaaaa, 1.0);
        this.createLayer(scene, 3000, 1800, 0x5588ff, 1.5);
        this.createLayer(scene, 1500, 2500, 0xff8855, 2.0);
    }

    createLayer(scene: THREE.Scene, count: number, radius: number, colorHex: number, size: number) {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        
        const baseColor = new THREE.Color(colorHex);

        for (let i = 0; i < count; i++) {
            // Distribuição esférica equitativa
            let u = Math.random();
            let v = Math.random();
            let theta = 2 * Math.PI * u;
            let phi = Math.acos(2 * v - 1);
            
            // Variação suave no raio para profundidade
            let r = radius + (Math.random() - 0.5) * 500;

            pos[i*3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i*3+2] = r * Math.cos(phi);

            // Varia luminosidade
            let lum = Math.random() * 0.8 + 0.2;
            col[i*3] = baseColor.r * lum;
            col[i*3+1] = baseColor.g * lum;
            col[i*3+2] = baseColor.b * lum;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

        // Estrelas de fundo pontuais e nítidas
        const mat = new THREE.PointsMaterial({
            size: size, vertexColors: true, sizeAttenuation: false,
            transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false
        });

        scene.add(new THREE.Points(geo, mat));
    }
}
