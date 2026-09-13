import * as THREE from 'three';
import { sunVertexShader, sunFragmentShader } from '../shaders/Shaders';

export class SunEntity {
    mesh: THREE.Mesh;
    material: THREE.ShaderMaterial;
    pointLight: THREE.PointLight;

    constructor(scene: THREE.Scene, colorHex: number = 0xffa500) {
        // Sol renderizado via GLSL Plasma procedural
        const geo = new THREE.SphereGeometry(0.35, 64, 64);
        
        const baseColor = new THREE.Color(colorHex);
        this.material = new THREE.ShaderMaterial({
            uniforms: { 
                time: { value: 0.0 },
                baseColor: { value: new THREE.Vector3(baseColor.r, baseColor.g, baseColor.b) }
            },
            vertexShader: sunVertexShader,
            fragmentShader: sunFragmentShader,
            transparent: true
        });
        
        this.mesh = new THREE.Mesh(geo, this.material);
        
        // Emissão real de luz no ambiente
        this.pointLight = new THREE.PointLight(colorHex, 2.5, 15.0);
        this.mesh.add(this.pointLight);

        // Core Glow (Sprite simples no fundo para simular halo atmosférico)
        const glowGeo = new THREE.PlaneGeometry(2.0, 2.0);
        const glowMat = new THREE.MeshBasicMaterial({
            color: colorHex, transparent: true, opacity: 0.3,
            blending: THREE.AdditiveBlending, depthWrite: false,
            map: this.createRadialGradient()
        });
        const glowMesh = new THREE.Mesh(glowGeo, glowMat);
        
        // Billboard effect simple implementation
        glowMesh.onBeforeCompile = (shader) => {
            shader.vertexShader = shader.vertexShader.replace(
                '#include <project_vertex>',
                `
                vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
                mvPosition.xy += position.xy;
                gl_Position = projectionMatrix * mvPosition;
                `
            );
        };
        this.mesh.add(glowMesh);
        scene.add(this.mesh);
    }

    createRadialGradient() {
        const canvas = document.createElement('canvas');
        canvas.width = 128; canvas.height = 128;
        const context = canvas.getContext('2d')!;
        const gradient = context.createRadialGradient(64,64,0, 64,64,64);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        context.fillStyle = gradient;
        context.fillRect(0,0,128,128);
        const tex = new THREE.CanvasTexture(canvas);
        return tex;
    }

    update(time: number, x: number, y: number, z: number) {
        this.material.uniforms.time.value = time;
        this.mesh.position.set(x, y, z);
    }
}
