import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { galaxyVertexShader, galaxyFragmentShader, sunVertexShader, sunFragmentShader } from './shaders';

export class GraphicsEngine {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    composer: EffectComposer;
    controls: OrbitControls;
    
    sunMesh: THREE.Mesh;
    sunMaterial: THREE.ShaderMaterial;
    trailGeo: THREE.BufferGeometry;
    trailPositions: Float32Array;
    trailColors: Float32Array;
    trailLine: THREE.Line;
    maxTrailPts = 10000;
    trailIdx = 0;

    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x020305);
        this.scene.fog = new THREE.FogExp2(0x020305, 0.015);

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.camera.position.set(0, -15, 12);
        
        this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        document.getElementById('app')?.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        // Post-Processing (Bloom Cinematográfico NASA-style)
        const renderScene = new RenderPass(this.scene, this.camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.8, 0.6, 0.1);
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(renderScene);
        this.composer.addPass(bloomPass);

        this.createGalaxy();
        this.createSun();
        this.createTrail();

        window.addEventListener('resize', this.onResize.bind(this));
    }

    createGalaxy() {
        // Gerador realista de galáxia espiral
        const numParticles = 100000;
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(numParticles * 3);
        const colors = new Float32Array(numParticles * 3);
        const sizes = new Float32Array(numParticles);

        for (let i = 0; i < numParticles; i++) {
            let isBulge = i < 30000; // 30k para o bojo
            let r, theta, z;
            let color = new THREE.Color();

            if (isBulge) {
                // Distribuição central (Hernquist approximation)
                r = Math.pow(Math.random(), 2.0) * 2.5; 
                theta = Math.random() * Math.PI * 2;
                z = (Math.random() - 0.5) * 1.5 * (2.5 - r);
                color.setHSL(0.12, 0.8, 0.7); // Amarelo/Laranja brilhante
            } else {
                // Disco e braços espirais
                r = 1.0 + Math.random() * 18.0;
                let armOffset = (i % 4) * (Math.PI / 2);
                theta = armOffset + r * 0.4 + (Math.random() - 0.5) * 0.8; 
                z = (Math.random() - 0.5) * (1.0 + r * 0.02);
                color.setHSL(0.6, 0.7, 0.6 + Math.random()*0.4); // Azul vibrante
            }

            positions[i*3] = r * Math.cos(theta);
            positions[i*3+1] = r * Math.sin(theta);
            positions[i*3+2] = z;

            colors[i*3] = color.r;
            colors[i*3+1] = color.g;
            colors[i*3+2] = color.b;

            sizes[i] = isBulge ? Math.random() * 3.0 : Math.random() * 2.0 + 0.5;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
        geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const mat = new THREE.ShaderMaterial({
            uniforms: { },
            vertexShader: galaxyVertexShader,
            fragmentShader: galaxyFragmentShader,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true
        });

        const galaxy = new THREE.Points(geo, mat);
        this.scene.add(galaxy);
    }

    createSun() {
        const geo = new THREE.SphereGeometry(0.2, 32, 32);
        this.sunMaterial = new THREE.ShaderMaterial({
            uniforms: { time: { value: 0.0 } },
            vertexShader: sunVertexShader,
            fragmentShader: sunFragmentShader,
            transparent: true
        });
        this.sunMesh = new THREE.Mesh(geo, this.sunMaterial);
        
        // Sun Core Light
        const light = new THREE.PointLight(0xffddaa, 2, 10);
        this.sunMesh.add(light);
        this.scene.add(this.sunMesh);
    }

    createTrail() {
        this.trailGeo = new THREE.BufferGeometry();
        this.trailPositions = new Float32Array(this.maxTrailPts * 3);
        this.trailColors = new Float32Array(this.maxTrailPts * 3);
        
        this.trailGeo.setAttribute('position', new THREE.BufferAttribute(this.trailPositions, 3));
        this.trailGeo.setAttribute('color', new THREE.BufferAttribute(this.trailColors, 3));
        
        const trailMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, linewidth: 2 });
        this.trailLine = new THREE.Line(this.trailGeo, trailMat);
        this.scene.add(this.trailLine);
    }

    addTrailPoint(x: number, y: number, z: number) {
        if (this.trailIdx < this.maxTrailPts) {
            this.trailPositions[this.trailIdx * 3] = x;
            this.trailPositions[this.trailIdx * 3 + 1] = y;
            this.trailPositions[this.trailIdx * 3 + 2] = z;
            this.trailIdx++;
        } else {
            // Shift array
            for(let i=0; i < this.maxTrailPts - 1; i++) {
                this.trailPositions[i*3] = this.trailPositions[(i+1)*3];
                this.trailPositions[i*3+1] = this.trailPositions[(i+1)*3+1];
                this.trailPositions[i*3+2] = this.trailPositions[(i+1)*3+2];
            }
            this.trailPositions[(this.maxTrailPts-1)*3] = x;
            this.trailPositions[(this.maxTrailPts-1)*3+1] = y;
            this.trailPositions[(this.maxTrailPts-1)*3+2] = z;
        }

        // Update fade colors
        for(let i=0; i < this.trailIdx; i++) {
            let alpha = i / this.trailIdx; // 0 to 1
            // Use NASA orange/yellow for trail
            let color = new THREE.Color().setHSL(0.1 + alpha*0.05, 1.0, 0.5 * alpha);
            this.trailColors[i*3] = color.r;
            this.trailColors[i*3+1] = color.g;
            this.trailColors[i*3+2] = color.b;
        }

        this.trailGeo.setDrawRange(0, this.trailIdx);
        this.trailGeo.attributes.position.needsUpdate = true;
        this.trailGeo.attributes.color.needsUpdate = true;
    }

    clearTrail() {
        this.trailIdx = 0;
        this.trailGeo.setDrawRange(0, 0);
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.composer.setSize(window.innerWidth, window.innerHeight);
    }

    render(time: number) {
        this.sunMaterial.uniforms.time.value = time;
        this.controls.update();
        this.composer.render();
    }
}
