// Shaders de alto desempenho para a Via Láctea e o Sol

export const galaxyVertexShader = `
    attribute float size;
    attribute vec3 customColor;
    varying vec3 vColor;
    void main() {
        vColor = customColor;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (250.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
    }
`;

export const galaxyFragmentShader = `
    varying vec3 vColor;
    void main() {
        // Shape circular suave com bordas dissipadas (Glow)
        vec2 xy = gl_PointCoord.xy - vec2(0.5);
        float ll = length(xy);
        if(ll > 0.5) discard;
        float alpha = (0.5 - ll) * 2.0;
        alpha = pow(alpha, 1.5);
        gl_FragColor = vec4(vColor, alpha);
    }
`;

// Procedural Star/Sun Shader (No texture needed, pure GLSL plasma)
export const sunVertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

export const sunFragmentShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float time;
    
    // Simple 3D noise for plasma effect
    float hash(vec3 p) {
        p = fract(p * 0.3183099 + .1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }
    float noise(vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                       mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                   mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                       mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
    }
    
    void main() {
        // Plasma surface
        vec3 p = vec3(vUv * 10.0, time * 0.2);
        float n = noise(p * 2.0) * 0.5 + noise(p * 4.0) * 0.25;
        
        vec3 colorDark = vec3(0.9, 0.2, 0.0);
        vec3 colorLight = vec3(1.0, 0.9, 0.5);
        vec3 surfaceColor = mix(colorDark, colorLight, n);
        
        // Fresnel Edge Glow
        float viewIntensity = abs(dot(normalize(vPosition), vNormal));
        float fresnel = pow(1.0 - viewIntensity, 2.5);
        surfaceColor += vec3(1.0, 0.6, 0.2) * fresnel * 2.0;
        
        gl_FragColor = vec4(surfaceColor, 1.0);
    }
`;
