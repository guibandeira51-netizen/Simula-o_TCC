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
    
    introActive = true;
    introProgress = 0;

    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000); 
        this.scene.fog = new THREE.FogExp2(0x000000, 0.004);

        const aspect = window.innerWidth / window.innerHeight;
        
        this.camera1 = new THREE.PerspectiveCamera(45, aspect, 0.1, 8000);
        this.camera1.position.set(0, 160, 60);
        
        this.camera2 = new THREE.PerspectiveCamera(45, aspect, 0.1, 8000);
        this.camera2.position.set(0, -35, 30);

        // Otimizado para RX 7600 (Sem restrição artificial de pixel ratio)
        this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance", stencil: false });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
        
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.85; 
        this.renderer.autoClear = false;

        document.getElementById('canvas-container')?.appendChild(this.renderer.domElement);

        this.controls1 = new OrbitControls(this.camera1, this.renderer.domElement);
        this.controls1.enableDamping = true; 
        this.controls1.dampingFactor = 0.04;
        this.controls1.maxDistance = 400;
        this.controls1.enabled = false;

        this.controls2 = new OrbitControls(this.camera2, this.renderer.domElement);
        this.controls2.enableDamping = true; 
        this.controls2.dampingFactor = 0.04;

        const renderScene = new RenderPass(this.scene, this.camera1);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.65, 0.4, 0.88);
        
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(renderScene);
        this.composer.addPass(bloomPass);

        window.addEventListener('resize', this.onResize.bind(this));
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

    updateCinematicIntro(delta: number) {
        if (!this.introActive) return;
        
        this.introProgress += delta * 0.25; 
        if (this.introProgress >= 1.0) {
            this.introProgress = 1.0;
            this.introActive = false;
            this.controls1.enabled = true;
        }

        let t = 1 - Math.pow(1 - this.introProgress, 3);
        this.camera1.position.x = THREE.MathUtils.lerp(0, 0, t);
        this.camera1.position.y = THREE.MathUtils.lerp(160, -35, t);
        this.camera1.position.z = THREE.MathUtils.lerp(60, 30, t);
        this.camera1.lookAt(0, 0, 0);
    }

    render(delta: number) {
        if(this.introActive) {
            this.updateCinematicIntro(delta);
        } else {
            this.controls1.update();
        }
        
        if(this.splitMode) this.controls2.update();

        this.renderer.clear();

        if (!this.splitMode) {
            this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
            this.renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
            this.renderer.setScissorTest(false);
            this.composer.passes[0].camera = this.camera1;
            this.composer.render();
        } else {
            const w = window.innerWidth; const h = window.innerHeight;
            this.renderer.setScissorTest(true);
            
            this.renderer.setViewport(0, 0, w/2, h);
            this.renderer.setScissor(0, 0, w/2, h);
            this.renderer.render(this.scene, this.camera1);

            this.renderer.setViewport(w/2, 0, w/2, h);
            this.renderer.setScissor(w/2, 0, w/2, h);
            this.renderer.render(this.scene, this.camera2);
        }
    }
}
