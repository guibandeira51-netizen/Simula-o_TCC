import * as THREE from 'three';
import { sunVertexShader, sunFragmentShader } from '../shaders/SunShaders';

export class SunEntity {
    mesh: THREE.Mesh;
    material: THREE.ShaderMaterial;
    pointLight: THREE.PointLight;
    glowMesh: THREE.Sprite;

    constructor(scene: THREE.Scene) {
        // Sol Sci-Fi HD
        const geo = new THREE.SphereGeometry(0.35, 32, 32);
        
        this.material = new THREE.ShaderMaterial({
            uniforms: { time: { value: 0.0 } },
            vertexShader: sunVertexShader,
            fragmentShader: sunFragmentShader,
            transparent: true
        });
        
        this.mesh = new THREE.Mesh(geo, this.material);
        
        // Emissão ambiente para interagir com poeira
        this.pointLight = new THREE.PointLight(0xffcc66, 1.5, 20.0);
        this.mesh.add(this.pointLight);

        // Lens Flare / Corona Glow via Sprite
        const glowMap = this.createRadialGradient();
        const glowMat = new THREE.SpriteMaterial({
            map: glowMap, color: 0xffaa00, transparent: true,
            opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false
        });
        this.glowMesh = new THREE.Sprite(glowMat);
        this.glowMesh.scale.set(3.5, 3.5, 1.0);
        this.mesh.add(this.glowMesh);
        
        scene.add(this.mesh);
    }

    createRadialGradient() {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d')!;
        const grad = ctx.createRadialGradient(128,128,0, 128,128,128);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
        grad.addColorStop(0.1, 'rgba(255, 200, 100, 0.8)');
        grad.addColorStop(0.4, 'rgba(255, 100, 0, 0.2)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0,0,256,256);
        return new THREE.CanvasTexture(canvas);
    }

    update(time: number, x: number, y: number, z: number) {
        this.material.uniforms.time.value = time;
        this.mesh.position.set(x, y, z);
    }
}
