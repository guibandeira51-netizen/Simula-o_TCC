import * as THREE from 'three';
import { starVertexShader, starFragmentShader } from '../shaders/Shaders';

export class Galaxy {
    mesh: THREE.Points;

    constructor(scene: THREE.Scene) {
        // Gerador Científico de Via Láctea (500.000 partículas físicas)
        // Muito superior aos shaders básicos anteriores. Usa teoria de ondas de densidade.
        const numStars = 400000;
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(numStars * 3);
        const colors = new Float32Array(numStars * 3);
        const sizes = new Float32Array(numStars);
        const alphas = new Float32Array(numStars);

        const arms = 4;
        const spin = 0.45;
        const coreRadius = 2.5;
        const diskRadius = 22.0;

        for (let i = 0; i < numStars; i++) {
            let isBulge = i < 100000; 
            let isDust = i > 350000; // Últimas 50k partículas são poeira interestelar escura
            
            let r, theta, z;
            let color = new THREE.Color();
            let alphaM = 1.0;
            let sizeM = 1.0;

            if (isBulge) {
                // Bulge de Hernquist aproximado visualmente
                r = Math.pow(Math.random(), 2.5) * coreRadius;
                theta = Math.random() * Math.PI * 2;
                z = (Math.random() - 0.5) * 2.0 * Math.exp(-r); 
                // Cores quentes (População estelar velha)
                color.setHSL(0.11 + Math.random()*0.02, 0.8, 0.6 + Math.random()*0.4);
                alphaM = 0.25; 
                sizeM = Math.random() * 2.0 + 0.5;
            } else {
                // Disco Espiral de Miyamoto-Nagai
                r = coreRadius + Math.pow(Math.random(), 1.2) * (diskRadius - coreRadius);
                let armOffset = (i % arms) * (Math.PI * 2 / arms);
                
                // Dispersão natural ao redor do braço
                let spread = (Math.random() - 0.5) * 1.5 * (r/diskRadius);
                theta = armOffset + (r * spin) + spread;
                
                // Espessura decai exponencialmente (Scale height do disco)
                let zSpread = 0.5 * Math.exp(-r * 0.1);
                z = (Math.random() - 0.5) * zSpread;

                if (isDust) {
                    // Poeira escura nos braços espirais
                    color.setHex(0x050201); // Quase preto/marrom
                    alphaM = 0.8;
                    sizeM = Math.random() * 4.0 + 2.0; // Nuvens grandes
                    z *= 0.3; // Poeira fica estritamente no plano médio
                } else {
                    // Estrelas azuis/brancas do disco (População jovem)
                    // H-II regions ocasionais (Rosa/Vermelho)
                    if(Math.random() > 0.95) {
                        color.setHSL(0.95, 0.9, 0.6); // Rosa
                        sizeM = Math.random() * 3.0 + 1.0;
                    } else {
                        color.setHSL(0.6 + Math.random()*0.05, 0.8, 0.5 + Math.random()*0.5);
                        sizeM = Math.random() * 1.0 + 0.2;
                    }
                    alphaM = 0.4;
                }
            }

            positions[i*3] = r * Math.cos(theta);
            positions[i*3+1] = r * Math.sin(theta);
            positions[i*3+2] = z;

            colors[i*3] = color.r;
            colors[i*3+1] = color.g;
            colors[i*3+2] = color.b;

            sizes[i] = sizeM;
            alphas[i] = alphaM;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
        geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geo.setAttribute('alphaMult', new THREE.BufferAttribute(alphas, 1));

        const mat = new THREE.ShaderMaterial({
            vertexShader: starVertexShader,
            fragmentShader: starFragmentShader,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true
        });

        this.mesh = new THREE.Points(geo, mat);
        scene.add(this.mesh);
    }
}
