
// SHADER ESTRELAS (ADDITIVE BLENDING)
// Utiliza decaimento Gaussiano de densidade óptica para não bugar o Bloom
export const starVertexShader = `
    attribute float size;
    attribute vec3 customColor;
    attribute float alphaMult;
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
        vColor = customColor;
        vAlpha = alphaMult;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        
        // Câmera perspective scaling físico
        float dist = length(mvPosition.xyz);
        gl_PointSize = size * (350.0 / dist);
        
        // Limitando o point size para evitar que o núcleo exploda a tela
        gl_PointSize = clamp(gl_PointSize, 0.5, 18.0);
        
        gl_Position = projectionMatrix * mvPosition;
    }
`;

export const starFragmentShader = `
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
        vec2 xy = gl_PointCoord.xy - vec2(0.5);
        float ll = length(xy);
        
        if(ll > 0.5) discard;
        
        // Decaimento Gaussiano perfeito (Simula a difração de um ponto de luz)
        float intensity = exp(-ll * ll * 25.0); 
        
        // Core clipping protection (evita o branco estourado acumulativo)
        vec4 texColor = vec4(vColor, intensity * vAlpha);
        gl_FragColor = texColor;
    }
`;

// SHADER POEIRA INTERESTELAR (NORMAL BLENDING - ABSORÇÃO DE LUZ)
export const dustVertexShader = `
    attribute float size;
    attribute float opacity;
    varying float vOpacity;
    varying vec2 vUv;
    void main() {
        vOpacity = opacity;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (400.0 / length(mvPosition.xyz));
        gl_PointSize = clamp(gl_PointSize, 1.0, 40.0); // Nuvens de poeira são maiores
        gl_Position = projectionMatrix * mvPosition;
    }
`;

export const dustFragmentShader = `
    varying float vOpacity;
    void main() {
        vec2 xy = gl_PointCoord.xy - vec2(0.5);
        float ll = length(xy);
        if(ll > 0.5) discard;
        
        // Falloff linear suave para as nuvens de poeira (Dust Lanes)
        float intensity = pow(1.0 - (ll * 2.0), 1.5);
        
        // Cor base: marrom ultra escuro avermelhado (absorção física)
        vec3 dustColor = vec3(0.02, 0.01, 0.005);
        
        gl_FragColor = vec4(dustColor, intensity * vOpacity);
    }
`;
