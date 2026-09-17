export const starVertexShader = `
attribute float size; attribute vec3 customColor; attribute float alphaMult;
varying vec3 vColor; varying float vAlpha;
void main(){vColor=customColor;vAlpha=alphaMult;vec4 mv=modelViewMatrix*vec4(position,1.);
gl_PointSize=clamp(size*160./max(1.,-mv.z),.8,14.);gl_Position=projectionMatrix*mv;}`;
export const starFragmentShader = `
varying vec3 vColor;varying float vAlpha;
void main(){float r=length(gl_PointCoord-.5);if(r>.5)discard;
float core=exp(-r*r*65.);float glow=exp(-r*r*16.)*.23;
gl_FragColor=vec4(vColor,(core+glow)*vAlpha);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;
export const dustVertexShader = `
attribute float size;attribute float opacity;varying float vOpacity;
void main(){vOpacity=opacity;vec4 mv=modelViewMatrix*vec4(position,1.);gl_PointSize=clamp(size*240./max(1.,-mv.z),1.,32.);gl_Position=projectionMatrix*mv;}`;
export const dustFragmentShader = `
varying float vOpacity;
void main(){float r=length(gl_PointCoord-.5);if(r>.5)discard;gl_FragColor=vec4(.012,.008,.012,exp(-r*r*20.)*vOpacity);}`;
