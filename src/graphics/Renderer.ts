import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class GraphicsCore {
    scene: THREE.Scene;
    camera1: THREE.PerspectiveCamera;
    camera2: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    composer: EffectComposer;
    controls1: OrbitControls;
    controls2: OrbitControls;

    splitMode = false;

    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x010204); // Fundo espacial profundo NASA
        
        // Skysphere de fundo (simulação rápida)
        this.createStarfield();

        const aspect = window.innerWidth / window.innerHeight;
        
        // Câmera Principal
        this.camera1 = new THREE.PerspectiveCamera(50, aspect, 0.1, 3000);
        this.camera1.position.set(0, -40, 25);
        
        // Câmera Secundária (Modo Comparação)
        this.camera2 = new THREE.PerspectiveCamera(50, aspect, 0.1, 3000);
        this.camera2.position.set(0, -40, 25);

        this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Pipeline PBR / Cinematográfico
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0; 
        // Habilita scissoring para tela dividida
        this.renderer.autoClear = false;

        document.getElementById('canvas-container')?.appendChild(this.renderer.domElement);

        this.controls1 = new OrbitControls(this.camera1, this.renderer.domElement);
        this.controls1.enableDamping = true; this.controls1.dampingFactor = 0.05;
        this.controls1.maxDistance = 200;

        this.controls2 = new OrbitControls(this.camera2, this.renderer.domElement);
        this.controls2.enableDamping = true; this.controls2.dampingFactor = 0.05;

        // Post Processing Principal (Aplica apenas na pass final global, ou renderiza direto dependendo da performance)
        // Para tela dividida, aplicaremos bloom direto na scene com composer modificado ou fallback
        const renderScene = new RenderPass(this.scene, this.camera1);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.6);
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(renderScene);
        this.composer.addPass(bloomPass);

        window.addEventListener('resize', this.onResize.bind(this));
    }

    createStarfield() {
        const bgGeo = new THREE.BufferGeometry();
        const pts = 5000;
        const pos = new Float32Array(pts * 3);
        for(let i=0; i<pts; i++){
            let r = 800 + Math.random()*200;
            let theta = Math.random()*Math.PI*2;
            let phi = Math.acos((Math.random() * 2) - 1);
            pos[i*3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i*3+2] = r * Math.cos(phi);
        }
        bgGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const bgMat = new THREE.PointsMaterial({color: 0xaaaaaa, size: 1.5, sizeAttenuation: false, transparent: true, opacity: 0.4});
        this.scene.add(new THREE.Points(bgGeo, bgMat));
    }

    onResize() {
        const w = window.innerWidth; const h = window.innerHeight;
        this.renderer.setSize(w, h);
        this.composer.setSize(w, h);
        if(!this.splitMode) {
            this.camera1.aspect = w / h; this.camera1.updateProjectionMatrix();
        } else {
            this.camera1.aspect = (w/2) / h; this.camera1.updateProjectionMatrix();
            this.camera2.aspect = (w/2) / h; this.camera2.updateProjectionMatrix();
        }
    }

    render() {
        this.controls1.update();
        if(this.splitMode) this.controls2.update();

        this.renderer.clear();

        if (!this.splitMode) {
            // Render Único Cinematográfico
            this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
            this.renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
            this.renderer.setScissorTest(false);
            
            // Sincroniza a composer camera se trocou de modo
            this.composer.passes[0].camera = this.camera1;
            this.composer.render();
        } else {
            // Tela Dividida Científica
            const w = window.innerWidth; const h = window.innerHeight;
            
            this.renderer.setScissorTest(true);

            // Viewport Esquerdo
            this.renderer.setViewport(0, 0, w/2, h);
            this.renderer.setScissor(0, 0, w/2, h);
            this.camera1.aspect = (w/2) / h; this.camera1.updateProjectionMatrix();
            this.renderer.render(this.scene, this.camera1);

            // Viewport Direito
            this.renderer.setViewport(w/2, 0, w/2, h);
            this.renderer.setScissor(w/2, 0, w/2, h);
            this.camera2.aspect = (w/2) / h; this.camera2.updateProjectionMatrix();
            this.renderer.render(this.scene, this.camera2);
        }
    }
}
