import * as THREE from 'three';
import { starVertexShader, starFragmentShader, dustVertexShader, dustFragmentShader } from '../shaders/GalaxyShaders';

export class Galaxy {
    starsMesh: THREE.Points;
    dustMesh: THREE.Points;

    constructor(scene: THREE.Scene) {
        this.createStars(scene);
        this.createDustLanes(scene);
    }

    private createStars(scene: THREE.Scene) {
        const numStars = 250000; 
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(numStars * 3);
        const col = new Float32Array(numStars * 3);
        const sizes = new Float32Array(numStars);
        const alphas = new Float32Array(numStars);

        const arms = 4;
        const spin = 0.5; // Espiralidade logarítmica
        const rCore = 2.5;
        const rDisk = 25.0;

        for (let i = 0; i < numStars; i++) {
            let isBulge = i < 70000; 
            let isThickDisk = i >= 70000 && i < 120000;
            
            let r, theta, z;
            let c = new THREE.Color();
            let alpha = 1.0;
            let size = 1.0;

            if (isBulge) {
                // BOJO CENTRAL: Concentração exponencial (Hernquist-like)
                r = Math.pow(Math.random(), 3.0) * rCore * 1.5;
                theta = Math.random() * Math.PI * 2;
                // Formato pseudo-esferoidal (Bulge)
                z = (Math.random() - 0.5) * 2.5 * Math.exp(-r/rCore); 
                
                // Cores do Bojo (População Estelar II - Velhas, metálicas, amarelas/laranjas)
                c.setHSL(0.1 + Math.random()*0.04, 0.8, 0.6 + Math.random()*0.3);
                alpha = Math.random() * 0.15 + 0.05; 
                size = Math.random() * 2.5 + 0.5;
            } 
            else if (isThickDisk) {
                // DISCO ESPESSO: Estrelas mais velhas fora dos braços
                r = Math.random() * rDisk;
                theta = Math.random() * Math.PI * 2;
                z = (Math.random() - 0.5) * 1.5 * Math.exp(-r/(rDisk*0.5));
                c.setHSL(0.13, 0.4, 0.7); // Branco amarelado
                alpha = 0.1; size = Math.random() * 1.5 + 0.5;
            }
            else {
                // DISCO FINO E BRAÇOS ESPIRAIS: Teoria de ondas de densidade
                // Distribuição exponencial do raio
                r = rCore + Math.pow(Math.random(), 1.5) * (rDisk - rCore);
                
                let armOffset = (i % arms) * (Math.PI * 2 / arms);
                
                // Spiral Math (Perturbação na onda)
                let spiralAngle = armOffset + (r * spin);
                // Dispersão Gaussiana ao redor do braço
                let spread = (Math.random() - 0.5) * (Math.random() - 0.5) * 2.5 * (r/rDisk);
                theta = spiralAngle + spread;
                
                // Disco fino: decaimento Z severo
                z = (Math.random() - 0.5) * 0.4 * Math.exp(-r/10.0);

                // HII Regions (Berçários estelares super brilhantes em rosa/azul intenso)
                if (Math.random() > 0.98) {
                    c.setHSL(0.85 + Math.random()*0.1, 0.9, 0.7); // Rosa neon
                    size = Math.random() * 4.0 + 2.0;
                    alpha = 0.8;
                } else {
                    // População I (Jovens, Azuis)
                    c.setHSL(0.55 + Math.random()*0.1, 0.9, 0.6 + Math.random()*0.4);
                    size = Math.random() * 1.2 + 0.3;
                    alpha = 0.25;
                }
            }

            pos[i*3] = r * Math.cos(theta); pos[i*3+1] = r * Math.sin(theta); pos[i*3+2] = z;
            col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
            sizes[i] = size; alphas[i] = alpha;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('customColor', new THREE.BufferAttribute(col, 3));
        geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geo.setAttribute('alphaMult', new THREE.BufferAttribute(alphas, 1));

        const mat = new THREE.ShaderMaterial({
            vertexShader: starVertexShader,
            fragmentShader: starFragmentShader,
            blending: THREE.AdditiveBlending, // SOMA DE LUZ (Glow)
            depthWrite: false, transparent: true
        });

        this.starsMesh = new THREE.Points(geo, mat);
        // Ajusta a ordem para as estrelas renderizarem ANTES da poeira
        this.starsMesh.renderOrder = 0; 
        scene.add(this.starsMesh);
    }

    private createDustLanes(scene: THREE.Scene) {
        // DUST LANES: Bandas escuras que ABSORVEM luz (Crucial para visual da NASA)
        const numDust = 60000;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(numDust * 3);
        const sizes = new Float32Array(numDust);
        const opacities = new Float32Array(numDust);

        const arms = 4;
        const spin = 0.5;
        const rCore = 2.0;
        const rDisk = 24.0;

        for (let i = 0; i < numDust; i++) {
            // Poeira segue a borda *interna* dos braços espirais (Choque galáctico)
            let r = rCore + Math.pow(Math.random(), 1.2) * (rDisk - rCore);
            let armOffset = (i % arms) * (Math.PI * 2 / arms);
            
            // Ligeiro lag no ângulo para ficar na borda interna
            let spiralAngle = armOffset + (r * spin) - 0.15;
            
            // Dispersão estreita
            let spread = (Math.random() - 0.5) * 1.0 * (r/rDisk);
            let theta = spiralAngle + spread;
            
            // Poeira concentra-se ESTRITAMENTE no plano médio Z=0
            let z = (Math.random() - 0.5) * 0.15;

            pos[i*3] = r * Math.cos(theta); pos[i*3+1] = r * Math.sin(theta); pos[i*3+2] = z;
            
            sizes[i] = Math.random() * 8.0 + 3.0; // Nuvens imensas
            // Opacidade variável para nuvens fractais
            opacities[i] = Math.random() * 0.6 + 0.1;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geo.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

        const mat = new THREE.ShaderMaterial({
            vertexShader: dustVertexShader,
            fragmentShader: dustFragmentShader,
            blending: THREE.NormalBlending, // IMPORTANTE: ABSORVE A LUZ, NÃO SOMA!
            depthWrite: false, transparent: true
        });

        this.dustMesh = new THREE.Points(geo, mat);
        this.dustMesh.renderOrder = 1; // Poeira renderiza DEPOIS das estrelas
        scene.add(this.dustMesh);
    }
}
