var Bf=Object.defineProperty;var zf=(i,t,e)=>t in i?Bf(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var K=(i,t,e)=>(zf(i,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();function lo(i){return{q:[...i.q],v:[...i.v],t:i.t}}function Hf(i,t,e){if(!Number.isFinite(t))throw new RangeError("Passo não finito");const n=e.acceleration(i.q),s=i.v.map((a,l)=>a+t*n[l]/2),r=i.q.map((a,l)=>a+t*s[l]),o=e.acceleration(r);for(let a=0;a<3;a++)s[a]+=t*o[a]/2;if(![...r,...s,i.t+t].every(Number.isFinite))throw new RangeError("Estado não finito");i.q=r,i.v=s,i.t+=t}const tr={gala:{title:"Gala MilkyWayPotential v1 — parâmetros",url:"https://gala.adrian.pw/en/stable/_modules/gala/potential/potential/builtin/special.html"},fit:{title:"Gala — construção e limitações dos modelos v1/v2",url:"https://gala.adrian.pw/en/stable/supporting/define-milky-way-model.html"},bovy:{title:"Bovy (2015), galpy",url:"https://arxiv.org/abs/1412.3451"},hernquist:{title:"Hernquist (1990)",url:"https://articles.adsabs.harvard.edu/pdf/1990ApJ...356..359H"},mn:{title:"Miyamoto & Nagai (1975)",url:"https://articles.adsabs.harvard.edu/pdf/1975PASJ...27..533M"},nfw:{title:"Navarro, Frenk & White (1997)",url:"https://arxiv.org/abs/astro-ph/9611107"},iau:{title:"IAU 2015 B3 — GM solar nominal",url:"https://arxiv.org/abs/1510.07674"},units:{title:"NASA/JPL — unidades astronômicas",url:"https://ssd.jpl.nasa.gov/astro_par.html"},gravity:{title:"GRAVITY (2019), distância ao centro",url:"https://arxiv.org/abs/1904.05721"},height:{title:"Bennett & Bovy (2019), altura solar",url:"https://arxiv.org/abs/1809.03507"},solar:{title:"Schönrich, Binney & Dehnen (2010)",url:"https://academic.oup.com/mnras/article/403/4/1829/1054839"},eilers:{title:"Eilers et al. (2019), curva de rotação",url:"https://arxiv.org/abs/1810.09466"},reid:{title:"Reid et al. (2019), estrutura e cinemática",url:"https://arxiv.org/abs/1910.03357"},leapfrog:{title:"Springel (2005), §4.1 — leapfrog",url:"https://wwwmpa.mpa-garching.mpg.de/gadget/gadget2-paper.pdf"}},Vf=149597870700,Qu=1e3*(648e3/Math.PI)*Vf,Gf=1e9*365.25*86400,Wf=13271244e13,yn=Wf/Qu/1e6,Re=1e3*Gf/Qu,jl=Re**2,$t=Object.freeze({name:"Gala MilkyWayPotential v1 (referência histórica)",disk:Object.freeze({mass:68e9,a:3,b:.28}),bulge:Object.freeze({mass:5e9,a:1}),nucleus:Object.freeze({mass:171e7,a:.07}),halo:Object.freeze({scaleMass:54e10,rs:15.62})}),en=Object.freeze({R:8.178,z:.0208,U:11.1,V:12.24,W:7.25}),td=[["Disco: massa","M_d",$t.disk.mass,"M☉","gala"],["Disco: escala radial MN","a_d",$t.disk.a,"kpc","gala"],["Disco: escala vertical MN","b_d",$t.disk.b,"kpc","gala"],["Bojo: massa","M_b",$t.bulge.mass,"M☉","gala"],["Bojo: escala","a_b",$t.bulge.a,"kpc","gala"],["Núcleo: massa estelar","M_n",$t.nucleus.mass,"M☉","gala"],["Núcleo: escala","a_n",$t.nucleus.a,"kpc","gala"],["Halo: massa de escala (não virial)","A",$t.halo.scaleMass,"M☉","gala"],["Halo: raio de escala","r_s",$t.halo.rs,"kpc","gala"],["Halo: densidade derivada","ρ_s",$t.halo.scaleMass/(4*Math.PI*$t.halo.rs**3),"M☉/kpc³","gala"],["Distância solar","R_☉",en.R,"kpc","gravity"],["Altura solar","z_☉",en.z,"kpc","height"],["Movimento solar para o centro","U",en.U,"km/s","solar"],["Movimento solar na rotação","V",en.V,"km/s","solar"],["Movimento solar vertical","W",en.W,"km/s","solar"],["Constante em unidades nominais","G",yn,"kpc (km/s)²/M☉","iau"],["Conversão de velocidade","C",Re,"(kpc/Gyr)/(km/s)","units"]],ve=Object.freeze({samplesPerFastPeriod:1024,derivativeFraction:1e-4,nfwSeriesBoundary:.001,energyTolerance:1e-4,angularTolerance:1e-8,maxStepFrequency:.03,minRadius:.5,maxRadius:50,perturbationFraction:.01});function Yl(i,t){const e=i.v.reduce((s,r)=>s+r*r,0)/(2*Re**2),n=t.potential(i.q);return{K:e,phi:n,E:e+n,Lz:(i.q[0]*i.v[1]-i.q[1]*i.v[0])/Re}}class Xf{constructor(t,e){K(this,"baseline");K(this,"energyScale");K(this,"angularScale");K(this,"maxEnergy",0);K(this,"maxAngular",0);this.baseline=Yl(t,e),this.energyScale=Math.max(Math.abs(this.baseline.E),this.baseline.K,Number.MIN_VALUE),this.angularScale=Math.max(Math.abs(this.baseline.Lz),Math.hypot(...t.q)*Math.hypot(...t.v)/Re,Number.MIN_VALUE)}measure(t,e,n){const s=Yl(t,e),r=Math.hypot(...t.q),o=e.acceleration(t.q),a=Math.abs(s.E-this.baseline.E)/this.energyScale,l=Math.abs(s.Lz-this.baseline.Lz)/this.angularScale;this.maxEnergy=Math.max(this.maxEnergy,a),this.maxAngular=Math.max(this.maxAngular,l);const c=Math.max(r,ve.minRadius)*ve.derivativeFraction,h=e.acceleration([t.q[0],t.q[1],t.q[2]+c]),u=e.acceleration([t.q[0],t.q[1],t.q[2]-c]),d=Math.max(Math.hypot(...t.v)/r,Math.sqrt(Math.hypot(...o)/r),Math.sqrt(Math.abs((h[2]-u[2])/(2*c)))),f=n*d,g=r<ve.minRadius||r>ve.maxRadius,p=![s.E,s.Lz,a,l,f].every(Number.isFinite)||g||this.maxEnergy>ve.energyTolerance||this.maxAngular>ve.angularTolerance||f>ve.maxStepFrequency;return{...s,energyError:a,angularError:l,maxEnergy:this.maxEnergy,maxAngular:this.maxAngular,resolution:f,domainError:g,warning:p}}}class ql{constructor(t,e){K(this,"state");K(this,"field");K(this,"monitor");this.field=t,this.state=lo(e),this.monitor=new Xf(this.state,t)}step(t){Hf(this.state,t,this.field)}diagnostics(t){return this.monitor.measure(this.state,this.field,t)}}const jf={halo:!0,disk:!0,bulge:!0,nucleus:!0};function Yf(i){if(i<0||!Number.isFinite(i))throw new RangeError("Raio NFW inválido");return i<ve.nfwSeriesBoundary?i*i*(1/2+i*(-2/3+i*(3/4+i*(-4/5+i*(5/6+i*(-6/7+i*7/8)))))):Math.log1p(i)-i/(1+i)}function qf(i){return $t.halo.scaleMass*Yf(i/$t.halo.rs)}function $f(i){if(i<0||!Number.isFinite(i))throw new RangeError("Raio NFW inválido");return-yn*$t.halo.scaleMass*(i===0?1/$t.halo.rs:Math.log1p(i/$t.halo.rs)/i)}class fs{constructor(t=jf){K(this,"components");this.components=Object.freeze({...t})}potential(t){const[e,n,s]=t,r=Math.hypot(e,n,s),o=this.components;let a=0;return o.halo&&(a+=$f(r)),o.bulge&&(a-=yn*$t.bulge.mass/(r+$t.bulge.a)),o.nucleus&&(a-=yn*$t.nucleus.mass/(r+$t.nucleus.a)),o.disk&&(a-=yn*$t.disk.mass/Math.hypot(e,n,$t.disk.a+Math.hypot(s,$t.disk.b))),a}acceleration(t){const[e,n,s]=t,r=Math.hypot(e,n,s),o=this.components;if(!Number.isFinite(r))throw new RangeError("Posição não finita");if(r===0&&(o.halo||o.bulge||o.nucleus))throw new RangeError("Força cuspada indefinida no centro");let a=0;o.halo&&(a-=yn*qf(r)/(r*r*r)),o.bulge&&(a-=yn*$t.bulge.mass/(r*(r+$t.bulge.a)**2)),o.nucleus&&(a-=yn*$t.nucleus.mass/(r*(r+$t.nucleus.a)**2));const l=[a*e,a*n,a*s];if(o.disk){const c=Math.hypot(s,$t.disk.b),h=$t.disk.a+c,u=-yn*$t.disk.mass/Math.hypot(e,n,h)**3;l[0]+=u*e,l[1]+=u*n,l[2]+=u*h*s/c}return l.map(c=>c*jl)}circularSpeed(t){if(!(t>0))throw new RangeError("R deve ser positivo");return Math.sqrt(Math.max(0,-t*this.acceleration([t,0,0])[0]/jl))}frequencies(t){const e=t*ve.derivativeFraction,n=(this.circularSpeed(t)*Re/t)**2,s=((this.circularSpeed(t+e)*Re/(t+e))**2-(this.circularSpeed(t-e)*Re/(t-e))**2)/(2*e);return{omega2:n,kappa2:t*s+4*n,nu2:-this.acceleration([t,0,e])[2]/e}}}function $l(i,t,e=en.R){const n=t==="solar"?en.R:e;if(!Number.isFinite(n)||n<ve.minRadius||n>ve.maxRadius)throw new RangeError("Raio inicial fora de 0,5–50 kpc");const s=i.circularSpeed(n);return t==="solar"?{q:[n,0,en.z],v:[-en.U*Re,(s+en.V)*Re,en.W*Re],t:0}:{q:[n,0,0],v:[t==="perturbed"?ve.perturbationFraction*s*Re:0,s*Re,0],t:0}}function Kf(i,t){const{omega2:e,kappa2:n,nu2:s}=i.frequencies(t);if(n<0||s<0)throw new RangeError("Frequências ao quadrado negativas");const r=Math.sqrt(Math.max(e,n,s));if(!(r>0))throw new RangeError("Selecione ao menos uma componente");return 2*Math.PI/(ve.samplesPerFastPeriod*r)}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xl="158",Vi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Gi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Zf=0,Kl=1,Jf=2,ed=1,Qf=2,On=3,hi=0,Ye=1,kn=2,oi=0,ps=1,Ga=2,Zl=3,Jl=4,tp=5,wi=100,ep=101,np=102,Ql=103,tc=104,ip=200,sp=201,rp=202,op=203,Wa=204,Xa=205,ap=206,lp=207,cp=208,hp=209,up=210,dp=211,fp=212,pp=213,mp=214,gp=0,_p=1,xp=2,bo=3,vp=4,bp=5,Mp=6,yp=7,nd=0,Sp=1,Ep=2,ai=0,Tp=1,Ap=2,wp=3,id=4,Rp=5,sd=300,_s=301,xs=302,ja=303,Ya=304,Fo=306,qa=1e3,pn=1001,$a=1002,We=1003,ec=1004,Zo=1005,an=1006,Cp=1007,er=1008,li=1009,Pp=1010,Lp=1011,vl=1012,rd=1013,Jn=1014,Qn=1015,nr=1016,od=1017,ad=1018,Pi=1020,Dp=1021,mn=1023,Ip=1024,Op=1025,Li=1026,vs=1027,Up=1028,ld=1029,Fp=1030,cd=1031,hd=1033,Jo=33776,Qo=33777,ta=33778,ea=33779,nc=35840,ic=35841,sc=35842,rc=35843,Np=36196,oc=37492,ac=37496,lc=37808,cc=37809,hc=37810,uc=37811,dc=37812,fc=37813,pc=37814,mc=37815,gc=37816,_c=37817,xc=37818,vc=37819,bc=37820,Mc=37821,na=36492,yc=36494,Sc=36495,kp=36283,Ec=36284,Tc=36285,Ac=36286,ud=3e3,Di=3001,Bp=3200,zp=3201,Hp=0,Vp=1,hn="",we="srgb",Xn="srgb-linear",bl="display-p3",No="display-p3-linear",Mo="linear",se="srgb",yo="rec709",So="p3",Wi=7680,wc=519,Gp=512,Wp=513,Xp=514,jp=515,Yp=516,qp=517,$p=518,Kp=519,Ka=35044,Rc=35048,Cc="300 es",Za=1035,Bn=2e3,Eo=2001;class Bi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Pc=1234567;const js=Math.PI/180,ir=180/Math.PI;function Gn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]).toLowerCase()}function Ue(i,t,e){return Math.max(t,Math.min(e,i))}function Ml(i,t){return(i%t+t)%t}function Zp(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Jp(i,t,e){return i!==t?(e-i)/(t-i):0}function Ys(i,t,e){return(1-e)*i+e*t}function Qp(i,t,e,n){return Ys(i,t,1-Math.exp(-e*n))}function tm(i,t=1){return t-Math.abs(Ml(i,t*2)-t)}function em(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function nm(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function im(i,t){return i+Math.floor(Math.random()*(t-i+1))}function sm(i,t){return i+Math.random()*(t-i)}function rm(i){return i*(.5-Math.random())}function om(i){i!==void 0&&(Pc=i);let t=Pc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function am(i){return i*js}function lm(i){return i*ir}function Ja(i){return(i&i-1)===0&&i!==0}function cm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function To(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function hm(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function En(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Qt(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const um={DEG2RAD:js,RAD2DEG:ir,generateUUID:Gn,clamp:Ue,euclideanModulo:Ml,mapLinear:Zp,inverseLerp:Jp,lerp:Ys,damp:Qp,pingpong:tm,smoothstep:em,smootherstep:nm,randInt:im,randFloat:sm,randFloatSpread:rm,seededRandom:om,degToRad:am,radToDeg:lm,isPowerOfTwo:Ja,ceilPowerOfTwo:cm,floorPowerOfTwo:To,setQuaternionFromProperEuler:hm,normalize:Qt,denormalize:En};class Pt{constructor(t=0,e=0){Pt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class zt{constructor(t,e,n,s,r,o,a,l,c){zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=s[0],p=s[3],m=s[6],v=s[1],x=s[4],y=s[7],b=s[2],A=s[5],S=s[8];return r[0]=o*_+a*v+l*b,r[3]=o*p+a*x+l*A,r[6]=o*m+a*y+l*S,r[1]=c*_+h*v+u*b,r[4]=c*p+h*x+u*A,r[7]=c*m+h*y+u*S,r[2]=d*_+f*v+g*b,r[5]=d*p+f*x+g*A,r[8]=d*m+f*y+g*S,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*c-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=d*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ia.makeScale(t,e)),this}rotate(t){return this.premultiply(ia.makeRotation(-t)),this}translate(t,e){return this.premultiply(ia.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ia=new zt;function dd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ao(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function dm(){const i=Ao("canvas");return i.style.display="block",i}const Lc={};function qs(i){i in Lc||(Lc[i]=!0,console.warn(i))}const Dc=new zt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ic=new zt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),br={[Xn]:{transfer:Mo,primaries:yo,toReference:i=>i,fromReference:i=>i},[we]:{transfer:se,primaries:yo,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[No]:{transfer:Mo,primaries:So,toReference:i=>i.applyMatrix3(Ic),fromReference:i=>i.applyMatrix3(Dc)},[bl]:{transfer:se,primaries:So,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Ic),fromReference:i=>i.applyMatrix3(Dc).convertLinearToSRGB()}},fm=new Set([Xn,No]),te={enabled:!0,_workingColorSpace:Xn,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(i){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!i},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!fm.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=br[t].toReference,s=br[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return br[i].primaries},getTransfer:function(i){return i===hn?Mo:br[i].transfer}};function ms(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function sa(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Xi;class fd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Xi===void 0&&(Xi=Ao("canvas")),Xi.width=t.width,Xi.height=t.height;const n=Xi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Xi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ao("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ms(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ms(e[n]/255)*255):e[n]=ms(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let pm=0;class pd{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:pm++}),this.uuid=Gn(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ra(s[o].image)):r.push(ra(s[o]))}else r=ra(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function ra(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?fd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let mm=0;class qe extends Bi{constructor(t=qe.DEFAULT_IMAGE,e=qe.DEFAULT_MAPPING,n=pn,s=pn,r=an,o=er,a=mn,l=li,c=qe.DEFAULT_ANISOTROPY,h=hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=Gn(),this.name="",this.source=new pd(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Pt(0,0),this.repeat=new Pt(1,1),this.center=new Pt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(qs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Di?we:hn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==sd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case qa:t.x=t.x-Math.floor(t.x);break;case pn:t.x=t.x<0?0:1;break;case $a:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case qa:t.y=t.y-Math.floor(t.y);break;case pn:t.y=t.y<0?0:1;break;case $a:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return qs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===we?Di:ud}set encoding(t){qs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Di?we:hn}}qe.DEFAULT_IMAGE=null;qe.DEFAULT_MAPPING=sd;qe.DEFAULT_ANISOTROPY=1;class Ce{constructor(t=0,e=0,n=0,s=1){Ce.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,y=(f+1)/2,b=(m+1)/2,A=(h+d)/4,S=(u+_)/4,P=(g+p)/4;return x>y&&x>b?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=A/n,r=S/n):y>b?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=A/s,r=P/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=S/r,s=P/r),this.set(n,s,r,e),this}let v=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(p-g)/v,this.y=(u-_)/v,this.z=(d-h)/v,this.w=Math.acos((c+f+m-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class gm extends Bi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ce(0,0,t,e),this.scissorTest=!1,this.viewport=new Ce(0,0,t,e);const s={width:t,height:e,depth:1};n.encoding!==void 0&&(qs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Di?we:hn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new qe(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new pd(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ui extends gm{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class md extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _m extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fi{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let p=1-a;const m=l*d+c*f+h*g+u*_,v=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const b=Math.sqrt(x),A=Math.atan2(b,m*v);p=Math.sin(p*A)/b,a=Math.sin(a*A)/b}const y=a*v;if(l=l*p+d*y,c=c*p+f*y,h=h*p+g*y,u=u*p+_*y,p===1-a){const b=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=b,c*=b,h*=b,u*=b}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-a*f,t[e+2]=c*g+h*f+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e!==!1&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ue(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),n*Math.sin(r),n*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(t=0,e=0,n=0){U.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Oc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Oc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return oa.copy(this).projectOnVector(t),this.sub(oa)}reflect(t){return this.sub(oa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const oa=new U,Oc=new Fi;class dr{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(un.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(un.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=un.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,un):un.fromBufferAttribute(r,o),un.applyMatrix4(t.matrixWorld),this.expandByPoint(un);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Mr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Mr.copy(n.boundingBox)),Mr.applyMatrix4(t.matrixWorld),this.union(Mr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,un),un.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(As),yr.subVectors(this.max,As),ji.subVectors(t.a,As),Yi.subVectors(t.b,As),qi.subVectors(t.c,As),jn.subVectors(Yi,ji),Yn.subVectors(qi,Yi),gi.subVectors(ji,qi);let e=[0,-jn.z,jn.y,0,-Yn.z,Yn.y,0,-gi.z,gi.y,jn.z,0,-jn.x,Yn.z,0,-Yn.x,gi.z,0,-gi.x,-jn.y,jn.x,0,-Yn.y,Yn.x,0,-gi.y,gi.x,0];return!aa(e,ji,Yi,qi,yr)||(e=[1,0,0,0,1,0,0,0,1],!aa(e,ji,Yi,qi,yr))?!1:(Sr.crossVectors(jn,Yn),e=[Sr.x,Sr.y,Sr.z],aa(e,ji,Yi,qi,yr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,un).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(un).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Rn=[new U,new U,new U,new U,new U,new U,new U,new U],un=new U,Mr=new dr,ji=new U,Yi=new U,qi=new U,jn=new U,Yn=new U,gi=new U,As=new U,yr=new U,Sr=new U,_i=new U;function aa(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){_i.fromArray(i,r);const a=s.x*Math.abs(_i.x)+s.y*Math.abs(_i.y)+s.z*Math.abs(_i.z),l=t.dot(_i),c=e.dot(_i),h=n.dot(_i);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const xm=new dr,ws=new U,la=new U;class fr{constructor(t=new U,e=-1){this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):xm.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ws.subVectors(t,this.center);const e=ws.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ws,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(la.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ws.copy(t.center).add(la)),this.expandByPoint(ws.copy(t.center).sub(la))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Cn=new U,ca=new U,Er=new U,qn=new U,ha=new U,Tr=new U,ua=new U;class ko{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Cn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Cn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Cn.copy(this.origin).addScaledVector(this.direction,e),Cn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ca.copy(t).add(e).multiplyScalar(.5),Er.copy(e).sub(t).normalize(),qn.copy(this.origin).sub(ca);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Er),a=qn.dot(this.direction),l=-qn.dot(Er),c=qn.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ca).addScaledVector(Er,d),f}intersectSphere(t,e){Cn.subVectors(t.center,this.origin);const n=Cn.dot(this.direction),s=Cn.dot(Cn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Cn)!==null}intersectTriangle(t,e,n,s,r){ha.subVectors(e,t),Tr.subVectors(n,t),ua.crossVectors(ha,Tr);let o=this.direction.dot(ua),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;qn.subVectors(this.origin,t);const l=a*this.direction.dot(Tr.crossVectors(qn,Tr));if(l<0)return null;const c=a*this.direction.dot(ha.cross(qn));if(c<0||l+c>o)return null;const h=-a*qn.dot(ua);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xe{constructor(t,e,n,s,r,o,a,l,c,h,u,d,f,g,_,p){xe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,d,f,g,_,p)}set(t,e,n,s,r,o,a,l,c,h,u,d,f,g,_,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/$i.setFromMatrixColumn(t,0).length(),r=1/$i.setFromMatrixColumn(t,1).length(),o=1/$i.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-_*c,e[9]=-a*l,e[2]=_-d*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;e[0]=d+_*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=_+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;e[0]=d-_*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,f=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+_,e[1]=l*u,e[5]=_*c+d,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-_*u}else if(t.order==="XZY"){const d=o*l,f=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+_,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(vm,t,bm)}lookAt(t,e,n){const s=this.elements;return Je.subVectors(t,e),Je.lengthSq()===0&&(Je.z=1),Je.normalize(),$n.crossVectors(n,Je),$n.lengthSq()===0&&(Math.abs(n.z)===1?Je.x+=1e-4:Je.z+=1e-4,Je.normalize(),$n.crossVectors(n,Je)),$n.normalize(),Ar.crossVectors(Je,$n),s[0]=$n.x,s[4]=Ar.x,s[8]=Je.x,s[1]=$n.y,s[5]=Ar.y,s[9]=Je.y,s[2]=$n.z,s[6]=Ar.z,s[10]=Je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],p=n[10],m=n[14],v=n[3],x=n[7],y=n[11],b=n[15],A=s[0],S=s[4],P=s[8],M=s[12],w=s[1],N=s[5],z=s[9],q=s[13],L=s[2],F=s[6],I=s[10],B=s[14],J=s[3],$=s[7],Z=s[11],O=s[15];return r[0]=o*A+a*w+l*L+c*J,r[4]=o*S+a*N+l*F+c*$,r[8]=o*P+a*z+l*I+c*Z,r[12]=o*M+a*q+l*B+c*O,r[1]=h*A+u*w+d*L+f*J,r[5]=h*S+u*N+d*F+f*$,r[9]=h*P+u*z+d*I+f*Z,r[13]=h*M+u*q+d*B+f*O,r[2]=g*A+_*w+p*L+m*J,r[6]=g*S+_*N+p*F+m*$,r[10]=g*P+_*z+p*I+m*Z,r[14]=g*M+_*q+p*B+m*O,r[3]=v*A+x*w+y*L+b*J,r[7]=v*S+x*N+y*F+b*$,r[11]=v*P+x*z+y*I+b*Z,r[15]=v*M+x*q+y*B+b*O,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],_=t[7],p=t[11],m=t[15];return g*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*f-n*l*f)+_*(+e*l*f-e*c*d+r*o*d-s*o*f+s*c*h-r*l*h)+p*(+e*c*u-e*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+m*(-s*a*h-e*l*u+e*a*d+s*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],_=t[13],p=t[14],m=t[15],v=u*p*c-_*d*c+_*l*f-a*p*f-u*l*m+a*d*m,x=g*d*c-h*p*c-g*l*f+o*p*f+h*l*m-o*d*m,y=h*_*c-g*u*c+g*a*f-o*_*f-h*a*m+o*u*m,b=g*u*l-h*_*l-g*a*d+o*_*d+h*a*p-o*u*p,A=e*v+n*x+s*y+r*b;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/A;return t[0]=v*S,t[1]=(_*d*r-u*p*r-_*s*f+n*p*f+u*s*m-n*d*m)*S,t[2]=(a*p*r-_*l*r+_*s*c-n*p*c-a*s*m+n*l*m)*S,t[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*f-n*l*f)*S,t[4]=x*S,t[5]=(h*p*r-g*d*r+g*s*f-e*p*f-h*s*m+e*d*m)*S,t[6]=(g*l*r-o*p*r-g*s*c+e*p*c+o*s*m-e*l*m)*S,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*f+e*l*f)*S,t[8]=y*S,t[9]=(g*u*r-h*_*r-g*n*f+e*_*f+h*n*m-e*u*m)*S,t[10]=(o*_*r-g*a*r+g*n*c-e*_*c-o*n*m+e*a*m)*S,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*f-e*a*f)*S,t[12]=b*S,t[13]=(h*_*s-g*u*s+g*n*d-e*_*d-h*n*p+e*u*p)*S,t[14]=(g*a*s-o*_*s-g*n*l+e*_*l+o*n*p-e*a*p)*S,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*d+e*a*d)*S,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,_=o*h,p=o*u,m=a*u,v=l*c,x=l*h,y=l*u,b=n.x,A=n.y,S=n.z;return s[0]=(1-(_+m))*b,s[1]=(f+y)*b,s[2]=(g-x)*b,s[3]=0,s[4]=(f-y)*A,s[5]=(1-(d+m))*A,s[6]=(p+v)*A,s[7]=0,s[8]=(g+x)*S,s[9]=(p-v)*S,s[10]=(1-(d+_))*S,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=$i.set(s[0],s[1],s[2]).length();const o=$i.set(s[4],s[5],s[6]).length(),a=$i.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],dn.copy(this);const c=1/r,h=1/o,u=1/a;return dn.elements[0]*=c,dn.elements[1]*=c,dn.elements[2]*=c,dn.elements[4]*=h,dn.elements[5]*=h,dn.elements[6]*=h,dn.elements[8]*=u,dn.elements[9]*=u,dn.elements[10]*=u,e.setFromRotationMatrix(dn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Bn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let f,g;if(a===Bn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Eo)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Bn){const l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(o-r),d=(e+t)*c,f=(n+s)*h;let g,_;if(a===Bn)g=(o+r)*u,_=-2*u;else if(a===Eo)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const $i=new U,dn=new xe,vm=new U(0,0,0),bm=new U(1,1,1),$n=new U,Ar=new U,Je=new U,Uc=new xe,Fc=new Fi;class Bo{constructor(t=0,e=0,n=0,s=Bo.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ue(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ue(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ue(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ue(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ue(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ue(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Uc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Uc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Fc.setFromEuler(this),this.setFromQuaternion(Fc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Bo.DEFAULT_ORDER="XYZ";class gd{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Mm=0;const Nc=new U,Ki=new Fi,Pn=new xe,wr=new U,Rs=new U,ym=new U,Sm=new Fi,kc=new U(1,0,0),Bc=new U(0,1,0),zc=new U(0,0,1),Em={type:"added"},Tm={type:"removed"};class Ne extends Bi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Mm++}),this.uuid=Gn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ne.DEFAULT_UP.clone();const t=new U,e=new Bo,n=new Fi,s=new U(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new xe},normalMatrix:{value:new zt}}),this.matrix=new xe,this.matrixWorld=new xe,this.matrixAutoUpdate=Ne.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new gd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ki.setFromAxisAngle(t,e),this.quaternion.multiply(Ki),this}rotateOnWorldAxis(t,e){return Ki.setFromAxisAngle(t,e),this.quaternion.premultiply(Ki),this}rotateX(t){return this.rotateOnAxis(kc,t)}rotateY(t){return this.rotateOnAxis(Bc,t)}rotateZ(t){return this.rotateOnAxis(zc,t)}translateOnAxis(t,e){return Nc.copy(t).applyQuaternion(this.quaternion),this.position.add(Nc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(kc,t)}translateY(t){return this.translateOnAxis(Bc,t)}translateZ(t){return this.translateOnAxis(zc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?wr.copy(t):wr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(Rs,wr,this.up):Pn.lookAt(wr,Rs,this.up),this.quaternion.setFromRotationMatrix(Pn),s&&(Pn.extractRotation(s.matrixWorld),Ki.setFromRotationMatrix(Pn),this.quaternion.premultiply(Ki.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Em)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Tm)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Pn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Pn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e){let n=[];this[t]===e&&n.push(this);for(let s=0,r=this.children.length;s<r;s++){const o=this.children[s].getObjectsByProperty(t,e);o.length>0&&(n=n.concat(o))}return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,t,ym),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,Sm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++){const r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++){const a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ne.DEFAULT_UP=new U(0,1,0);Ne.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const fn=new U,Ln=new U,da=new U,Dn=new U,Zi=new U,Ji=new U,Hc=new U,fa=new U,pa=new U,ma=new U;let Rr=!1;class ln{constructor(t=new U,e=new U,n=new U){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),fn.subVectors(t,e),s.cross(fn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){fn.subVectors(s,e),Ln.subVectors(n,e),da.subVectors(t,e);const o=fn.dot(fn),a=fn.dot(Ln),l=fn.dot(da),c=Ln.dot(Ln),h=Ln.dot(da),u=o*c-a*a;if(u===0)return r.set(-2,-1,-1);const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Dn),Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getUV(t,e,n,s,r,o,a,l){return Rr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Rr=!0),this.getInterpolation(t,e,n,s,r,o,a,l)}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Dn),l.setScalar(0),l.addScaledVector(r,Dn.x),l.addScaledVector(o,Dn.y),l.addScaledVector(a,Dn.z),l}static isFrontFacing(t,e,n,s){return fn.subVectors(n,e),Ln.subVectors(t,e),fn.cross(Ln).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return fn.subVectors(this.c,this.b),Ln.subVectors(this.a,this.b),fn.cross(Ln).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ln.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ln.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,s,r){return Rr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Rr=!0),ln.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}getInterpolation(t,e,n,s,r){return ln.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return ln.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ln.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Zi.subVectors(s,n),Ji.subVectors(r,n),fa.subVectors(t,n);const l=Zi.dot(fa),c=Ji.dot(fa);if(l<=0&&c<=0)return e.copy(n);pa.subVectors(t,s);const h=Zi.dot(pa),u=Ji.dot(pa);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Zi,o);ma.subVectors(t,r);const f=Zi.dot(ma),g=Ji.dot(ma);if(g>=0&&f<=g)return e.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Ji,a);const p=h*g-f*u;if(p<=0&&u-h>=0&&f-g>=0)return Hc.subVectors(r,s),a=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(Hc,a);const m=1/(p+_+d);return o=_*m,a=d*m,e.copy(n).addScaledVector(Zi,o).addScaledVector(Ji,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const _d={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kn={h:0,s:0,l:0},Cr={h:0,s:0,l:0};function ga(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}let Ht=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=we){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=te.workingColorSpace){return this.r=t,this.g=e,this.b=n,te.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=te.workingColorSpace){if(t=Ml(t,1),e=Ue(e,0,1),n=Ue(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=ga(o,r,t+1/3),this.g=ga(o,r,t),this.b=ga(o,r,t-1/3)}return te.toWorkingColorSpace(this,s),this}setStyle(t,e=we){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=we){const n=_d[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ms(t.r),this.g=ms(t.g),this.b=ms(t.b),this}copyLinearToSRGB(t){return this.r=sa(t.r),this.g=sa(t.g),this.b=sa(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=we){return te.fromWorkingColorSpace(De.copy(this),t),Math.round(Ue(De.r*255,0,255))*65536+Math.round(Ue(De.g*255,0,255))*256+Math.round(Ue(De.b*255,0,255))}getHexString(t=we){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.fromWorkingColorSpace(De.copy(this),e);const n=De.r,s=De.g,r=De.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=te.workingColorSpace){return te.fromWorkingColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=we){te.fromWorkingColorSpace(De.copy(this),t);const e=De.r,n=De.g,s=De.b;return t!==we?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Kn),this.setHSL(Kn.h+t,Kn.s+e,Kn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Kn),t.getHSL(Cr);const n=Ys(Kn.h,Cr.h,e),s=Ys(Kn.s,Cr.s,e),r=Ys(Kn.l,Cr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const De=new Ht;Ht.NAMES=_d;let Am=0;class zi extends Bi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Am++}),this.uuid=Gn(),this.name="",this.type="Material",this.blending=ps,this.side=hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wa,this.blendDst=Xa,this.blendEquation=wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=bo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wi,this.stencilZFail=Wi,this.stencilZPass=Wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ps&&(n.blending=this.blending),this.side!==hi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Wa&&(n.blendSrc=this.blendSrc),this.blendDst!==Xa&&(n.blendDst=this.blendDst),this.blendEquation!==wi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==bo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Wi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Wi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Wi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class xd extends zi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=nd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _e=new U,Pr=new Pt;class he{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ka,this.updateRange={offset:0,count:-1},this.gpuType=Qn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Pr.fromBufferAttribute(this,e),Pr.applyMatrix3(t),this.setXY(e,Pr.x,Pr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=En(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Qt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=En(e,this.array)),e}setX(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=En(e,this.array)),e}setY(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=En(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=En(e,this.array)),e}setW(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array),s=Qt(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array),s=Qt(s,this.array),r=Qt(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ka&&(t.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(t.updateRange=this.updateRange),t}}class vd extends he{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class bd extends he{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Wn extends he{constructor(t,e,n){super(new Float32Array(t),e,n)}}let wm=0;const rn=new xe,_a=new Ne,Qi=new U,Qe=new dr,Cs=new dr,Te=new U;class $e extends Bi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wm++}),this.uuid=Gn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(dd(t)?bd:vd)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return rn.makeRotationFromQuaternion(t),this.applyMatrix4(rn),this}rotateX(t){return rn.makeRotationX(t),this.applyMatrix4(rn),this}rotateY(t){return rn.makeRotationY(t),this.applyMatrix4(rn),this}rotateZ(t){return rn.makeRotationZ(t),this.applyMatrix4(rn),this}translate(t,e,n){return rn.makeTranslation(t,e,n),this.applyMatrix4(rn),this}scale(t,e,n){return rn.makeScale(t,e,n),this.applyMatrix4(rn),this}lookAt(t){return _a.lookAt(t),_a.updateMatrix(),this.applyMatrix4(_a.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qi).negate(),this.translate(Qi.x,Qi.y,Qi.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Wn(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new dr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Qe.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Qe.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Qe.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Qe.min),this.boundingBox.expandByPoint(Qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(t){const n=this.boundingSphere.center;if(Qe.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Cs.setFromBufferAttribute(a),this.morphTargetsRelative?(Te.addVectors(Qe.min,Cs.min),Qe.expandByPoint(Te),Te.addVectors(Qe.max,Cs.max),Qe.expandByPoint(Te)):(Qe.expandByPoint(Cs.min),Qe.expandByPoint(Cs.max))}Qe.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Te.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Te));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Te.fromBufferAttribute(a,c),l&&(Qi.fromBufferAttribute(t,c),Te.add(Qi)),s=Math.max(s,n.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,s=e.position.array,r=e.normal.array,o=e.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new he(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let w=0;w<a;w++)c[w]=new U,h[w]=new U;const u=new U,d=new U,f=new U,g=new Pt,_=new Pt,p=new Pt,m=new U,v=new U;function x(w,N,z){u.fromArray(s,w*3),d.fromArray(s,N*3),f.fromArray(s,z*3),g.fromArray(o,w*2),_.fromArray(o,N*2),p.fromArray(o,z*2),d.sub(u),f.sub(u),_.sub(g),p.sub(g);const q=1/(_.x*p.y-p.x*_.y);isFinite(q)&&(m.copy(d).multiplyScalar(p.y).addScaledVector(f,-_.y).multiplyScalar(q),v.copy(f).multiplyScalar(_.x).addScaledVector(d,-p.x).multiplyScalar(q),c[w].add(m),c[N].add(m),c[z].add(m),h[w].add(v),h[N].add(v),h[z].add(v))}let y=this.groups;y.length===0&&(y=[{start:0,count:n.length}]);for(let w=0,N=y.length;w<N;++w){const z=y[w],q=z.start,L=z.count;for(let F=q,I=q+L;F<I;F+=3)x(n[F+0],n[F+1],n[F+2])}const b=new U,A=new U,S=new U,P=new U;function M(w){S.fromArray(r,w*3),P.copy(S);const N=c[w];b.copy(N),b.sub(S.multiplyScalar(S.dot(N))).normalize(),A.crossVectors(P,N);const q=A.dot(h[w])<0?-1:1;l[w*4]=b.x,l[w*4+1]=b.y,l[w*4+2]=b.z,l[w*4+3]=q}for(let w=0,N=y.length;w<N;++w){const z=y[w],q=z.start,L=z.count;for(let F=q,I=q+L;F<I;F+=3)M(n[F+0]),M(n[F+1]),M(n[F+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new he(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new U,r=new U,o=new U,a=new U,l=new U,c=new U,h=new U,u=new U;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),_=t.getX(d+1),p=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,p),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,p=l.length;_<p;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let m=0;m<h;m++)d[g++]=c[f++]}return new he(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new $e,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Vc=new xe,xi=new ko,Lr=new fr,Gc=new U,ts=new U,es=new U,ns=new U,xa=new U,Dr=new U,Ir=new Pt,Or=new Pt,Ur=new Pt,Wc=new U,Xc=new U,jc=new U,Fr=new U,Nr=new U;class ti extends Ne{constructor(t=new $e,e=new xd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Dr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(xa.fromBufferAttribute(u,t),o?Dr.addScaledVector(xa,h):Dr.addScaledVector(xa.sub(e),h))}e.add(Dr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Lr.copy(n.boundingSphere),Lr.applyMatrix4(r),xi.copy(t.ray).recast(t.near),!(Lr.containsPoint(xi.origin)===!1&&(xi.intersectSphere(Lr,Gc)===null||xi.origin.distanceToSquared(Gc)>(t.far-t.near)**2))&&(Vc.copy(r).invert(),xi.copy(t.ray).applyMatrix4(Vc),!(n.boundingBox!==null&&xi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,xi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=o[p.materialIndex],v=Math.max(p.start,f.start),x=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let y=v,b=x;y<b;y+=3){const A=a.getX(y),S=a.getX(y+1),P=a.getX(y+2);s=kr(this,m,t,n,c,h,u,A,S,P),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const v=a.getX(p),x=a.getX(p+1),y=a.getX(p+2);s=kr(this,o,t,n,c,h,u,v,x,y),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=o[p.materialIndex],v=Math.max(p.start,f.start),x=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let y=v,b=x;y<b;y+=3){const A=y,S=y+1,P=y+2;s=kr(this,m,t,n,c,h,u,A,S,P),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const v=p,x=p+1,y=p+2;s=kr(this,o,t,n,c,h,u,v,x,y),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function Rm(i,t,e,n,s,r,o,a){let l;if(t.side===Ye?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===hi,a),l===null)return null;Nr.copy(a),Nr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Nr);return c<e.near||c>e.far?null:{distance:c,point:Nr.clone(),object:i}}function kr(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,ts),i.getVertexPosition(l,es),i.getVertexPosition(c,ns);const h=Rm(i,t,e,n,ts,es,ns,Fr);if(h){s&&(Ir.fromBufferAttribute(s,a),Or.fromBufferAttribute(s,l),Ur.fromBufferAttribute(s,c),h.uv=ln.getInterpolation(Fr,ts,es,ns,Ir,Or,Ur,new Pt)),r&&(Ir.fromBufferAttribute(r,a),Or.fromBufferAttribute(r,l),Ur.fromBufferAttribute(r,c),h.uv1=ln.getInterpolation(Fr,ts,es,ns,Ir,Or,Ur,new Pt),h.uv2=h.uv1),o&&(Wc.fromBufferAttribute(o,a),Xc.fromBufferAttribute(o,l),jc.fromBufferAttribute(o,c),h.normal=ln.getInterpolation(Fr,ts,es,ns,Wc,Xc,jc,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new U,materialIndex:0};ln.getNormal(ts,es,ns,u.normal),h.face=u}return h}class pr extends $e{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Wn(c,3)),this.setAttribute("normal",new Wn(h,3)),this.setAttribute("uv",new Wn(u,2));function g(_,p,m,v,x,y,b,A,S,P,M){const w=y/S,N=b/P,z=y/2,q=b/2,L=A/2,F=S+1,I=P+1;let B=0,J=0;const $=new U;for(let Z=0;Z<I;Z++){const O=Z*N-q;for(let G=0;G<F;G++){const ct=G*w-z;$[_]=ct*v,$[p]=O*x,$[m]=L,c.push($.x,$.y,$.z),$[_]=0,$[p]=0,$[m]=A>0?1:-1,h.push($.x,$.y,$.z),u.push(G/S),u.push(1-Z/P),B+=1}}for(let Z=0;Z<P;Z++)for(let O=0;O<S;O++){const G=d+O+F*Z,ct=d+O+F*(Z+1),ht=d+(O+1)+F*(Z+1),dt=d+(O+1)+F*Z;l.push(G,ct,dt),l.push(ct,ht,dt),J+=6}a.addGroup(f,J,M),f+=J,d+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function bs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ge(i){const t={};for(let e=0;e<i.length;e++){const n=bs(i[e]);for(const s in n)t[s]=n[s]}return t}function Cm(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Md(i){return i.getRenderTarget()===null?i.outputColorSpace:te.workingColorSpace}const Pm={clone:bs,merge:Ge};var Lm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Dm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class An extends zi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Lm,this.fragmentShader=Dm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=bs(t.uniforms),this.uniformsGroups=Cm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class yd extends Ne{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xe,this.projectionMatrix=new xe,this.projectionMatrixInverse=new xe,this.coordinateSystem=Bn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class nn extends yd{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ir*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(js*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ir*2*Math.atan(Math.tan(js*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(js*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const is=-90,ss=1;class Im extends Ne{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new nn(is,ss,t,e);s.layers=this.layers,this.add(s);const r=new nn(is,ss,t,e);r.layers=this.layers,this.add(r);const o=new nn(is,ss,t,e);o.layers=this.layers,this.add(o);const a=new nn(is,ss,t,e);a.layers=this.layers,this.add(a);const l=new nn(is,ss,t,e);l.layers=this.layers,this.add(l);const c=new nn(is,ss,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===Bn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Eo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Sd extends qe{constructor(t,e,n,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:_s,super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Om extends Ui{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];e.encoding!==void 0&&(qs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Di?we:hn),this.texture=new Sd(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:an}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new pr(5,5,5),r=new An({name:"CubemapFromEquirect",uniforms:bs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ye,blending:oi});r.uniforms.tEquirect.value=e;const o=new ti(s,r),a=e.minFilter;return e.minFilter===er&&(e.minFilter=an),new Im(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const va=new U,Um=new U,Fm=new zt;class Zn{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=va.subVectors(n,e).cross(Um.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(va),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Fm.getNormalMatrix(t),s=this.coplanarPoint(va).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vi=new fr,Br=new U;class Ed{constructor(t=new Zn,e=new Zn,n=new Zn,s=new Zn,r=new Zn,o=new Zn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Bn){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],_=s[10],p=s[11],m=s[12],v=s[13],x=s[14],y=s[15];if(n[0].setComponents(l-r,d-c,p-f,y-m).normalize(),n[1].setComponents(l+r,d+c,p+f,y+m).normalize(),n[2].setComponents(l+o,d+h,p+g,y+v).normalize(),n[3].setComponents(l-o,d-h,p-g,y-v).normalize(),n[4].setComponents(l-a,d-u,p-_,y-x).normalize(),e===Bn)n[5].setComponents(l+a,d+u,p+_,y+x).normalize();else if(e===Eo)n[5].setComponents(a,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),vi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),vi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(vi)}intersectsSprite(t){return vi.center.set(0,0,0),vi.radius=.7071067811865476,vi.applyMatrix4(t.matrixWorld),this.intersectsSphere(vi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Br.x=s.normal.x>0?t.max.x:t.min.x,Br.y=s.normal.y>0?t.max.y:t.min.y,Br.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Br)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Td(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Nm(i,t){const e=t.isWebGL2,n=new WeakMap;function s(c,h){const u=c.array,d=c.usage,f=i.createBuffer();i.bindBuffer(h,f),i.bufferData(h,u,d),c.onUploadCallback();let g;if(u instanceof Float32Array)g=i.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)g=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)g=i.SHORT;else if(u instanceof Uint32Array)g=i.UNSIGNED_INT;else if(u instanceof Int32Array)g=i.INT;else if(u instanceof Int8Array)g=i.BYTE;else if(u instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:f,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version}}function r(c,h,u){const d=h.array,f=h.updateRange;i.bindBuffer(u,c),f.count===-1?i.bufferSubData(u,0,d):(e?i.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):i.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u===void 0?n.set(c,s(c,h)):u.version<c.version&&(r(u.buffer,c,h),u.version=c.version)}return{get:o,remove:a,update:l}}class yl extends $e{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,f=[],g=[],_=[],p=[];for(let m=0;m<h;m++){const v=m*d-o;for(let x=0;x<c;x++){const y=x*u-r;g.push(y,-v,0),_.push(0,0,1),p.push(x/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<a;v++){const x=v+c*m,y=v+c*(m+1),b=v+1+c*(m+1),A=v+1+c*m;f.push(x,y,A),f.push(y,b,A)}this.setIndex(f),this.setAttribute("position",new Wn(g,3)),this.setAttribute("normal",new Wn(_,3)),this.setAttribute("uv",new Wn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yl(t.width,t.height,t.widthSegments,t.heightSegments)}}var km=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,zm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vm=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Gm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Xm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ym=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,$m=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Km=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Zm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Jm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,tg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,eg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ng=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ig=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,sg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,rg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,og=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ag=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,lg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ug=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dg="gl_FragColor = linearToOutputTexel( gl_FragColor );",fg=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,pg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,mg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,gg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_g=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,vg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Mg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Eg=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Tg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ag=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Cg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Pg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Dg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ig=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Og=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	anisotropyV /= material.anisotropy;
	material.anisotropy = saturate( material.anisotropy );
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x - tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x + tbn[ 0 ] * anisotropyV.y;
#endif`,Ug=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Fg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ng=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,kg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bg=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zg=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Vg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Gg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,jg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$g=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Kg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Zg=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Jg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Qg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,t_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,e_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,n_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,i_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,s_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,r_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,o_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,a_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,l_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,c_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,h_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,u_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,d_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,f_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,p_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,m_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,g_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,__=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,x_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,v_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,b_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,M_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,y_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,S_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,E_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,T_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,A_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,w_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,R_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,C_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,P_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,L_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,D_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,I_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,O_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const U_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,F_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,k_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,B_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,z_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,H_=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,V_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,G_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,W_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,X_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,j_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Y_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,q_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$_=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,K_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,J_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Q_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,t0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,n0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,i0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,s0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,r0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,o0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,a0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,l0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,c0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,h0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,u0=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,d0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,f0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,p0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kt={alphahash_fragment:km,alphahash_pars_fragment:Bm,alphamap_fragment:zm,alphamap_pars_fragment:Hm,alphatest_fragment:Vm,alphatest_pars_fragment:Gm,aomap_fragment:Wm,aomap_pars_fragment:Xm,begin_vertex:jm,beginnormal_vertex:Ym,bsdfs:qm,iridescence_fragment:$m,bumpmap_pars_fragment:Km,clipping_planes_fragment:Zm,clipping_planes_pars_fragment:Jm,clipping_planes_pars_vertex:Qm,clipping_planes_vertex:tg,color_fragment:eg,color_pars_fragment:ng,color_pars_vertex:ig,color_vertex:sg,common:rg,cube_uv_reflection_fragment:og,defaultnormal_vertex:ag,displacementmap_pars_vertex:lg,displacementmap_vertex:cg,emissivemap_fragment:hg,emissivemap_pars_fragment:ug,colorspace_fragment:dg,colorspace_pars_fragment:fg,envmap_fragment:pg,envmap_common_pars_fragment:mg,envmap_pars_fragment:gg,envmap_pars_vertex:_g,envmap_physical_pars_fragment:Cg,envmap_vertex:xg,fog_vertex:vg,fog_pars_vertex:bg,fog_fragment:Mg,fog_pars_fragment:yg,gradientmap_pars_fragment:Sg,lightmap_fragment:Eg,lightmap_pars_fragment:Tg,lights_lambert_fragment:Ag,lights_lambert_pars_fragment:wg,lights_pars_begin:Rg,lights_toon_fragment:Pg,lights_toon_pars_fragment:Lg,lights_phong_fragment:Dg,lights_phong_pars_fragment:Ig,lights_physical_fragment:Og,lights_physical_pars_fragment:Ug,lights_fragment_begin:Fg,lights_fragment_maps:Ng,lights_fragment_end:kg,logdepthbuf_fragment:Bg,logdepthbuf_pars_fragment:zg,logdepthbuf_pars_vertex:Hg,logdepthbuf_vertex:Vg,map_fragment:Gg,map_pars_fragment:Wg,map_particle_fragment:Xg,map_particle_pars_fragment:jg,metalnessmap_fragment:Yg,metalnessmap_pars_fragment:qg,morphcolor_vertex:$g,morphnormal_vertex:Kg,morphtarget_pars_vertex:Zg,morphtarget_vertex:Jg,normal_fragment_begin:Qg,normal_fragment_maps:t_,normal_pars_fragment:e_,normal_pars_vertex:n_,normal_vertex:i_,normalmap_pars_fragment:s_,clearcoat_normal_fragment_begin:r_,clearcoat_normal_fragment_maps:o_,clearcoat_pars_fragment:a_,iridescence_pars_fragment:l_,opaque_fragment:c_,packing:h_,premultiplied_alpha_fragment:u_,project_vertex:d_,dithering_fragment:f_,dithering_pars_fragment:p_,roughnessmap_fragment:m_,roughnessmap_pars_fragment:g_,shadowmap_pars_fragment:__,shadowmap_pars_vertex:x_,shadowmap_vertex:v_,shadowmask_pars_fragment:b_,skinbase_vertex:M_,skinning_pars_vertex:y_,skinning_vertex:S_,skinnormal_vertex:E_,specularmap_fragment:T_,specularmap_pars_fragment:A_,tonemapping_fragment:w_,tonemapping_pars_fragment:R_,transmission_fragment:C_,transmission_pars_fragment:P_,uv_pars_fragment:L_,uv_pars_vertex:D_,uv_vertex:I_,worldpos_vertex:O_,background_vert:U_,background_frag:F_,backgroundCube_vert:N_,backgroundCube_frag:k_,cube_vert:B_,cube_frag:z_,depth_vert:H_,depth_frag:V_,distanceRGBA_vert:G_,distanceRGBA_frag:W_,equirect_vert:X_,equirect_frag:j_,linedashed_vert:Y_,linedashed_frag:q_,meshbasic_vert:$_,meshbasic_frag:K_,meshlambert_vert:Z_,meshlambert_frag:J_,meshmatcap_vert:Q_,meshmatcap_frag:t0,meshnormal_vert:e0,meshnormal_frag:n0,meshphong_vert:i0,meshphong_frag:s0,meshphysical_vert:r0,meshphysical_frag:o0,meshtoon_vert:a0,meshtoon_frag:l0,points_vert:c0,points_frag:h0,shadow_vert:u0,shadow_frag:d0,sprite_vert:f0,sprite_frag:p0},lt={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new Pt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new Pt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},Sn={basic:{uniforms:Ge([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:Ge([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:Ge([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:Ge([lt.common,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.roughnessmap,lt.metalnessmap,lt.fog,lt.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:Ge([lt.common,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.gradientmap,lt.fog,lt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:Ge([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:Ge([lt.points,lt.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:Ge([lt.common,lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:Ge([lt.common,lt.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:Ge([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:Ge([lt.sprite,lt.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:Ge([lt.common,lt.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:Ge([lt.lights,lt.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};Sn.physical={uniforms:Ge([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new Pt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new Pt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new Pt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};const zr={r:0,b:0,g:0};function m0(i,t,e,n,s,r,o){const a=new Ht(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(p,m){let v=!1,x=m.isScene===!0?m.background:null;x&&x.isTexture&&(x=(m.backgroundBlurriness>0?e:t).get(x)),x===null?_(a,l):x&&x.isColor&&(_(x,1),v=!0);const y=i.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,o):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Fo)?(h===void 0&&(h=new ti(new pr(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:bs(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(b,A,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.toneMapped=te.getTransfer(x.colorSpace)!==se,(u!==x||d!==x.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,f=i.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new ti(new yl(2,2),new An({name:"BackgroundMaterial",uniforms:bs(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=te.getTransfer(x.colorSpace)!==se,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,f=i.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function _(p,m){p.getRGB(zr,Md(i)),n.buffers.color.setClear(zr.r,zr.g,zr.b,m,o)}return{getClearColor:function(){return a},setClearColor:function(p,m=1){a.set(p),l=m,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,_(a,l)},render:g}}function g0(i,t,e,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},l=p(null);let c=l,h=!1;function u(L,F,I,B,J){let $=!1;if(o){const Z=_(B,I,F);c!==Z&&(c=Z,f(c.object)),$=m(L,B,I,J),$&&v(L,B,I,J)}else{const Z=F.wireframe===!0;(c.geometry!==B.id||c.program!==I.id||c.wireframe!==Z)&&(c.geometry=B.id,c.program=I.id,c.wireframe=Z,$=!0)}J!==null&&e.update(J,i.ELEMENT_ARRAY_BUFFER),($||h)&&(h=!1,P(L,F,I,B),J!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(J).buffer))}function d(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function f(L){return n.isWebGL2?i.bindVertexArray(L):r.bindVertexArrayOES(L)}function g(L){return n.isWebGL2?i.deleteVertexArray(L):r.deleteVertexArrayOES(L)}function _(L,F,I){const B=I.wireframe===!0;let J=a[L.id];J===void 0&&(J={},a[L.id]=J);let $=J[F.id];$===void 0&&($={},J[F.id]=$);let Z=$[B];return Z===void 0&&(Z=p(d()),$[B]=Z),Z}function p(L){const F=[],I=[],B=[];for(let J=0;J<s;J++)F[J]=0,I[J]=0,B[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:I,attributeDivisors:B,object:L,attributes:{},index:null}}function m(L,F,I,B){const J=c.attributes,$=F.attributes;let Z=0;const O=I.getAttributes();for(const G in O)if(O[G].location>=0){const ht=J[G];let dt=$[G];if(dt===void 0&&(G==="instanceMatrix"&&L.instanceMatrix&&(dt=L.instanceMatrix),G==="instanceColor"&&L.instanceColor&&(dt=L.instanceColor)),ht===void 0||ht.attribute!==dt||dt&&ht.data!==dt.data)return!0;Z++}return c.attributesNum!==Z||c.index!==B}function v(L,F,I,B){const J={},$=F.attributes;let Z=0;const O=I.getAttributes();for(const G in O)if(O[G].location>=0){let ht=$[G];ht===void 0&&(G==="instanceMatrix"&&L.instanceMatrix&&(ht=L.instanceMatrix),G==="instanceColor"&&L.instanceColor&&(ht=L.instanceColor));const dt={};dt.attribute=ht,ht&&ht.data&&(dt.data=ht.data),J[G]=dt,Z++}c.attributes=J,c.attributesNum=Z,c.index=B}function x(){const L=c.newAttributes;for(let F=0,I=L.length;F<I;F++)L[F]=0}function y(L){b(L,0)}function b(L,F){const I=c.newAttributes,B=c.enabledAttributes,J=c.attributeDivisors;I[L]=1,B[L]===0&&(i.enableVertexAttribArray(L),B[L]=1),J[L]!==F&&((n.isWebGL2?i:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,F),J[L]=F)}function A(){const L=c.newAttributes,F=c.enabledAttributes;for(let I=0,B=F.length;I<B;I++)F[I]!==L[I]&&(i.disableVertexAttribArray(I),F[I]=0)}function S(L,F,I,B,J,$,Z){Z===!0?i.vertexAttribIPointer(L,F,I,J,$):i.vertexAttribPointer(L,F,I,B,J,$)}function P(L,F,I,B){if(n.isWebGL2===!1&&(L.isInstancedMesh||B.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;x();const J=B.attributes,$=I.getAttributes(),Z=F.defaultAttributeValues;for(const O in $){const G=$[O];if(G.location>=0){let ct=J[O];if(ct===void 0&&(O==="instanceMatrix"&&L.instanceMatrix&&(ct=L.instanceMatrix),O==="instanceColor"&&L.instanceColor&&(ct=L.instanceColor)),ct!==void 0){const ht=ct.normalized,dt=ct.itemSize,xt=e.get(ct);if(xt===void 0)continue;const Vt=xt.buffer,At=xt.type,Dt=xt.bytesPerElement,ie=n.isWebGL2===!0&&(At===i.INT||At===i.UNSIGNED_INT||ct.gpuType===rd);if(ct.isInterleavedBufferAttribute){const Nt=ct.data,H=Nt.stride,Pe=ct.offset;if(Nt.isInstancedInterleavedBuffer){for(let Mt=0;Mt<G.locationSize;Mt++)b(G.location+Mt,Nt.meshPerAttribute);L.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Nt.meshPerAttribute*Nt.count)}else for(let Mt=0;Mt<G.locationSize;Mt++)y(G.location+Mt);i.bindBuffer(i.ARRAY_BUFFER,Vt);for(let Mt=0;Mt<G.locationSize;Mt++)S(G.location+Mt,dt/G.locationSize,At,ht,H*Dt,(Pe+dt/G.locationSize*Mt)*Dt,ie)}else{if(ct.isInstancedBufferAttribute){for(let Nt=0;Nt<G.locationSize;Nt++)b(G.location+Nt,ct.meshPerAttribute);L.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let Nt=0;Nt<G.locationSize;Nt++)y(G.location+Nt);i.bindBuffer(i.ARRAY_BUFFER,Vt);for(let Nt=0;Nt<G.locationSize;Nt++)S(G.location+Nt,dt/G.locationSize,At,ht,dt*Dt,dt/G.locationSize*Nt*Dt,ie)}}else if(Z!==void 0){const ht=Z[O];if(ht!==void 0)switch(ht.length){case 2:i.vertexAttrib2fv(G.location,ht);break;case 3:i.vertexAttrib3fv(G.location,ht);break;case 4:i.vertexAttrib4fv(G.location,ht);break;default:i.vertexAttrib1fv(G.location,ht)}}}}A()}function M(){z();for(const L in a){const F=a[L];for(const I in F){const B=F[I];for(const J in B)g(B[J].object),delete B[J];delete F[I]}delete a[L]}}function w(L){if(a[L.id]===void 0)return;const F=a[L.id];for(const I in F){const B=F[I];for(const J in B)g(B[J].object),delete B[J];delete F[I]}delete a[L.id]}function N(L){for(const F in a){const I=a[F];if(I[L.id]===void 0)continue;const B=I[L.id];for(const J in B)g(B[J].object),delete B[J];delete I[L.id]}}function z(){q(),h=!0,c!==l&&(c=l,f(c.object))}function q(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:z,resetDefaultState:q,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfProgram:N,initAttributes:x,enableAttribute:y,disableUnusedAttributes:A}}function _0(i,t,e,n){const s=n.isWebGL2;let r;function o(c){r=c}function a(c,h){i.drawArrays(r,c,h),e.update(h,r,1)}function l(c,h,u){if(u===0)return;let d,f;if(s)d=i,f="drawArraysInstanced";else if(d=t.get("ANGLE_instanced_arrays"),f="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[f](r,c,h,u),e.update(h,r,u)}this.setMode=o,this.render=a,this.renderInstances=l}function x0(i,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const S=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(S){if(S==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let a=e.precision!==void 0?e.precision:"highp";const l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),m=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,y=o||t.has("OES_texture_float"),b=x&&y,A=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:v,vertexTextures:x,floatFragmentTextures:y,floatVertexTextures:b,maxSamples:A}}function v0(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Zn,a=new zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,m=i.get(u);if(!s||g===null||g.length===0||r&&!p)r?h(null):c();else{const v=r?0:n,x=v*4;let y=m.clippingState||null;l.value=y,y=h(g,d,x,f);for(let b=0;b!==x;++b)y[b]=e[b];m.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=f+_*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,y=f;x!==_;++x,y+=4)o.copy(u[x]).applyMatrix4(v,a),o.normal.toArray(p,y),p[y+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function b0(i){let t=new WeakMap;function e(o,a){return a===ja?o.mapping=_s:a===Ya&&(o.mapping=xs),o}function n(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){const a=o.mapping;if(a===ja||a===Ya)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Om(l.height/2);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class M0 extends yd{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ds=4,Yc=[.125,.215,.35,.446,.526,.582],Ri=20,ba=new M0,qc=new Ht;let Ma=null,ya=0,Sa=0;const Ei=(1+Math.sqrt(5))/2,rs=1/Ei,$c=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,Ei,rs),new U(0,Ei,-rs),new U(rs,0,Ei),new U(-rs,0,Ei),new U(Ei,rs,0),new U(-Ei,rs,0)];class Kc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Ma=this._renderer.getRenderTarget(),ya=this._renderer.getActiveCubeFace(),Sa=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Jc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ma,ya,Sa),t.scissorTest=!1,Hr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===_s||t.mapping===xs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ma=this._renderer.getRenderTarget(),ya=this._renderer.getActiveCubeFace(),Sa=this._renderer.getActiveMipmapLevel();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:an,minFilter:an,generateMipmaps:!1,type:nr,format:mn,colorSpace:Xn,depthBuffer:!1},s=Zc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=y0(r)),this._blurMaterial=S0(r,t,e)}return s}_compileMaterial(t){const e=new ti(this._lodPlanes[0],t);this._renderer.compile(e,ba)}_sceneToCubeUV(t,e,n,s){const a=new nn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(qc),h.toneMapping=ai,h.autoClear=!1;const f=new xd({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1}),g=new ti(new pr,f);let _=!1;const p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,_=!0):(f.color.copy(qc),_=!0);for(let m=0;m<6;m++){const v=m%3;v===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):v===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const x=this._cubeSize;Hr(s,v*x,m>2?x:0,x,x),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===_s||t.mapping===xs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Jc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ti(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Hr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,ba)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=$c[(s-1)%$c.length];this._blur(t,s-1,s,r,o)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ti(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ri-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):Ri;p>Ri&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Ri}`);const m=[];let v=0;for(let S=0;S<Ri;++S){const P=S/_,M=Math.exp(-P*P/2);m.push(M),S===0?v+=M:S<p&&(v+=2*M)}for(let S=0;S<m.length;S++)m[S]=m[S]/v;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;const y=this._sizeLods[s],b=3*y*(s>x-ds?s-x+ds:0),A=4*(this._cubeSize-y);Hr(e,b,A,3*y,2*y),l.setRenderTarget(e),l.render(u,ba)}}function y0(i){const t=[],e=[],n=[];let s=i;const r=i-ds+1+Yc.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-ds?l=Yc[o-i+ds-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,p=2,m=1,v=new Float32Array(_*g*f),x=new Float32Array(p*g*f),y=new Float32Array(m*g*f);for(let A=0;A<f;A++){const S=A%3*2/3-1,P=A>2?0:-1,M=[S,P,0,S+2/3,P,0,S+2/3,P+1,0,S,P,0,S+2/3,P+1,0,S,P+1,0];v.set(M,_*g*A),x.set(d,p*g*A);const w=[A,A,A,A,A,A];y.set(w,m*g*A)}const b=new $e;b.setAttribute("position",new he(v,_)),b.setAttribute("uv",new he(x,p)),b.setAttribute("faceIndex",new he(y,m)),t.push(b),s>ds&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Zc(i,t,e){const n=new Ui(i,t,e);return n.texture.mapping=Fo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Hr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function S0(i,t,e){const n=new Float32Array(Ri),s=new U(0,1,0);return new An({name:"SphericalGaussianBlur",defines:{n:Ri,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Jc(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Qc(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Sl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function E0(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===ja||l===Ya,h=l===_s||l===xs;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=t.get(a);return e===null&&(e=new Kc(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),t.set(a,u),u.texture}else{if(t.has(a))return t.get(a).texture;{const u=a.image;if(c&&u&&u.height>0||h&&u&&s(u)){e===null&&(e=new Kc(i));const d=c?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function T0(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?e("EXT_color_buffer_float"):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function A0(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)t.remove(_[p])}d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let p=0,m=_.length;p<m;p++)t.update(_[p],i.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const v=f.array;_=f.version;for(let x=0,y=v.length;x<y;x+=3){const b=v[x+0],A=v[x+1],S=v[x+2];d.push(b,A,A,S,S,b)}}else if(g!==void 0){const v=g.array;_=g.version;for(let x=0,y=v.length/3-1;x<y;x+=3){const b=x+0,A=x+1,S=x+2;d.push(b,A,A,S,S,b)}}else return;const p=new(dd(d)?bd:vd)(d,1);p.version=_;const m=r.get(u);m&&t.remove(m),r.set(u,p)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function w0(i,t,e,n){const s=n.isWebGL2;let r;function o(d){r=d}let a,l;function c(d){a=d.type,l=d.bytesPerElement}function h(d,f){i.drawElements(r,f,a,d*l),e.update(f,r,1)}function u(d,f,g){if(g===0)return;let _,p;if(s)_=i,p="drawElementsInstanced";else if(_=t.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",_===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}_[p](r,f,a,d*l,g),e.update(f,r,g)}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u}function R0(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function C0(i,t){return i[0]-t[0]}function P0(i,t){return Math.abs(t[1])-Math.abs(i[1])}function L0(i,t,e){const n={},s=new Float32Array(8),r=new WeakMap,o=new Ce,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,u){const d=c.morphTargetInfluences;if(t.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let p=r.get(h);if(p===void 0||p.count!==_){let F=function(){q.dispose(),r.delete(h),h.removeEventListener("dispose",F)};var f=F;p!==void 0&&p.texture.dispose();const x=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,b=h.morphAttributes.color!==void 0,A=h.morphAttributes.position||[],S=h.morphAttributes.normal||[],P=h.morphAttributes.color||[];let M=0;x===!0&&(M=1),y===!0&&(M=2),b===!0&&(M=3);let w=h.attributes.position.count*M,N=1;w>t.maxTextureSize&&(N=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const z=new Float32Array(w*N*4*_),q=new md(z,w,N,_);q.type=Qn,q.needsUpdate=!0;const L=M*4;for(let I=0;I<_;I++){const B=A[I],J=S[I],$=P[I],Z=w*N*4*I;for(let O=0;O<B.count;O++){const G=O*L;x===!0&&(o.fromBufferAttribute(B,O),z[Z+G+0]=o.x,z[Z+G+1]=o.y,z[Z+G+2]=o.z,z[Z+G+3]=0),y===!0&&(o.fromBufferAttribute(J,O),z[Z+G+4]=o.x,z[Z+G+5]=o.y,z[Z+G+6]=o.z,z[Z+G+7]=0),b===!0&&(o.fromBufferAttribute($,O),z[Z+G+8]=o.x,z[Z+G+9]=o.y,z[Z+G+10]=o.z,z[Z+G+11]=$.itemSize===4?o.w:1)}}p={count:_,texture:q,size:new Pt(w,N)},r.set(h,p),h.addEventListener("dispose",F)}let m=0;for(let x=0;x<d.length;x++)m+=d[x];const v=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(i,"morphTargetBaseInfluence",v),u.getUniforms().setValue(i,"morphTargetInfluences",d),u.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),u.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}else{const g=d===void 0?0:d.length;let _=n[h.id];if(_===void 0||_.length!==g){_=[];for(let y=0;y<g;y++)_[y]=[y,0];n[h.id]=_}for(let y=0;y<g;y++){const b=_[y];b[0]=y,b[1]=d[y]}_.sort(P0);for(let y=0;y<8;y++)y<g&&_[y][1]?(a[y][0]=_[y][0],a[y][1]=_[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(C0);const p=h.morphAttributes.position,m=h.morphAttributes.normal;let v=0;for(let y=0;y<8;y++){const b=a[y],A=b[0],S=b[1];A!==Number.MAX_SAFE_INTEGER&&S?(p&&h.getAttribute("morphTarget"+y)!==p[A]&&h.setAttribute("morphTarget"+y,p[A]),m&&h.getAttribute("morphNormal"+y)!==m[A]&&h.setAttribute("morphNormal"+y,m[A]),s[y]=S,v+=S):(p&&h.hasAttribute("morphTarget"+y)===!0&&h.deleteAttribute("morphTarget"+y),m&&h.hasAttribute("morphNormal"+y)===!0&&h.deleteAttribute("morphNormal"+y),s[y]=0)}const x=h.morphTargetsRelative?1:1-v;u.getUniforms().setValue(i,"morphTargetBaseInfluence",x),u.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function D0(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const Ad=new qe,wd=new md,Rd=new _m,Cd=new Sd,th=[],eh=[],nh=new Float32Array(16),ih=new Float32Array(9),sh=new Float32Array(4);function Es(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=th[s];if(r===void 0&&(r=new Float32Array(s),th[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Me(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ye(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function zo(i,t){let e=eh[t];e===void 0&&(e=new Int32Array(t),eh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function I0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function O0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;i.uniform2fv(this.addr,t),ye(e,t)}}function U0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Me(e,t))return;i.uniform3fv(this.addr,t),ye(e,t)}}function F0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;i.uniform4fv(this.addr,t),ye(e,t)}}function N0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(Me(e,n))return;sh.set(n),i.uniformMatrix2fv(this.addr,!1,sh),ye(e,n)}}function k0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(Me(e,n))return;ih.set(n),i.uniformMatrix3fv(this.addr,!1,ih),ye(e,n)}}function B0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(Me(e,n))return;nh.set(n),i.uniformMatrix4fv(this.addr,!1,nh),ye(e,n)}}function z0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function H0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;i.uniform2iv(this.addr,t),ye(e,t)}}function V0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;i.uniform3iv(this.addr,t),ye(e,t)}}function G0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;i.uniform4iv(this.addr,t),ye(e,t)}}function W0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function X0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;i.uniform2uiv(this.addr,t),ye(e,t)}}function j0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;i.uniform3uiv(this.addr,t),ye(e,t)}}function Y0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;i.uniform4uiv(this.addr,t),ye(e,t)}}function q0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2D(t||Ad,s)}function $0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Rd,s)}function K0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Cd,s)}function Z0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||wd,s)}function J0(i){switch(i){case 5126:return I0;case 35664:return O0;case 35665:return U0;case 35666:return F0;case 35674:return N0;case 35675:return k0;case 35676:return B0;case 5124:case 35670:return z0;case 35667:case 35671:return H0;case 35668:case 35672:return V0;case 35669:case 35673:return G0;case 5125:return W0;case 36294:return X0;case 36295:return j0;case 36296:return Y0;case 35678:case 36198:case 36298:case 36306:case 35682:return q0;case 35679:case 36299:case 36307:return $0;case 35680:case 36300:case 36308:case 36293:return K0;case 36289:case 36303:case 36311:case 36292:return Z0}}function Q0(i,t){i.uniform1fv(this.addr,t)}function tx(i,t){const e=Es(t,this.size,2);i.uniform2fv(this.addr,e)}function ex(i,t){const e=Es(t,this.size,3);i.uniform3fv(this.addr,e)}function nx(i,t){const e=Es(t,this.size,4);i.uniform4fv(this.addr,e)}function ix(i,t){const e=Es(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function sx(i,t){const e=Es(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function rx(i,t){const e=Es(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function ox(i,t){i.uniform1iv(this.addr,t)}function ax(i,t){i.uniform2iv(this.addr,t)}function lx(i,t){i.uniform3iv(this.addr,t)}function cx(i,t){i.uniform4iv(this.addr,t)}function hx(i,t){i.uniform1uiv(this.addr,t)}function ux(i,t){i.uniform2uiv(this.addr,t)}function dx(i,t){i.uniform3uiv(this.addr,t)}function fx(i,t){i.uniform4uiv(this.addr,t)}function px(i,t,e){const n=this.cache,s=t.length,r=zo(e,s);Me(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Ad,r[o])}function mx(i,t,e){const n=this.cache,s=t.length,r=zo(e,s);Me(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Rd,r[o])}function gx(i,t,e){const n=this.cache,s=t.length,r=zo(e,s);Me(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Cd,r[o])}function _x(i,t,e){const n=this.cache,s=t.length,r=zo(e,s);Me(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||wd,r[o])}function xx(i){switch(i){case 5126:return Q0;case 35664:return tx;case 35665:return ex;case 35666:return nx;case 35674:return ix;case 35675:return sx;case 35676:return rx;case 5124:case 35670:return ox;case 35667:case 35671:return ax;case 35668:case 35672:return lx;case 35669:case 35673:return cx;case 5125:return hx;case 36294:return ux;case 36295:return dx;case 36296:return fx;case 35678:case 36198:case 36298:case 36306:case 35682:return px;case 35679:case 36299:case 36307:return mx;case 35680:case 36300:case 36308:case 36293:return gx;case 36289:case 36303:case 36311:case 36292:return _x}}class vx{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.setValue=J0(e.type)}}class bx{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.size=e.size,this.setValue=xx(e.type)}}class Mx{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Ea=/(\w+)(\])?(\[|\.)?/g;function rh(i,t){i.seq.push(t),i.map[t.id]=t}function yx(i,t,e){const n=i.name,s=n.length;for(Ea.lastIndex=0;;){const r=Ea.exec(n),o=Ea.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){rh(e,c===void 0?new vx(a,i,t):new bx(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Mx(a),rh(e,u)),e=u}}}class co{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);yx(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function oh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Sx=37297;let Ex=0;function Tx(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function Ax(i){const t=te.getPrimaries(te.workingColorSpace),e=te.getPrimaries(i);let n;switch(t===e?n="":t===So&&e===yo?n="LinearDisplayP3ToLinearSRGB":t===yo&&e===So&&(n="LinearSRGBToLinearDisplayP3"),i){case Xn:case No:return[n,"LinearTransferOETF"];case we:case bl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function ah(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Tx(i.getShaderSource(t),o)}else return s}function wx(i,t){const e=Ax(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Rx(i,t){let e;switch(t){case Tp:e="Linear";break;case Ap:e="Reinhard";break;case wp:e="OptimizedCineon";break;case id:e="ACESFilmic";break;case Rp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Cx(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ks).join(`
`)}function Px(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Lx(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ks(i){return i!==""}function lh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ch(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Dx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qa(i){return i.replace(Dx,Ox)}const Ix=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Ox(i,t){let e=kt[t];if(e===void 0){const n=Ix.get(t);if(n!==void 0)e=kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Qa(e)}const Ux=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hh(i){return i.replace(Ux,Fx)}function Fx(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function uh(i){let t="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Nx(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ed?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Qf?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===On&&(t="SHADOWMAP_TYPE_VSM"),t}function kx(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case _s:case xs:t="ENVMAP_TYPE_CUBE";break;case Fo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Bx(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case xs:t="ENVMAP_MODE_REFRACTION";break}return t}function zx(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case nd:t="ENVMAP_BLENDING_MULTIPLY";break;case Sp:t="ENVMAP_BLENDING_MIX";break;case Ep:t="ENVMAP_BLENDING_ADD";break}return t}function Hx(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Vx(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Nx(e),c=kx(e),h=Bx(e),u=zx(e),d=Hx(e),f=e.isWebGL2?"":Cx(e),g=Px(r),_=s.createProgram();let p,m,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ks).join(`
`),p.length>0&&(p+=`
`),m=[f,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ks).join(`
`),m.length>0&&(m+=`
`)):(p=[uh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ks).join(`
`),m=[f,uh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ai?"#define TONE_MAPPING":"",e.toneMapping!==ai?kt.tonemapping_pars_fragment:"",e.toneMapping!==ai?Rx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,wx("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ks).join(`
`)),o=Qa(o),o=lh(o,e),o=ch(o,e),a=Qa(a),a=lh(a,e),a=ch(a,e),o=hh(o),a=hh(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===Cc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Cc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=v+p+o,y=v+m+a,b=oh(s,s.VERTEX_SHADER,x),A=oh(s,s.FRAGMENT_SHADER,y);s.attachShader(_,b),s.attachShader(_,A),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function S(N){if(i.debug.checkShaderErrors){const z=s.getProgramInfoLog(_).trim(),q=s.getShaderInfoLog(b).trim(),L=s.getShaderInfoLog(A).trim();let F=!0,I=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(F=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,b,A);else{const B=ah(s,b,"vertex"),J=ah(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Program Info Log: `+z+`
`+B+`
`+J)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(q===""||L==="")&&(I=!1);I&&(N.diagnostics={runnable:F,programLog:z,vertexShader:{log:q,prefix:p},fragmentShader:{log:L,prefix:m}})}s.deleteShader(b),s.deleteShader(A),P=new co(s,_),M=Lx(s,_)}let P;this.getUniforms=function(){return P===void 0&&S(this),P};let M;this.getAttributes=function(){return M===void 0&&S(this),M};let w=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=s.getProgramParameter(_,Sx)),w},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ex++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=b,this.fragmentShader=A,this}let Gx=0;class Wx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Xx(t),e.set(t,n)),n}}class Xx{constructor(t){this.id=Gx++,this.code=t,this.usedTimes=0}}function jx(i,t,e,n,s,r,o){const a=new gd,l=new Wx,c=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return M===0?"uv":`uv${M}`}function p(M,w,N,z,q){const L=z.fog,F=q.geometry,I=M.isMeshStandardMaterial?z.environment:null,B=(M.isMeshStandardMaterial?e:t).get(M.envMap||I),J=B&&B.mapping===Fo?B.image.height:null,$=g[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const Z=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,O=Z!==void 0?Z.length:0;let G=0;F.morphAttributes.position!==void 0&&(G=1),F.morphAttributes.normal!==void 0&&(G=2),F.morphAttributes.color!==void 0&&(G=3);let ct,ht,dt,xt;if($){const me=Sn[$];ct=me.vertexShader,ht=me.fragmentShader}else ct=M.vertexShader,ht=M.fragmentShader,l.update(M),dt=l.getVertexShaderID(M),xt=l.getFragmentShaderID(M);const Vt=i.getRenderTarget(),At=q.isInstancedMesh===!0,Dt=!!M.map,ie=!!M.matcap,Nt=!!B,H=!!M.aoMap,Pe=!!M.lightMap,Mt=!!M.bumpMap,wt=!!M.normalMap,Rt=!!M.displacementMap,ae=!!M.emissiveMap,Ut=!!M.metalnessMap,It=!!M.roughnessMap,Kt=M.anisotropy>0,pe=M.clearcoat>0,Se=M.iridescence>0,R=M.sheen>0,E=M.transmission>0,V=Kt&&!!M.anisotropyMap,nt=pe&&!!M.clearcoatMap,tt=pe&&!!M.clearcoatNormalMap,it=pe&&!!M.clearcoatRoughnessMap,gt=Se&&!!M.iridescenceMap,ot=Se&&!!M.iridescenceThicknessMap,ut=R&&!!M.sheenColorMap,C=R&&!!M.sheenRoughnessMap,rt=!!M.specularMap,Q=!!M.specularColorMap,St=!!M.specularIntensityMap,_t=E&&!!M.transmissionMap,yt=E&&!!M.thicknessMap,mt=!!M.gradientMap,pt=!!M.alphaMap,Wt=M.alphaTest>0,D=!!M.alphaHash,at=!!M.extensions,et=!!F.attributes.uv1,Y=!!F.attributes.uv2,st=!!F.attributes.uv3;let bt=ai;return M.toneMapped&&(Vt===null||Vt.isXRRenderTarget===!0)&&(bt=i.toneMapping),{isWebGL2:h,shaderID:$,shaderType:M.type,shaderName:M.name,vertexShader:ct,fragmentShader:ht,defines:M.defines,customVertexShaderID:dt,customFragmentShaderID:xt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,instancing:At,instancingColor:At&&q.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Vt===null?i.outputColorSpace:Vt.isXRRenderTarget===!0?Vt.texture.colorSpace:Xn,map:Dt,matcap:ie,envMap:Nt,envMapMode:Nt&&B.mapping,envMapCubeUVHeight:J,aoMap:H,lightMap:Pe,bumpMap:Mt,normalMap:wt,displacementMap:d&&Rt,emissiveMap:ae,normalMapObjectSpace:wt&&M.normalMapType===Vp,normalMapTangentSpace:wt&&M.normalMapType===Hp,metalnessMap:Ut,roughnessMap:It,anisotropy:Kt,anisotropyMap:V,clearcoat:pe,clearcoatMap:nt,clearcoatNormalMap:tt,clearcoatRoughnessMap:it,iridescence:Se,iridescenceMap:gt,iridescenceThicknessMap:ot,sheen:R,sheenColorMap:ut,sheenRoughnessMap:C,specularMap:rt,specularColorMap:Q,specularIntensityMap:St,transmission:E,transmissionMap:_t,thicknessMap:yt,gradientMap:mt,opaque:M.transparent===!1&&M.blending===ps,alphaMap:pt,alphaTest:Wt,alphaHash:D,combine:M.combine,mapUv:Dt&&_(M.map.channel),aoMapUv:H&&_(M.aoMap.channel),lightMapUv:Pe&&_(M.lightMap.channel),bumpMapUv:Mt&&_(M.bumpMap.channel),normalMapUv:wt&&_(M.normalMap.channel),displacementMapUv:Rt&&_(M.displacementMap.channel),emissiveMapUv:ae&&_(M.emissiveMap.channel),metalnessMapUv:Ut&&_(M.metalnessMap.channel),roughnessMapUv:It&&_(M.roughnessMap.channel),anisotropyMapUv:V&&_(M.anisotropyMap.channel),clearcoatMapUv:nt&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:tt&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:gt&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:ot&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:C&&_(M.sheenRoughnessMap.channel),specularMapUv:rt&&_(M.specularMap.channel),specularColorMapUv:Q&&_(M.specularColorMap.channel),specularIntensityMapUv:St&&_(M.specularIntensityMap.channel),transmissionMapUv:_t&&_(M.transmissionMap.channel),thicknessMapUv:yt&&_(M.thicknessMap.channel),alphaMapUv:pt&&_(M.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(wt||Kt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,vertexUv1s:et,vertexUv2s:Y,vertexUv3s:st,pointsUvs:q.isPoints===!0&&!!F.attributes.uv&&(Dt||pt),fog:!!L,useFog:M.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:q.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:O,morphTextureStride:G,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:bt,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Dt&&M.map.isVideoTexture===!0&&te.getTransfer(M.map.colorSpace)===se,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===kn,flipSided:M.side===Ye,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:at&&M.extensions.derivatives===!0,extensionFragDepth:at&&M.extensions.fragDepth===!0,extensionDrawBuffers:at&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:at&&M.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function m(M){const w=[];if(M.shaderID?w.push(M.shaderID):(w.push(M.customVertexShaderID),w.push(M.customFragmentShaderID)),M.defines!==void 0)for(const N in M.defines)w.push(N),w.push(M.defines[N]);return M.isRawShaderMaterial===!1&&(v(w,M),x(w,M),w.push(i.outputColorSpace)),w.push(M.customProgramCacheKey),w.join()}function v(M,w){M.push(w.precision),M.push(w.outputColorSpace),M.push(w.envMapMode),M.push(w.envMapCubeUVHeight),M.push(w.mapUv),M.push(w.alphaMapUv),M.push(w.lightMapUv),M.push(w.aoMapUv),M.push(w.bumpMapUv),M.push(w.normalMapUv),M.push(w.displacementMapUv),M.push(w.emissiveMapUv),M.push(w.metalnessMapUv),M.push(w.roughnessMapUv),M.push(w.anisotropyMapUv),M.push(w.clearcoatMapUv),M.push(w.clearcoatNormalMapUv),M.push(w.clearcoatRoughnessMapUv),M.push(w.iridescenceMapUv),M.push(w.iridescenceThicknessMapUv),M.push(w.sheenColorMapUv),M.push(w.sheenRoughnessMapUv),M.push(w.specularMapUv),M.push(w.specularColorMapUv),M.push(w.specularIntensityMapUv),M.push(w.transmissionMapUv),M.push(w.thicknessMapUv),M.push(w.combine),M.push(w.fogExp2),M.push(w.sizeAttenuation),M.push(w.morphTargetsCount),M.push(w.morphAttributeCount),M.push(w.numDirLights),M.push(w.numPointLights),M.push(w.numSpotLights),M.push(w.numSpotLightMaps),M.push(w.numHemiLights),M.push(w.numRectAreaLights),M.push(w.numDirLightShadows),M.push(w.numPointLightShadows),M.push(w.numSpotLightShadows),M.push(w.numSpotLightShadowsWithMaps),M.push(w.numLightProbes),M.push(w.shadowMapType),M.push(w.toneMapping),M.push(w.numClippingPlanes),M.push(w.numClipIntersection),M.push(w.depthPacking)}function x(M,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),M.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.skinning&&a.enable(4),w.morphTargets&&a.enable(5),w.morphNormals&&a.enable(6),w.morphColors&&a.enable(7),w.premultipliedAlpha&&a.enable(8),w.shadowMapEnabled&&a.enable(9),w.useLegacyLights&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function y(M){const w=g[M.type];let N;if(w){const z=Sn[w];N=Pm.clone(z.uniforms)}else N=M.uniforms;return N}function b(M,w){let N;for(let z=0,q=c.length;z<q;z++){const L=c[z];if(L.cacheKey===w){N=L,++N.usedTimes;break}}return N===void 0&&(N=new Vx(i,w,M,r),c.push(N)),N}function A(M){if(--M.usedTimes===0){const w=c.indexOf(M);c[w]=c[c.length-1],c.pop(),M.destroy()}}function S(M){l.remove(M)}function P(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:y,acquireProgram:b,releaseProgram:A,releaseShaderCache:S,programs:c,dispose:P}}function Yx(){let i=new WeakMap;function t(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function e(r){i.delete(r)}function n(r,o,a){i.get(r)[o]=a}function s(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function qx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function dh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function fh(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,g,_,p){let m=i[t];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},i[t]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=_,m.group=p),t++,m}function a(u,d,f,g,_,p){const m=o(u,d,f,g,_,p);f.transmission>0?n.push(m):f.transparent===!0?s.push(m):e.push(m)}function l(u,d,f,g,_,p){const m=o(u,d,f,g,_,p);f.transmission>0?n.unshift(m):f.transparent===!0?s.unshift(m):e.unshift(m)}function c(u,d){e.length>1&&e.sort(u||qx),n.length>1&&n.sort(d||dh),s.length>1&&s.sort(d||dh)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function $x(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new fh,i.set(n,[o])):s>=r.length?(o=new fh,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Kx(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new Ht};break;case"SpotLight":e={position:new U,direction:new U,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":e={color:new Ht,position:new U,halfWidth:new U,halfHeight:new U};break}return i[t.id]=e,e}}}function Zx(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Jx=0;function Qx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function tv(i,t){const e=new Kx,n=Zx(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new U);const r=new U,o=new xe,a=new xe;function l(h,u){let d=0,f=0,g=0;for(let z=0;z<9;z++)s.probe[z].set(0,0,0);let _=0,p=0,m=0,v=0,x=0,y=0,b=0,A=0,S=0,P=0,M=0;h.sort(Qx);const w=u===!0?Math.PI:1;for(let z=0,q=h.length;z<q;z++){const L=h[z],F=L.color,I=L.intensity,B=L.distance,J=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)d+=F.r*I*w,f+=F.g*I*w,g+=F.b*I*w;else if(L.isLightProbe){for(let $=0;$<9;$++)s.probe[$].addScaledVector(L.sh.coefficients[$],I);M++}else if(L.isDirectionalLight){const $=e.get(L);if($.color.copy(L.color).multiplyScalar(L.intensity*w),L.castShadow){const Z=L.shadow,O=n.get(L);O.shadowBias=Z.bias,O.shadowNormalBias=Z.normalBias,O.shadowRadius=Z.radius,O.shadowMapSize=Z.mapSize,s.directionalShadow[_]=O,s.directionalShadowMap[_]=J,s.directionalShadowMatrix[_]=L.shadow.matrix,y++}s.directional[_]=$,_++}else if(L.isSpotLight){const $=e.get(L);$.position.setFromMatrixPosition(L.matrixWorld),$.color.copy(F).multiplyScalar(I*w),$.distance=B,$.coneCos=Math.cos(L.angle),$.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),$.decay=L.decay,s.spot[m]=$;const Z=L.shadow;if(L.map&&(s.spotLightMap[S]=L.map,S++,Z.updateMatrices(L),L.castShadow&&P++),s.spotLightMatrix[m]=Z.matrix,L.castShadow){const O=n.get(L);O.shadowBias=Z.bias,O.shadowNormalBias=Z.normalBias,O.shadowRadius=Z.radius,O.shadowMapSize=Z.mapSize,s.spotShadow[m]=O,s.spotShadowMap[m]=J,A++}m++}else if(L.isRectAreaLight){const $=e.get(L);$.color.copy(F).multiplyScalar(I),$.halfWidth.set(L.width*.5,0,0),$.halfHeight.set(0,L.height*.5,0),s.rectArea[v]=$,v++}else if(L.isPointLight){const $=e.get(L);if($.color.copy(L.color).multiplyScalar(L.intensity*w),$.distance=L.distance,$.decay=L.decay,L.castShadow){const Z=L.shadow,O=n.get(L);O.shadowBias=Z.bias,O.shadowNormalBias=Z.normalBias,O.shadowRadius=Z.radius,O.shadowMapSize=Z.mapSize,O.shadowCameraNear=Z.camera.near,O.shadowCameraFar=Z.camera.far,s.pointShadow[p]=O,s.pointShadowMap[p]=J,s.pointShadowMatrix[p]=L.shadow.matrix,b++}s.point[p]=$,p++}else if(L.isHemisphereLight){const $=e.get(L);$.skyColor.copy(L.color).multiplyScalar(I*w),$.groundColor.copy(L.groundColor).multiplyScalar(I*w),s.hemi[x]=$,x++}}v>0&&(t.isWebGL2||i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=lt.LTC_FLOAT_1,s.rectAreaLTC2=lt.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=lt.LTC_HALF_1,s.rectAreaLTC2=lt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=d,s.ambient[1]=f,s.ambient[2]=g;const N=s.hash;(N.directionalLength!==_||N.pointLength!==p||N.spotLength!==m||N.rectAreaLength!==v||N.hemiLength!==x||N.numDirectionalShadows!==y||N.numPointShadows!==b||N.numSpotShadows!==A||N.numSpotMaps!==S||N.numLightProbes!==M)&&(s.directional.length=_,s.spot.length=m,s.rectArea.length=v,s.point.length=p,s.hemi.length=x,s.directionalShadow.length=y,s.directionalShadowMap.length=y,s.pointShadow.length=b,s.pointShadowMap.length=b,s.spotShadow.length=A,s.spotShadowMap.length=A,s.directionalShadowMatrix.length=y,s.pointShadowMatrix.length=b,s.spotLightMatrix.length=A+S-P,s.spotLightMap.length=S,s.numSpotLightShadowsWithMaps=P,s.numLightProbes=M,N.directionalLength=_,N.pointLength=p,N.spotLength=m,N.rectAreaLength=v,N.hemiLength=x,N.numDirectionalShadows=y,N.numPointShadows=b,N.numSpotShadows=A,N.numSpotMaps=S,N.numLightProbes=M,s.version=Jx++)}function c(h,u){let d=0,f=0,g=0,_=0,p=0;const m=u.matrixWorldInverse;for(let v=0,x=h.length;v<x;v++){const y=h[v];if(y.isDirectionalLight){const b=s.directional[d];b.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(m),d++}else if(y.isSpotLight){const b=s.spot[g];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(m),g++}else if(y.isRectAreaLight){const b=s.rectArea[_];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(m),a.identity(),o.copy(y.matrixWorld),o.premultiply(m),a.extractRotation(o),b.halfWidth.set(y.width*.5,0,0),b.halfHeight.set(0,y.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),_++}else if(y.isPointLight){const b=s.point[f];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){const b=s.hemi[p];b.direction.setFromMatrixPosition(y.matrixWorld),b.direction.transformDirection(m),p++}}}return{setup:l,setupView:c,state:s}}function ph(i,t){const e=new tv(i,t),n=[],s=[];function r(){n.length=0,s.length=0}function o(u){n.push(u)}function a(u){s.push(u)}function l(u){e.setup(n,u)}function c(u){e.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:e},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function ev(i,t){let e=new WeakMap;function n(r,o=0){const a=e.get(r);let l;return a===void 0?(l=new ph(i,t),e.set(r,[l])):o>=a.length?(l=new ph(i,t),a.push(l)):l=a[o],l}function s(){e=new WeakMap}return{get:n,dispose:s}}class nv extends zi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class iv extends zi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const sv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function ov(i,t,e){let n=new Ed;const s=new Pt,r=new Pt,o=new Ce,a=new nv({depthPacking:zp}),l=new iv,c={},h=e.maxTextureSize,u={[hi]:Ye,[Ye]:hi,[kn]:kn},d=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pt},radius:{value:4}},vertexShader:sv,fragmentShader:rv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new $e;g.setAttribute("position",new he(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ti(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ed;let m=this.type;this.render=function(b,A,S){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;const P=i.getRenderTarget(),M=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),N=i.state;N.setBlending(oi),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const z=m!==On&&this.type===On,q=m===On&&this.type!==On;for(let L=0,F=b.length;L<F;L++){const I=b[L],B=I.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",I,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);const J=B.getFrameExtents();if(s.multiply(J),r.copy(B.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/J.x),s.x=r.x*J.x,B.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/J.y),s.y=r.y*J.y,B.mapSize.y=r.y)),B.map===null||z===!0||q===!0){const Z=this.type!==On?{minFilter:We,magFilter:We}:{};B.map!==null&&B.map.dispose(),B.map=new Ui(s.x,s.y,Z),B.map.texture.name=I.name+".shadowMap",B.camera.updateProjectionMatrix()}i.setRenderTarget(B.map),i.clear();const $=B.getViewportCount();for(let Z=0;Z<$;Z++){const O=B.getViewport(Z);o.set(r.x*O.x,r.y*O.y,r.x*O.z,r.y*O.w),N.viewport(o),B.updateMatrices(I,Z),n=B.getFrustum(),y(A,S,B.camera,I,this.type)}B.isPointLightShadow!==!0&&this.type===On&&v(B,S),B.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(P,M,w)};function v(b,A){const S=t.update(_);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Ui(s.x,s.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(A,null,S,d,_,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(A,null,S,f,_,null)}function x(b,A,S,P){let M=null;const w=S.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(w!==void 0)M=w;else if(M=S.isPointLight===!0?l:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const N=M.uuid,z=A.uuid;let q=c[N];q===void 0&&(q={},c[N]=q);let L=q[z];L===void 0&&(L=M.clone(),q[z]=L),M=L}if(M.visible=A.visible,M.wireframe=A.wireframe,P===On?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,S.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const N=i.properties.get(M);N.light=S}return M}function y(b,A,S,P,M){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&M===On)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,b.matrixWorld);const z=t.update(b),q=b.material;if(Array.isArray(q)){const L=z.groups;for(let F=0,I=L.length;F<I;F++){const B=L[F],J=q[B.materialIndex];if(J&&J.visible){const $=x(b,J,P,M);i.renderBufferDirect(S,null,z,$,b,B)}}}else if(q.visible){const L=x(b,q,P,M);i.renderBufferDirect(S,null,z,L,b,null)}}const N=b.children;for(let z=0,q=N.length;z<q;z++)y(N[z],A,S,P,M)}}function av(i,t,e){const n=e.isWebGL2;function s(){let D=!1;const at=new Ce;let et=null;const Y=new Ce(0,0,0,0);return{setMask:function(st){et!==st&&!D&&(i.colorMask(st,st,st,st),et=st)},setLocked:function(st){D=st},setClear:function(st,bt,Xt,me,sn){sn===!0&&(st*=me,bt*=me,Xt*=me),at.set(st,bt,Xt,me),Y.equals(at)===!1&&(i.clearColor(st,bt,Xt,me),Y.copy(at))},reset:function(){D=!1,et=null,Y.set(-1,0,0,0)}}}function r(){let D=!1,at=null,et=null,Y=null;return{setTest:function(st){st?Dt(i.DEPTH_TEST):ie(i.DEPTH_TEST)},setMask:function(st){at!==st&&!D&&(i.depthMask(st),at=st)},setFunc:function(st){if(et!==st){switch(st){case gp:i.depthFunc(i.NEVER);break;case _p:i.depthFunc(i.ALWAYS);break;case xp:i.depthFunc(i.LESS);break;case bo:i.depthFunc(i.LEQUAL);break;case vp:i.depthFunc(i.EQUAL);break;case bp:i.depthFunc(i.GEQUAL);break;case Mp:i.depthFunc(i.GREATER);break;case yp:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}et=st}},setLocked:function(st){D=st},setClear:function(st){Y!==st&&(i.clearDepth(st),Y=st)},reset:function(){D=!1,at=null,et=null,Y=null}}}function o(){let D=!1,at=null,et=null,Y=null,st=null,bt=null,Xt=null,me=null,sn=null;return{setTest:function(ee){D||(ee?Dt(i.STENCIL_TEST):ie(i.STENCIL_TEST))},setMask:function(ee){at!==ee&&!D&&(i.stencilMask(ee),at=ee)},setFunc:function(ee,Be,vn){(et!==ee||Y!==Be||st!==vn)&&(i.stencilFunc(ee,Be,vn),et=ee,Y=Be,st=vn)},setOp:function(ee,Be,vn){(bt!==ee||Xt!==Be||me!==vn)&&(i.stencilOp(ee,Be,vn),bt=ee,Xt=Be,me=vn)},setLocked:function(ee){D=ee},setClear:function(ee){sn!==ee&&(i.clearStencil(ee),sn=ee)},reset:function(){D=!1,at=null,et=null,Y=null,st=null,bt=null,Xt=null,me=null,sn=null}}}const a=new s,l=new r,c=new o,h=new WeakMap,u=new WeakMap;let d={},f={},g=new WeakMap,_=[],p=null,m=!1,v=null,x=null,y=null,b=null,A=null,S=null,P=null,M=new Ht(0,0,0),w=0,N=!1,z=null,q=null,L=null,F=null,I=null;const B=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let J=!1,$=0;const Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(Z)[1]),J=$>=1):Z.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),J=$>=2);let O=null,G={};const ct=i.getParameter(i.SCISSOR_BOX),ht=i.getParameter(i.VIEWPORT),dt=new Ce().fromArray(ct),xt=new Ce().fromArray(ht);function Vt(D,at,et,Y){const st=new Uint8Array(4),bt=i.createTexture();i.bindTexture(D,bt),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Xt=0;Xt<et;Xt++)n&&(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)?i.texImage3D(at,0,i.RGBA,1,1,Y,0,i.RGBA,i.UNSIGNED_BYTE,st):i.texImage2D(at+Xt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,st);return bt}const At={};At[i.TEXTURE_2D]=Vt(i.TEXTURE_2D,i.TEXTURE_2D,1),At[i.TEXTURE_CUBE_MAP]=Vt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(At[i.TEXTURE_2D_ARRAY]=Vt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),At[i.TEXTURE_3D]=Vt(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Dt(i.DEPTH_TEST),l.setFunc(bo),Ut(!1),It(Kl),Dt(i.CULL_FACE),Rt(oi);function Dt(D){d[D]!==!0&&(i.enable(D),d[D]=!0)}function ie(D){d[D]!==!1&&(i.disable(D),d[D]=!1)}function Nt(D,at){return f[D]!==at?(i.bindFramebuffer(D,at),f[D]=at,n&&(D===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=at),D===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=at)),!0):!1}function H(D,at){let et=_,Y=!1;if(D)if(et=g.get(at),et===void 0&&(et=[],g.set(at,et)),D.isWebGLMultipleRenderTargets){const st=D.texture;if(et.length!==st.length||et[0]!==i.COLOR_ATTACHMENT0){for(let bt=0,Xt=st.length;bt<Xt;bt++)et[bt]=i.COLOR_ATTACHMENT0+bt;et.length=st.length,Y=!0}}else et[0]!==i.COLOR_ATTACHMENT0&&(et[0]=i.COLOR_ATTACHMENT0,Y=!0);else et[0]!==i.BACK&&(et[0]=i.BACK,Y=!0);Y&&(e.isWebGL2?i.drawBuffers(et):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(et))}function Pe(D){return p!==D?(i.useProgram(D),p=D,!0):!1}const Mt={[wi]:i.FUNC_ADD,[ep]:i.FUNC_SUBTRACT,[np]:i.FUNC_REVERSE_SUBTRACT};if(n)Mt[Ql]=i.MIN,Mt[tc]=i.MAX;else{const D=t.get("EXT_blend_minmax");D!==null&&(Mt[Ql]=D.MIN_EXT,Mt[tc]=D.MAX_EXT)}const wt={[ip]:i.ZERO,[sp]:i.ONE,[rp]:i.SRC_COLOR,[Wa]:i.SRC_ALPHA,[up]:i.SRC_ALPHA_SATURATE,[cp]:i.DST_COLOR,[ap]:i.DST_ALPHA,[op]:i.ONE_MINUS_SRC_COLOR,[Xa]:i.ONE_MINUS_SRC_ALPHA,[hp]:i.ONE_MINUS_DST_COLOR,[lp]:i.ONE_MINUS_DST_ALPHA,[dp]:i.CONSTANT_COLOR,[fp]:i.ONE_MINUS_CONSTANT_COLOR,[pp]:i.CONSTANT_ALPHA,[mp]:i.ONE_MINUS_CONSTANT_ALPHA};function Rt(D,at,et,Y,st,bt,Xt,me,sn,ee){if(D===oi){m===!0&&(ie(i.BLEND),m=!1);return}if(m===!1&&(Dt(i.BLEND),m=!0),D!==tp){if(D!==v||ee!==N){if((x!==wi||A!==wi)&&(i.blendEquation(i.FUNC_ADD),x=wi,A=wi),ee)switch(D){case ps:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ga:i.blendFunc(i.ONE,i.ONE);break;case Zl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Jl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ps:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ga:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Zl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Jl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}y=null,b=null,S=null,P=null,M.set(0,0,0),w=0,v=D,N=ee}return}st=st||at,bt=bt||et,Xt=Xt||Y,(at!==x||st!==A)&&(i.blendEquationSeparate(Mt[at],Mt[st]),x=at,A=st),(et!==y||Y!==b||bt!==S||Xt!==P)&&(i.blendFuncSeparate(wt[et],wt[Y],wt[bt],wt[Xt]),y=et,b=Y,S=bt,P=Xt),(me.equals(M)===!1||sn!==w)&&(i.blendColor(me.r,me.g,me.b,sn),M.copy(me),w=sn),v=D,N=!1}function ae(D,at){D.side===kn?ie(i.CULL_FACE):Dt(i.CULL_FACE);let et=D.side===Ye;at&&(et=!et),Ut(et),D.blending===ps&&D.transparent===!1?Rt(oi):Rt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),l.setFunc(D.depthFunc),l.setTest(D.depthTest),l.setMask(D.depthWrite),a.setMask(D.colorWrite);const Y=D.stencilWrite;c.setTest(Y),Y&&(c.setMask(D.stencilWriteMask),c.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),c.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),pe(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Dt(i.SAMPLE_ALPHA_TO_COVERAGE):ie(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ut(D){z!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),z=D)}function It(D){D!==Zf?(Dt(i.CULL_FACE),D!==q&&(D===Kl?i.cullFace(i.BACK):D===Jf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ie(i.CULL_FACE),q=D}function Kt(D){D!==L&&(J&&i.lineWidth(D),L=D)}function pe(D,at,et){D?(Dt(i.POLYGON_OFFSET_FILL),(F!==at||I!==et)&&(i.polygonOffset(at,et),F=at,I=et)):ie(i.POLYGON_OFFSET_FILL)}function Se(D){D?Dt(i.SCISSOR_TEST):ie(i.SCISSOR_TEST)}function R(D){D===void 0&&(D=i.TEXTURE0+B-1),O!==D&&(i.activeTexture(D),O=D)}function E(D,at,et){et===void 0&&(O===null?et=i.TEXTURE0+B-1:et=O);let Y=G[et];Y===void 0&&(Y={type:void 0,texture:void 0},G[et]=Y),(Y.type!==D||Y.texture!==at)&&(O!==et&&(i.activeTexture(et),O=et),i.bindTexture(D,at||At[D]),Y.type=D,Y.texture=at)}function V(){const D=G[O];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function nt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function tt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function it(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function gt(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ot(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ut(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function C(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function rt(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function St(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function _t(D){dt.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),dt.copy(D))}function yt(D){xt.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),xt.copy(D))}function mt(D,at){let et=u.get(at);et===void 0&&(et=new WeakMap,u.set(at,et));let Y=et.get(D);Y===void 0&&(Y=i.getUniformBlockIndex(at,D.name),et.set(D,Y))}function pt(D,at){const Y=u.get(at).get(D);h.get(at)!==Y&&(i.uniformBlockBinding(at,Y,D.__bindingPointIndex),h.set(at,Y))}function Wt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},O=null,G={},f={},g=new WeakMap,_=[],p=null,m=!1,v=null,x=null,y=null,b=null,A=null,S=null,P=null,M=new Ht(0,0,0),w=0,N=!1,z=null,q=null,L=null,F=null,I=null,dt.set(0,0,i.canvas.width,i.canvas.height),xt.set(0,0,i.canvas.width,i.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Dt,disable:ie,bindFramebuffer:Nt,drawBuffers:H,useProgram:Pe,setBlending:Rt,setMaterial:ae,setFlipSided:Ut,setCullFace:It,setLineWidth:Kt,setPolygonOffset:pe,setScissorTest:Se,activeTexture:R,bindTexture:E,unbindTexture:V,compressedTexImage2D:nt,compressedTexImage3D:tt,texImage2D:Q,texImage3D:St,updateUBOMapping:mt,uniformBlockBinding:pt,texStorage2D:C,texStorage3D:rt,texSubImage2D:it,texSubImage3D:gt,compressedTexSubImage2D:ot,compressedTexSubImage3D:ut,scissor:_t,viewport:yt,reset:Wt}}function lv(i,t,e,n,s,r,o){const a=s.isWebGL2,l=s.maxTextures,c=s.maxCubemapSize,h=s.maxTextureSize,u=s.maxSamples,d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,f=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let _;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(R,E){return m?new OffscreenCanvas(R,E):Ao("canvas")}function x(R,E,V,nt){let tt=1;if((R.width>nt||R.height>nt)&&(tt=nt/Math.max(R.width,R.height)),tt<1||E===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const it=E?To:Math.floor,gt=it(tt*R.width),ot=it(tt*R.height);_===void 0&&(_=v(gt,ot));const ut=V?v(gt,ot):_;return ut.width=gt,ut.height=ot,ut.getContext("2d").drawImage(R,0,0,gt,ot),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+gt+"x"+ot+")."),ut}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function y(R){return Ja(R.width)&&Ja(R.height)}function b(R){return a?!1:R.wrapS!==pn||R.wrapT!==pn||R.minFilter!==We&&R.minFilter!==an}function A(R,E){return R.generateMipmaps&&E&&R.minFilter!==We&&R.minFilter!==an}function S(R){i.generateMipmap(R)}function P(R,E,V,nt,tt=!1){if(a===!1)return E;if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let it=E;if(E===i.RED&&(V===i.FLOAT&&(it=i.R32F),V===i.HALF_FLOAT&&(it=i.R16F),V===i.UNSIGNED_BYTE&&(it=i.R8)),E===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(it=i.R8UI),V===i.UNSIGNED_SHORT&&(it=i.R16UI),V===i.UNSIGNED_INT&&(it=i.R32UI),V===i.BYTE&&(it=i.R8I),V===i.SHORT&&(it=i.R16I),V===i.INT&&(it=i.R32I)),E===i.RG&&(V===i.FLOAT&&(it=i.RG32F),V===i.HALF_FLOAT&&(it=i.RG16F),V===i.UNSIGNED_BYTE&&(it=i.RG8)),E===i.RGBA){const gt=tt?Mo:te.getTransfer(nt);V===i.FLOAT&&(it=i.RGBA32F),V===i.HALF_FLOAT&&(it=i.RGBA16F),V===i.UNSIGNED_BYTE&&(it=gt===se?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(it=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(it=i.RGB5_A1)}return(it===i.R16F||it===i.R32F||it===i.RG16F||it===i.RG32F||it===i.RGBA16F||it===i.RGBA32F)&&t.get("EXT_color_buffer_float"),it}function M(R,E,V){return A(R,V)===!0||R.isFramebufferTexture&&R.minFilter!==We&&R.minFilter!==an?Math.log2(Math.max(E.width,E.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?E.mipmaps.length:1}function w(R){return R===We||R===ec||R===Zo?i.NEAREST:i.LINEAR}function N(R){const E=R.target;E.removeEventListener("dispose",N),q(E),E.isVideoTexture&&g.delete(E)}function z(R){const E=R.target;E.removeEventListener("dispose",z),F(E)}function q(R){const E=n.get(R);if(E.__webglInit===void 0)return;const V=R.source,nt=p.get(V);if(nt){const tt=nt[E.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&L(R),Object.keys(nt).length===0&&p.delete(V)}n.remove(R)}function L(R){const E=n.get(R);i.deleteTexture(E.__webglTexture);const V=R.source,nt=p.get(V);delete nt[E.__cacheKey],o.memory.textures--}function F(R){const E=R.texture,V=n.get(R),nt=n.get(E);if(nt.__webglTexture!==void 0&&(i.deleteTexture(nt.__webglTexture),o.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(V.__webglFramebuffer[tt]))for(let it=0;it<V.__webglFramebuffer[tt].length;it++)i.deleteFramebuffer(V.__webglFramebuffer[tt][it]);else i.deleteFramebuffer(V.__webglFramebuffer[tt]);V.__webglDepthbuffer&&i.deleteRenderbuffer(V.__webglDepthbuffer[tt])}else{if(Array.isArray(V.__webglFramebuffer))for(let tt=0;tt<V.__webglFramebuffer.length;tt++)i.deleteFramebuffer(V.__webglFramebuffer[tt]);else i.deleteFramebuffer(V.__webglFramebuffer);if(V.__webglDepthbuffer&&i.deleteRenderbuffer(V.__webglDepthbuffer),V.__webglMultisampledFramebuffer&&i.deleteFramebuffer(V.__webglMultisampledFramebuffer),V.__webglColorRenderbuffer)for(let tt=0;tt<V.__webglColorRenderbuffer.length;tt++)V.__webglColorRenderbuffer[tt]&&i.deleteRenderbuffer(V.__webglColorRenderbuffer[tt]);V.__webglDepthRenderbuffer&&i.deleteRenderbuffer(V.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let tt=0,it=E.length;tt<it;tt++){const gt=n.get(E[tt]);gt.__webglTexture&&(i.deleteTexture(gt.__webglTexture),o.memory.textures--),n.remove(E[tt])}n.remove(E),n.remove(R)}let I=0;function B(){I=0}function J(){const R=I;return R>=l&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+l),I+=1,R}function $(R){const E=[];return E.push(R.wrapS),E.push(R.wrapT),E.push(R.wrapR||0),E.push(R.magFilter),E.push(R.minFilter),E.push(R.anisotropy),E.push(R.internalFormat),E.push(R.format),E.push(R.type),E.push(R.generateMipmaps),E.push(R.premultiplyAlpha),E.push(R.flipY),E.push(R.unpackAlignment),E.push(R.colorSpace),E.join()}function Z(R,E){const V=n.get(R);if(R.isVideoTexture&&pe(R),R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){const nt=R.image;if(nt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(nt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Dt(V,R,E);return}}e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+E)}function O(R,E){const V=n.get(R);if(R.version>0&&V.__version!==R.version){Dt(V,R,E);return}e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+E)}function G(R,E){const V=n.get(R);if(R.version>0&&V.__version!==R.version){Dt(V,R,E);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+E)}function ct(R,E){const V=n.get(R);if(R.version>0&&V.__version!==R.version){ie(V,R,E);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+E)}const ht={[qa]:i.REPEAT,[pn]:i.CLAMP_TO_EDGE,[$a]:i.MIRRORED_REPEAT},dt={[We]:i.NEAREST,[ec]:i.NEAREST_MIPMAP_NEAREST,[Zo]:i.NEAREST_MIPMAP_LINEAR,[an]:i.LINEAR,[Cp]:i.LINEAR_MIPMAP_NEAREST,[er]:i.LINEAR_MIPMAP_LINEAR},xt={[Gp]:i.NEVER,[Kp]:i.ALWAYS,[Wp]:i.LESS,[jp]:i.LEQUAL,[Xp]:i.EQUAL,[$p]:i.GEQUAL,[Yp]:i.GREATER,[qp]:i.NOTEQUAL};function Vt(R,E,V){if(V?(i.texParameteri(R,i.TEXTURE_WRAP_S,ht[E.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,ht[E.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,ht[E.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,dt[E.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,dt[E.minFilter])):(i.texParameteri(R,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(R,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(E.wrapS!==pn||E.wrapT!==pn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(R,i.TEXTURE_MAG_FILTER,w(E.magFilter)),i.texParameteri(R,i.TEXTURE_MIN_FILTER,w(E.minFilter)),E.minFilter!==We&&E.minFilter!==an&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),E.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,xt[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const nt=t.get("EXT_texture_filter_anisotropic");if(E.magFilter===We||E.minFilter!==Zo&&E.minFilter!==er||E.type===Qn&&t.has("OES_texture_float_linear")===!1||a===!1&&E.type===nr&&t.has("OES_texture_half_float_linear")===!1)return;(E.anisotropy>1||n.get(E).__currentAnisotropy)&&(i.texParameterf(R,nt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy)}}function At(R,E){let V=!1;R.__webglInit===void 0&&(R.__webglInit=!0,E.addEventListener("dispose",N));const nt=E.source;let tt=p.get(nt);tt===void 0&&(tt={},p.set(nt,tt));const it=$(E);if(it!==R.__cacheKey){tt[it]===void 0&&(tt[it]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),tt[it].usedTimes++;const gt=tt[R.__cacheKey];gt!==void 0&&(tt[R.__cacheKey].usedTimes--,gt.usedTimes===0&&L(E)),R.__cacheKey=it,R.__webglTexture=tt[it].texture}return V}function Dt(R,E,V){let nt=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(nt=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(nt=i.TEXTURE_3D);const tt=At(R,E),it=E.source;e.bindTexture(nt,R.__webglTexture,i.TEXTURE0+V);const gt=n.get(it);if(it.version!==gt.__version||tt===!0){e.activeTexture(i.TEXTURE0+V);const ot=te.getPrimaries(te.workingColorSpace),ut=E.colorSpace===hn?null:te.getPrimaries(E.colorSpace),C=E.colorSpace===hn||ot===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,C);const rt=b(E)&&y(E.image)===!1;let Q=x(E.image,rt,!1,h);Q=Se(E,Q);const St=y(Q)||a,_t=r.convert(E.format,E.colorSpace);let yt=r.convert(E.type),mt=P(E.internalFormat,_t,yt,E.colorSpace,E.isVideoTexture);Vt(nt,E,St);let pt;const Wt=E.mipmaps,D=a&&E.isVideoTexture!==!0,at=gt.__version===void 0||tt===!0,et=M(E,Q,St);if(E.isDepthTexture)mt=i.DEPTH_COMPONENT,a?E.type===Qn?mt=i.DEPTH_COMPONENT32F:E.type===Jn?mt=i.DEPTH_COMPONENT24:E.type===Pi?mt=i.DEPTH24_STENCIL8:mt=i.DEPTH_COMPONENT16:E.type===Qn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===Li&&mt===i.DEPTH_COMPONENT&&E.type!==vl&&E.type!==Jn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=Jn,yt=r.convert(E.type)),E.format===vs&&mt===i.DEPTH_COMPONENT&&(mt=i.DEPTH_STENCIL,E.type!==Pi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=Pi,yt=r.convert(E.type))),at&&(D?e.texStorage2D(i.TEXTURE_2D,1,mt,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,mt,Q.width,Q.height,0,_t,yt,null));else if(E.isDataTexture)if(Wt.length>0&&St){D&&at&&e.texStorage2D(i.TEXTURE_2D,et,mt,Wt[0].width,Wt[0].height);for(let Y=0,st=Wt.length;Y<st;Y++)pt=Wt[Y],D?e.texSubImage2D(i.TEXTURE_2D,Y,0,0,pt.width,pt.height,_t,yt,pt.data):e.texImage2D(i.TEXTURE_2D,Y,mt,pt.width,pt.height,0,_t,yt,pt.data);E.generateMipmaps=!1}else D?(at&&e.texStorage2D(i.TEXTURE_2D,et,mt,Q.width,Q.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,Q.width,Q.height,_t,yt,Q.data)):e.texImage2D(i.TEXTURE_2D,0,mt,Q.width,Q.height,0,_t,yt,Q.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){D&&at&&e.texStorage3D(i.TEXTURE_2D_ARRAY,et,mt,Wt[0].width,Wt[0].height,Q.depth);for(let Y=0,st=Wt.length;Y<st;Y++)pt=Wt[Y],E.format!==mn?_t!==null?D?e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,pt.width,pt.height,Q.depth,_t,pt.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,mt,pt.width,pt.height,Q.depth,0,pt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?e.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,pt.width,pt.height,Q.depth,_t,yt,pt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Y,mt,pt.width,pt.height,Q.depth,0,_t,yt,pt.data)}else{D&&at&&e.texStorage2D(i.TEXTURE_2D,et,mt,Wt[0].width,Wt[0].height);for(let Y=0,st=Wt.length;Y<st;Y++)pt=Wt[Y],E.format!==mn?_t!==null?D?e.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,pt.width,pt.height,_t,pt.data):e.compressedTexImage2D(i.TEXTURE_2D,Y,mt,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?e.texSubImage2D(i.TEXTURE_2D,Y,0,0,pt.width,pt.height,_t,yt,pt.data):e.texImage2D(i.TEXTURE_2D,Y,mt,pt.width,pt.height,0,_t,yt,pt.data)}else if(E.isDataArrayTexture)D?(at&&e.texStorage3D(i.TEXTURE_2D_ARRAY,et,mt,Q.width,Q.height,Q.depth),e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,_t,yt,Q.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,mt,Q.width,Q.height,Q.depth,0,_t,yt,Q.data);else if(E.isData3DTexture)D?(at&&e.texStorage3D(i.TEXTURE_3D,et,mt,Q.width,Q.height,Q.depth),e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,_t,yt,Q.data)):e.texImage3D(i.TEXTURE_3D,0,mt,Q.width,Q.height,Q.depth,0,_t,yt,Q.data);else if(E.isFramebufferTexture){if(at)if(D)e.texStorage2D(i.TEXTURE_2D,et,mt,Q.width,Q.height);else{let Y=Q.width,st=Q.height;for(let bt=0;bt<et;bt++)e.texImage2D(i.TEXTURE_2D,bt,mt,Y,st,0,_t,yt,null),Y>>=1,st>>=1}}else if(Wt.length>0&&St){D&&at&&e.texStorage2D(i.TEXTURE_2D,et,mt,Wt[0].width,Wt[0].height);for(let Y=0,st=Wt.length;Y<st;Y++)pt=Wt[Y],D?e.texSubImage2D(i.TEXTURE_2D,Y,0,0,_t,yt,pt):e.texImage2D(i.TEXTURE_2D,Y,mt,_t,yt,pt);E.generateMipmaps=!1}else D?(at&&e.texStorage2D(i.TEXTURE_2D,et,mt,Q.width,Q.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,_t,yt,Q)):e.texImage2D(i.TEXTURE_2D,0,mt,_t,yt,Q);A(E,St)&&S(nt),gt.__version=it.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function ie(R,E,V){if(E.image.length!==6)return;const nt=At(R,E),tt=E.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+V);const it=n.get(tt);if(tt.version!==it.__version||nt===!0){e.activeTexture(i.TEXTURE0+V);const gt=te.getPrimaries(te.workingColorSpace),ot=E.colorSpace===hn?null:te.getPrimaries(E.colorSpace),ut=E.colorSpace===hn||gt===ot?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ut);const C=E.isCompressedTexture||E.image[0].isCompressedTexture,rt=E.image[0]&&E.image[0].isDataTexture,Q=[];for(let Y=0;Y<6;Y++)!C&&!rt?Q[Y]=x(E.image[Y],!1,!0,c):Q[Y]=rt?E.image[Y].image:E.image[Y],Q[Y]=Se(E,Q[Y]);const St=Q[0],_t=y(St)||a,yt=r.convert(E.format,E.colorSpace),mt=r.convert(E.type),pt=P(E.internalFormat,yt,mt,E.colorSpace),Wt=a&&E.isVideoTexture!==!0,D=it.__version===void 0||nt===!0;let at=M(E,St,_t);Vt(i.TEXTURE_CUBE_MAP,E,_t);let et;if(C){Wt&&D&&e.texStorage2D(i.TEXTURE_CUBE_MAP,at,pt,St.width,St.height);for(let Y=0;Y<6;Y++){et=Q[Y].mipmaps;for(let st=0;st<et.length;st++){const bt=et[st];E.format!==mn?yt!==null?Wt?e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,st,0,0,bt.width,bt.height,yt,bt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,st,pt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Wt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,st,0,0,bt.width,bt.height,yt,mt,bt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,st,pt,bt.width,bt.height,0,yt,mt,bt.data)}}}else{et=E.mipmaps,Wt&&D&&(et.length>0&&at++,e.texStorage2D(i.TEXTURE_CUBE_MAP,at,pt,Q[0].width,Q[0].height));for(let Y=0;Y<6;Y++)if(rt){Wt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Q[Y].width,Q[Y].height,yt,mt,Q[Y].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,pt,Q[Y].width,Q[Y].height,0,yt,mt,Q[Y].data);for(let st=0;st<et.length;st++){const Xt=et[st].image[Y].image;Wt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,st+1,0,0,Xt.width,Xt.height,yt,mt,Xt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,st+1,pt,Xt.width,Xt.height,0,yt,mt,Xt.data)}}else{Wt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,yt,mt,Q[Y]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,pt,yt,mt,Q[Y]);for(let st=0;st<et.length;st++){const bt=et[st];Wt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,st+1,0,0,yt,mt,bt.image[Y]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,st+1,pt,yt,mt,bt.image[Y])}}}A(E,_t)&&S(i.TEXTURE_CUBE_MAP),it.__version=tt.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function Nt(R,E,V,nt,tt,it){const gt=r.convert(V.format,V.colorSpace),ot=r.convert(V.type),ut=P(V.internalFormat,gt,ot,V.colorSpace);if(!n.get(E).__hasExternalTextures){const rt=Math.max(1,E.width>>it),Q=Math.max(1,E.height>>it);tt===i.TEXTURE_3D||tt===i.TEXTURE_2D_ARRAY?e.texImage3D(tt,it,ut,rt,Q,E.depth,0,gt,ot,null):e.texImage2D(tt,it,ut,rt,Q,0,gt,ot,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),Kt(E)?d.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,tt,n.get(V).__webglTexture,0,It(E)):(tt===i.TEXTURE_2D||tt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,nt,tt,n.get(V).__webglTexture,it),e.bindFramebuffer(i.FRAMEBUFFER,null)}function H(R,E,V){if(i.bindRenderbuffer(i.RENDERBUFFER,R),E.depthBuffer&&!E.stencilBuffer){let nt=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(V||Kt(E)){const tt=E.depthTexture;tt&&tt.isDepthTexture&&(tt.type===Qn?nt=i.DEPTH_COMPONENT32F:tt.type===Jn&&(nt=i.DEPTH_COMPONENT24));const it=It(E);Kt(E)?d.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,it,nt,E.width,E.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,it,nt,E.width,E.height)}else i.renderbufferStorage(i.RENDERBUFFER,nt,E.width,E.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,R)}else if(E.depthBuffer&&E.stencilBuffer){const nt=It(E);V&&Kt(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,nt,i.DEPTH24_STENCIL8,E.width,E.height):Kt(E)?d.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,nt,i.DEPTH24_STENCIL8,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,R)}else{const nt=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let tt=0;tt<nt.length;tt++){const it=nt[tt],gt=r.convert(it.format,it.colorSpace),ot=r.convert(it.type),ut=P(it.internalFormat,gt,ot,it.colorSpace),C=It(E);V&&Kt(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,C,ut,E.width,E.height):Kt(E)?d.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,C,ut,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,ut,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Pe(R,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),Z(E.depthTexture,0);const nt=n.get(E.depthTexture).__webglTexture,tt=It(E);if(E.depthTexture.format===Li)Kt(E)?d.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,nt,0,tt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,nt,0);else if(E.depthTexture.format===vs)Kt(E)?d.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,nt,0,tt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,nt,0);else throw new Error("Unknown depthTexture format")}function Mt(R){const E=n.get(R),V=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!E.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");Pe(E.__webglFramebuffer,R)}else if(V){E.__webglDepthbuffer=[];for(let nt=0;nt<6;nt++)e.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[nt]),E.__webglDepthbuffer[nt]=i.createRenderbuffer(),H(E.__webglDepthbuffer[nt],R,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=i.createRenderbuffer(),H(E.__webglDepthbuffer,R,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function wt(R,E,V){const nt=n.get(R);E!==void 0&&Nt(nt.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Mt(R)}function Rt(R){const E=R.texture,V=n.get(R),nt=n.get(E);R.addEventListener("dispose",z),R.isWebGLMultipleRenderTargets!==!0&&(nt.__webglTexture===void 0&&(nt.__webglTexture=i.createTexture()),nt.__version=E.version,o.memory.textures++);const tt=R.isWebGLCubeRenderTarget===!0,it=R.isWebGLMultipleRenderTargets===!0,gt=y(R)||a;if(tt){V.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(a&&E.mipmaps&&E.mipmaps.length>0){V.__webglFramebuffer[ot]=[];for(let ut=0;ut<E.mipmaps.length;ut++)V.__webglFramebuffer[ot][ut]=i.createFramebuffer()}else V.__webglFramebuffer[ot]=i.createFramebuffer()}else{if(a&&E.mipmaps&&E.mipmaps.length>0){V.__webglFramebuffer=[];for(let ot=0;ot<E.mipmaps.length;ot++)V.__webglFramebuffer[ot]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(it)if(s.drawBuffers){const ot=R.texture;for(let ut=0,C=ot.length;ut<C;ut++){const rt=n.get(ot[ut]);rt.__webglTexture===void 0&&(rt.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&R.samples>0&&Kt(R)===!1){const ot=it?E:[E];V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ut=0;ut<ot.length;ut++){const C=ot[ut];V.__webglColorRenderbuffer[ut]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[ut]);const rt=r.convert(C.format,C.colorSpace),Q=r.convert(C.type),St=P(C.internalFormat,rt,Q,C.colorSpace,R.isXRRenderTarget===!0),_t=It(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,_t,St,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,V.__webglColorRenderbuffer[ut])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),H(V.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(tt){e.bindTexture(i.TEXTURE_CUBE_MAP,nt.__webglTexture),Vt(i.TEXTURE_CUBE_MAP,E,gt);for(let ot=0;ot<6;ot++)if(a&&E.mipmaps&&E.mipmaps.length>0)for(let ut=0;ut<E.mipmaps.length;ut++)Nt(V.__webglFramebuffer[ot][ut],R,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,ut);else Nt(V.__webglFramebuffer[ot],R,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);A(E,gt)&&S(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(it){const ot=R.texture;for(let ut=0,C=ot.length;ut<C;ut++){const rt=ot[ut],Q=n.get(rt);e.bindTexture(i.TEXTURE_2D,Q.__webglTexture),Vt(i.TEXTURE_2D,rt,gt),Nt(V.__webglFramebuffer,R,rt,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,0),A(rt,gt)&&S(i.TEXTURE_2D)}e.unbindTexture()}else{let ot=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(a?ot=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(ot,nt.__webglTexture),Vt(ot,E,gt),a&&E.mipmaps&&E.mipmaps.length>0)for(let ut=0;ut<E.mipmaps.length;ut++)Nt(V.__webglFramebuffer[ut],R,E,i.COLOR_ATTACHMENT0,ot,ut);else Nt(V.__webglFramebuffer,R,E,i.COLOR_ATTACHMENT0,ot,0);A(E,gt)&&S(ot),e.unbindTexture()}R.depthBuffer&&Mt(R)}function ae(R){const E=y(R)||a,V=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let nt=0,tt=V.length;nt<tt;nt++){const it=V[nt];if(A(it,E)){const gt=R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ot=n.get(it).__webglTexture;e.bindTexture(gt,ot),S(gt),e.unbindTexture()}}}function Ut(R){if(a&&R.samples>0&&Kt(R)===!1){const E=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],V=R.width,nt=R.height;let tt=i.COLOR_BUFFER_BIT;const it=[],gt=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=n.get(R),ut=R.isWebGLMultipleRenderTargets===!0;if(ut)for(let C=0;C<E.length;C++)e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+C,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+C,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ot.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglFramebuffer);for(let C=0;C<E.length;C++){it.push(i.COLOR_ATTACHMENT0+C),R.depthBuffer&&it.push(gt);const rt=ot.__ignoreDepthValues!==void 0?ot.__ignoreDepthValues:!1;if(rt===!1&&(R.depthBuffer&&(tt|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&(tt|=i.STENCIL_BUFFER_BIT)),ut&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ot.__webglColorRenderbuffer[C]),rt===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[gt]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[gt])),ut){const Q=n.get(E[C]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Q,0)}i.blitFramebuffer(0,0,V,nt,0,0,V,nt,tt,i.NEAREST),f&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,it)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ut)for(let C=0;C<E.length;C++){e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+C,i.RENDERBUFFER,ot.__webglColorRenderbuffer[C]);const rt=n.get(E[C]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+C,i.TEXTURE_2D,rt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglMultisampledFramebuffer)}}function It(R){return Math.min(u,R.samples)}function Kt(R){const E=n.get(R);return a&&R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function pe(R){const E=o.render.frame;g.get(R)!==E&&(g.set(R,E),R.update())}function Se(R,E){const V=R.colorSpace,nt=R.format,tt=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===Za||V!==Xn&&V!==hn&&(te.getTransfer(V)===se?a===!1?t.has("EXT_sRGB")===!0&&nt===mn?(R.format=Za,R.minFilter=an,R.generateMipmaps=!1):E=fd.sRGBToLinear(E):(nt!==mn||tt!==li)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),E}this.allocateTextureUnit=J,this.resetTextureUnits=B,this.setTexture2D=Z,this.setTexture2DArray=O,this.setTexture3D=G,this.setTextureCube=ct,this.rebindTextures=wt,this.setupRenderTarget=Rt,this.updateRenderTargetMipmap=ae,this.updateMultisampleRenderTarget=Ut,this.setupDepthRenderbuffer=Mt,this.setupFrameBufferTexture=Nt,this.useMultisampledRTT=Kt}function cv(i,t,e){const n=e.isWebGL2;function s(r,o=hn){let a;const l=te.getTransfer(o);if(r===li)return i.UNSIGNED_BYTE;if(r===od)return i.UNSIGNED_SHORT_4_4_4_4;if(r===ad)return i.UNSIGNED_SHORT_5_5_5_1;if(r===Pp)return i.BYTE;if(r===Lp)return i.SHORT;if(r===vl)return i.UNSIGNED_SHORT;if(r===rd)return i.INT;if(r===Jn)return i.UNSIGNED_INT;if(r===Qn)return i.FLOAT;if(r===nr)return n?i.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===Dp)return i.ALPHA;if(r===mn)return i.RGBA;if(r===Ip)return i.LUMINANCE;if(r===Op)return i.LUMINANCE_ALPHA;if(r===Li)return i.DEPTH_COMPONENT;if(r===vs)return i.DEPTH_STENCIL;if(r===Za)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Up)return i.RED;if(r===ld)return i.RED_INTEGER;if(r===Fp)return i.RG;if(r===cd)return i.RG_INTEGER;if(r===hd)return i.RGBA_INTEGER;if(r===Jo||r===Qo||r===ta||r===ea)if(l===se)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Jo)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Qo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===ta)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===ea)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Jo)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Qo)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===ta)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===ea)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===nc||r===ic||r===sc||r===rc)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===nc)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===ic)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===sc)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===rc)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Np)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===oc||r===ac)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(r===oc)return l===se?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===ac)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===lc||r===cc||r===hc||r===uc||r===dc||r===fc||r===pc||r===mc||r===gc||r===_c||r===xc||r===vc||r===bc||r===Mc)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(r===lc)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===cc)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===hc)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===uc)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===dc)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===fc)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===pc)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===mc)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===gc)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===_c)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===xc)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===vc)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===bc)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Mc)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===na||r===yc||r===Sc)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(r===na)return l===se?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===yc)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Sc)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===kp||r===Ec||r===Tc||r===Ac)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(r===na)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Ec)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Tc)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Ac)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Pi?n?i.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class hv extends nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Bs extends Ne{constructor(){super(),this.isGroup=!0,this.type="Group"}}const uv={type:"move"};class Ta{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,n),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(uv)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Bs;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class dv extends qe{constructor(t,e,n,s,r,o,a,l,c,h){if(h=h!==void 0?h:Li,h!==Li&&h!==vs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Li&&(n=Jn),n===void 0&&h===vs&&(n=Pi),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:We,this.minFilter=l!==void 0?l:We,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class fv extends Bi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=e.getContextAttributes();let p=null,m=null;const v=[],x=[],y=new nn;y.layers.enable(1),y.viewport=new Ce;const b=new nn;b.layers.enable(2),b.viewport=new Ce;const A=[y,b],S=new hv;S.layers.enable(1),S.layers.enable(2);let P=null,M=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let G=v[O];return G===void 0&&(G=new Ta,v[O]=G),G.getTargetRaySpace()},this.getControllerGrip=function(O){let G=v[O];return G===void 0&&(G=new Ta,v[O]=G),G.getGripSpace()},this.getHand=function(O){let G=v[O];return G===void 0&&(G=new Ta,v[O]=G),G.getHandSpace()};function w(O){const G=x.indexOf(O.inputSource);if(G===-1)return;const ct=v[G];ct!==void 0&&(ct.update(O.inputSource,O.frame,c||o),ct.dispatchEvent({type:O.type,data:O.inputSource}))}function N(){s.removeEventListener("select",w),s.removeEventListener("selectstart",w),s.removeEventListener("selectend",w),s.removeEventListener("squeeze",w),s.removeEventListener("squeezestart",w),s.removeEventListener("squeezeend",w),s.removeEventListener("end",N),s.removeEventListener("inputsourceschange",z);for(let O=0;O<v.length;O++){const G=x[O];G!==null&&(x[O]=null,v[O].disconnect(G))}P=null,M=null,t.setRenderTarget(p),f=null,d=null,u=null,s=null,m=null,Z.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){r=O,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){a=O,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(O){c=O},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(O){if(s=O,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",w),s.addEventListener("selectstart",w),s.addEventListener("selectend",w),s.addEventListener("squeeze",w),s.addEventListener("squeezestart",w),s.addEventListener("squeezeend",w),s.addEventListener("end",N),s.addEventListener("inputsourceschange",z),_.xrCompatible!==!0&&await e.makeXRCompatible(),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const G={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,G),s.updateRenderState({baseLayer:f}),m=new Ui(f.framebufferWidth,f.framebufferHeight,{format:mn,type:li,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let G=null,ct=null,ht=null;_.depth&&(ht=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,G=_.stencil?vs:Li,ct=_.stencil?Pi:Jn);const dt={colorFormat:e.RGBA8,depthFormat:ht,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(dt),s.updateRenderState({layers:[d]}),m=new Ui(d.textureWidth,d.textureHeight,{format:mn,type:li,depthTexture:new dv(d.textureWidth,d.textureHeight,ct,void 0,void 0,void 0,void 0,void 0,void 0,G),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0});const xt=t.properties.get(m);xt.__ignoreDepthValues=d.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Z.setContext(s),Z.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function z(O){for(let G=0;G<O.removed.length;G++){const ct=O.removed[G],ht=x.indexOf(ct);ht>=0&&(x[ht]=null,v[ht].disconnect(ct))}for(let G=0;G<O.added.length;G++){const ct=O.added[G];let ht=x.indexOf(ct);if(ht===-1){for(let xt=0;xt<v.length;xt++)if(xt>=x.length){x.push(ct),ht=xt;break}else if(x[xt]===null){x[xt]=ct,ht=xt;break}if(ht===-1)break}const dt=v[ht];dt&&dt.connect(ct)}}const q=new U,L=new U;function F(O,G,ct){q.setFromMatrixPosition(G.matrixWorld),L.setFromMatrixPosition(ct.matrixWorld);const ht=q.distanceTo(L),dt=G.projectionMatrix.elements,xt=ct.projectionMatrix.elements,Vt=dt[14]/(dt[10]-1),At=dt[14]/(dt[10]+1),Dt=(dt[9]+1)/dt[5],ie=(dt[9]-1)/dt[5],Nt=(dt[8]-1)/dt[0],H=(xt[8]+1)/xt[0],Pe=Vt*Nt,Mt=Vt*H,wt=ht/(-Nt+H),Rt=wt*-Nt;G.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(Rt),O.translateZ(wt),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert();const ae=Vt+wt,Ut=At+wt,It=Pe-Rt,Kt=Mt+(ht-Rt),pe=Dt*At/Ut*ae,Se=ie*At/Ut*ae;O.projectionMatrix.makePerspective(It,Kt,pe,Se,ae,Ut),O.projectionMatrixInverse.copy(O.projectionMatrix).invert()}function I(O,G){G===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(G.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(s===null)return;S.near=b.near=y.near=O.near,S.far=b.far=y.far=O.far,(P!==S.near||M!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),P=S.near,M=S.far);const G=O.parent,ct=S.cameras;I(S,G);for(let ht=0;ht<ct.length;ht++)I(ct[ht],G);ct.length===2?F(S,y,b):S.projectionMatrix.copy(y.projectionMatrix),B(O,S,G)};function B(O,G,ct){ct===null?O.matrix.copy(G.matrixWorld):(O.matrix.copy(ct.matrixWorld),O.matrix.invert(),O.matrix.multiply(G.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(G.projectionMatrix),O.projectionMatrixInverse.copy(G.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=ir*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(O){l=O,d!==null&&(d.fixedFoveation=O),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=O)};let J=null;function $(O,G){if(h=G.getViewerPose(c||o),g=G,h!==null){const ct=h.views;f!==null&&(t.setRenderTargetFramebuffer(m,f.framebuffer),t.setRenderTarget(m));let ht=!1;ct.length!==S.cameras.length&&(S.cameras.length=0,ht=!0);for(let dt=0;dt<ct.length;dt++){const xt=ct[dt];let Vt=null;if(f!==null)Vt=f.getViewport(xt);else{const Dt=u.getViewSubImage(d,xt);Vt=Dt.viewport,dt===0&&(t.setRenderTargetTextures(m,Dt.colorTexture,d.ignoreDepthValues?void 0:Dt.depthStencilTexture),t.setRenderTarget(m))}let At=A[dt];At===void 0&&(At=new nn,At.layers.enable(dt),At.viewport=new Ce,A[dt]=At),At.matrix.fromArray(xt.transform.matrix),At.matrix.decompose(At.position,At.quaternion,At.scale),At.projectionMatrix.fromArray(xt.projectionMatrix),At.projectionMatrixInverse.copy(At.projectionMatrix).invert(),At.viewport.set(Vt.x,Vt.y,Vt.width,Vt.height),dt===0&&(S.matrix.copy(At.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ht===!0&&S.cameras.push(At)}}for(let ct=0;ct<v.length;ct++){const ht=x[ct],dt=v[ct];ht!==null&&dt!==void 0&&dt.update(ht,G,c||o)}J&&J(O,G),G.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:G}),g=null}const Z=new Td;Z.setAnimationLoop($),this.setAnimationLoop=function(O){J=O},this.dispose=function(){}}}function pv(i,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Md(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,v,x,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,y)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),_(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,v,x):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Ye&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Ye&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const v=t.get(m).envMap;if(v&&(p.envMap.value=v,p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const x=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*x,e(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,v,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*v,p.scale.value=x*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),t.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,v){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ye&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const v=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function mv(i,t,e,n){let s={},r={},o=[];const a=e.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(v,x){const y=x.program;n.uniformBlockBinding(v,y)}function c(v,x){let y=s[v.id];y===void 0&&(g(v),y=h(v),s[v.id]=y,v.addEventListener("dispose",p));const b=x.program;n.updateUBOMapping(v,b);const A=t.render.frame;r[v.id]!==A&&(d(v),r[v.id]=A)}function h(v){const x=u();v.__bindingPointIndex=x;const y=i.createBuffer(),b=v.__size,A=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,b,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,y),y}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const x=s[v.id],y=v.uniforms,b=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let A=0,S=y.length;A<S;A++){const P=y[A];if(f(P,A,b)===!0){const M=P.__offset,w=Array.isArray(P.value)?P.value:[P.value];let N=0;for(let z=0;z<w.length;z++){const q=w[z],L=_(q);typeof q=="number"?(P.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,M+N,P.__data)):q.isMatrix3?(P.__data[0]=q.elements[0],P.__data[1]=q.elements[1],P.__data[2]=q.elements[2],P.__data[3]=q.elements[0],P.__data[4]=q.elements[3],P.__data[5]=q.elements[4],P.__data[6]=q.elements[5],P.__data[7]=q.elements[0],P.__data[8]=q.elements[6],P.__data[9]=q.elements[7],P.__data[10]=q.elements[8],P.__data[11]=q.elements[0]):(q.toArray(P.__data,N),N+=L.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,M,P.__data)}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,x,y){const b=v.value;if(y[x]===void 0){if(typeof b=="number")y[x]=b;else{const A=Array.isArray(b)?b:[b],S=[];for(let P=0;P<A.length;P++)S.push(A[P].clone());y[x]=S}return!0}else if(typeof b=="number"){if(y[x]!==b)return y[x]=b,!0}else{const A=Array.isArray(y[x])?y[x]:[y[x]],S=Array.isArray(b)?b:[b];for(let P=0;P<A.length;P++){const M=A[P];if(M.equals(S[P])===!1)return M.copy(S[P]),!0}}return!1}function g(v){const x=v.uniforms;let y=0;const b=16;let A=0;for(let S=0,P=x.length;S<P;S++){const M=x[S],w={boundary:0,storage:0},N=Array.isArray(M.value)?M.value:[M.value];for(let z=0,q=N.length;z<q;z++){const L=N[z],F=_(L);w.boundary+=F.boundary,w.storage+=F.storage}if(M.__data=new Float32Array(w.storage/Float32Array.BYTES_PER_ELEMENT),M.__offset=y,S>0){A=y%b;const z=b-A;A!==0&&z-w.boundary<0&&(y+=b-A,M.__offset=y)}y+=w.storage}return A=y%b,A>0&&(y+=b-A),v.__size=y,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function p(v){const x=v.target;x.removeEventListener("dispose",p);const y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function m(){for(const v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:c,dispose:m}}class Pd{constructor(t={}){const{canvas:e=dm(),context:n=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=we,this._useLegacyLights=!1,this.toneMapping=ai,this.toneMappingExposure=1;const x=this;let y=!1,b=0,A=0,S=null,P=-1,M=null;const w=new Ce,N=new Ce;let z=null;const q=new Ht(0);let L=0,F=e.width,I=e.height,B=1,J=null,$=null;const Z=new Ce(0,0,F,I),O=new Ce(0,0,F,I);let G=!1;const ct=new Ed;let ht=!1,dt=!1,xt=null;const Vt=new xe,At=new Pt,Dt=new U,ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Nt(){return S===null?B:1}let H=n;function Pe(T,k){for(let W=0;W<T.length;W++){const X=T[W],j=e.getContext(X,k);if(j!==null)return j}return null}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${xl}`),e.addEventListener("webglcontextlost",Wt,!1),e.addEventListener("webglcontextrestored",D,!1),e.addEventListener("webglcontextcreationerror",at,!1),H===null){const k=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&k.shift(),H=Pe(k,T),H===null)throw Pe(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&H instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),H.getShaderPrecisionFormat===void 0&&(H.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Mt,wt,Rt,ae,Ut,It,Kt,pe,Se,R,E,V,nt,tt,it,gt,ot,ut,C,rt,Q,St,_t,yt;function mt(){Mt=new T0(H),wt=new x0(H,Mt,t),Mt.init(wt),St=new cv(H,Mt,wt),Rt=new av(H,Mt,wt),ae=new R0(H),Ut=new Yx,It=new lv(H,Mt,Rt,Ut,wt,St,ae),Kt=new b0(x),pe=new E0(x),Se=new Nm(H,wt),_t=new g0(H,Mt,Se,wt),R=new A0(H,Se,ae,_t),E=new D0(H,R,Se,ae),C=new L0(H,wt,It),gt=new v0(Ut),V=new jx(x,Kt,pe,Mt,wt,_t,gt),nt=new pv(x,Ut),tt=new $x,it=new ev(Mt,wt),ut=new m0(x,Kt,pe,Rt,E,d,l),ot=new ov(x,E,wt),yt=new mv(H,ae,wt,Rt),rt=new _0(H,Mt,ae,wt),Q=new w0(H,Mt,ae,wt),ae.programs=V.programs,x.capabilities=wt,x.extensions=Mt,x.properties=Ut,x.renderLists=tt,x.shadowMap=ot,x.state=Rt,x.info=ae}mt();const pt=new fv(x,H);this.xr=pt,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const T=Mt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Mt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(T){T!==void 0&&(B=T,this.setSize(F,I,!1))},this.getSize=function(T){return T.set(F,I)},this.setSize=function(T,k,W=!0){if(pt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=T,I=k,e.width=Math.floor(T*B),e.height=Math.floor(k*B),W===!0&&(e.style.width=T+"px",e.style.height=k+"px"),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(F*B,I*B).floor()},this.setDrawingBufferSize=function(T,k,W){F=T,I=k,B=W,e.width=Math.floor(T*W),e.height=Math.floor(k*W),this.setViewport(0,0,T,k)},this.getCurrentViewport=function(T){return T.copy(w)},this.getViewport=function(T){return T.copy(Z)},this.setViewport=function(T,k,W,X){T.isVector4?Z.set(T.x,T.y,T.z,T.w):Z.set(T,k,W,X),Rt.viewport(w.copy(Z).multiplyScalar(B).floor())},this.getScissor=function(T){return T.copy(O)},this.setScissor=function(T,k,W,X){T.isVector4?O.set(T.x,T.y,T.z,T.w):O.set(T,k,W,X),Rt.scissor(N.copy(O).multiplyScalar(B).floor())},this.getScissorTest=function(){return G},this.setScissorTest=function(T){Rt.setScissorTest(G=T)},this.setOpaqueSort=function(T){J=T},this.setTransparentSort=function(T){$=T},this.getClearColor=function(T){return T.copy(ut.getClearColor())},this.setClearColor=function(){ut.setClearColor.apply(ut,arguments)},this.getClearAlpha=function(){return ut.getClearAlpha()},this.setClearAlpha=function(){ut.setClearAlpha.apply(ut,arguments)},this.clear=function(T=!0,k=!0,W=!0){let X=0;if(T){let j=!1;if(S!==null){const ft=S.texture.format;j=ft===hd||ft===cd||ft===ld}if(j){const ft=S.texture.type,vt=ft===li||ft===Jn||ft===vl||ft===Pi||ft===od||ft===ad,Et=ut.getClearColor(),Ct=ut.getClearAlpha(),Bt=Et.r,Ot=Et.g,Ft=Et.b;vt?(f[0]=Bt,f[1]=Ot,f[2]=Ft,f[3]=Ct,H.clearBufferuiv(H.COLOR,0,f)):(g[0]=Bt,g[1]=Ot,g[2]=Ft,g[3]=Ct,H.clearBufferiv(H.COLOR,0,g))}else X|=H.COLOR_BUFFER_BIT}k&&(X|=H.DEPTH_BUFFER_BIT),W&&(X|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Wt,!1),e.removeEventListener("webglcontextrestored",D,!1),e.removeEventListener("webglcontextcreationerror",at,!1),tt.dispose(),it.dispose(),Ut.dispose(),Kt.dispose(),pe.dispose(),E.dispose(),_t.dispose(),yt.dispose(),V.dispose(),pt.dispose(),pt.removeEventListener("sessionstart",sn),pt.removeEventListener("sessionend",ee),xt&&(xt.dispose(),xt=null),Be.stop()};function Wt(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const T=ae.autoReset,k=ot.enabled,W=ot.autoUpdate,X=ot.needsUpdate,j=ot.type;mt(),ae.autoReset=T,ot.enabled=k,ot.autoUpdate=W,ot.needsUpdate=X,ot.type=j}function at(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function et(T){const k=T.target;k.removeEventListener("dispose",et),Y(k)}function Y(T){st(T),Ut.remove(T)}function st(T){const k=Ut.get(T).programs;k!==void 0&&(k.forEach(function(W){V.releaseProgram(W)}),T.isShaderMaterial&&V.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,W,X,j,ft){k===null&&(k=ie);const vt=j.isMesh&&j.matrixWorld.determinant()<0,Et=Uf(T,k,W,X,j);Rt.setMaterial(X,vt);let Ct=W.index,Bt=1;if(X.wireframe===!0){if(Ct=R.getWireframeAttribute(W),Ct===void 0)return;Bt=2}const Ot=W.drawRange,Ft=W.attributes.position;let de=Ot.start*Bt,Ke=(Ot.start+Ot.count)*Bt;ft!==null&&(de=Math.max(de,ft.start*Bt),Ke=Math.min(Ke,(ft.start+ft.count)*Bt)),Ct!==null?(de=Math.max(de,0),Ke=Math.min(Ke,Ct.count)):Ft!=null&&(de=Math.max(de,0),Ke=Math.min(Ke,Ft.count));const Ee=Ke-de;if(Ee<0||Ee===1/0)return;_t.setup(j,X,Et,W,Ct);let wn,ce=rt;if(Ct!==null&&(wn=Se.get(Ct),ce=Q,ce.setIndex(wn)),j.isMesh)X.wireframe===!0?(Rt.setLineWidth(X.wireframeLinewidth*Nt()),ce.setMode(H.LINES)):ce.setMode(H.TRIANGLES);else if(j.isLine){let jt=X.linewidth;jt===void 0&&(jt=1),Rt.setLineWidth(jt*Nt()),j.isLineSegments?ce.setMode(H.LINES):j.isLineLoop?ce.setMode(H.LINE_LOOP):ce.setMode(H.LINE_STRIP)}else j.isPoints?ce.setMode(H.POINTS):j.isSprite&&ce.setMode(H.TRIANGLES);if(j.isInstancedMesh)ce.renderInstances(de,Ee,j.count);else if(W.isInstancedBufferGeometry){const jt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Yo=Math.min(W.instanceCount,jt);ce.renderInstances(de,Ee,Yo)}else ce.render(de,Ee)};function bt(T,k,W){T.transparent===!0&&T.side===kn&&T.forceSinglePass===!1?(T.side=Ye,T.needsUpdate=!0,vr(T,k,W),T.side=hi,T.needsUpdate=!0,vr(T,k,W),T.side=kn):vr(T,k,W)}this.compile=function(T,k,W=null){W===null&&(W=T),p=it.get(W),p.init(),v.push(p),W.traverseVisible(function(j){j.isLight&&j.layers.test(k.layers)&&(p.pushLight(j),j.castShadow&&p.pushShadow(j))}),T!==W&&T.traverseVisible(function(j){j.isLight&&j.layers.test(k.layers)&&(p.pushLight(j),j.castShadow&&p.pushShadow(j))}),p.setupLights(x._useLegacyLights);const X=new Set;return T.traverse(function(j){const ft=j.material;if(ft)if(Array.isArray(ft))for(let vt=0;vt<ft.length;vt++){const Et=ft[vt];bt(Et,W,j),X.add(Et)}else bt(ft,W,j),X.add(ft)}),v.pop(),p=null,X},this.compileAsync=function(T,k,W=null){const X=this.compile(T,k,W);return new Promise(j=>{function ft(){if(X.forEach(function(vt){Ut.get(vt).currentProgram.isReady()&&X.delete(vt)}),X.size===0){j(T);return}setTimeout(ft,10)}Mt.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let Xt=null;function me(T){Xt&&Xt(T)}function sn(){Be.stop()}function ee(){Be.start()}const Be=new Td;Be.setAnimationLoop(me),typeof self<"u"&&Be.setContext(self),this.setAnimationLoop=function(T){Xt=T,pt.setAnimationLoop(T),T===null?Be.stop():Be.start()},pt.addEventListener("sessionstart",sn),pt.addEventListener("sessionend",ee),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),pt.enabled===!0&&pt.isPresenting===!0&&(pt.cameraAutoUpdate===!0&&pt.updateCamera(k),k=pt.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,k,S),p=it.get(T,v.length),p.init(),v.push(p),Vt.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),ct.setFromProjectionMatrix(Vt),dt=this.localClippingEnabled,ht=gt.init(this.clippingPlanes,dt),_=tt.get(T,m.length),_.init(),m.push(_),vn(T,k,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(J,$),this.info.render.frame++,ht===!0&&gt.beginShadows();const W=p.state.shadowsArray;if(ot.render(W,T,k),ht===!0&&gt.endShadows(),this.info.autoReset===!0&&this.info.reset(),ut.render(_,T),p.setupLights(x._useLegacyLights),k.isArrayCamera){const X=k.cameras;for(let j=0,ft=X.length;j<ft;j++){const vt=X[j];zl(_,T,vt,vt.viewport)}}else zl(_,T,k);S!==null&&(It.updateMultisampleRenderTarget(S),It.updateRenderTargetMipmap(S)),T.isScene===!0&&T.onAfterRender(x,T,k),_t.resetDefaultState(),P=-1,M=null,v.pop(),v.length>0?p=v[v.length-1]:p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function vn(T,k,W,X){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)W=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||ct.intersectsSprite(T)){X&&Dt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Vt);const vt=E.update(T),Et=T.material;Et.visible&&_.push(T,vt,Et,W,Dt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||ct.intersectsObject(T))){const vt=E.update(T),Et=T.material;if(X&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Dt.copy(T.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),Dt.copy(vt.boundingSphere.center)),Dt.applyMatrix4(T.matrixWorld).applyMatrix4(Vt)),Array.isArray(Et)){const Ct=vt.groups;for(let Bt=0,Ot=Ct.length;Bt<Ot;Bt++){const Ft=Ct[Bt],de=Et[Ft.materialIndex];de&&de.visible&&_.push(T,vt,de,W,Dt.z,Ft)}}else Et.visible&&_.push(T,vt,Et,W,Dt.z,null)}}const ft=T.children;for(let vt=0,Et=ft.length;vt<Et;vt++)vn(ft[vt],k,W,X)}function zl(T,k,W,X){const j=T.opaque,ft=T.transmissive,vt=T.transparent;p.setupLightsView(W),ht===!0&&gt.setGlobalState(x.clippingPlanes,W),ft.length>0&&Of(j,ft,k,W),X&&Rt.viewport(w.copy(X)),j.length>0&&xr(j,k,W),ft.length>0&&xr(ft,k,W),vt.length>0&&xr(vt,k,W),Rt.buffers.depth.setTest(!0),Rt.buffers.depth.setMask(!0),Rt.buffers.color.setMask(!0),Rt.setPolygonOffset(!1)}function Of(T,k,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;const ft=wt.isWebGL2;xt===null&&(xt=new Ui(1,1,{generateMipmaps:!0,type:Mt.has("EXT_color_buffer_half_float")?nr:li,minFilter:er,samples:ft?4:0})),x.getDrawingBufferSize(At),ft?xt.setSize(At.x,At.y):xt.setSize(To(At.x),To(At.y));const vt=x.getRenderTarget();x.setRenderTarget(xt),x.getClearColor(q),L=x.getClearAlpha(),L<1&&x.setClearColor(16777215,.5),x.clear();const Et=x.toneMapping;x.toneMapping=ai,xr(T,W,X),It.updateMultisampleRenderTarget(xt),It.updateRenderTargetMipmap(xt);let Ct=!1;for(let Bt=0,Ot=k.length;Bt<Ot;Bt++){const Ft=k[Bt],de=Ft.object,Ke=Ft.geometry,Ee=Ft.material,wn=Ft.group;if(Ee.side===kn&&de.layers.test(X.layers)){const ce=Ee.side;Ee.side=Ye,Ee.needsUpdate=!0,Hl(de,W,X,Ke,Ee,wn),Ee.side=ce,Ee.needsUpdate=!0,Ct=!0}}Ct===!0&&(It.updateMultisampleRenderTarget(xt),It.updateRenderTargetMipmap(xt)),x.setRenderTarget(vt),x.setClearColor(q,L),x.toneMapping=Et}function xr(T,k,W){const X=k.isScene===!0?k.overrideMaterial:null;for(let j=0,ft=T.length;j<ft;j++){const vt=T[j],Et=vt.object,Ct=vt.geometry,Bt=X===null?vt.material:X,Ot=vt.group;Et.layers.test(W.layers)&&Hl(Et,k,W,Ct,Bt,Ot)}}function Hl(T,k,W,X,j,ft){T.onBeforeRender(x,k,W,X,j,ft),T.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),j.onBeforeRender(x,k,W,X,T,ft),j.transparent===!0&&j.side===kn&&j.forceSinglePass===!1?(j.side=Ye,j.needsUpdate=!0,x.renderBufferDirect(W,k,X,j,T,ft),j.side=hi,j.needsUpdate=!0,x.renderBufferDirect(W,k,X,j,T,ft),j.side=kn):x.renderBufferDirect(W,k,X,j,T,ft),T.onAfterRender(x,k,W,X,j,ft)}function vr(T,k,W){k.isScene!==!0&&(k=ie);const X=Ut.get(T),j=p.state.lights,ft=p.state.shadowsArray,vt=j.state.version,Et=V.getParameters(T,j.state,ft,k,W),Ct=V.getProgramCacheKey(Et);let Bt=X.programs;X.environment=T.isMeshStandardMaterial?k.environment:null,X.fog=k.fog,X.envMap=(T.isMeshStandardMaterial?pe:Kt).get(T.envMap||X.environment),Bt===void 0&&(T.addEventListener("dispose",et),Bt=new Map,X.programs=Bt);let Ot=Bt.get(Ct);if(Ot!==void 0){if(X.currentProgram===Ot&&X.lightsStateVersion===vt)return Gl(T,Et),Ot}else Et.uniforms=V.getUniforms(T),T.onBuild(W,Et,x),T.onBeforeCompile(Et,x),Ot=V.acquireProgram(Et,Ct),Bt.set(Ct,Ot),X.uniforms=Et.uniforms;const Ft=X.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ft.clippingPlanes=gt.uniform),Gl(T,Et),X.needsLights=Nf(T),X.lightsStateVersion=vt,X.needsLights&&(Ft.ambientLightColor.value=j.state.ambient,Ft.lightProbe.value=j.state.probe,Ft.directionalLights.value=j.state.directional,Ft.directionalLightShadows.value=j.state.directionalShadow,Ft.spotLights.value=j.state.spot,Ft.spotLightShadows.value=j.state.spotShadow,Ft.rectAreaLights.value=j.state.rectArea,Ft.ltc_1.value=j.state.rectAreaLTC1,Ft.ltc_2.value=j.state.rectAreaLTC2,Ft.pointLights.value=j.state.point,Ft.pointLightShadows.value=j.state.pointShadow,Ft.hemisphereLights.value=j.state.hemi,Ft.directionalShadowMap.value=j.state.directionalShadowMap,Ft.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Ft.spotShadowMap.value=j.state.spotShadowMap,Ft.spotLightMatrix.value=j.state.spotLightMatrix,Ft.spotLightMap.value=j.state.spotLightMap,Ft.pointShadowMap.value=j.state.pointShadowMap,Ft.pointShadowMatrix.value=j.state.pointShadowMatrix),X.currentProgram=Ot,X.uniformsList=null,Ot}function Vl(T){if(T.uniformsList===null){const k=T.currentProgram.getUniforms();T.uniformsList=co.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function Gl(T,k){const W=Ut.get(T);W.outputColorSpace=k.outputColorSpace,W.instancing=k.instancing,W.instancingColor=k.instancingColor,W.skinning=k.skinning,W.morphTargets=k.morphTargets,W.morphNormals=k.morphNormals,W.morphColors=k.morphColors,W.morphTargetsCount=k.morphTargetsCount,W.numClippingPlanes=k.numClippingPlanes,W.numIntersection=k.numClipIntersection,W.vertexAlphas=k.vertexAlphas,W.vertexTangents=k.vertexTangents,W.toneMapping=k.toneMapping}function Uf(T,k,W,X,j){k.isScene!==!0&&(k=ie),It.resetTextureUnits();const ft=k.fog,vt=X.isMeshStandardMaterial?k.environment:null,Et=S===null?x.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:Xn,Ct=(X.isMeshStandardMaterial?pe:Kt).get(X.envMap||vt),Bt=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ot=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ft=!!W.morphAttributes.position,de=!!W.morphAttributes.normal,Ke=!!W.morphAttributes.color;let Ee=ai;X.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(Ee=x.toneMapping);const wn=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ce=wn!==void 0?wn.length:0,jt=Ut.get(X),Yo=p.state.lights;if(ht===!0&&(dt===!0||T!==M)){const Ze=T===M&&X.id===P;gt.setState(X,T,Ze)}let ge=!1;X.version===jt.__version?(jt.needsLights&&jt.lightsStateVersion!==Yo.state.version||jt.outputColorSpace!==Et||j.isInstancedMesh&&jt.instancing===!1||!j.isInstancedMesh&&jt.instancing===!0||j.isSkinnedMesh&&jt.skinning===!1||!j.isSkinnedMesh&&jt.skinning===!0||j.isInstancedMesh&&jt.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&jt.instancingColor===!1&&j.instanceColor!==null||jt.envMap!==Ct||X.fog===!0&&jt.fog!==ft||jt.numClippingPlanes!==void 0&&(jt.numClippingPlanes!==gt.numPlanes||jt.numIntersection!==gt.numIntersection)||jt.vertexAlphas!==Bt||jt.vertexTangents!==Ot||jt.morphTargets!==Ft||jt.morphNormals!==de||jt.morphColors!==Ke||jt.toneMapping!==Ee||wt.isWebGL2===!0&&jt.morphTargetsCount!==ce)&&(ge=!0):(ge=!0,jt.__version=X.version);let pi=jt.currentProgram;ge===!0&&(pi=vr(X,k,j));let Wl=!1,Ts=!1,qo=!1;const ze=pi.getUniforms(),mi=jt.uniforms;if(Rt.useProgram(pi.program)&&(Wl=!0,Ts=!0,qo=!0),X.id!==P&&(P=X.id,Ts=!0),Wl||M!==T){ze.setValue(H,"projectionMatrix",T.projectionMatrix),ze.setValue(H,"viewMatrix",T.matrixWorldInverse);const Ze=ze.map.cameraPosition;Ze!==void 0&&Ze.setValue(H,Dt.setFromMatrixPosition(T.matrixWorld)),wt.logarithmicDepthBuffer&&ze.setValue(H,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&ze.setValue(H,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,Ts=!0,qo=!0)}if(j.isSkinnedMesh){ze.setOptional(H,j,"bindMatrix"),ze.setOptional(H,j,"bindMatrixInverse");const Ze=j.skeleton;Ze&&(wt.floatVertexTextures?(Ze.boneTexture===null&&Ze.computeBoneTexture(),ze.setValue(H,"boneTexture",Ze.boneTexture,It),ze.setValue(H,"boneTextureSize",Ze.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const $o=W.morphAttributes;if(($o.position!==void 0||$o.normal!==void 0||$o.color!==void 0&&wt.isWebGL2===!0)&&C.update(j,W,pi),(Ts||jt.receiveShadow!==j.receiveShadow)&&(jt.receiveShadow=j.receiveShadow,ze.setValue(H,"receiveShadow",j.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(mi.envMap.value=Ct,mi.flipEnvMap.value=Ct.isCubeTexture&&Ct.isRenderTargetTexture===!1?-1:1),Ts&&(ze.setValue(H,"toneMappingExposure",x.toneMappingExposure),jt.needsLights&&Ff(mi,qo),ft&&X.fog===!0&&nt.refreshFogUniforms(mi,ft),nt.refreshMaterialUniforms(mi,X,B,I,xt),co.upload(H,Vl(jt),mi,It)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(co.upload(H,Vl(jt),mi,It),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&ze.setValue(H,"center",j.center),ze.setValue(H,"modelViewMatrix",j.modelViewMatrix),ze.setValue(H,"normalMatrix",j.normalMatrix),ze.setValue(H,"modelMatrix",j.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const Ze=X.uniformsGroups;for(let Ko=0,kf=Ze.length;Ko<kf;Ko++)if(wt.isWebGL2){const Xl=Ze[Ko];yt.update(Xl,pi),yt.bind(Xl,pi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return pi}function Ff(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function Nf(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(T,k,W){Ut.get(T.texture).__webglTexture=k,Ut.get(T.depthTexture).__webglTexture=W;const X=Ut.get(T);X.__hasExternalTextures=!0,X.__hasExternalTextures&&(X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||Mt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(T,k){const W=Ut.get(T);W.__webglFramebuffer=k,W.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(T,k=0,W=0){S=T,b=k,A=W;let X=!0,j=null,ft=!1,vt=!1;if(T){const Ct=Ut.get(T);Ct.__useDefaultFramebuffer!==void 0?(Rt.bindFramebuffer(H.FRAMEBUFFER,null),X=!1):Ct.__webglFramebuffer===void 0?It.setupRenderTarget(T):Ct.__hasExternalTextures&&It.rebindTextures(T,Ut.get(T.texture).__webglTexture,Ut.get(T.depthTexture).__webglTexture);const Bt=T.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(vt=!0);const Ot=Ut.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ot[k])?j=Ot[k][W]:j=Ot[k],ft=!0):wt.isWebGL2&&T.samples>0&&It.useMultisampledRTT(T)===!1?j=Ut.get(T).__webglMultisampledFramebuffer:Array.isArray(Ot)?j=Ot[W]:j=Ot,w.copy(T.viewport),N.copy(T.scissor),z=T.scissorTest}else w.copy(Z).multiplyScalar(B).floor(),N.copy(O).multiplyScalar(B).floor(),z=G;if(Rt.bindFramebuffer(H.FRAMEBUFFER,j)&&wt.drawBuffers&&X&&Rt.drawBuffers(T,j),Rt.viewport(w),Rt.scissor(N),Rt.setScissorTest(z),ft){const Ct=Ut.get(T.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+k,Ct.__webglTexture,W)}else if(vt){const Ct=Ut.get(T.texture),Bt=k||0;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,Ct.__webglTexture,W||0,Bt)}P=-1},this.readRenderTargetPixels=function(T,k,W,X,j,ft,vt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=Ut.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&vt!==void 0&&(Et=Et[vt]),Et){Rt.bindFramebuffer(H.FRAMEBUFFER,Et);try{const Ct=T.texture,Bt=Ct.format,Ot=Ct.type;if(Bt!==mn&&St.convert(Bt)!==H.getParameter(H.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ft=Ot===nr&&(Mt.has("EXT_color_buffer_half_float")||wt.isWebGL2&&Mt.has("EXT_color_buffer_float"));if(Ot!==li&&St.convert(Ot)!==H.getParameter(H.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ot===Qn&&(wt.isWebGL2||Mt.has("OES_texture_float")||Mt.has("WEBGL_color_buffer_float")))&&!Ft){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-X&&W>=0&&W<=T.height-j&&H.readPixels(k,W,X,j,St.convert(Bt),St.convert(Ot),ft)}finally{const Ct=S!==null?Ut.get(S).__webglFramebuffer:null;Rt.bindFramebuffer(H.FRAMEBUFFER,Ct)}}},this.copyFramebufferToTexture=function(T,k,W=0){const X=Math.pow(2,-W),j=Math.floor(k.image.width*X),ft=Math.floor(k.image.height*X);It.setTexture2D(k,0),H.copyTexSubImage2D(H.TEXTURE_2D,W,0,0,T.x,T.y,j,ft),Rt.unbindTexture()},this.copyTextureToTexture=function(T,k,W,X=0){const j=k.image.width,ft=k.image.height,vt=St.convert(W.format),Et=St.convert(W.type);It.setTexture2D(W,0),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,W.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,W.unpackAlignment),k.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,X,T.x,T.y,j,ft,vt,Et,k.image.data):k.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,X,T.x,T.y,k.mipmaps[0].width,k.mipmaps[0].height,vt,k.mipmaps[0].data):H.texSubImage2D(H.TEXTURE_2D,X,T.x,T.y,vt,Et,k.image),X===0&&W.generateMipmaps&&H.generateMipmap(H.TEXTURE_2D),Rt.unbindTexture()},this.copyTextureToTexture3D=function(T,k,W,X,j=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ft=T.max.x-T.min.x+1,vt=T.max.y-T.min.y+1,Et=T.max.z-T.min.z+1,Ct=St.convert(X.format),Bt=St.convert(X.type);let Ot;if(X.isData3DTexture)It.setTexture3D(X,0),Ot=H.TEXTURE_3D;else if(X.isDataArrayTexture)It.setTexture2DArray(X,0),Ot=H.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,X.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,X.unpackAlignment);const Ft=H.getParameter(H.UNPACK_ROW_LENGTH),de=H.getParameter(H.UNPACK_IMAGE_HEIGHT),Ke=H.getParameter(H.UNPACK_SKIP_PIXELS),Ee=H.getParameter(H.UNPACK_SKIP_ROWS),wn=H.getParameter(H.UNPACK_SKIP_IMAGES),ce=W.isCompressedTexture?W.mipmaps[0]:W.image;H.pixelStorei(H.UNPACK_ROW_LENGTH,ce.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,ce.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,T.min.x),H.pixelStorei(H.UNPACK_SKIP_ROWS,T.min.y),H.pixelStorei(H.UNPACK_SKIP_IMAGES,T.min.z),W.isDataTexture||W.isData3DTexture?H.texSubImage3D(Ot,j,k.x,k.y,k.z,ft,vt,Et,Ct,Bt,ce.data):W.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),H.compressedTexSubImage3D(Ot,j,k.x,k.y,k.z,ft,vt,Et,Ct,ce.data)):H.texSubImage3D(Ot,j,k.x,k.y,k.z,ft,vt,Et,Ct,Bt,ce),H.pixelStorei(H.UNPACK_ROW_LENGTH,Ft),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,de),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Ke),H.pixelStorei(H.UNPACK_SKIP_ROWS,Ee),H.pixelStorei(H.UNPACK_SKIP_IMAGES,wn),j===0&&X.generateMipmaps&&H.generateMipmap(Ot),Rt.unbindTexture()},this.initTexture=function(T){T.isCubeTexture?It.setTextureCube(T,0):T.isData3DTexture?It.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?It.setTexture2DArray(T,0):It.setTexture2D(T,0),Rt.unbindTexture()},this.resetState=function(){b=0,A=0,S=null,Rt.reset(),_t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===bl?"display-p3":"srgb",e.unpackColorSpace=te.workingColorSpace===No?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(t){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!t}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===we?Di:ud}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Di?we:Xn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class gv extends Pd{}gv.prototype.isWebGL1Renderer=!0;class _v extends Ne{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class xv{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ka,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=Gn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const He=new U;class wo{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)He.fromBufferAttribute(this,e),He.applyMatrix4(t),this.setXYZ(e,He.x,He.y,He.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)He.fromBufferAttribute(this,e),He.applyNormalMatrix(t),this.setXYZ(e,He.x,He.y,He.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)He.fromBufferAttribute(this,e),He.transformDirection(t),this.setXYZ(e,He.x,He.y,He.z);return this}setX(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=En(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=En(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=En(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=En(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array),s=Qt(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array),s=Qt(s,this.array),r=Qt(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new he(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new wo(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ld extends zi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ht(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let os;const Ps=new U,as=new U,ls=new U,cs=new Pt,Ls=new Pt,Dd=new xe,Vr=new U,Ds=new U,Gr=new U,mh=new Pt,Aa=new Pt,gh=new Pt;class vv extends Ne{constructor(t=new Ld){if(super(),this.isSprite=!0,this.type="Sprite",os===void 0){os=new $e;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new xv(e,5);os.setIndex([0,1,2,0,2,3]),os.setAttribute("position",new wo(n,3,0,!1)),os.setAttribute("uv",new wo(n,2,3,!1))}this.geometry=os,this.material=t,this.center=new Pt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),as.setFromMatrixScale(this.matrixWorld),Dd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ls.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&as.multiplyScalar(-ls.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Wr(Vr.set(-.5,-.5,0),ls,o,as,s,r),Wr(Ds.set(.5,-.5,0),ls,o,as,s,r),Wr(Gr.set(.5,.5,0),ls,o,as,s,r),mh.set(0,0),Aa.set(1,0),gh.set(1,1);let a=t.ray.intersectTriangle(Vr,Ds,Gr,!1,Ps);if(a===null&&(Wr(Ds.set(-.5,.5,0),ls,o,as,s,r),Aa.set(0,1),a=t.ray.intersectTriangle(Vr,Gr,Ds,!1,Ps),a===null))return;const l=t.ray.origin.distanceTo(Ps);l<t.near||l>t.far||e.push({distance:l,point:Ps.clone(),uv:ln.getInterpolation(Ps,Vr,Ds,Gr,mh,Aa,gh,new Pt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Wr(i,t,e,n,s,r){cs.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Ls.x=r*cs.x-s*cs.y,Ls.y=s*cs.x+r*cs.y):Ls.copy(cs),i.copy(t),i.x+=Ls.x,i.y+=Ls.y,i.applyMatrix4(Dd)}class bv extends zi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const _h=new U,xh=new U,vh=new xe,wa=new ko,Xr=new fr;class Mv extends Ne{constructor(t=new $e,e=new bv){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)_h.fromBufferAttribute(e,s-1),xh.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=_h.distanceTo(xh);t.setAttribute("lineDistance",new Wn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xr.copy(n.boundingSphere),Xr.applyMatrix4(s),Xr.radius+=r,t.ray.intersectsSphere(Xr)===!1)return;vh.copy(s).invert(),wa.copy(t.ray).applyMatrix4(vh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new U,h=new U,u=new U,d=new U,f=this.isLineSegments?2:1,g=n.index,p=n.attributes.position;if(g!==null){const m=Math.max(0,o.start),v=Math.min(g.count,o.start+o.count);for(let x=m,y=v-1;x<y;x+=f){const b=g.getX(x),A=g.getX(x+1);if(c.fromBufferAttribute(p,b),h.fromBufferAttribute(p,A),wa.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const P=t.ray.origin.distanceTo(d);P<t.near||P>t.far||e.push({distance:P,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const m=Math.max(0,o.start),v=Math.min(p.count,o.start+o.count);for(let x=m,y=v-1;x<y;x+=f){if(c.fromBufferAttribute(p,x),h.fromBufferAttribute(p,x+1),wa.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const A=t.ray.origin.distanceTo(d);A<t.near||A>t.far||e.push({distance:A,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}const bh=new U,Mh=new U;class yv extends Mv{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)bh.fromBufferAttribute(e,s),Mh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+bh.distanceTo(Mh);t.setAttribute("lineDistance",new Wn(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Id extends zi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ht(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const yh=new xe,tl=new ko,jr=new fr,Yr=new U;class el extends Ne{constructor(t=new $e,e=new Id){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),jr.copy(n.boundingSphere),jr.applyMatrix4(s),jr.radius+=r,t.ray.intersectsSphere(jr)===!1)return;yh.copy(s).invert(),tl.copy(t.ray).applyMatrix4(yh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,_=f;g<_;g++){const p=c.getX(g);Yr.fromBufferAttribute(u,p),Sh(Yr,p,l,s,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,_=f;g<_;g++)Yr.fromBufferAttribute(u,g),Sh(Yr,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Sh(i,t,e,n,s,r,o){const a=tl.distanceSqToPoint(i);if(a<e){const l=new U;tl.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,object:o})}}class Sv extends qe{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Eh{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ue(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xl);const Th={type:"change"},Ra={type:"start"},Ah={type:"end"},qr=new ko,wh=new Zn,Ev=Math.cos(70*um.DEG2RAD);class Rh extends Bi{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Vi.ROTATE,MIDDLE:Vi.DOLLY,RIGHT:Vi.PAN},this.touches={ONE:Gi.ROTATE,TWO:Gi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(C){C.addEventListener("keydown",E),this._domElementKeyEvents=C},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",E),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Th),n.update(),r=s.NONE},this.update=function(){const C=new U,rt=new Fi().setFromUnitVectors(t.up,new U(0,1,0)),Q=rt.clone().invert(),St=new U,_t=new Fi,yt=new U,mt=2*Math.PI;return function(Wt=null){const D=n.object.position;C.copy(D).sub(n.target),C.applyQuaternion(rt),a.setFromVector3(C),n.autoRotate&&r===s.NONE&&N(M(Wt)),n.enableDamping?(a.theta+=l.theta*n.dampingFactor,a.phi+=l.phi*n.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let at=n.minAzimuthAngle,et=n.maxAzimuthAngle;isFinite(at)&&isFinite(et)&&(at<-Math.PI?at+=mt:at>Math.PI&&(at-=mt),et<-Math.PI?et+=mt:et>Math.PI&&(et-=mt),at<=et?a.theta=Math.max(at,Math.min(et,a.theta)):a.theta=a.theta>(at+et)/2?Math.max(at,a.theta):Math.min(et,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&A||n.object.isOrthographicCamera?a.radius=$(a.radius):a.radius=$(a.radius*c),C.setFromSpherical(a),C.applyQuaternion(Q),D.copy(n.target).add(C),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),h.set(0,0,0));let Y=!1;if(n.zoomToCursor&&A){let st=null;if(n.object.isPerspectiveCamera){const bt=C.length();st=$(bt*c);const Xt=bt-st;n.object.position.addScaledVector(y,Xt),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const bt=new U(b.x,b.y,0);bt.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),Y=!0;const Xt=new U(b.x,b.y,0);Xt.unproject(n.object),n.object.position.sub(Xt).add(bt),n.object.updateMatrixWorld(),st=C.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;st!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(st).add(n.object.position):(qr.origin.copy(n.object.position),qr.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(qr.direction))<Ev?t.lookAt(n.target):(wh.setFromNormalAndCoplanarPoint(n.object.up,n.target),qr.intersectPlane(wh,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),Y=!0);return c=1,A=!1,Y||St.distanceToSquared(n.object.position)>o||8*(1-_t.dot(n.object.quaternion))>o||yt.distanceToSquared(n.target)>0?(n.dispatchEvent(Th),St.copy(n.object.position),_t.copy(n.object.quaternion),yt.copy(n.target),Y=!1,!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",tt),n.domElement.removeEventListener("pointerdown",Ut),n.domElement.removeEventListener("pointercancel",Kt),n.domElement.removeEventListener("wheel",R),n.domElement.removeEventListener("pointermove",It),n.domElement.removeEventListener("pointerup",Kt),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",E),n._domElementKeyEvents=null)};const n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=s.NONE;const o=1e-6,a=new Eh,l=new Eh;let c=1;const h=new U,u=new Pt,d=new Pt,f=new Pt,g=new Pt,_=new Pt,p=new Pt,m=new Pt,v=new Pt,x=new Pt,y=new U,b=new Pt;let A=!1;const S=[],P={};function M(C){return C!==null?2*Math.PI/60*n.autoRotateSpeed*C:2*Math.PI/60/60*n.autoRotateSpeed}function w(){return Math.pow(.95,n.zoomSpeed)}function N(C){l.theta-=C}function z(C){l.phi-=C}const q=function(){const C=new U;return function(Q,St){C.setFromMatrixColumn(St,0),C.multiplyScalar(-Q),h.add(C)}}(),L=function(){const C=new U;return function(Q,St){n.screenSpacePanning===!0?C.setFromMatrixColumn(St,1):(C.setFromMatrixColumn(St,0),C.crossVectors(n.object.up,C)),C.multiplyScalar(Q),h.add(C)}}(),F=function(){const C=new U;return function(Q,St){const _t=n.domElement;if(n.object.isPerspectiveCamera){const yt=n.object.position;C.copy(yt).sub(n.target);let mt=C.length();mt*=Math.tan(n.object.fov/2*Math.PI/180),q(2*Q*mt/_t.clientHeight,n.object.matrix),L(2*St*mt/_t.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(q(Q*(n.object.right-n.object.left)/n.object.zoom/_t.clientWidth,n.object.matrix),L(St*(n.object.top-n.object.bottom)/n.object.zoom/_t.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function I(C){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=C:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function B(C){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=C:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function J(C){if(!n.zoomToCursor)return;A=!0;const rt=n.domElement.getBoundingClientRect(),Q=C.clientX-rt.left,St=C.clientY-rt.top,_t=rt.width,yt=rt.height;b.x=Q/_t*2-1,b.y=-(St/yt)*2+1,y.set(b.x,b.y,1).unproject(n.object).sub(n.object.position).normalize()}function $(C){return Math.max(n.minDistance,Math.min(n.maxDistance,C))}function Z(C){u.set(C.clientX,C.clientY)}function O(C){J(C),m.set(C.clientX,C.clientY)}function G(C){g.set(C.clientX,C.clientY)}function ct(C){d.set(C.clientX,C.clientY),f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const rt=n.domElement;N(2*Math.PI*f.x/rt.clientHeight),z(2*Math.PI*f.y/rt.clientHeight),u.copy(d),n.update()}function ht(C){v.set(C.clientX,C.clientY),x.subVectors(v,m),x.y>0?I(w()):x.y<0&&B(w()),m.copy(v),n.update()}function dt(C){_.set(C.clientX,C.clientY),p.subVectors(_,g).multiplyScalar(n.panSpeed),F(p.x,p.y),g.copy(_),n.update()}function xt(C){J(C),C.deltaY<0?B(w()):C.deltaY>0&&I(w()),n.update()}function Vt(C){let rt=!1;switch(C.code){case n.keys.UP:C.ctrlKey||C.metaKey||C.shiftKey?z(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):F(0,n.keyPanSpeed),rt=!0;break;case n.keys.BOTTOM:C.ctrlKey||C.metaKey||C.shiftKey?z(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):F(0,-n.keyPanSpeed),rt=!0;break;case n.keys.LEFT:C.ctrlKey||C.metaKey||C.shiftKey?N(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):F(n.keyPanSpeed,0),rt=!0;break;case n.keys.RIGHT:C.ctrlKey||C.metaKey||C.shiftKey?N(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):F(-n.keyPanSpeed,0),rt=!0;break}rt&&(C.preventDefault(),n.update())}function At(){if(S.length===1)u.set(S[0].pageX,S[0].pageY);else{const C=.5*(S[0].pageX+S[1].pageX),rt=.5*(S[0].pageY+S[1].pageY);u.set(C,rt)}}function Dt(){if(S.length===1)g.set(S[0].pageX,S[0].pageY);else{const C=.5*(S[0].pageX+S[1].pageX),rt=.5*(S[0].pageY+S[1].pageY);g.set(C,rt)}}function ie(){const C=S[0].pageX-S[1].pageX,rt=S[0].pageY-S[1].pageY,Q=Math.sqrt(C*C+rt*rt);m.set(0,Q)}function Nt(){n.enableZoom&&ie(),n.enablePan&&Dt()}function H(){n.enableZoom&&ie(),n.enableRotate&&At()}function Pe(C){if(S.length==1)d.set(C.pageX,C.pageY);else{const Q=ut(C),St=.5*(C.pageX+Q.x),_t=.5*(C.pageY+Q.y);d.set(St,_t)}f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const rt=n.domElement;N(2*Math.PI*f.x/rt.clientHeight),z(2*Math.PI*f.y/rt.clientHeight),u.copy(d)}function Mt(C){if(S.length===1)_.set(C.pageX,C.pageY);else{const rt=ut(C),Q=.5*(C.pageX+rt.x),St=.5*(C.pageY+rt.y);_.set(Q,St)}p.subVectors(_,g).multiplyScalar(n.panSpeed),F(p.x,p.y),g.copy(_)}function wt(C){const rt=ut(C),Q=C.pageX-rt.x,St=C.pageY-rt.y,_t=Math.sqrt(Q*Q+St*St);v.set(0,_t),x.set(0,Math.pow(v.y/m.y,n.zoomSpeed)),I(x.y),m.copy(v)}function Rt(C){n.enableZoom&&wt(C),n.enablePan&&Mt(C)}function ae(C){n.enableZoom&&wt(C),n.enableRotate&&Pe(C)}function Ut(C){n.enabled!==!1&&(S.length===0&&(n.domElement.setPointerCapture(C.pointerId),n.domElement.addEventListener("pointermove",It),n.domElement.addEventListener("pointerup",Kt)),it(C),C.pointerType==="touch"?V(C):pe(C))}function It(C){n.enabled!==!1&&(C.pointerType==="touch"?nt(C):Se(C))}function Kt(C){gt(C),S.length===0&&(n.domElement.releasePointerCapture(C.pointerId),n.domElement.removeEventListener("pointermove",It),n.domElement.removeEventListener("pointerup",Kt)),n.dispatchEvent(Ah),r=s.NONE}function pe(C){let rt;switch(C.button){case 0:rt=n.mouseButtons.LEFT;break;case 1:rt=n.mouseButtons.MIDDLE;break;case 2:rt=n.mouseButtons.RIGHT;break;default:rt=-1}switch(rt){case Vi.DOLLY:if(n.enableZoom===!1)return;O(C),r=s.DOLLY;break;case Vi.ROTATE:if(C.ctrlKey||C.metaKey||C.shiftKey){if(n.enablePan===!1)return;G(C),r=s.PAN}else{if(n.enableRotate===!1)return;Z(C),r=s.ROTATE}break;case Vi.PAN:if(C.ctrlKey||C.metaKey||C.shiftKey){if(n.enableRotate===!1)return;Z(C),r=s.ROTATE}else{if(n.enablePan===!1)return;G(C),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(Ra)}function Se(C){switch(r){case s.ROTATE:if(n.enableRotate===!1)return;ct(C);break;case s.DOLLY:if(n.enableZoom===!1)return;ht(C);break;case s.PAN:if(n.enablePan===!1)return;dt(C);break}}function R(C){n.enabled===!1||n.enableZoom===!1||r!==s.NONE||(C.preventDefault(),n.dispatchEvent(Ra),xt(C),n.dispatchEvent(Ah))}function E(C){n.enabled===!1||n.enablePan===!1||Vt(C)}function V(C){switch(ot(C),S.length){case 1:switch(n.touches.ONE){case Gi.ROTATE:if(n.enableRotate===!1)return;At(),r=s.TOUCH_ROTATE;break;case Gi.PAN:if(n.enablePan===!1)return;Dt(),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(n.touches.TWO){case Gi.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Nt(),r=s.TOUCH_DOLLY_PAN;break;case Gi.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;H(),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(Ra)}function nt(C){switch(ot(C),r){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;Pe(C),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;Mt(C),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Rt(C),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ae(C),n.update();break;default:r=s.NONE}}function tt(C){n.enabled!==!1&&C.preventDefault()}function it(C){S.push(C)}function gt(C){delete P[C.pointerId];for(let rt=0;rt<S.length;rt++)if(S[rt].pointerId==C.pointerId){S.splice(rt,1);return}}function ot(C){let rt=P[C.pointerId];rt===void 0&&(rt=new Pt,P[C.pointerId]=rt),rt.set(C.pageX,C.pageY)}function ut(C){const rt=C.pointerId===S[0].pointerId?S[1]:S[0];return P[rt.pointerId]}n.domElement.addEventListener("contextmenu",tt),n.domElement.addEventListener("pointerdown",Ut),n.domElement.addEventListener("pointercancel",Kt),n.domElement.addEventListener("wheel",R,{passive:!1}),this.update()}}const qt=Object.freeze({seed:773,starCount:1e5,dustCount:9e3,bulgeFraction:.18,haloFraction:.035,armFraction:.48,diskScale:3.5,diskEdge:26,thinHeight:.16,thickHeight:.6,bulgeScale:.75,bulgeEdge:4,bulgeFlattening:.7,haloEdge:32,pitchDegrees:13,arms:4,armStart:2.4,armWidth:.22,armHeight:.08,starExposure:.65,maxPixelRatio:1.5,trailSegments:4096});function Od(i){return()=>{i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}class Tv{constructor(){K(this,"scene",new _v);K(this,"renderer");K(this,"camera1",new nn(42,1,.03,1200));K(this,"camera2",new nn(42,1,.03,1200));K(this,"controls1");K(this,"controls2");K(this,"splitMode",!1);K(this,"hit1",document.getElementById("camera-left"));K(this,"hit2",document.getElementById("camera-right"));this.scene.background=new Ht("#03060d"),this.renderer=new Pd({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,qt.maxPixelRatio)),this.renderer.toneMapping=id,this.renderer.toneMappingExposure=1,this.renderer.autoClear=!1,document.getElementById("canvas-container").appendChild(this.renderer.domElement),this.camera1.up.set(0,0,1),this.camera2.up.set(0,0,1),this.camera1.position.set(0,-32,30),this.camera2.position.copy(this.camera1.position),this.camera1.layers.enable(1),this.camera2.layers.enable(2),this.controls1=new Rh(this.camera1,this.hit1),this.controls2=new Rh(this.camera2,this.hit2);for(const t of[this.controls1,this.controls2])t.enableDamping=!0,t.dampingFactor=.08,t.minDistance=1,t.maxDistance=150,t.maxPolarAngle=Math.PI-.01;this.controls2.enabled=!1,window.addEventListener("resize",()=>this.onResize()),this.onResize()}setSplit(t){this.splitMode=t,this.hit1.style.width=t?"50%":"100%",this.hit2.style.display=t?"block":"none",this.controls2.enabled=t,this.camera2.position.copy(this.camera1.position),this.controls2.target.copy(this.controls1.target),this.onResize()}onResize(){const t=innerWidth,e=innerHeight;this.renderer.setSize(t,e);for(const n of[this.camera1,this.camera2])n.aspect=t/(this.splitMode?2:1)/e,n.updateProjectionMatrix()}view(t){const e=t==="top"?[0,-.01,48]:t==="edge"?[0,-44,2]:[0,-32,30];for(const[n,s]of[[this.camera1,this.controls1],[this.camera2,this.controls2]])n.position.set(e[0],e[1],e[2]),s.target.set(0,0,0),s.update()}render(){this.controls1.update(),this.splitMode&&this.controls2.update();const t=innerWidth,e=innerHeight;this.renderer.setScissorTest(!1),this.renderer.clear(),this.renderer.setScissorTest(!0),this.renderer.setViewport(0,0,t/(this.splitMode?2:1),e),this.renderer.setScissor(0,0,t/(this.splitMode?2:1),e),this.renderer.render(this.scene,this.camera1),this.splitMode&&(this.renderer.setViewport(t/2,0,t/2,e),this.renderer.setScissor(t/2,0,t/2,e),this.renderer.render(this.scene,this.camera2))}}const Av=`
attribute float size; attribute vec3 customColor; attribute float alphaMult;
varying vec3 vColor; varying float vAlpha;
void main(){vColor=customColor;vAlpha=alphaMult;vec4 mv=modelViewMatrix*vec4(position,1.);
gl_PointSize=clamp(size*160./max(1.,-mv.z),.8,14.);gl_Position=projectionMatrix*mv;}`,wv=`
varying vec3 vColor;varying float vAlpha;
void main(){float r=length(gl_PointCoord-.5);if(r>.5)discard;
float core=exp(-r*r*65.);float glow=exp(-r*r*16.)*.23;
gl_FragColor=vec4(vColor,(core+glow)*vAlpha);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,Rv=`
attribute float size;attribute float opacity;varying float vOpacity;
void main(){vOpacity=opacity;vec4 mv=modelViewMatrix*vec4(position,1.);gl_PointSize=clamp(size*240./max(1.,-mv.z),1.,32.);gl_Position=projectionMatrix*mv;}`,Cv=`
varying float vOpacity;
void main(){float r=length(gl_PointCoord-.5);if(r>.5)discard;gl_FragColor=vec4(.012,.008,.012,exp(-r*r*20.)*vOpacity);}`;class Pv{constructor(t){K(this,"group",new Bs);t.add(this.group),this.build()}build(t=1){for(const b of[...this.group.children]){const A=b;A.geometry.dispose(),A.material.dispose(),this.group.remove(A)}const e=Od(qt.seed),n=()=>Math.max(Number.EPSILON,e()),s=()=>Math.sqrt(-2*Math.log(n()))*Math.cos(2*Math.PI*n()),r=()=>{let b;do b=-qt.diskScale*Math.log(n()*n());while(b>qt.diskEdge);return b},o=(b,A)=>A*2*Math.PI/qt.arms+Math.log(b/qt.armStart)/Math.tan(qt.pitchDegrees*Math.PI/180),a=Math.floor(qt.starCount*t),l=new Float32Array(a*3),c=new Float32Array(a*3),h=new Float32Array(a),u=new Float32Array(a);for(let b=0;b<a;b++){const A=e();let S,P,M,w,N;if(A<qt.bulgeFraction){const z=(qt.bulgeEdge/(qt.bulgeEdge+qt.bulgeScale))**2,q=Math.sqrt(n()*z),L=qt.bulgeScale*q/(1-q),F=2*e()-1;S=L*Math.sqrt(1-F*F),P=L*F*qt.bulgeFlattening,M=2*Math.PI*e(),w=new Ht().setRGB(1,.66+.22*e(),.42+.25*e()),N=.3}else if(A<qt.bulgeFraction+qt.haloFraction){const z=qt.haloEdge*Math.pow(n(),.6),q=2*e()-1;S=z*Math.sqrt(1-q*q),P=z*q,M=2*Math.PI*e(),w=new Ht(.63,.67,.8),N=.12}else if(A<qt.bulgeFraction+qt.haloFraction+qt.armFraction){do S=r();while(S<qt.armStart);const z=Math.floor(e()*qt.arms),q=1+.45*Math.sin(S*2.3+z*1.7);M=o(S,z)+s()*qt.armWidth*q/S,S+=s()*.15,P=s()*qt.armHeight;const L=e()<.012;w=L?new Ht(1,.32,.47):new Ht(.58+.4*e(),.72+.25*e(),1),N=L?.5:.3}else S=r(),M=2*Math.PI*e(),P=s()*(e()<.15?qt.thickHeight:qt.thinHeight),w=new Ht(.78+.22*e(),.72+.22*e(),.64+.3*e()),N=.17;l.set([S*Math.cos(M),S*Math.sin(M),P],b*3),c.set(w.toArray(),b*3),h[b]=.35+Math.min(4,Math.exp(s()*.7))*.65,u[b]=N*(.45+.55*e())*qt.starExposure/Math.sqrt(t)}const d=new $e;d.setAttribute("position",new he(l,3)),d.setAttribute("customColor",new he(c,3)),d.setAttribute("size",new he(h,1)),d.setAttribute("alphaMult",new he(u,1));const f=new An({vertexShader:Av,fragmentShader:wv,transparent:!0,depthWrite:!1,blending:Ga});this.group.add(new el(d,f));const g=Math.floor(qt.dustCount*t),_=new Float32Array(g*3),p=new Float32Array(g),m=new Float32Array(g);for(let b=0;b<g;b++){let A;do A=r();while(A<qt.armStart);const S=o(A,b%qt.arms)-.04+s()*.1/A;_.set([A*Math.cos(S),A*Math.sin(S),s()*.045],b*3),p[b]=.8+e()*1.7,m[b]=.05+e()*.08}const v=new $e;v.setAttribute("position",new he(_,3)),v.setAttribute("size",new he(p,1)),v.setAttribute("opacity",new he(m,1));const x=new An({vertexShader:Rv,fragmentShader:Cv,transparent:!0,depthWrite:!1}),y=new el(v,x);y.renderOrder=1,this.group.add(y)}}class Ch{constructor(t,e=16106619,n=1){K(this,"mesh");const s=document.createElement("canvas");s.width=64,s.height=64;const r=s.getContext("2d"),o=r.createRadialGradient(32,32,0,32,32,32);o.addColorStop(0,"#fff"),o.addColorStop(.15,"#fff"),o.addColorStop(.3,"rgba(255,255,255,.6)"),o.addColorStop(1,"rgba(255,255,255,0)"),r.fillStyle=o,r.fillRect(0,0,64,64),this.mesh=new vv(new Ld({map:new Sv(s),color:e,depthTest:!1,depthWrite:!1,transparent:!0})),this.mesh.scale.setScalar(.8),this.mesh.layers.set(n),this.mesh.renderOrder=5,t.add(this.mesh)}update(t,e){this.mesh.position.set(t[0],t[1],t[2]),this.mesh.scale.setScalar(this.mesh.position.distanceTo(e.position)*.012)}}class Ph{constructor(t,e,n=1){K(this,"line");K(this,"geo",new $e);K(this,"positions",new Float32Array(qt.trailSegments*6));K(this,"birth",new Float32Array(qt.trailSegments*2));K(this,"count",0);K(this,"previous",null);K(this,"material");this.geo.setAttribute("position",new he(this.positions,3).setUsage(Rc)),this.geo.setAttribute("birth",new he(this.birth,1).setUsage(Rc)),this.geo.setDrawRange(0,0),this.material=new An({uniforms:{color:{value:new Ht(e)},now:{value:0},span:{value:qt.trailSegments}},vertexShader:"attribute float birth;varying float age;uniform float now;uniform float span;void main(){age=clamp(1.-(now-birth)/span,0.,1.);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform vec3 color;varying float age;void main(){gl_FragColor=vec4(color,.12+.75*age);}",transparent:!0,depthWrite:!1,depthTest:!1}),this.line=new yv(this.geo,this.material),this.line.layers.set(n),this.line.frustumCulled=!1,this.line.renderOrder=4,t.add(this.line)}addPoint(t){if(this.previous){const e=this.count%qt.trailSegments;this.positions.set(this.previous,e*6),this.positions.set(t,e*6+3),this.birth.set([this.count,this.count],e*2),this.count++,this.material.uniforms.now.value=this.count,this.geo.setDrawRange(0,Math.min(this.count,qt.trailSegments)*2),this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.birth.needsUpdate=!0}this.previous=[...t]}clear(){this.count=0,this.previous=null,this.geo.setDrawRange(0,0)}}class Lv{constructor(t){const e=Od(123),n=new Float32Array(1800*3),s=new Float32Array(1800*3);for(let o=0;o<1800;o++){const a=2*e()-1,l=2*Math.PI*e(),c=600;n.set([c*Math.sqrt(1-a*a)*Math.cos(l),c*Math.sqrt(1-a*a)*Math.sin(l),c*a],o*3);const h=.08+.24*e();s.set([h*.8,h*.9,h],o*3)}const r=new $e;r.setAttribute("position",new he(n,3)),r.setAttribute("color",new he(s,3)),t.add(new el(r,new Id({size:1,sizeAttenuation:!1,vertexColors:!0,transparent:!0,opacity:.6,depthWrite:!1})))}}/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function mr(i){return i+.5|0}const ei=(i,t,e)=>Math.max(Math.min(i,e),t);function zs(i){return ei(mr(i*2.55),0,255)}function ci(i){return ei(mr(i*255),0,255)}function Nn(i){return ei(mr(i/2.55)/100,0,1)}function Lh(i){return ei(mr(i*100),0,100)}const on={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},nl=[..."0123456789ABCDEF"],Dv=i=>nl[i&15],Iv=i=>nl[(i&240)>>4]+nl[i&15],$r=i=>(i&240)>>4===(i&15),Ov=i=>$r(i.r)&&$r(i.g)&&$r(i.b)&&$r(i.a);function Uv(i){var t=i.length,e;return i[0]==="#"&&(t===4||t===5?e={r:255&on[i[1]]*17,g:255&on[i[2]]*17,b:255&on[i[3]]*17,a:t===5?on[i[4]]*17:255}:(t===7||t===9)&&(e={r:on[i[1]]<<4|on[i[2]],g:on[i[3]]<<4|on[i[4]],b:on[i[5]]<<4|on[i[6]],a:t===9?on[i[7]]<<4|on[i[8]]:255})),e}const Fv=(i,t)=>i<255?t(i):"";function Nv(i){var t=Ov(i)?Dv:Iv;return i?"#"+t(i.r)+t(i.g)+t(i.b)+Fv(i.a,t):void 0}const kv=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Ud(i,t,e){const n=t*Math.min(e,1-e),s=(r,o=(r+i/30)%12)=>e-n*Math.max(Math.min(o-3,9-o,1),-1);return[s(0),s(8),s(4)]}function Bv(i,t,e){const n=(s,r=(s+i/60)%6)=>e-e*t*Math.max(Math.min(r,4-r,1),0);return[n(5),n(3),n(1)]}function zv(i,t,e){const n=Ud(i,1,.5);let s;for(t+e>1&&(s=1/(t+e),t*=s,e*=s),s=0;s<3;s++)n[s]*=1-t-e,n[s]+=t;return n}function Hv(i,t,e,n,s){return i===s?(t-e)/n+(t<e?6:0):t===s?(e-i)/n+2:(i-t)/n+4}function El(i){const e=i.r/255,n=i.g/255,s=i.b/255,r=Math.max(e,n,s),o=Math.min(e,n,s),a=(r+o)/2;let l,c,h;return r!==o&&(h=r-o,c=a>.5?h/(2-r-o):h/(r+o),l=Hv(e,n,s,h,r),l=l*60+.5),[l|0,c||0,a]}function Tl(i,t,e,n){return(Array.isArray(t)?i(t[0],t[1],t[2]):i(t,e,n)).map(ci)}function Al(i,t,e){return Tl(Ud,i,t,e)}function Vv(i,t,e){return Tl(zv,i,t,e)}function Gv(i,t,e){return Tl(Bv,i,t,e)}function Fd(i){return(i%360+360)%360}function Wv(i){const t=kv.exec(i);let e=255,n;if(!t)return;t[5]!==n&&(e=t[6]?zs(+t[5]):ci(+t[5]));const s=Fd(+t[2]),r=+t[3]/100,o=+t[4]/100;return t[1]==="hwb"?n=Vv(s,r,o):t[1]==="hsv"?n=Gv(s,r,o):n=Al(s,r,o),{r:n[0],g:n[1],b:n[2],a:e}}function Xv(i,t){var e=El(i);e[0]=Fd(e[0]+t),e=Al(e),i.r=e[0],i.g=e[1],i.b=e[2]}function jv(i){if(!i)return;const t=El(i),e=t[0],n=Lh(t[1]),s=Lh(t[2]);return i.a<255?`hsla(${e}, ${n}%, ${s}%, ${Nn(i.a)})`:`hsl(${e}, ${n}%, ${s}%)`}const Dh={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Ih={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function Yv(){const i={},t=Object.keys(Ih),e=Object.keys(Dh);let n,s,r,o,a;for(n=0;n<t.length;n++){for(o=a=t[n],s=0;s<e.length;s++)r=e[s],a=a.replace(r,Dh[r]);r=parseInt(Ih[o],16),i[a]=[r>>16&255,r>>8&255,r&255]}return i}let Kr;function qv(i){Kr||(Kr=Yv(),Kr.transparent=[0,0,0,0]);const t=Kr[i.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const $v=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function Kv(i){const t=$v.exec(i);let e=255,n,s,r;if(t){if(t[7]!==n){const o=+t[7];e=t[8]?zs(o):ei(o*255,0,255)}return n=+t[1],s=+t[3],r=+t[5],n=255&(t[2]?zs(n):ei(n,0,255)),s=255&(t[4]?zs(s):ei(s,0,255)),r=255&(t[6]?zs(r):ei(r,0,255)),{r:n,g:s,b:r,a:e}}}function Zv(i){return i&&(i.a<255?`rgba(${i.r}, ${i.g}, ${i.b}, ${Nn(i.a)})`:`rgb(${i.r}, ${i.g}, ${i.b})`)}const Ca=i=>i<=.0031308?i*12.92:Math.pow(i,1/2.4)*1.055-.055,hs=i=>i<=.04045?i/12.92:Math.pow((i+.055)/1.055,2.4);function Jv(i,t,e){const n=hs(Nn(i.r)),s=hs(Nn(i.g)),r=hs(Nn(i.b));return{r:ci(Ca(n+e*(hs(Nn(t.r))-n))),g:ci(Ca(s+e*(hs(Nn(t.g))-s))),b:ci(Ca(r+e*(hs(Nn(t.b))-r))),a:i.a+e*(t.a-i.a)}}function Zr(i,t,e){if(i){let n=El(i);n[t]=Math.max(0,Math.min(n[t]+n[t]*e,t===0?360:1)),n=Al(n),i.r=n[0],i.g=n[1],i.b=n[2]}}function Nd(i,t){return i&&Object.assign(t||{},i)}function Oh(i){var t={r:0,g:0,b:0,a:255};return Array.isArray(i)?i.length>=3&&(t={r:i[0],g:i[1],b:i[2],a:255},i.length>3&&(t.a=ci(i[3]))):(t=Nd(i,{r:0,g:0,b:0,a:1}),t.a=ci(t.a)),t}function Qv(i){return i.charAt(0)==="r"?Kv(i):Wv(i)}class sr{constructor(t){if(t instanceof sr)return t;const e=typeof t;let n;e==="object"?n=Oh(t):e==="string"&&(n=Uv(t)||qv(t)||Qv(t)),this._rgb=n,this._valid=!!n}get valid(){return this._valid}get rgb(){var t=Nd(this._rgb);return t&&(t.a=Nn(t.a)),t}set rgb(t){this._rgb=Oh(t)}rgbString(){return this._valid?Zv(this._rgb):void 0}hexString(){return this._valid?Nv(this._rgb):void 0}hslString(){return this._valid?jv(this._rgb):void 0}mix(t,e){if(t){const n=this.rgb,s=t.rgb;let r;const o=e===r?.5:e,a=2*o-1,l=n.a-s.a,c=((a*l===-1?a:(a+l)/(1+a*l))+1)/2;r=1-c,n.r=255&c*n.r+r*s.r+.5,n.g=255&c*n.g+r*s.g+.5,n.b=255&c*n.b+r*s.b+.5,n.a=o*n.a+(1-o)*s.a,this.rgb=n}return this}interpolate(t,e){return t&&(this._rgb=Jv(this._rgb,t._rgb,e)),this}clone(){return new sr(this.rgb)}alpha(t){return this._rgb.a=ci(t),this}clearer(t){const e=this._rgb;return e.a*=1-t,this}greyscale(){const t=this._rgb,e=mr(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=e,this}opaquer(t){const e=this._rgb;return e.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return Zr(this._rgb,2,t),this}darken(t){return Zr(this._rgb,2,-t),this}saturate(t){return Zr(this._rgb,1,t),this}desaturate(t){return Zr(this._rgb,1,-t),this}rotate(t){return Xv(this._rgb,t),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function In(){}const tb=(()=>{let i=0;return()=>i++})();function Gt(i){return i==null}function re(i){if(Array.isArray&&Array.isArray(i))return!0;const t=Object.prototype.toString.call(i);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function Yt(i){return i!==null&&Object.prototype.toString.call(i)==="[object Object]"}function ue(i){return(typeof i=="number"||i instanceof Number)&&isFinite(+i)}function tn(i,t){return ue(i)?i:t}function Lt(i,t){return typeof i>"u"?t:i}const eb=(i,t)=>typeof i=="string"&&i.endsWith("%")?parseFloat(i)/100:+i/t,kd=(i,t)=>typeof i=="string"&&i.endsWith("%")?parseFloat(i)/100*t:+i;function ne(i,t,e){if(i&&typeof i.call=="function")return i.apply(e,t)}function Jt(i,t,e,n){let s,r,o;if(re(i))if(r=i.length,n)for(s=r-1;s>=0;s--)t.call(e,i[s],s);else for(s=0;s<r;s++)t.call(e,i[s],s);else if(Yt(i))for(o=Object.keys(i),r=o.length,s=0;s<r;s++)t.call(e,i[o[s]],o[s])}function Ro(i,t){let e,n,s,r;if(!i||!t||i.length!==t.length)return!1;for(e=0,n=i.length;e<n;++e)if(s=i[e],r=t[e],s.datasetIndex!==r.datasetIndex||s.index!==r.index)return!1;return!0}function Co(i){if(re(i))return i.map(Co);if(Yt(i)){const t=Object.create(null),e=Object.keys(i),n=e.length;let s=0;for(;s<n;++s)t[e[s]]=Co(i[e[s]]);return t}return i}function Bd(i){return["__proto__","prototype","constructor"].indexOf(i)===-1}function nb(i,t,e,n){if(!Bd(i))return;const s=t[i],r=e[i];Yt(s)&&Yt(r)?rr(s,r,n):t[i]=Co(r)}function rr(i,t,e){const n=re(t)?t:[t],s=n.length;if(!Yt(i))return i;e=e||{};const r=e.merger||nb;let o;for(let a=0;a<s;++a){if(o=n[a],!Yt(o))continue;const l=Object.keys(o);for(let c=0,h=l.length;c<h;++c)r(l[c],i,o,e)}return i}function $s(i,t){return rr(i,t,{merger:ib})}function ib(i,t,e){if(!Bd(i))return;const n=t[i],s=e[i];Yt(n)&&Yt(s)?$s(n,s):Object.prototype.hasOwnProperty.call(t,i)||(t[i]=Co(s))}const Uh={"":i=>i,x:i=>i.x,y:i=>i.y};function sb(i){const t=i.split("."),e=[];let n="";for(const s of t)n+=s,n.endsWith("\\")?n=n.slice(0,-1)+".":(e.push(n),n="");return e}function rb(i){const t=sb(i);return e=>{for(const n of t){if(n==="")break;e=e&&e[n]}return e}}function ui(i,t){return(Uh[t]||(Uh[t]=rb(t)))(i)}function wl(i){return i.charAt(0).toUpperCase()+i.slice(1)}const or=i=>typeof i<"u",di=i=>typeof i=="function",Fh=(i,t)=>{if(i.size!==t.size)return!1;for(const e of i)if(!t.has(e))return!1;return!0};function ob(i){return i.type==="mouseup"||i.type==="click"||i.type==="contextmenu"}const Zt=Math.PI,oe=2*Zt,ab=oe+Zt,Po=Number.POSITIVE_INFINITY,lb=Zt/180,fe=Zt/2,bi=Zt/4,Nh=Zt*2/3,ni=Math.log10,Tn=Math.sign;function Ks(i,t,e){return Math.abs(i-t)<e}function kh(i){const t=Math.round(i);i=Ks(i,t,i/1e3)?t:i;const e=Math.pow(10,Math.floor(ni(i))),n=i/e;return(n<=1?1:n<=2?2:n<=5?5:10)*e}function cb(i){const t=[],e=Math.sqrt(i);let n;for(n=1;n<e;n++)i%n===0&&(t.push(n),t.push(i/n));return e===(e|0)&&t.push(e),t.sort((s,r)=>s-r).pop(),t}function hb(i){return typeof i=="symbol"||typeof i=="object"&&i!==null&&!(Symbol.toPrimitive in i||"toString"in i||"valueOf"in i)}function Ms(i){return!hb(i)&&!isNaN(parseFloat(i))&&isFinite(i)}function ub(i,t){const e=Math.round(i);return e-t<=i&&e+t>=i}function zd(i,t,e){let n,s,r;for(n=0,s=i.length;n<s;n++)r=i[n][e],isNaN(r)||(t.min=Math.min(t.min,r),t.max=Math.max(t.max,r))}function gn(i){return i*(Zt/180)}function Rl(i){return i*(180/Zt)}function Bh(i){if(!ue(i))return;let t=1,e=0;for(;Math.round(i*t)/t!==i;)t*=10,e++;return e}function Hd(i,t){const e=t.x-i.x,n=t.y-i.y,s=Math.sqrt(e*e+n*n);let r=Math.atan2(n,e);return r<-.5*Zt&&(r+=oe),{angle:r,distance:s}}function il(i,t){return Math.sqrt(Math.pow(t.x-i.x,2)+Math.pow(t.y-i.y,2))}function db(i,t){return(i-t+ab)%oe-Zt}function Oe(i){return(i%oe+oe)%oe}function ar(i,t,e,n){const s=Oe(i),r=Oe(t),o=Oe(e),a=Oe(r-s),l=Oe(o-s),c=Oe(s-r),h=Oe(s-o);return s===r||s===o||n&&r===o||a>l&&c<h}function Ae(i,t,e){return Math.max(t,Math.min(e,i))}function fb(i){return Ae(i,-32768,32767)}function zn(i,t,e,n=1e-6){return i>=Math.min(t,e)-n&&i<=Math.max(t,e)+n}function Cl(i,t,e){e=e||(o=>i[o]<t);let n=i.length-1,s=0,r;for(;n-s>1;)r=s+n>>1,e(r)?s=r:n=r;return{lo:s,hi:n}}const Hn=(i,t,e,n)=>Cl(i,e,n?s=>{const r=i[s][t];return r<e||r===e&&i[s+1][t]===e}:s=>i[s][t]<e),pb=(i,t,e)=>Cl(i,e,n=>i[n][t]>=e);function mb(i,t,e){let n=0,s=i.length;for(;n<s&&i[n]<t;)n++;for(;s>n&&i[s-1]>e;)s--;return n>0||s<i.length?i.slice(n,s):i}const Vd=["push","pop","shift","splice","unshift"];function gb(i,t){if(i._chartjs){i._chartjs.listeners.push(t);return}Object.defineProperty(i,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),Vd.forEach(e=>{const n="_onData"+wl(e),s=i[e];Object.defineProperty(i,e,{configurable:!0,enumerable:!1,value(...r){const o=s.apply(this,r);return i._chartjs.listeners.forEach(a=>{typeof a[n]=="function"&&a[n](...r)}),o}})})}function zh(i,t){const e=i._chartjs;if(!e)return;const n=e.listeners,s=n.indexOf(t);s!==-1&&n.splice(s,1),!(n.length>0)&&(Vd.forEach(r=>{delete i[r]}),delete i._chartjs)}function Gd(i){const t=new Set(i);return t.size===i.length?i:Array.from(t)}const Wd=function(){return typeof window>"u"?function(i){return i()}:window.requestAnimationFrame}();function Xd(i,t){let e=[],n=!1;return function(...s){e=s,n||(n=!0,Wd.call(window,()=>{n=!1,i.apply(t,e)}))}}function _b(i,t){let e;return function(...n){return t?(clearTimeout(e),e=setTimeout(i,t,n)):i.apply(this,n),t}}const Pl=i=>i==="start"?"left":i==="end"?"right":"center",Ie=(i,t,e)=>i==="start"?t:i==="end"?e:(t+e)/2,xb=(i,t,e,n)=>i===(n?"left":"right")?e:i==="center"?(t+e)/2:t;function jd(i,t,e){const n=t.length;let s=0,r=n;if(i._sorted){const{iScale:o,vScale:a,_parsed:l}=i,c=i.dataset&&i.dataset.options?i.dataset.options.spanGaps:null,h=o.axis,{min:u,max:d,minDefined:f,maxDefined:g}=o.getUserBounds();if(f){if(s=Math.min(Hn(l,h,u).lo,e?n:Hn(t,h,o.getPixelForValue(u)).lo),c){const _=l.slice(0,s+1).reverse().findIndex(p=>!Gt(p[a.axis]));s-=Math.max(0,_)}s=Ae(s,0,n-1)}if(g){let _=Math.max(Hn(l,o.axis,d,!0).hi+1,e?0:Hn(t,h,o.getPixelForValue(d),!0).hi+1);if(c){const p=l.slice(_-1).findIndex(m=>!Gt(m[a.axis]));_+=Math.max(0,p)}r=Ae(_,s,n)-s}else r=n-s}return{start:s,count:r}}function Yd(i){const{xScale:t,yScale:e,_scaleRanges:n}=i,s={xmin:t.min,xmax:t.max,ymin:e.min,ymax:e.max};if(!n)return i._scaleRanges=s,!0;const r=n.xmin!==t.min||n.xmax!==t.max||n.ymin!==e.min||n.ymax!==e.max;return Object.assign(n,s),r}const Jr=i=>i===0||i===1,Hh=(i,t,e)=>-(Math.pow(2,10*(i-=1))*Math.sin((i-t)*oe/e)),Vh=(i,t,e)=>Math.pow(2,-10*i)*Math.sin((i-t)*oe/e)+1,Zs={linear:i=>i,easeInQuad:i=>i*i,easeOutQuad:i=>-i*(i-2),easeInOutQuad:i=>(i/=.5)<1?.5*i*i:-.5*(--i*(i-2)-1),easeInCubic:i=>i*i*i,easeOutCubic:i=>(i-=1)*i*i+1,easeInOutCubic:i=>(i/=.5)<1?.5*i*i*i:.5*((i-=2)*i*i+2),easeInQuart:i=>i*i*i*i,easeOutQuart:i=>-((i-=1)*i*i*i-1),easeInOutQuart:i=>(i/=.5)<1?.5*i*i*i*i:-.5*((i-=2)*i*i*i-2),easeInQuint:i=>i*i*i*i*i,easeOutQuint:i=>(i-=1)*i*i*i*i+1,easeInOutQuint:i=>(i/=.5)<1?.5*i*i*i*i*i:.5*((i-=2)*i*i*i*i+2),easeInSine:i=>-Math.cos(i*fe)+1,easeOutSine:i=>Math.sin(i*fe),easeInOutSine:i=>-.5*(Math.cos(Zt*i)-1),easeInExpo:i=>i===0?0:Math.pow(2,10*(i-1)),easeOutExpo:i=>i===1?1:-Math.pow(2,-10*i)+1,easeInOutExpo:i=>Jr(i)?i:i<.5?.5*Math.pow(2,10*(i*2-1)):.5*(-Math.pow(2,-10*(i*2-1))+2),easeInCirc:i=>i>=1?i:-(Math.sqrt(1-i*i)-1),easeOutCirc:i=>Math.sqrt(1-(i-=1)*i),easeInOutCirc:i=>(i/=.5)<1?-.5*(Math.sqrt(1-i*i)-1):.5*(Math.sqrt(1-(i-=2)*i)+1),easeInElastic:i=>Jr(i)?i:Hh(i,.075,.3),easeOutElastic:i=>Jr(i)?i:Vh(i,.075,.3),easeInOutElastic(i){return Jr(i)?i:i<.5?.5*Hh(i*2,.1125,.45):.5+.5*Vh(i*2-1,.1125,.45)},easeInBack(i){return i*i*((1.70158+1)*i-1.70158)},easeOutBack(i){return(i-=1)*i*((1.70158+1)*i+1.70158)+1},easeInOutBack(i){let t=1.70158;return(i/=.5)<1?.5*(i*i*(((t*=1.525)+1)*i-t)):.5*((i-=2)*i*(((t*=1.525)+1)*i+t)+2)},easeInBounce:i=>1-Zs.easeOutBounce(1-i),easeOutBounce(i){return i<1/2.75?7.5625*i*i:i<2/2.75?7.5625*(i-=1.5/2.75)*i+.75:i<2.5/2.75?7.5625*(i-=2.25/2.75)*i+.9375:7.5625*(i-=2.625/2.75)*i+.984375},easeInOutBounce:i=>i<.5?Zs.easeInBounce(i*2)*.5:Zs.easeOutBounce(i*2-1)*.5+.5};function Ll(i){if(i&&typeof i=="object"){const t=i.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function Gh(i){return Ll(i)?i:new sr(i)}function Pa(i){return Ll(i)?i:new sr(i).saturate(.5).darken(.1).hexString()}const vb=["x","y","borderWidth","radius","tension"],bb=["color","borderColor","backgroundColor"];function Mb(i){i.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),i.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),i.set("animations",{colors:{type:"color",properties:bb},numbers:{type:"number",properties:vb}}),i.describe("animations",{_fallback:"animation"}),i.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function yb(i){i.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const Wh=new Map;function Sb(i,t){t=t||{};const e=i+JSON.stringify(t);let n=Wh.get(e);return n||(n=new Intl.NumberFormat(i,t),Wh.set(e,n)),n}function gr(i,t,e){return Sb(t,e).format(i)}const qd={values(i){return re(i)?i:""+i},numeric(i,t,e){if(i===0)return"0";const n=this.chart.options.locale;let s,r=i;if(e.length>1){const c=Math.max(Math.abs(e[0].value),Math.abs(e[e.length-1].value));(c<1e-4||c>1e15)&&(s="scientific"),r=Eb(i,e)}const o=ni(Math.abs(r)),a=isNaN(o)?1:Math.max(Math.min(-1*Math.floor(o),20),0),l={notation:s,minimumFractionDigits:a,maximumFractionDigits:a};return Object.assign(l,this.options.ticks.format),gr(i,n,l)},logarithmic(i,t,e){if(i===0)return"0";const n=e[t].significand||i/Math.pow(10,Math.floor(ni(i)));return[1,2,3,5,10,15].includes(n)||t>.8*e.length?qd.numeric.call(this,i,t,e):""}};function Eb(i,t){let e=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(e)>=1&&i!==Math.floor(i)&&(e=i-Math.floor(i)),e}var Ho={formatters:qd};function Tb(i){i.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,e)=>e.lineWidth,tickColor:(t,e)=>e.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Ho.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),i.route("scale.ticks","color","","color"),i.route("scale.grid","color","","borderColor"),i.route("scale.border","color","","borderColor"),i.route("scale.title","color","","color"),i.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),i.describe("scales",{_fallback:"scale"}),i.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const Ni=Object.create(null),sl=Object.create(null);function Js(i,t){if(!t)return i;const e=t.split(".");for(let n=0,s=e.length;n<s;++n){const r=e[n];i=i[r]||(i[r]=Object.create(null))}return i}function La(i,t,e){return typeof t=="string"?rr(Js(i,t),e):rr(Js(i,""),t)}class Ab{constructor(t,e){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=n=>n.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(n,s)=>Pa(s.backgroundColor),this.hoverBorderColor=(n,s)=>Pa(s.borderColor),this.hoverColor=(n,s)=>Pa(s.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(e)}set(t,e){return La(this,t,e)}get(t){return Js(this,t)}describe(t,e){return La(sl,t,e)}override(t,e){return La(Ni,t,e)}route(t,e,n,s){const r=Js(this,t),o=Js(this,n),a="_"+e;Object.defineProperties(r,{[a]:{value:r[e],writable:!0},[e]:{enumerable:!0,get(){const l=this[a],c=o[s];return Yt(l)?Object.assign({},c,l):Lt(l,c)},set(l){this[a]=l}}})}apply(t){t.forEach(e=>e(this))}}var le=new Ab({_scriptable:i=>!i.startsWith("on"),_indexable:i=>i!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[Mb,yb,Tb]);function wb(i){return!i||Gt(i.size)||Gt(i.family)?null:(i.style?i.style+" ":"")+(i.weight?i.weight+" ":"")+i.size+"px "+i.family}function Lo(i,t,e,n,s){let r=t[s];return r||(r=t[s]=i.measureText(s).width,e.push(s)),r>n&&(n=r),n}function Rb(i,t,e,n){n=n||{};let s=n.data=n.data||{},r=n.garbageCollect=n.garbageCollect||[];n.font!==t&&(s=n.data={},r=n.garbageCollect=[],n.font=t),i.save(),i.font=t;let o=0;const a=e.length;let l,c,h,u,d;for(l=0;l<a;l++)if(u=e[l],u!=null&&!re(u))o=Lo(i,s,r,o,u);else if(re(u))for(c=0,h=u.length;c<h;c++)d=u[c],d!=null&&!re(d)&&(o=Lo(i,s,r,o,d));i.restore();const f=r.length/2;if(f>e.length){for(l=0;l<f;l++)delete s[r[l]];r.splice(0,f)}return o}function Mi(i,t,e){const n=i.currentDevicePixelRatio,s=e!==0?Math.max(e/2,.5):0;return Math.round((t-s)*n)/n+s}function Xh(i,t){!t&&!i||(t=t||i.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,i.width,i.height),t.restore())}function rl(i,t,e,n){$d(i,t,e,n,null)}function $d(i,t,e,n,s){let r,o,a,l,c,h,u,d;const f=t.pointStyle,g=t.rotation,_=t.radius;let p=(g||0)*lb;if(f&&typeof f=="object"&&(r=f.toString(),r==="[object HTMLImageElement]"||r==="[object HTMLCanvasElement]")){i.save(),i.translate(e,n),i.rotate(p),i.drawImage(f,-f.width/2,-f.height/2,f.width,f.height),i.restore();return}if(!(isNaN(_)||_<=0)){switch(i.beginPath(),f){default:s?i.ellipse(e,n,s/2,_,0,0,oe):i.arc(e,n,_,0,oe),i.closePath();break;case"triangle":h=s?s/2:_,i.moveTo(e+Math.sin(p)*h,n-Math.cos(p)*_),p+=Nh,i.lineTo(e+Math.sin(p)*h,n-Math.cos(p)*_),p+=Nh,i.lineTo(e+Math.sin(p)*h,n-Math.cos(p)*_),i.closePath();break;case"rectRounded":c=_*.516,l=_-c,o=Math.cos(p+bi)*l,u=Math.cos(p+bi)*(s?s/2-c:l),a=Math.sin(p+bi)*l,d=Math.sin(p+bi)*(s?s/2-c:l),i.arc(e-u,n-a,c,p-Zt,p-fe),i.arc(e+d,n-o,c,p-fe,p),i.arc(e+u,n+a,c,p,p+fe),i.arc(e-d,n+o,c,p+fe,p+Zt),i.closePath();break;case"rect":if(!g){l=Math.SQRT1_2*_,h=s?s/2:l,i.rect(e-h,n-l,2*h,2*l);break}p+=bi;case"rectRot":u=Math.cos(p)*(s?s/2:_),o=Math.cos(p)*_,a=Math.sin(p)*_,d=Math.sin(p)*(s?s/2:_),i.moveTo(e-u,n-a),i.lineTo(e+d,n-o),i.lineTo(e+u,n+a),i.lineTo(e-d,n+o),i.closePath();break;case"crossRot":p+=bi;case"cross":u=Math.cos(p)*(s?s/2:_),o=Math.cos(p)*_,a=Math.sin(p)*_,d=Math.sin(p)*(s?s/2:_),i.moveTo(e-u,n-a),i.lineTo(e+u,n+a),i.moveTo(e+d,n-o),i.lineTo(e-d,n+o);break;case"star":u=Math.cos(p)*(s?s/2:_),o=Math.cos(p)*_,a=Math.sin(p)*_,d=Math.sin(p)*(s?s/2:_),i.moveTo(e-u,n-a),i.lineTo(e+u,n+a),i.moveTo(e+d,n-o),i.lineTo(e-d,n+o),p+=bi,u=Math.cos(p)*(s?s/2:_),o=Math.cos(p)*_,a=Math.sin(p)*_,d=Math.sin(p)*(s?s/2:_),i.moveTo(e-u,n-a),i.lineTo(e+u,n+a),i.moveTo(e+d,n-o),i.lineTo(e-d,n+o);break;case"line":o=s?s/2:Math.cos(p)*_,a=Math.sin(p)*_,i.moveTo(e-o,n-a),i.lineTo(e+o,n+a);break;case"dash":i.moveTo(e,n),i.lineTo(e+Math.cos(p)*(s?s/2:_),n+Math.sin(p)*_);break;case!1:i.closePath();break}i.fill(),t.borderWidth>0&&i.stroke()}}function Vn(i,t,e){return e=e||.5,!t||i&&i.x>t.left-e&&i.x<t.right+e&&i.y>t.top-e&&i.y<t.bottom+e}function Vo(i,t){i.save(),i.beginPath(),i.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),i.clip()}function Go(i){i.restore()}function Cb(i,t,e,n,s){if(!t)return i.lineTo(e.x,e.y);if(s==="middle"){const r=(t.x+e.x)/2;i.lineTo(r,t.y),i.lineTo(r,e.y)}else s==="after"!=!!n?i.lineTo(t.x,e.y):i.lineTo(e.x,t.y);i.lineTo(e.x,e.y)}function Pb(i,t,e,n){if(!t)return i.lineTo(e.x,e.y);i.bezierCurveTo(n?t.cp1x:t.cp2x,n?t.cp1y:t.cp2y,n?e.cp2x:e.cp1x,n?e.cp2y:e.cp1y,e.x,e.y)}function Lb(i,t){t.translation&&i.translate(t.translation[0],t.translation[1]),Gt(t.rotation)||i.rotate(t.rotation),t.color&&(i.fillStyle=t.color),t.textAlign&&(i.textAlign=t.textAlign),t.textBaseline&&(i.textBaseline=t.textBaseline)}function Db(i,t,e,n,s){if(s.strikethrough||s.underline){const r=i.measureText(n),o=t-r.actualBoundingBoxLeft,a=t+r.actualBoundingBoxRight,l=e-r.actualBoundingBoxAscent,c=e+r.actualBoundingBoxDescent,h=s.strikethrough?(l+c)/2:c;i.strokeStyle=i.fillStyle,i.beginPath(),i.lineWidth=s.decorationWidth||2,i.moveTo(o,h),i.lineTo(a,h),i.stroke()}}function Ib(i,t){const e=i.fillStyle;i.fillStyle=t.color,i.fillRect(t.left,t.top,t.width,t.height),i.fillStyle=e}function ki(i,t,e,n,s,r={}){const o=re(t)?t:[t],a=r.strokeWidth>0&&r.strokeColor!=="";let l,c;for(i.save(),i.font=s.string,Lb(i,r),l=0;l<o.length;++l)c=o[l],r.backdrop&&Ib(i,r.backdrop),a&&(r.strokeColor&&(i.strokeStyle=r.strokeColor),Gt(r.strokeWidth)||(i.lineWidth=r.strokeWidth),i.strokeText(c,e,n,r.maxWidth)),i.fillText(c,e,n,r.maxWidth),Db(i,e,n,c,r),n+=Number(s.lineHeight);i.restore()}function lr(i,t){const{x:e,y:n,w:s,h:r,radius:o}=t;i.arc(e+o.topLeft,n+o.topLeft,o.topLeft,1.5*Zt,Zt,!0),i.lineTo(e,n+r-o.bottomLeft),i.arc(e+o.bottomLeft,n+r-o.bottomLeft,o.bottomLeft,Zt,fe,!0),i.lineTo(e+s-o.bottomRight,n+r),i.arc(e+s-o.bottomRight,n+r-o.bottomRight,o.bottomRight,fe,0,!0),i.lineTo(e+s,n+o.topRight),i.arc(e+s-o.topRight,n+o.topRight,o.topRight,0,-fe,!0),i.lineTo(e+o.topLeft,n)}const Ob=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,Ub=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function Fb(i,t){const e=(""+i).match(Ob);if(!e||e[1]==="normal")return t*1.2;switch(i=+e[2],e[3]){case"px":return i;case"%":i/=100;break}return t*i}const Nb=i=>+i||0;function Dl(i,t){const e={},n=Yt(t),s=n?Object.keys(t):t,r=Yt(i)?n?o=>Lt(i[o],i[t[o]]):o=>i[o]:()=>i;for(const o of s)e[o]=Nb(r(o));return e}function Kd(i){return Dl(i,{top:"y",right:"x",bottom:"y",left:"x"})}function Ii(i){return Dl(i,["topLeft","topRight","bottomLeft","bottomRight"])}function ke(i){const t=Kd(i);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function be(i,t){i=i||{},t=t||le.font;let e=Lt(i.size,t.size);typeof e=="string"&&(e=parseInt(e,10));let n=Lt(i.style,t.style);n&&!(""+n).match(Ub)&&(console.warn('Invalid font style specified: "'+n+'"'),n=void 0);const s={family:Lt(i.family,t.family),lineHeight:Fb(Lt(i.lineHeight,t.lineHeight),e),size:e,style:n,weight:Lt(i.weight,t.weight),string:""};return s.string=wb(s),s}function Hs(i,t,e,n){let s=!0,r,o,a;for(r=0,o=i.length;r<o;++r)if(a=i[r],a!==void 0&&(t!==void 0&&typeof a=="function"&&(a=a(t),s=!1),e!==void 0&&re(a)&&(a=a[e%a.length],s=!1),a!==void 0))return n&&!s&&(n.cacheable=!1),a}function kb(i,t,e){const{min:n,max:s}=i,r=kd(t,(s-n)/2),o=(a,l)=>e&&a===0?0:a+l;return{min:o(n,-Math.abs(r)),max:o(s,r)}}function fi(i,t){return Object.assign(Object.create(i),t)}function Il(i,t=[""],e,n,s=()=>i[0]){const r=e||i;typeof n>"u"&&(n=tf("_fallback",i));const o={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:i,_rootScopes:r,_fallback:n,_getTarget:s,override:a=>Il([a,...i],t,r,n)};return new Proxy(o,{deleteProperty(a,l){return delete a[l],delete a._keys,delete i[0][l],!0},get(a,l){return Jd(a,l,()=>jb(l,t,i,a))},getOwnPropertyDescriptor(a,l){return Reflect.getOwnPropertyDescriptor(a._scopes[0],l)},getPrototypeOf(){return Reflect.getPrototypeOf(i[0])},has(a,l){return Yh(a).includes(l)},ownKeys(a){return Yh(a)},set(a,l,c){const h=a._storage||(a._storage=s());return a[l]=h[l]=c,delete a._keys,!0}})}function ys(i,t,e,n){const s={_cacheable:!1,_proxy:i,_context:t,_subProxy:e,_stack:new Set,_descriptors:Zd(i,n),setContext:r=>ys(i,r,e,n),override:r=>ys(i.override(r),t,e,n)};return new Proxy(s,{deleteProperty(r,o){return delete r[o],delete i[o],!0},get(r,o,a){return Jd(r,o,()=>zb(r,o,a))},getOwnPropertyDescriptor(r,o){return r._descriptors.allKeys?Reflect.has(i,o)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(i,o)},getPrototypeOf(){return Reflect.getPrototypeOf(i)},has(r,o){return Reflect.has(i,o)},ownKeys(){return Reflect.ownKeys(i)},set(r,o,a){return i[o]=a,delete r[o],!0}})}function Zd(i,t={scriptable:!0,indexable:!0}){const{_scriptable:e=t.scriptable,_indexable:n=t.indexable,_allKeys:s=t.allKeys}=i;return{allKeys:s,scriptable:e,indexable:n,isScriptable:di(e)?e:()=>e,isIndexable:di(n)?n:()=>n}}const Bb=(i,t)=>i?i+wl(t):t,Ol=(i,t)=>Yt(t)&&i!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Jd(i,t,e){if(Object.prototype.hasOwnProperty.call(i,t)||t==="constructor")return i[t];const n=e();return i[t]=n,n}function zb(i,t,e){const{_proxy:n,_context:s,_subProxy:r,_descriptors:o}=i;let a=n[t];return di(a)&&o.isScriptable(t)&&(a=Hb(t,a,i,e)),re(a)&&a.length&&(a=Vb(t,a,i,o.isIndexable)),Ol(t,a)&&(a=ys(a,s,r&&r[t],o)),a}function Hb(i,t,e,n){const{_proxy:s,_context:r,_subProxy:o,_stack:a}=e;if(a.has(i))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+i);a.add(i);let l=t(r,o||n);return a.delete(i),Ol(i,l)&&(l=Ul(s._scopes,s,i,l)),l}function Vb(i,t,e,n){const{_proxy:s,_context:r,_subProxy:o,_descriptors:a}=e;if(typeof r.index<"u"&&n(i))return t[r.index%t.length];if(Yt(t[0])){const l=t,c=s._scopes.filter(h=>h!==l);t=[];for(const h of l){const u=Ul(c,s,i,h);t.push(ys(u,r,o&&o[i],a))}}return t}function Qd(i,t,e){return di(i)?i(t,e):i}const Gb=(i,t)=>i===!0?t:typeof i=="string"?ui(t,i):void 0;function Wb(i,t,e,n,s){for(const r of t){const o=Gb(e,r);if(o){i.add(o);const a=Qd(o._fallback,e,s);if(typeof a<"u"&&a!==e&&a!==n)return a}else if(o===!1&&typeof n<"u"&&e!==n)return null}return!1}function Ul(i,t,e,n){const s=t._rootScopes,r=Qd(t._fallback,e,n),o=[...i,...s],a=new Set;a.add(n);let l=jh(a,o,e,r||e,n);return l===null||typeof r<"u"&&r!==e&&(l=jh(a,o,r,l,n),l===null)?!1:Il(Array.from(a),[""],s,r,()=>Xb(t,e,n))}function jh(i,t,e,n,s){for(;e;)e=Wb(i,t,e,n,s);return e}function Xb(i,t,e){const n=i._getTarget();t in n||(n[t]={});const s=n[t];return re(s)&&Yt(e)?e:s||{}}function jb(i,t,e,n){let s;for(const r of t)if(s=tf(Bb(r,i),e),typeof s<"u")return Ol(i,s)?Ul(e,n,i,s):s}function tf(i,t){for(const e of t){if(!e)continue;const n=e[i];if(typeof n<"u")return n}}function Yh(i){let t=i._keys;return t||(t=i._keys=Yb(i._scopes)),t}function Yb(i){const t=new Set;for(const e of i)for(const n of Object.keys(e).filter(s=>!s.startsWith("_")))t.add(n);return Array.from(t)}function ef(i,t,e,n){const{iScale:s}=i,{key:r="r"}=this._parsing,o=new Array(n);let a,l,c,h;for(a=0,l=n;a<l;++a)c=a+e,h=t[c],o[a]={r:s.parse(ui(h,r),c)};return o}const qb=Number.EPSILON||1e-14,Ss=(i,t)=>t<i.length&&!i[t].skip&&i[t],nf=i=>i==="x"?"y":"x";function $b(i,t,e,n){const s=i.skip?t:i,r=t,o=e.skip?t:e,a=il(r,s),l=il(o,r);let c=a/(a+l),h=l/(a+l);c=isNaN(c)?0:c,h=isNaN(h)?0:h;const u=n*c,d=n*h;return{previous:{x:r.x-u*(o.x-s.x),y:r.y-u*(o.y-s.y)},next:{x:r.x+d*(o.x-s.x),y:r.y+d*(o.y-s.y)}}}function Kb(i,t,e){const n=i.length;let s,r,o,a,l,c=Ss(i,0);for(let h=0;h<n-1;++h)if(l=c,c=Ss(i,h+1),!(!l||!c)){if(Ks(t[h],0,qb)){e[h]=e[h+1]=0;continue}s=e[h]/t[h],r=e[h+1]/t[h],a=Math.pow(s,2)+Math.pow(r,2),!(a<=9)&&(o=3/Math.sqrt(a),e[h]=s*o*t[h],e[h+1]=r*o*t[h])}}function Zb(i,t,e="x"){const n=nf(e),s=i.length;let r,o,a,l=Ss(i,0);for(let c=0;c<s;++c){if(o=a,a=l,l=Ss(i,c+1),!a)continue;const h=a[e],u=a[n];o&&(r=(h-o[e])/3,a[`cp1${e}`]=h-r,a[`cp1${n}`]=u-r*t[c]),l&&(r=(l[e]-h)/3,a[`cp2${e}`]=h+r,a[`cp2${n}`]=u+r*t[c])}}function Jb(i,t="x"){const e=nf(t),n=i.length,s=Array(n).fill(0),r=Array(n);let o,a,l,c=Ss(i,0);for(o=0;o<n;++o)if(a=l,l=c,c=Ss(i,o+1),!!l){if(c){const h=c[t]-l[t];s[o]=h!==0?(c[e]-l[e])/h:0}r[o]=a?c?Tn(s[o-1])!==Tn(s[o])?0:(s[o-1]+s[o])/2:s[o-1]:s[o]}Kb(i,s,r),Zb(i,r,t)}function Qr(i,t,e){return Math.max(Math.min(i,e),t)}function Qb(i,t){let e,n,s,r,o,a=Vn(i[0],t);for(e=0,n=i.length;e<n;++e)o=r,r=a,a=e<n-1&&Vn(i[e+1],t),r&&(s=i[e],o&&(s.cp1x=Qr(s.cp1x,t.left,t.right),s.cp1y=Qr(s.cp1y,t.top,t.bottom)),a&&(s.cp2x=Qr(s.cp2x,t.left,t.right),s.cp2y=Qr(s.cp2y,t.top,t.bottom)))}function tM(i,t,e,n,s){let r,o,a,l;if(t.spanGaps&&(i=i.filter(c=>!c.skip)),t.cubicInterpolationMode==="monotone")Jb(i,s);else{let c=n?i[i.length-1]:i[0];for(r=0,o=i.length;r<o;++r)a=i[r],l=$b(c,a,i[Math.min(r+1,o-(n?0:1))%o],t.tension),a.cp1x=l.previous.x,a.cp1y=l.previous.y,a.cp2x=l.next.x,a.cp2y=l.next.y,c=a}t.capBezierPoints&&Qb(i,e)}function Fl(){return typeof window<"u"&&typeof document<"u"}function Nl(i){let t=i.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function Do(i,t,e){let n;return typeof i=="string"?(n=parseInt(i,10),i.indexOf("%")!==-1&&(n=n/100*t.parentNode[e])):n=i,n}const Wo=i=>i.ownerDocument.defaultView.getComputedStyle(i,null);function eM(i,t){return Wo(i).getPropertyValue(t)}const nM=["top","right","bottom","left"];function Oi(i,t,e){const n={};e=e?"-"+e:"";for(let s=0;s<4;s++){const r=nM[s];n[r]=parseFloat(i[t+"-"+r+e])||0}return n.width=n.left+n.right,n.height=n.top+n.bottom,n}const iM=(i,t,e)=>(i>0||t>0)&&(!e||!e.shadowRoot);function sM(i,t){const e=i.touches,n=e&&e.length?e[0]:i,{offsetX:s,offsetY:r}=n;let o=!1,a,l;if(iM(s,r,i.target))a=s,l=r;else{const c=t.getBoundingClientRect();a=n.clientX-c.left,l=n.clientY-c.top,o=!0}return{x:a,y:l,box:o}}function Ti(i,t){if("native"in i)return i;const{canvas:e,currentDevicePixelRatio:n}=t,s=Wo(e),r=s.boxSizing==="border-box",o=Oi(s,"padding"),a=Oi(s,"border","width"),{x:l,y:c,box:h}=sM(i,e),u=o.left+(h&&a.left),d=o.top+(h&&a.top);let{width:f,height:g}=t;return r&&(f-=o.width+a.width,g-=o.height+a.height),{x:Math.round((l-u)/f*e.width/n),y:Math.round((c-d)/g*e.height/n)}}function rM(i,t,e){let n,s;if(t===void 0||e===void 0){const r=i&&Nl(i);if(!r)t=i.clientWidth,e=i.clientHeight;else{const o=r.getBoundingClientRect(),a=Wo(r),l=Oi(a,"border","width"),c=Oi(a,"padding");t=o.width-c.width-l.width,e=o.height-c.height-l.height,n=Do(a.maxWidth,r,"clientWidth"),s=Do(a.maxHeight,r,"clientHeight")}}return{width:t,height:e,maxWidth:n||Po,maxHeight:s||Po}}const ii=i=>Math.round(i*10)/10;function oM(i,t,e,n){const s=Wo(i),r=Oi(s,"margin"),o=Do(s.maxWidth,i,"clientWidth")||Po,a=Do(s.maxHeight,i,"clientHeight")||Po,l=rM(i,t,e);let{width:c,height:h}=l;if(s.boxSizing==="content-box"){const d=Oi(s,"border","width"),f=Oi(s,"padding");c-=f.width+d.width,h-=f.height+d.height}return c=Math.max(0,c-r.width),h=Math.max(0,n?c/n:h-r.height),c=ii(Math.min(c,o,l.maxWidth)),h=ii(Math.min(h,a,l.maxHeight)),c&&!h&&(h=ii(c/2)),(t!==void 0||e!==void 0)&&n&&l.height&&h>l.height&&(h=l.height,c=ii(Math.floor(h*n))),{width:c,height:h}}function qh(i,t,e){const n=t||1,s=ii(i.height*n),r=ii(i.width*n);i.height=ii(i.height),i.width=ii(i.width);const o=i.canvas;return o.style&&(e||!o.style.height&&!o.style.width)&&(o.style.height=`${i.height}px`,o.style.width=`${i.width}px`),i.currentDevicePixelRatio!==n||o.height!==s||o.width!==r?(i.currentDevicePixelRatio=n,o.height=s,o.width=r,i.ctx.setTransform(n,0,0,n,0,0),!0):!1}const aM=function(){let i=!1;try{const t={get passive(){return i=!0,!1}};Fl()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return i}();function $h(i,t){const e=eM(i,t),n=e&&e.match(/^(\d+)(\.\d+)?px$/);return n?+n[1]:void 0}function Ai(i,t,e,n){return{x:i.x+e*(t.x-i.x),y:i.y+e*(t.y-i.y)}}function lM(i,t,e,n){return{x:i.x+e*(t.x-i.x),y:n==="middle"?e<.5?i.y:t.y:n==="after"?e<1?i.y:t.y:e>0?t.y:i.y}}function cM(i,t,e,n){const s={x:i.cp2x,y:i.cp2y},r={x:t.cp1x,y:t.cp1y},o=Ai(i,s,e),a=Ai(s,r,e),l=Ai(r,t,e),c=Ai(o,a,e),h=Ai(a,l,e);return Ai(c,h,e)}const hM=function(i,t){return{x(e){return i+i+t-e},setWidth(e){t=e},textAlign(e){return e==="center"?e:e==="right"?"left":"right"},xPlus(e,n){return e-n},leftForLtr(e,n){return e-n}}},uM=function(){return{x(i){return i},setWidth(i){},textAlign(i){return i},xPlus(i,t){return i+t},leftForLtr(i,t){return i}}};function gs(i,t,e){return i?hM(t,e):uM()}function sf(i,t){let e,n;(t==="ltr"||t==="rtl")&&(e=i.canvas.style,n=[e.getPropertyValue("direction"),e.getPropertyPriority("direction")],e.setProperty("direction",t,"important"),i.prevTextDirection=n)}function rf(i,t){t!==void 0&&(delete i.prevTextDirection,i.canvas.style.setProperty("direction",t[0],t[1]))}function of(i){return i==="angle"?{between:ar,compare:db,normalize:Oe}:{between:zn,compare:(t,e)=>t-e,normalize:t=>t}}function Kh({start:i,end:t,count:e,loop:n,style:s}){return{start:i%e,end:t%e,loop:n&&(t-i+1)%e===0,style:s}}function dM(i,t,e){const{property:n,start:s,end:r}=e,{between:o,normalize:a}=of(n),l=t.length;let{start:c,end:h,loop:u}=i,d,f;if(u){for(c+=l,h+=l,d=0,f=l;d<f&&o(a(t[c%l][n]),s,r);++d)c--,h--;c%=l,h%=l}return h<c&&(h+=l),{start:c,end:h,loop:u,style:i.style}}function af(i,t,e){if(!e)return[i];const{property:n,start:s,end:r}=e,o=t.length,{compare:a,between:l,normalize:c}=of(n),{start:h,end:u,loop:d,style:f}=dM(i,t,e),g=[];let _=!1,p=null,m,v,x;const y=()=>l(s,x,m)&&a(s,x)!==0,b=()=>a(r,m)===0||l(r,x,m),A=()=>_||y(),S=()=>!_||b();for(let P=h,M=h;P<=u;++P)v=t[P%o],!v.skip&&(m=c(v[n]),m!==x&&(_=l(m,s,r),p===null&&A()&&(p=a(m,s)===0?P:M),p!==null&&S()&&(g.push(Kh({start:p,end:P,loop:d,count:o,style:f})),p=null),M=P,x=m));return p!==null&&g.push(Kh({start:p,end:u,loop:d,count:o,style:f})),g}function lf(i,t){const e=[],n=i.segments;for(let s=0;s<n.length;s++){const r=af(n[s],i.points,t);r.length&&e.push(...r)}return e}function fM(i,t,e,n){let s=0,r=t-1;if(e&&!n)for(;s<t&&!i[s].skip;)s++;for(;s<t&&i[s].skip;)s++;for(s%=t,e&&(r+=s);r>s&&i[r%t].skip;)r--;return r%=t,{start:s,end:r}}function pM(i,t,e,n){const s=i.length,r=[];let o=t,a=i[t],l;for(l=t+1;l<=e;++l){const c=i[l%s];c.skip||c.stop?a.skip||(n=!1,r.push({start:t%s,end:(l-1)%s,loop:n}),t=o=c.stop?l:null):(o=l,a.skip&&(t=l)),a=c}return o!==null&&r.push({start:t%s,end:o%s,loop:n}),r}function mM(i,t){const e=i.points,n=i.options.spanGaps,s=e.length;if(!s)return[];const r=!!i._loop,{start:o,end:a}=fM(e,s,r,n);if(n===!0)return Zh(i,[{start:o,end:a,loop:r}],e,t);const l=a<o?a+s:a,c=!!i._fullLoop&&o===0&&a===s-1;return Zh(i,pM(e,o,l,c),e,t)}function Zh(i,t,e,n){return!n||!n.setContext||!e?t:gM(i,t,e,n)}function gM(i,t,e,n){const s=i._chart.getContext(),r=Jh(i.options),{_datasetIndex:o,options:{spanGaps:a}}=i,l=e.length,c=[];let h=r,u=t[0].start,d=u;function f(g,_,p,m){const v=a?-1:1;if(g!==_){for(g+=l;e[g%l].skip;)g-=v;for(;e[_%l].skip;)_+=v;g%l!==_%l&&(c.push({start:g%l,end:_%l,loop:p,style:m}),h=m,u=_%l)}}for(const g of t){u=a?u:g.start;let _=e[u%l],p;for(d=u+1;d<=g.end;d++){const m=e[d%l];p=Jh(n.setContext(fi(s,{type:"segment",p0:_,p1:m,p0DataIndex:(d-1)%l,p1DataIndex:d%l,datasetIndex:o}))),_M(p,h)&&f(u,d-1,g.loop,h),_=m,h=p}u<d-1&&f(u,d-1,g.loop,h)}return c}function Jh(i){return{backgroundColor:i.backgroundColor,borderCapStyle:i.borderCapStyle,borderDash:i.borderDash,borderDashOffset:i.borderDashOffset,borderJoinStyle:i.borderJoinStyle,borderWidth:i.borderWidth,borderColor:i.borderColor}}function _M(i,t){if(!t)return!1;const e=[],n=function(s,r){return Ll(r)?(e.includes(r)||e.push(r),e.indexOf(r)):r};return JSON.stringify(i,n)!==JSON.stringify(t,n)}function to(i,t,e){return i.options.clip?i[e]:t[e]}function xM(i,t){const{xScale:e,yScale:n}=i;return e&&n?{left:to(e,t,"left"),right:to(e,t,"right"),top:to(n,t,"top"),bottom:to(n,t,"bottom")}:t}function cf(i,t){const e=t._clip;if(e.disabled)return!1;const n=xM(t,i.chartArea);return{left:e.left===!1?0:n.left-(e.left===!0?0:e.left),right:e.right===!1?i.width:n.right+(e.right===!0?0:e.right),top:e.top===!1?0:n.top-(e.top===!0?0:e.top),bottom:e.bottom===!1?i.height:n.bottom+(e.bottom===!0?0:e.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class vM{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,e,n,s){const r=e.listeners[s],o=e.duration;r.forEach(a=>a({chart:t,initial:e.initial,numSteps:o,currentStep:Math.min(n-e.start,o)}))}_refresh(){this._request||(this._running=!0,this._request=Wd.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let e=0;this._charts.forEach((n,s)=>{if(!n.running||!n.items.length)return;const r=n.items;let o=r.length-1,a=!1,l;for(;o>=0;--o)l=r[o],l._active?(l._total>n.duration&&(n.duration=l._total),l.tick(t),a=!0):(r[o]=r[r.length-1],r.pop());a&&(s.draw(),this._notify(s,n,t,"progress")),r.length||(n.running=!1,this._notify(s,n,t,"complete"),n.initial=!1),e+=r.length}),this._lastDate=t,e===0&&(this._running=!1)}_getAnims(t){const e=this._charts;let n=e.get(t);return n||(n={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},e.set(t,n)),n}listen(t,e,n){this._getAnims(t).listeners[e].push(n)}add(t,e){!e||!e.length||this._getAnims(t).items.push(...e)}has(t){return this._getAnims(t).items.length>0}start(t){const e=this._charts.get(t);e&&(e.running=!0,e.start=Date.now(),e.duration=e.items.reduce((n,s)=>Math.max(n,s._duration),0),this._refresh())}running(t){if(!this._running)return!1;const e=this._charts.get(t);return!(!e||!e.running||!e.items.length)}stop(t){const e=this._charts.get(t);if(!e||!e.items.length)return;const n=e.items;let s=n.length-1;for(;s>=0;--s)n[s].cancel();e.items=[],this._notify(t,e,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var Un=new vM;const Qh="transparent",bM={boolean(i,t,e){return e>.5?t:i},color(i,t,e){const n=Gh(i||Qh),s=n.valid&&Gh(t||Qh);return s&&s.valid?s.mix(n,e).hexString():t},number(i,t,e){return i+(t-i)*e}};class MM{constructor(t,e,n,s){const r=e[n];s=Hs([t.to,s,r,t.from]);const o=Hs([t.from,r,s]);this._active=!0,this._fn=t.fn||bM[t.type||typeof o],this._easing=Zs[t.easing]||Zs.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=e,this._prop=n,this._from=o,this._to=s,this._promises=void 0}active(){return this._active}update(t,e,n){if(this._active){this._notify(!1);const s=this._target[this._prop],r=n-this._start,o=this._duration-r;this._start=n,this._duration=Math.floor(Math.max(o,t.duration)),this._total+=r,this._loop=!!t.loop,this._to=Hs([t.to,e,s,t.from]),this._from=Hs([t.from,s,e])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const e=t-this._start,n=this._duration,s=this._prop,r=this._from,o=this._loop,a=this._to;let l;if(this._active=r!==a&&(o||e<n),!this._active){this._target[s]=a,this._notify(!0);return}if(e<0){this._target[s]=r;return}l=e/n%2,l=o&&l>1?2-l:l,l=this._easing(Math.min(1,Math.max(0,l))),this._target[s]=this._fn(r,a,l)}wait(){const t=this._promises||(this._promises=[]);return new Promise((e,n)=>{t.push({res:e,rej:n})})}_notify(t){const e=t?"res":"rej",n=this._promises||[];for(let s=0;s<n.length;s++)n[s][e]()}}class hf{constructor(t,e){this._chart=t,this._properties=new Map,this.configure(e)}configure(t){if(!Yt(t))return;const e=Object.keys(le.animation),n=this._properties;Object.getOwnPropertyNames(t).forEach(s=>{const r=t[s];if(!Yt(r))return;const o={};for(const a of e)o[a]=r[a];(re(r.properties)&&r.properties||[s]).forEach(a=>{(a===s||!n.has(a))&&n.set(a,o)})})}_animateOptions(t,e){const n=e.options,s=SM(t,n);if(!s)return[];const r=this._createAnimations(s,n);return n.$shared&&yM(t.options.$animations,n).then(()=>{t.options=n},()=>{}),r}_createAnimations(t,e){const n=this._properties,s=[],r=t.$animations||(t.$animations={}),o=Object.keys(e),a=Date.now();let l;for(l=o.length-1;l>=0;--l){const c=o[l];if(c.charAt(0)==="$")continue;if(c==="options"){s.push(...this._animateOptions(t,e));continue}const h=e[c];let u=r[c];const d=n.get(c);if(u)if(d&&u.active()){u.update(d,h,a);continue}else u.cancel();if(!d||!d.duration){t[c]=h;continue}r[c]=u=new MM(d,t,c,h),s.push(u)}return s}update(t,e){if(this._properties.size===0){Object.assign(t,e);return}const n=this._createAnimations(t,e);if(n.length)return Un.add(this._chart,n),!0}}function yM(i,t){const e=[],n=Object.keys(t);for(let s=0;s<n.length;s++){const r=i[n[s]];r&&r.active()&&e.push(r.wait())}return Promise.all(e)}function SM(i,t){if(!t)return;let e=i.options;if(!e){i.options=t;return}return e.$shared&&(i.options=e=Object.assign({},e,{$shared:!1,$animations:{}})),e}function tu(i,t){const e=i&&i.options||{},n=e.reverse,s=e.min===void 0?t:0,r=e.max===void 0?t:0;return{start:n?r:s,end:n?s:r}}function EM(i,t,e){if(e===!1)return!1;const n=tu(i,e),s=tu(t,e);return{top:s.end,right:n.end,bottom:s.start,left:n.start}}function TM(i){let t,e,n,s;return Yt(i)?(t=i.top,e=i.right,n=i.bottom,s=i.left):t=e=n=s=i,{top:t,right:e,bottom:n,left:s,disabled:i===!1}}function uf(i,t){const e=[],n=i._getSortedDatasetMetas(t);let s,r;for(s=0,r=n.length;s<r;++s)e.push(n[s].index);return e}function eu(i,t,e,n={}){const s=i.keys,r=n.mode==="single";let o,a,l,c;if(t===null)return;let h=!1;for(o=0,a=s.length;o<a;++o){if(l=+s[o],l===e){if(h=!0,n.all)continue;break}c=i.values[l],ue(c)&&(r||t===0||Tn(t)===Tn(c))&&(t+=c)}return!h&&!n.all?0:t}function AM(i,t){const{iScale:e,vScale:n}=t,s=e.axis==="x"?"x":"y",r=n.axis==="x"?"x":"y",o=Object.keys(i),a=new Array(o.length);let l,c,h;for(l=0,c=o.length;l<c;++l)h=o[l],a[l]={[s]:h,[r]:i[h]};return a}function Da(i,t){const e=i&&i.options.stacked;return e||e===void 0&&t.stack!==void 0}function wM(i,t,e){return`${i.id}.${t.id}.${e.stack||e.type}`}function RM(i){const{min:t,max:e,minDefined:n,maxDefined:s}=i.getUserBounds();return{min:n?t:Number.NEGATIVE_INFINITY,max:s?e:Number.POSITIVE_INFINITY}}function CM(i,t,e){const n=i[t]||(i[t]={});return n[e]||(n[e]={})}function nu(i,t,e,n){for(const s of t.getMatchingVisibleMetas(n).reverse()){const r=i[s.index];if(e&&r>0||!e&&r<0)return s.index}return null}function iu(i,t){const{chart:e,_cachedMeta:n}=i,s=e._stacks||(e._stacks={}),{iScale:r,vScale:o,index:a}=n,l=r.axis,c=o.axis,h=wM(r,o,n),u=t.length;let d;for(let f=0;f<u;++f){const g=t[f],{[l]:_,[c]:p}=g,m=g._stacks||(g._stacks={});d=m[c]=CM(s,h,_),d[a]=p,d._top=nu(d,o,!0,n.type),d._bottom=nu(d,o,!1,n.type);const v=d._visualValues||(d._visualValues={});v[a]=p}}function Ia(i,t){const e=i.scales;return Object.keys(e).filter(n=>e[n].axis===t).shift()}function PM(i,t){return fi(i,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function LM(i,t,e){return fi(i,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:e,index:t,mode:"default",type:"data"})}function Is(i,t){const e=i.controller.index,n=i.vScale&&i.vScale.axis;if(n){t=t||i._parsed;for(const s of t){const r=s._stacks;if(!r||r[n]===void 0||r[n][e]===void 0)return;delete r[n][e],r[n]._visualValues!==void 0&&r[n]._visualValues[e]!==void 0&&delete r[n]._visualValues[e]}}}const Oa=i=>i==="reset"||i==="none",su=(i,t)=>t?i:Object.assign({},i),DM=(i,t,e)=>i&&!t.hidden&&t._stacked&&{keys:uf(e,!0),values:null};class _n{constructor(t,e){this.chart=t,this._ctx=t.ctx,this.index=e,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=Da(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&Is(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,e=this._cachedMeta,n=this.getDataset(),s=(u,d,f,g)=>u==="x"?d:u==="r"?g:f,r=e.xAxisID=Lt(n.xAxisID,Ia(t,"x")),o=e.yAxisID=Lt(n.yAxisID,Ia(t,"y")),a=e.rAxisID=Lt(n.rAxisID,Ia(t,"r")),l=e.indexAxis,c=e.iAxisID=s(l,r,o,a),h=e.vAxisID=s(l,o,r,a);e.xScale=this.getScaleForId(r),e.yScale=this.getScaleForId(o),e.rScale=this.getScaleForId(a),e.iScale=this.getScaleForId(c),e.vScale=this.getScaleForId(h)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const e=this._cachedMeta;return t===e.iScale?e.vScale:e.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&zh(this._data,this),t._stacked&&Is(t)}_dataCheck(){const t=this.getDataset(),e=t.data||(t.data=[]),n=this._data;if(Yt(e)){const s=this._cachedMeta;this._data=AM(e,s)}else if(n!==e){if(n){zh(n,this);const s=this._cachedMeta;Is(s),s._parsed=[]}e&&Object.isExtensible(e)&&gb(e,this),this._syncList=[],this._data=e}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const e=this._cachedMeta,n=this.getDataset();let s=!1;this._dataCheck();const r=e._stacked;e._stacked=Da(e.vScale,e),e.stack!==n.stack&&(s=!0,Is(e),e.stack=n.stack),this._resyncElements(t),(s||r!==e._stacked)&&(iu(this,e._parsed),e._stacked=Da(e.vScale,e))}configure(){const t=this.chart.config,e=t.datasetScopeKeys(this._type),n=t.getOptionScopes(this.getDataset(),e,!0);this.options=t.createResolver(n,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,e){const{_cachedMeta:n,_data:s}=this,{iScale:r,_stacked:o}=n,a=r.axis;let l=t===0&&e===s.length?!0:n._sorted,c=t>0&&n._parsed[t-1],h,u,d;if(this._parsing===!1)n._parsed=s,n._sorted=!0,d=s;else{re(s[t])?d=this.parseArrayData(n,s,t,e):Yt(s[t])?d=this.parseObjectData(n,s,t,e):d=this.parsePrimitiveData(n,s,t,e);const f=()=>u[a]===null||c&&u[a]<c[a];for(h=0;h<e;++h)n._parsed[h+t]=u=d[h],l&&(f()&&(l=!1),c=u);n._sorted=l}o&&iu(this,d)}parsePrimitiveData(t,e,n,s){const{iScale:r,vScale:o}=t,a=r.axis,l=o.axis,c=r.getLabels(),h=r===o,u=new Array(s);let d,f,g;for(d=0,f=s;d<f;++d)g=d+n,u[d]={[a]:h||r.parse(c[g],g),[l]:o.parse(e[g],g)};return u}parseArrayData(t,e,n,s){const{xScale:r,yScale:o}=t,a=new Array(s);let l,c,h,u;for(l=0,c=s;l<c;++l)h=l+n,u=e[h],a[l]={x:r.parse(u[0],h),y:o.parse(u[1],h)};return a}parseObjectData(t,e,n,s){const{xScale:r,yScale:o}=t,{xAxisKey:a="x",yAxisKey:l="y"}=this._parsing,c=new Array(s);let h,u,d,f;for(h=0,u=s;h<u;++h)d=h+n,f=e[d],c[h]={x:r.parse(ui(f,a),d),y:o.parse(ui(f,l),d)};return c}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,e,n){const s=this.chart,r=this._cachedMeta,o=e[t.axis],a={keys:uf(s,!0),values:e._stacks[t.axis]._visualValues};return eu(a,o,r.index,{mode:n})}updateRangeFromParsed(t,e,n,s){const r=n[e.axis];let o=r===null?NaN:r;const a=s&&n._stacks[e.axis];s&&a&&(s.values=a,o=eu(s,r,this._cachedMeta.index)),t.min=Math.min(t.min,o),t.max=Math.max(t.max,o)}getMinMax(t,e){const n=this._cachedMeta,s=n._parsed,r=n._sorted&&t===n.iScale,o=s.length,a=this._getOtherScale(t),l=DM(e,n,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:h,max:u}=RM(a);let d,f;function g(){f=s[d];const _=f[a.axis];return!ue(f[t.axis])||h>_||u<_}for(d=0;d<o&&!(!g()&&(this.updateRangeFromParsed(c,t,f,l),r));++d);if(r){for(d=o-1;d>=0;--d)if(!g()){this.updateRangeFromParsed(c,t,f,l);break}}return c}getAllParsedValues(t){const e=this._cachedMeta._parsed,n=[];let s,r,o;for(s=0,r=e.length;s<r;++s)o=e[s][t.axis],ue(o)&&n.push(o);return n}getMaxOverflow(){return!1}getLabelAndValue(t){const e=this._cachedMeta,n=e.iScale,s=e.vScale,r=this.getParsed(t);return{label:n?""+n.getLabelForValue(r[n.axis]):"",value:s?""+s.getLabelForValue(r[s.axis]):""}}_update(t){const e=this._cachedMeta;this.update(t||"default"),e._clip=TM(Lt(this.options.clip,EM(e.xScale,e.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,e=this.chart,n=this._cachedMeta,s=n.data||[],r=e.chartArea,o=[],a=this._drawStart||0,l=this._drawCount||s.length-a,c=this.options.drawActiveElementsOnTop;let h;for(n.dataset&&n.dataset.draw(t,r,a,l),h=a;h<a+l;++h){const u=s[h];u.hidden||(u.active&&c?o.push(u):u.draw(t,r))}for(h=0;h<o.length;++h)o[h].draw(t,r)}getStyle(t,e){const n=e?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(n):this.resolveDataElementOptions(t||0,n)}getContext(t,e,n){const s=this.getDataset();let r;if(t>=0&&t<this._cachedMeta.data.length){const o=this._cachedMeta.data[t];r=o.$context||(o.$context=LM(this.getContext(),t,o)),r.parsed=this.getParsed(t),r.raw=s.data[t],r.index=r.dataIndex=t}else r=this.$context||(this.$context=PM(this.chart.getContext(),this.index)),r.dataset=s,r.index=r.datasetIndex=this.index;return r.active=!!e,r.mode=n,r}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,e){return this._resolveElementOptions(this.dataElementType.id,e,t)}_resolveElementOptions(t,e="default",n){const s=e==="active",r=this._cachedDataOpts,o=t+"-"+e,a=r[o],l=this.enableOptionSharing&&or(n);if(a)return su(a,l);const c=this.chart.config,h=c.datasetElementScopeKeys(this._type,t),u=s?[`${t}Hover`,"hover",t,""]:[t,""],d=c.getOptionScopes(this.getDataset(),h),f=Object.keys(le.elements[t]),g=()=>this.getContext(n,s,e),_=c.resolveNamedOptions(d,f,g,u);return _.$shared&&(_.$shared=l,r[o]=Object.freeze(su(_,l))),_}_resolveAnimations(t,e,n){const s=this.chart,r=this._cachedDataOpts,o=`animation-${e}`,a=r[o];if(a)return a;let l;if(s.options.animation!==!1){const h=this.chart.config,u=h.datasetAnimationScopeKeys(this._type,e),d=h.getOptionScopes(this.getDataset(),u);l=h.createResolver(d,this.getContext(t,n,e))}const c=new hf(s,l&&l.animations);return l&&l._cacheable&&(r[o]=Object.freeze(c)),c}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,e){return!e||Oa(t)||this.chart._animationsDisabled}_getSharedOptions(t,e){const n=this.resolveDataElementOptions(t,e),s=this._sharedOptions,r=this.getSharedOptions(n),o=this.includeOptions(e,r)||r!==s;return this.updateSharedOptions(r,e,n),{sharedOptions:r,includeOptions:o}}updateElement(t,e,n,s){Oa(s)?Object.assign(t,n):this._resolveAnimations(e,s).update(t,n)}updateSharedOptions(t,e,n){t&&!Oa(e)&&this._resolveAnimations(void 0,e).update(t,n)}_setStyle(t,e,n,s){t.active=s;const r=this.getStyle(e,s);this._resolveAnimations(e,n,s).update(t,{options:!s&&this.getSharedOptions(r)||r})}removeHoverStyle(t,e,n){this._setStyle(t,n,"active",!1)}setHoverStyle(t,e,n){this._setStyle(t,n,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const e=this._data,n=this._cachedMeta.data;for(const[a,l,c]of this._syncList)this[a](l,c);this._syncList=[];const s=n.length,r=e.length,o=Math.min(r,s);o&&this.parse(0,o),r>s?this._insertElements(s,r-s,t):r<s&&this._removeElements(r,s-r)}_insertElements(t,e,n=!0){const s=this._cachedMeta,r=s.data,o=t+e;let a;const l=c=>{for(c.length+=e,a=c.length-1;a>=o;a--)c[a]=c[a-e]};for(l(r),a=t;a<o;++a)r[a]=new this.dataElementType;this._parsing&&l(s._parsed),this.parse(t,e),n&&this.updateElements(r,t,e,"reset")}updateElements(t,e,n,s){}_removeElements(t,e){const n=this._cachedMeta;if(this._parsing){const s=n._parsed.splice(t,e);n._stacked&&Is(n,s)}n.data.splice(t,e)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[e,n,s]=t;this[e](n,s)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,e){e&&this._sync(["_removeElements",t,e]);const n=arguments.length-2;n&&this._sync(["_insertElements",t,n])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}K(_n,"defaults",{}),K(_n,"datasetElementType",null),K(_n,"dataElementType",null);function IM(i,t){if(!i._cache.$bar){const e=i.getMatchingVisibleMetas(t);let n=[];for(let s=0,r=e.length;s<r;s++)n=n.concat(e[s].controller.getAllParsedValues(i));i._cache.$bar=Gd(n.sort((s,r)=>s-r))}return i._cache.$bar}function OM(i){const t=i.iScale,e=IM(t,i.type);let n=t._length,s,r,o,a;const l=()=>{o===32767||o===-32768||(or(a)&&(n=Math.min(n,Math.abs(o-a)||n)),a=o)};for(s=0,r=e.length;s<r;++s)o=t.getPixelForValue(e[s]),l();for(a=void 0,s=0,r=t.ticks.length;s<r;++s)o=t.getPixelForTick(s),l();return n}function UM(i,t,e,n){const s=e.barThickness;let r,o;return Gt(s)?(r=t.min*e.categoryPercentage,o=e.barPercentage):(r=s*n,o=1),{chunk:r/n,ratio:o,start:t.pixels[i]-r/2}}function FM(i,t,e,n){const s=t.pixels,r=s[i];let o=i>0?s[i-1]:null,a=i<s.length-1?s[i+1]:null;const l=e.categoryPercentage;o===null&&(o=r-(a===null?t.end-t.start:a-r)),a===null&&(a=r+r-o);const c=r-(r-Math.min(o,a))/2*l;return{chunk:Math.abs(a-o)/2*l/n,ratio:e.barPercentage,start:c}}function NM(i,t,e,n){const s=e.parse(i[0],n),r=e.parse(i[1],n),o=Math.min(s,r),a=Math.max(s,r);let l=o,c=a;Math.abs(o)>Math.abs(a)&&(l=a,c=o),t[e.axis]=c,t._custom={barStart:l,barEnd:c,start:s,end:r,min:o,max:a}}function df(i,t,e,n){return re(i)?NM(i,t,e,n):t[e.axis]=e.parse(i,n),t}function ru(i,t,e,n){const s=i.iScale,r=i.vScale,o=s.getLabels(),a=s===r,l=[];let c,h,u,d;for(c=e,h=e+n;c<h;++c)d=t[c],u={},u[s.axis]=a||s.parse(o[c],c),l.push(df(d,u,r,c));return l}function Ua(i){return i&&i.barStart!==void 0&&i.barEnd!==void 0}function kM(i,t,e){return i!==0?Tn(i):(t.isHorizontal()?1:-1)*(t.min>=e?1:-1)}function BM(i){let t,e,n,s,r;return i.horizontal?(t=i.base>i.x,e="left",n="right"):(t=i.base<i.y,e="bottom",n="top"),t?(s="end",r="start"):(s="start",r="end"),{start:e,end:n,reverse:t,top:s,bottom:r}}function zM(i,t,e,n){let s=t.borderSkipped;const r={};if(!s){i.borderSkipped=r;return}if(s===!0){i.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:o,end:a,reverse:l,top:c,bottom:h}=BM(i);s==="middle"&&e&&(i.enableBorderRadius=!0,(e._top||0)===n?s=c:(e._bottom||0)===n?s=h:(r[ou(h,o,a,l)]=!0,s=c)),r[ou(s,o,a,l)]=!0,i.borderSkipped=r}function ou(i,t,e,n){return n?(i=HM(i,t,e),i=au(i,e,t)):i=au(i,t,e),i}function HM(i,t,e){return i===t?e:i===e?t:i}function au(i,t,e){return i==="start"?t:i==="end"?e:i}function VM(i,{inflateAmount:t},e){i.inflateAmount=t==="auto"?e===1?.33:0:t}class ho extends _n{parsePrimitiveData(t,e,n,s){return ru(t,e,n,s)}parseArrayData(t,e,n,s){return ru(t,e,n,s)}parseObjectData(t,e,n,s){const{iScale:r,vScale:o}=t,{xAxisKey:a="x",yAxisKey:l="y"}=this._parsing,c=r.axis==="x"?a:l,h=o.axis==="x"?a:l,u=[];let d,f,g,_;for(d=n,f=n+s;d<f;++d)_=e[d],g={},g[r.axis]=r.parse(ui(_,c),d),u.push(df(ui(_,h),g,o,d));return u}updateRangeFromParsed(t,e,n,s){super.updateRangeFromParsed(t,e,n,s);const r=n._custom;r&&e===this._cachedMeta.vScale&&(t.min=Math.min(t.min,r.min),t.max=Math.max(t.max,r.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const e=this._cachedMeta,{iScale:n,vScale:s}=e,r=this.getParsed(t),o=r._custom,a=Ua(o)?"["+o.start+", "+o.end+"]":""+s.getLabelForValue(r[s.axis]);return{label:""+n.getLabelForValue(r[n.axis]),value:a}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const e=this._cachedMeta;this.updateElements(e.data,0,e.data.length,t)}updateElements(t,e,n,s){const r=s==="reset",{index:o,_cachedMeta:{vScale:a}}=this,l=a.getBasePixel(),c=a.isHorizontal(),h=this._getRuler(),{sharedOptions:u,includeOptions:d}=this._getSharedOptions(e,s);for(let f=e;f<e+n;f++){const g=this.getParsed(f),_=r||Gt(g[a.axis])?{base:l,head:l}:this._calculateBarValuePixels(f),p=this._calculateBarIndexPixels(f,h),m=(g._stacks||{})[a.axis],v={horizontal:c,base:_.base,enableBorderRadius:!m||Ua(g._custom)||o===m._top||o===m._bottom,x:c?_.head:p.center,y:c?p.center:_.head,height:c?p.size:Math.abs(_.size),width:c?Math.abs(_.size):p.size};d&&(v.options=u||this.resolveDataElementOptions(f,t[f].active?"active":s));const x=v.options||t[f].options;zM(v,x,m,o),VM(v,x,h.ratio),this.updateElement(t[f],f,v,s)}}_getStacks(t,e){const{iScale:n}=this._cachedMeta,s=n.getMatchingVisibleMetas(this._type).filter(h=>h.controller.options.grouped),r=n.options.stacked,o=[],a=this._cachedMeta.controller.getParsed(e),l=a&&a[n.axis],c=h=>{const u=h._parsed.find(f=>f[n.axis]===l),d=u&&u[h.vScale.axis];if(Gt(d)||isNaN(d))return!0};for(const h of s)if(!(e!==void 0&&c(h))&&((r===!1||o.indexOf(h.stack)===-1||r===void 0&&h.stack===void 0)&&o.push(h.stack),h.index===t))break;return o.length||o.push(void 0),o}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,e=this.chart.options.indexAxis;return Object.keys(t).filter(n=>t[n].axis===e).shift()}_getAxis(){const t={},e=this.getFirstScaleIdForIndexAxis();for(const n of this.chart.data.datasets)t[Lt(this.chart.options.indexAxis==="x"?n.xAxisID:n.yAxisID,e)]=!0;return Object.keys(t)}_getStackIndex(t,e,n){const s=this._getStacks(t,n),r=e!==void 0?s.indexOf(e):-1;return r===-1?s.length-1:r}_getRuler(){const t=this.options,e=this._cachedMeta,n=e.iScale,s=[];let r,o;for(r=0,o=e.data.length;r<o;++r)s.push(n.getPixelForValue(this.getParsed(r)[n.axis],r));const a=t.barThickness;return{min:a||OM(e),pixels:s,start:n._startPixel,end:n._endPixel,stackCount:this._getStackCount(),scale:n,grouped:t.grouped,ratio:a?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:e,_stacked:n,index:s},options:{base:r,minBarLength:o}}=this,a=r||0,l=this.getParsed(t),c=l._custom,h=Ua(c);let u=l[e.axis],d=0,f=n?this.applyStack(e,l,n):u,g,_;f!==u&&(d=f-u,f=u),h&&(u=c.barStart,f=c.barEnd-c.barStart,u!==0&&Tn(u)!==Tn(c.barEnd)&&(d=0),d+=u);const p=!Gt(r)&&!h?r:d;let m=e.getPixelForValue(p);if(this.chart.getDataVisibility(t)?g=e.getPixelForValue(d+f):g=m,_=g-m,Math.abs(_)<o){_=kM(_,e,a)*o,u===a&&(m-=_/2);const v=e.getPixelForDecimal(0),x=e.getPixelForDecimal(1),y=Math.min(v,x),b=Math.max(v,x);m=Math.max(Math.min(m,b),y),g=m+_,n&&!h&&(l._stacks[e.axis]._visualValues[s]=e.getValueForPixel(g)-e.getValueForPixel(m))}if(m===e.getPixelForValue(a)){const v=Tn(_)*e.getLineWidthForValue(a)/2;m+=v,_-=v}return{size:_,base:m,head:g,center:g+_/2}}_calculateBarIndexPixels(t,e){const n=e.scale,s=this.options,r=s.skipNull,o=Lt(s.maxBarThickness,1/0);let a,l;const c=this._getAxisCount();if(e.grouped){const h=r?this._getStackCount(t):e.stackCount,u=s.barThickness==="flex"?FM(t,e,s,h*c):UM(t,e,s,h*c),d=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,f=this._getAxis().indexOf(Lt(d,this.getFirstScaleIdForIndexAxis())),g=this._getStackIndex(this.index,this._cachedMeta.stack,r?t:void 0)+f;a=u.start+u.chunk*g+u.chunk/2,l=Math.min(o,u.chunk*u.ratio)}else a=n.getPixelForValue(this.getParsed(t)[n.axis],t),l=Math.min(o,e.min*e.ratio);return{base:a-l/2,head:a+l/2,center:a,size:l}}draw(){const t=this._cachedMeta,e=t.vScale,n=t.data,s=n.length;let r=0;for(;r<s;++r)this.getParsed(r)[e.axis]!==null&&!n[r].hidden&&n[r].draw(this._ctx)}}K(ho,"id","bar"),K(ho,"defaults",{datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}}),K(ho,"overrides",{scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}});class uo extends _n{initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,e,n,s){const r=super.parsePrimitiveData(t,e,n,s);for(let o=0;o<r.length;o++)r[o]._custom=this.resolveDataElementOptions(o+n).radius;return r}parseArrayData(t,e,n,s){const r=super.parseArrayData(t,e,n,s);for(let o=0;o<r.length;o++){const a=e[n+o];r[o]._custom=Lt(a[2],this.resolveDataElementOptions(o+n).radius)}return r}parseObjectData(t,e,n,s){const r=super.parseObjectData(t,e,n,s);for(let o=0;o<r.length;o++){const a=e[n+o];r[o]._custom=Lt(a&&a.r&&+a.r,this.resolveDataElementOptions(o+n).radius)}return r}getMaxOverflow(){const t=this._cachedMeta.data;let e=0;for(let n=t.length-1;n>=0;--n)e=Math.max(e,t[n].size(this.resolveDataElementOptions(n))/2);return e>0&&e}getLabelAndValue(t){const e=this._cachedMeta,n=this.chart.data.labels||[],{xScale:s,yScale:r}=e,o=this.getParsed(t),a=s.getLabelForValue(o.x),l=r.getLabelForValue(o.y),c=o._custom;return{label:n[t]||"",value:"("+a+", "+l+(c?", "+c:"")+")"}}update(t){const e=this._cachedMeta.data;this.updateElements(e,0,e.length,t)}updateElements(t,e,n,s){const r=s==="reset",{iScale:o,vScale:a}=this._cachedMeta,{sharedOptions:l,includeOptions:c}=this._getSharedOptions(e,s),h=o.axis,u=a.axis;for(let d=e;d<e+n;d++){const f=t[d],g=!r&&this.getParsed(d),_={},p=_[h]=r?o.getPixelForDecimal(.5):o.getPixelForValue(g[h]),m=_[u]=r?a.getBasePixel():a.getPixelForValue(g[u]);_.skip=isNaN(p)||isNaN(m),c&&(_.options=l||this.resolveDataElementOptions(d,f.active?"active":s),r&&(_.options.radius=0)),this.updateElement(f,d,_,s)}}resolveDataElementOptions(t,e){const n=this.getParsed(t);let s=super.resolveDataElementOptions(t,e);s.$shared&&(s=Object.assign({},s,{$shared:!1}));const r=s.radius;return e!=="active"&&(s.radius=0),s.radius+=Lt(n&&n._custom,r),s}}K(uo,"id","bubble"),K(uo,"defaults",{datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}}),K(uo,"overrides",{scales:{x:{type:"linear"},y:{type:"linear"}}});function GM(i,t,e){let n=1,s=1,r=0,o=0;if(t<oe){const a=i,l=a+t,c=Math.cos(a),h=Math.sin(a),u=Math.cos(l),d=Math.sin(l),f=(x,y,b)=>ar(x,a,l,!0)?1:Math.max(y,y*e,b,b*e),g=(x,y,b)=>ar(x,a,l,!0)?-1:Math.min(y,y*e,b,b*e),_=f(0,c,u),p=f(fe,h,d),m=g(Zt,c,u),v=g(Zt+fe,h,d);n=(_-m)/2,s=(p-v)/2,r=-(_+m)/2,o=-(p+v)/2}return{ratioX:n,ratioY:s,offsetX:r,offsetY:o}}class Ci extends _n{constructor(t,e){super(t,e),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,e){const n=this.getDataset().data,s=this._cachedMeta;if(this._parsing===!1)s._parsed=n;else{let r=l=>+n[l];if(Yt(n[t])){const{key:l="value"}=this._parsing;r=c=>+ui(n[c],l)}let o,a;for(o=t,a=t+e;o<a;++o)s._parsed[o]=r(o)}}_getRotation(){return gn(this.options.rotation-90)}_getCircumference(){return gn(this.options.circumference)}_getRotationExtents(){let t=oe,e=-oe;for(let n=0;n<this.chart.data.datasets.length;++n)if(this.chart.isDatasetVisible(n)&&this.chart.getDatasetMeta(n).type===this._type){const s=this.chart.getDatasetMeta(n).controller,r=s._getRotation(),o=s._getCircumference();t=Math.min(t,r),e=Math.max(e,r+o)}return{rotation:t,circumference:e-t}}update(t){const e=this.chart,{chartArea:n}=e,s=this._cachedMeta,r=s.data,o=this.getMaxBorderWidth()+this.getMaxOffset(r)+this.options.spacing,a=Math.max((Math.min(n.width,n.height)-o)/2,0),l=Math.min(eb(this.options.cutout,a),1),c=this._getRingWeight(this.index),{circumference:h,rotation:u}=this._getRotationExtents(),{ratioX:d,ratioY:f,offsetX:g,offsetY:_}=GM(u,h,l),p=(n.width-o)/d,m=(n.height-o)/f,v=Math.max(Math.min(p,m)/2,0),x=kd(this.options.radius,v),y=Math.max(x*l,0),b=(x-y)/this._getVisibleDatasetWeightTotal();this.offsetX=g*x,this.offsetY=_*x,s.total=this.calculateTotal(),this.outerRadius=x-b*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-b*c,0),this.updateElements(r,0,r.length,t)}_circumference(t,e){const n=this.options,s=this._cachedMeta,r=this._getCircumference();return e&&n.animation.animateRotate||!this.chart.getDataVisibility(t)||s._parsed[t]===null||s.data[t].hidden?0:this.calculateCircumference(s._parsed[t]*r/oe)}updateElements(t,e,n,s){const r=s==="reset",o=this.chart,a=o.chartArea,c=o.options.animation,h=(a.left+a.right)/2,u=(a.top+a.bottom)/2,d=r&&c.animateScale,f=d?0:this.innerRadius,g=d?0:this.outerRadius,{sharedOptions:_,includeOptions:p}=this._getSharedOptions(e,s);let m=this._getRotation(),v;for(v=0;v<e;++v)m+=this._circumference(v,r);for(v=e;v<e+n;++v){const x=this._circumference(v,r),y=t[v],b={x:h+this.offsetX,y:u+this.offsetY,startAngle:m,endAngle:m+x,circumference:x,outerRadius:g,innerRadius:f};p&&(b.options=_||this.resolveDataElementOptions(v,y.active?"active":s)),m+=x,this.updateElement(y,v,b,s)}}calculateTotal(){const t=this._cachedMeta,e=t.data;let n=0,s;for(s=0;s<e.length;s++){const r=t._parsed[s];r!==null&&!isNaN(r)&&this.chart.getDataVisibility(s)&&!e[s].hidden&&(n+=Math.abs(r))}return n}calculateCircumference(t){const e=this._cachedMeta.total;return e>0&&!isNaN(t)?oe*(Math.abs(t)/e):0}getLabelAndValue(t){const e=this._cachedMeta,n=this.chart,s=n.data.labels||[],r=gr(e._parsed[t],n.options.locale);return{label:s[t]||"",value:r}}getMaxBorderWidth(t){let e=0;const n=this.chart;let s,r,o,a,l;if(!t){for(s=0,r=n.data.datasets.length;s<r;++s)if(n.isDatasetVisible(s)){o=n.getDatasetMeta(s),t=o.data,a=o.controller;break}}if(!t)return 0;for(s=0,r=t.length;s<r;++s)l=a.resolveDataElementOptions(s),l.borderAlign!=="inner"&&(e=Math.max(e,l.borderWidth||0,l.hoverBorderWidth||0));return e}getMaxOffset(t){let e=0;for(let n=0,s=t.length;n<s;++n){const r=this.resolveDataElementOptions(n);e=Math.max(e,r.offset||0,r.hoverOffset||0)}return e}_getRingWeightOffset(t){let e=0;for(let n=0;n<t;++n)this.chart.isDatasetVisible(n)&&(e+=this._getRingWeight(n));return e}_getRingWeight(t){return Math.max(Lt(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}K(Ci,"id","doughnut"),K(Ci,"defaults",{datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"}),K(Ci,"descriptors",{_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")}),K(Ci,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data,{labels:{pointStyle:n,textAlign:s,color:r,useBorderRadius:o,borderRadius:a}}=t.legend.options;return e.labels.length&&e.datasets.length?e.labels.map((l,c)=>{const u=t.getDatasetMeta(0).controller.getStyle(c);return{text:l,fillStyle:u.backgroundColor,fontColor:r,hidden:!t.getDataVisibility(c),lineDash:u.borderDash,lineDashOffset:u.borderDashOffset,lineJoin:u.borderJoinStyle,lineWidth:u.borderWidth,strokeStyle:u.borderColor,textAlign:s,pointStyle:n,borderRadius:o&&(a||u.borderRadius),index:c}}):[]}},onClick(t,e,n){n.chart.toggleDataVisibility(e.index),n.chart.update()}}}});class fo extends _n{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const e=this._cachedMeta,{dataset:n,data:s=[],_dataset:r}=e,o=this.chart._animationsDisabled;let{start:a,count:l}=jd(e,s,o);this._drawStart=a,this._drawCount=l,Yd(e)&&(a=0,l=s.length),n._chart=this.chart,n._datasetIndex=this.index,n._decimated=!!r._decimated,n.points=s;const c=this.resolveDatasetElementOptions(t);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(n,void 0,{animated:!o,options:c},t),this.updateElements(s,a,l,t)}updateElements(t,e,n,s){const r=s==="reset",{iScale:o,vScale:a,_stacked:l,_dataset:c}=this._cachedMeta,{sharedOptions:h,includeOptions:u}=this._getSharedOptions(e,s),d=o.axis,f=a.axis,{spanGaps:g,segment:_}=this.options,p=Ms(g)?g:Number.POSITIVE_INFINITY,m=this.chart._animationsDisabled||r||s==="none",v=e+n,x=t.length;let y=e>0&&this.getParsed(e-1);for(let b=0;b<x;++b){const A=t[b],S=m?A:{};if(b<e||b>=v){S.skip=!0;continue}const P=this.getParsed(b),M=Gt(P[f]),w=S[d]=o.getPixelForValue(P[d],b),N=S[f]=r||M?a.getBasePixel():a.getPixelForValue(l?this.applyStack(a,P,l):P[f],b);S.skip=isNaN(w)||isNaN(N)||M,S.stop=b>0&&Math.abs(P[d]-y[d])>p,_&&(S.parsed=P,S.raw=c.data[b]),u&&(S.options=h||this.resolveDataElementOptions(b,A.active?"active":s)),m||this.updateElement(A,b,S,s),y=P}}getMaxOverflow(){const t=this._cachedMeta,e=t.dataset,n=e.options&&e.options.borderWidth||0,s=t.data||[];if(!s.length)return n;const r=s[0].size(this.resolveDataElementOptions(0)),o=s[s.length-1].size(this.resolveDataElementOptions(s.length-1));return Math.max(n,r,o)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}K(fo,"id","line"),K(fo,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),K(fo,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});class Qs extends _n{constructor(t,e){super(t,e),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const e=this._cachedMeta,n=this.chart,s=n.data.labels||[],r=gr(e._parsed[t].r,n.options.locale);return{label:s[t]||"",value:r}}parseObjectData(t,e,n,s){return ef.bind(this)(t,e,n,s)}update(t){const e=this._cachedMeta.data;this._updateRadius(),this.updateElements(e,0,e.length,t)}getMinMax(){const t=this._cachedMeta,e={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((n,s)=>{const r=this.getParsed(s).r;!isNaN(r)&&this.chart.getDataVisibility(s)&&(r<e.min&&(e.min=r),r>e.max&&(e.max=r))}),e}_updateRadius(){const t=this.chart,e=t.chartArea,n=t.options,s=Math.min(e.right-e.left,e.bottom-e.top),r=Math.max(s/2,0),o=Math.max(n.cutoutPercentage?r/100*n.cutoutPercentage:1,0),a=(r-o)/t.getVisibleDatasetCount();this.outerRadius=r-a*this.index,this.innerRadius=this.outerRadius-a}updateElements(t,e,n,s){const r=s==="reset",o=this.chart,l=o.options.animation,c=this._cachedMeta.rScale,h=c.xCenter,u=c.yCenter,d=c.getIndexAngle(0)-.5*Zt;let f=d,g;const _=360/this.countVisibleElements();for(g=0;g<e;++g)f+=this._computeAngle(g,s,_);for(g=e;g<e+n;g++){const p=t[g];let m=f,v=f+this._computeAngle(g,s,_),x=o.getDataVisibility(g)?c.getDistanceFromCenterForValue(this.getParsed(g).r):0;f=v,r&&(l.animateScale&&(x=0),l.animateRotate&&(m=v=d));const y={x:h,y:u,innerRadius:0,outerRadius:x,startAngle:m,endAngle:v,options:this.resolveDataElementOptions(g,p.active?"active":s)};this.updateElement(p,g,y,s)}}countVisibleElements(){const t=this._cachedMeta;let e=0;return t.data.forEach((n,s)=>{!isNaN(this.getParsed(s).r)&&this.chart.getDataVisibility(s)&&e++}),e}_computeAngle(t,e,n){return this.chart.getDataVisibility(t)?gn(this.resolveDataElementOptions(t,e).angle||n):0}}K(Qs,"id","polarArea"),K(Qs,"defaults",{dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0}),K(Qs,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:n,color:s}}=t.legend.options;return e.labels.map((r,o)=>{const l=t.getDatasetMeta(0).controller.getStyle(o);return{text:r,fillStyle:l.backgroundColor,strokeStyle:l.borderColor,fontColor:s,lineWidth:l.borderWidth,pointStyle:n,hidden:!t.getDataVisibility(o),index:o}})}return[]}},onClick(t,e,n){n.chart.toggleDataVisibility(e.index),n.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}});class ol extends Ci{}K(ol,"id","pie"),K(ol,"defaults",{cutout:0,rotation:0,circumference:360,radius:"100%"});class po extends _n{getLabelAndValue(t){const e=this._cachedMeta.vScale,n=this.getParsed(t);return{label:e.getLabels()[t],value:""+e.getLabelForValue(n[e.axis])}}parseObjectData(t,e,n,s){return ef.bind(this)(t,e,n,s)}update(t){const e=this._cachedMeta,n=e.dataset,s=e.data||[],r=e.iScale.getLabels();if(n.points=s,t!=="resize"){const o=this.resolveDatasetElementOptions(t);this.options.showLine||(o.borderWidth=0);const a={_loop:!0,_fullLoop:r.length===s.length,options:o};this.updateElement(n,void 0,a,t)}this.updateElements(s,0,s.length,t)}updateElements(t,e,n,s){const r=this._cachedMeta.rScale,o=s==="reset";for(let a=e;a<e+n;a++){const l=t[a],c=this.resolveDataElementOptions(a,l.active?"active":s),h=r.getPointPositionForValue(a,this.getParsed(a).r),u=o?r.xCenter:h.x,d=o?r.yCenter:h.y,f={x:u,y:d,angle:h.angle,skip:isNaN(u)||isNaN(d),options:c};this.updateElement(l,a,f,s)}}}K(po,"id","radar"),K(po,"defaults",{datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}}),K(po,"overrides",{aspectRatio:1,scales:{r:{type:"radialLinear"}}});class mo extends _n{getLabelAndValue(t){const e=this._cachedMeta,n=this.chart.data.labels||[],{xScale:s,yScale:r}=e,o=this.getParsed(t),a=s.getLabelForValue(o.x),l=r.getLabelForValue(o.y);return{label:n[t]||"",value:"("+a+", "+l+")"}}update(t){const e=this._cachedMeta,{data:n=[]}=e,s=this.chart._animationsDisabled;let{start:r,count:o}=jd(e,n,s);if(this._drawStart=r,this._drawCount=o,Yd(e)&&(r=0,o=n.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:a,_dataset:l}=e;a._chart=this.chart,a._datasetIndex=this.index,a._decimated=!!l._decimated,a.points=n;const c=this.resolveDatasetElementOptions(t);c.segment=this.options.segment,this.updateElement(a,void 0,{animated:!s,options:c},t)}else this.datasetElementType&&(delete e.dataset,this.datasetElementType=!1);this.updateElements(n,r,o,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,e,n,s){const r=s==="reset",{iScale:o,vScale:a,_stacked:l,_dataset:c}=this._cachedMeta,h=this.resolveDataElementOptions(e,s),u=this.getSharedOptions(h),d=this.includeOptions(s,u),f=o.axis,g=a.axis,{spanGaps:_,segment:p}=this.options,m=Ms(_)?_:Number.POSITIVE_INFINITY,v=this.chart._animationsDisabled||r||s==="none";let x=e>0&&this.getParsed(e-1);for(let y=e;y<e+n;++y){const b=t[y],A=this.getParsed(y),S=v?b:{},P=Gt(A[g]),M=S[f]=o.getPixelForValue(A[f],y),w=S[g]=r||P?a.getBasePixel():a.getPixelForValue(l?this.applyStack(a,A,l):A[g],y);S.skip=isNaN(M)||isNaN(w)||P,S.stop=y>0&&Math.abs(A[f]-x[f])>m,p&&(S.parsed=A,S.raw=c.data[y]),d&&(S.options=u||this.resolveDataElementOptions(y,b.active?"active":s)),v||this.updateElement(b,y,S,s),x=A}this.updateSharedOptions(u,s,h)}getMaxOverflow(){const t=this._cachedMeta,e=t.data||[];if(!this.options.showLine){let a=0;for(let l=e.length-1;l>=0;--l)a=Math.max(a,e[l].size(this.resolveDataElementOptions(l))/2);return a>0&&a}const n=t.dataset,s=n.options&&n.options.borderWidth||0;if(!e.length)return s;const r=e[0].size(this.resolveDataElementOptions(0)),o=e[e.length-1].size(this.resolveDataElementOptions(e.length-1));return Math.max(s,r,o)/2}}K(mo,"id","scatter"),K(mo,"defaults",{datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1}),K(mo,"overrides",{interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}});var WM=Object.freeze({__proto__:null,BarController:ho,BubbleController:uo,DoughnutController:Ci,LineController:fo,PieController:ol,PolarAreaController:Qs,RadarController:po,ScatterController:mo});function yi(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class kl{constructor(t){K(this,"options");this.options=t||{}}static override(t){Object.assign(kl.prototype,t)}init(){}formats(){return yi()}parse(){return yi()}format(){return yi()}add(){return yi()}diff(){return yi()}startOf(){return yi()}endOf(){return yi()}}var XM={_date:kl};function jM(i,t,e,n){const{controller:s,data:r,_sorted:o}=i,a=s._cachedMeta.iScale,l=i.dataset&&i.dataset.options?i.dataset.options.spanGaps:null;if(a&&t===a.axis&&t!=="r"&&o&&r.length){const c=a._reversePixels?pb:Hn;if(n){if(s._sharedOptions){const h=r[0],u=typeof h.getRange=="function"&&h.getRange(t);if(u){const d=c(r,t,e-u),f=c(r,t,e+u);return{lo:d.lo,hi:f.hi}}}}else{const h=c(r,t,e);if(l){const{vScale:u}=s._cachedMeta,{_parsed:d}=i,f=d.slice(0,h.lo+1).reverse().findIndex(_=>!Gt(_[u.axis]));h.lo-=Math.max(0,f);const g=d.slice(h.hi).findIndex(_=>!Gt(_[u.axis]));h.hi+=Math.max(0,g)}return h}}return{lo:0,hi:r.length-1}}function _r(i,t,e,n,s){const r=i.getSortedVisibleDatasetMetas(),o=e[t];for(let a=0,l=r.length;a<l;++a){const{index:c,data:h}=r[a],{lo:u,hi:d}=jM(r[a],t,o,s);for(let f=u;f<=d;++f){const g=h[f];g.skip||n(g,c,f)}}}function YM(i){const t=i.indexOf("x")!==-1,e=i.indexOf("y")!==-1;return function(n,s){const r=t?Math.abs(n.x-s.x):0,o=e?Math.abs(n.y-s.y):0;return Math.sqrt(Math.pow(r,2)+Math.pow(o,2))}}function Fa(i,t,e,n,s){const r=[];return!s&&!i.isPointInArea(t)||_r(i,e,t,function(a,l,c){!s&&!Vn(a,i.chartArea,0)||a.inRange(t.x,t.y,n)&&r.push({element:a,datasetIndex:l,index:c})},!0),r}function qM(i,t,e,n){let s=[];function r(o,a,l){const{startAngle:c,endAngle:h}=o.getProps(["startAngle","endAngle"],n),{angle:u}=Hd(o,{x:t.x,y:t.y});ar(u,c,h)&&s.push({element:o,datasetIndex:a,index:l})}return _r(i,e,t,r),s}function $M(i,t,e,n,s,r){let o=[];const a=YM(e);let l=Number.POSITIVE_INFINITY;function c(h,u,d){const f=h.inRange(t.x,t.y,s);if(n&&!f)return;const g=h.getCenterPoint(s);if(!(!!r||i.isPointInArea(g))&&!f)return;const p=a(t,g);p<l?(o=[{element:h,datasetIndex:u,index:d}],l=p):p===l&&o.push({element:h,datasetIndex:u,index:d})}return _r(i,e,t,c),o}function Na(i,t,e,n,s,r){return!r&&!i.isPointInArea(t)?[]:e==="r"&&!n?qM(i,t,e,s):$M(i,t,e,n,s,r)}function lu(i,t,e,n,s){const r=[],o=e==="x"?"inXRange":"inYRange";let a=!1;return _r(i,e,t,(l,c,h)=>{l[o]&&l[o](t[e],s)&&(r.push({element:l,datasetIndex:c,index:h}),a=a||l.inRange(t.x,t.y,s))}),n&&!a?[]:r}var KM={evaluateInteractionItems:_r,modes:{index(i,t,e,n){const s=Ti(t,i),r=e.axis||"x",o=e.includeInvisible||!1,a=e.intersect?Fa(i,s,r,n,o):Na(i,s,r,!1,n,o),l=[];return a.length?(i.getSortedVisibleDatasetMetas().forEach(c=>{const h=a[0].index,u=c.data[h];u&&!u.skip&&l.push({element:u,datasetIndex:c.index,index:h})}),l):[]},dataset(i,t,e,n){const s=Ti(t,i),r=e.axis||"xy",o=e.includeInvisible||!1;let a=e.intersect?Fa(i,s,r,n,o):Na(i,s,r,!1,n,o);if(a.length>0){const l=a[0].datasetIndex,c=i.getDatasetMeta(l).data;a=[];for(let h=0;h<c.length;++h)a.push({element:c[h],datasetIndex:l,index:h})}return a},point(i,t,e,n){const s=Ti(t,i),r=e.axis||"xy",o=e.includeInvisible||!1;return Fa(i,s,r,n,o)},nearest(i,t,e,n){const s=Ti(t,i),r=e.axis||"xy",o=e.includeInvisible||!1;return Na(i,s,r,e.intersect,n,o)},x(i,t,e,n){const s=Ti(t,i);return lu(i,s,"x",e.intersect,n)},y(i,t,e,n){const s=Ti(t,i);return lu(i,s,"y",e.intersect,n)}}};const ff=["left","top","right","bottom"];function Os(i,t){return i.filter(e=>e.pos===t)}function cu(i,t){return i.filter(e=>ff.indexOf(e.pos)===-1&&e.box.axis===t)}function Us(i,t){return i.sort((e,n)=>{const s=t?n:e,r=t?e:n;return s.weight===r.weight?s.index-r.index:s.weight-r.weight})}function ZM(i){const t=[];let e,n,s,r,o,a;for(e=0,n=(i||[]).length;e<n;++e)s=i[e],{position:r,options:{stack:o,stackWeight:a=1}}=s,t.push({index:e,box:s,pos:r,horizontal:s.isHorizontal(),weight:s.weight,stack:o&&r+o,stackWeight:a});return t}function JM(i){const t={};for(const e of i){const{stack:n,pos:s,stackWeight:r}=e;if(!n||!ff.includes(s))continue;const o=t[n]||(t[n]={count:0,placed:0,weight:0,size:0});o.count++,o.weight+=r}return t}function QM(i,t){const e=JM(i),{vBoxMaxWidth:n,hBoxMaxHeight:s}=t;let r,o,a;for(r=0,o=i.length;r<o;++r){a=i[r];const{fullSize:l}=a.box,c=e[a.stack],h=c&&a.stackWeight/c.weight;a.horizontal?(a.width=h?h*n:l&&t.availableWidth,a.height=s):(a.width=n,a.height=h?h*s:l&&t.availableHeight)}return e}function ty(i){const t=ZM(i),e=Us(t.filter(c=>c.box.fullSize),!0),n=Us(Os(t,"left"),!0),s=Us(Os(t,"right")),r=Us(Os(t,"top"),!0),o=Us(Os(t,"bottom")),a=cu(t,"x"),l=cu(t,"y");return{fullSize:e,leftAndTop:n.concat(r),rightAndBottom:s.concat(l).concat(o).concat(a),chartArea:Os(t,"chartArea"),vertical:n.concat(s).concat(l),horizontal:r.concat(o).concat(a)}}function hu(i,t,e,n){return Math.max(i[e],t[e])+Math.max(i[n],t[n])}function pf(i,t){i.top=Math.max(i.top,t.top),i.left=Math.max(i.left,t.left),i.bottom=Math.max(i.bottom,t.bottom),i.right=Math.max(i.right,t.right)}function ey(i,t,e,n){const{pos:s,box:r}=e,o=i.maxPadding;if(!Yt(s)){e.size&&(i[s]-=e.size);const u=n[e.stack]||{size:0,count:1};u.size=Math.max(u.size,e.horizontal?r.height:r.width),e.size=u.size/u.count,i[s]+=e.size}r.getPadding&&pf(o,r.getPadding());const a=Math.max(0,t.outerWidth-hu(o,i,"left","right")),l=Math.max(0,t.outerHeight-hu(o,i,"top","bottom")),c=a!==i.w,h=l!==i.h;return i.w=a,i.h=l,e.horizontal?{same:c,other:h}:{same:h,other:c}}function ny(i){const t=i.maxPadding;function e(n){const s=Math.max(t[n]-i[n],0);return i[n]+=s,s}i.y+=e("top"),i.x+=e("left"),e("right"),e("bottom")}function iy(i,t){const e=t.maxPadding;function n(s){const r={left:0,top:0,right:0,bottom:0};return s.forEach(o=>{r[o]=Math.max(t[o],e[o])}),r}return n(i?["left","right"]:["top","bottom"])}function Vs(i,t,e,n){const s=[];let r,o,a,l,c,h;for(r=0,o=i.length,c=0;r<o;++r){a=i[r],l=a.box,l.update(a.width||t.w,a.height||t.h,iy(a.horizontal,t));const{same:u,other:d}=ey(t,e,a,n);c|=u&&s.length,h=h||d,l.fullSize||s.push(a)}return c&&Vs(s,t,e,n)||h}function eo(i,t,e,n,s){i.top=e,i.left=t,i.right=t+n,i.bottom=e+s,i.width=n,i.height=s}function uu(i,t,e,n){const s=e.padding;let{x:r,y:o}=t;for(const a of i){const l=a.box,c=n[a.stack]||{count:1,placed:0,weight:1},h=a.stackWeight/c.weight||1;if(a.horizontal){const u=t.w*h,d=c.size||l.height;or(c.start)&&(o=c.start),l.fullSize?eo(l,s.left,o,e.outerWidth-s.right-s.left,d):eo(l,t.left+c.placed,o,u,d),c.start=o,c.placed+=u,o=l.bottom}else{const u=t.h*h,d=c.size||l.width;or(c.start)&&(r=c.start),l.fullSize?eo(l,r,s.top,d,e.outerHeight-s.bottom-s.top):eo(l,r,t.top+c.placed,d,u),c.start=r,c.placed+=u,r=l.right}}t.x=r,t.y=o}var Fe={addBox(i,t){i.boxes||(i.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(e){t.draw(e)}}]},i.boxes.push(t)},removeBox(i,t){const e=i.boxes?i.boxes.indexOf(t):-1;e!==-1&&i.boxes.splice(e,1)},configure(i,t,e){t.fullSize=e.fullSize,t.position=e.position,t.weight=e.weight},update(i,t,e,n){if(!i)return;const s=ke(i.options.layout.padding),r=Math.max(t-s.width,0),o=Math.max(e-s.height,0),a=ty(i.boxes),l=a.vertical,c=a.horizontal;Jt(i.boxes,_=>{typeof _.beforeLayout=="function"&&_.beforeLayout()});const h=l.reduce((_,p)=>p.box.options&&p.box.options.display===!1?_:_+1,0)||1,u=Object.freeze({outerWidth:t,outerHeight:e,padding:s,availableWidth:r,availableHeight:o,vBoxMaxWidth:r/2/h,hBoxMaxHeight:o/2}),d=Object.assign({},s);pf(d,ke(n));const f=Object.assign({maxPadding:d,w:r,h:o,x:s.left,y:s.top},s),g=QM(l.concat(c),u);Vs(a.fullSize,f,u,g),Vs(l,f,u,g),Vs(c,f,u,g)&&Vs(l,f,u,g),ny(f),uu(a.leftAndTop,f,u,g),f.x+=f.w,f.y+=f.h,uu(a.rightAndBottom,f,u,g),i.chartArea={left:f.left,top:f.top,right:f.left+f.w,bottom:f.top+f.h,height:f.h,width:f.w},Jt(a.chartArea,_=>{const p=_.box;Object.assign(p,i.chartArea),p.update(f.w,f.h,{left:0,top:0,right:0,bottom:0})})}};class mf{acquireContext(t,e){}releaseContext(t){return!1}addEventListener(t,e,n){}removeEventListener(t,e,n){}getDevicePixelRatio(){return 1}getMaximumSize(t,e,n,s){return e=Math.max(0,e||t.width),n=n||t.height,{width:e,height:Math.max(0,s?Math.floor(e/s):n)}}isAttached(t){return!0}updateConfig(t){}}class sy extends mf{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const go="$chartjs",ry={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},du=i=>i===null||i==="";function oy(i,t){const e=i.style,n=i.getAttribute("height"),s=i.getAttribute("width");if(i[go]={initial:{height:n,width:s,style:{display:e.display,height:e.height,width:e.width}}},e.display=e.display||"block",e.boxSizing=e.boxSizing||"border-box",du(s)){const r=$h(i,"width");r!==void 0&&(i.width=r)}if(du(n))if(i.style.height==="")i.height=i.width/(t||2);else{const r=$h(i,"height");r!==void 0&&(i.height=r)}return i}const gf=aM?{passive:!0}:!1;function ay(i,t,e){i&&i.addEventListener(t,e,gf)}function ly(i,t,e){i&&i.canvas&&i.canvas.removeEventListener(t,e,gf)}function cy(i,t){const e=ry[i.type]||i.type,{x:n,y:s}=Ti(i,t);return{type:e,chart:t,native:i,x:n!==void 0?n:null,y:s!==void 0?s:null}}function Io(i,t){for(const e of i)if(e===t||e.contains(t))return!0}function hy(i,t,e){const n=i.canvas,s=new MutationObserver(r=>{let o=!1;for(const a of r)o=o||Io(a.addedNodes,n),o=o&&!Io(a.removedNodes,n);o&&e()});return s.observe(document,{childList:!0,subtree:!0}),s}function uy(i,t,e){const n=i.canvas,s=new MutationObserver(r=>{let o=!1;for(const a of r)o=o||Io(a.removedNodes,n),o=o&&!Io(a.addedNodes,n);o&&e()});return s.observe(document,{childList:!0,subtree:!0}),s}const cr=new Map;let fu=0;function _f(){const i=window.devicePixelRatio;i!==fu&&(fu=i,cr.forEach((t,e)=>{e.currentDevicePixelRatio!==i&&t()}))}function dy(i,t){cr.size||window.addEventListener("resize",_f),cr.set(i,t)}function fy(i){cr.delete(i),cr.size||window.removeEventListener("resize",_f)}function py(i,t,e){const n=i.canvas,s=n&&Nl(n);if(!s)return;const r=Xd((a,l)=>{const c=s.clientWidth;e(a,l),c<s.clientWidth&&e()},window),o=new ResizeObserver(a=>{const l=a[0],c=l.contentRect.width,h=l.contentRect.height;c===0&&h===0||r(c,h)});return o.observe(s),dy(i,r),o}function ka(i,t,e){e&&e.disconnect(),t==="resize"&&fy(i)}function my(i,t,e){const n=i.canvas,s=Xd(r=>{i.ctx!==null&&e(cy(r,i))},i);return ay(n,t,s),s}class gy extends mf{acquireContext(t,e){const n=t&&t.getContext&&t.getContext("2d");return n&&n.canvas===t?(oy(t,e),n):null}releaseContext(t){const e=t.canvas;if(!e[go])return!1;const n=e[go].initial;["height","width"].forEach(r=>{const o=n[r];Gt(o)?e.removeAttribute(r):e.setAttribute(r,o)});const s=n.style||{};return Object.keys(s).forEach(r=>{e.style[r]=s[r]}),e.width=e.width,delete e[go],!0}addEventListener(t,e,n){this.removeEventListener(t,e);const s=t.$proxies||(t.$proxies={}),o={attach:hy,detach:uy,resize:py}[e]||my;s[e]=o(t,e,n)}removeEventListener(t,e){const n=t.$proxies||(t.$proxies={}),s=n[e];if(!s)return;({attach:ka,detach:ka,resize:ka}[e]||ly)(t,e,s),n[e]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,e,n,s){return oM(t,e,n,s)}isAttached(t){const e=t&&Nl(t);return!!(e&&e.isConnected)}}function _y(i){return!Fl()||typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas?sy:gy}class xn{constructor(){K(this,"x");K(this,"y");K(this,"active",!1);K(this,"options");K(this,"$animations")}tooltipPosition(t){const{x:e,y:n}=this.getProps(["x","y"],t);return{x:e,y:n}}hasValue(){return Ms(this.x)&&Ms(this.y)}getProps(t,e){const n=this.$animations;if(!e||!n)return this;const s={};return t.forEach(r=>{s[r]=n[r]&&n[r].active()?n[r]._to:this[r]}),s}}K(xn,"defaults",{}),K(xn,"defaultRoutes");function xy(i,t){const e=i.options.ticks,n=vy(i),s=Math.min(e.maxTicksLimit||n,n),r=e.major.enabled?My(t):[],o=r.length,a=r[0],l=r[o-1],c=[];if(o>s)return yy(t,c,r,o/s),c;const h=by(r,t,s);if(o>0){let u,d;const f=o>1?Math.round((l-a)/(o-1)):null;for(no(t,c,h,Gt(f)?0:a-f,a),u=0,d=o-1;u<d;u++)no(t,c,h,r[u],r[u+1]);return no(t,c,h,l,Gt(f)?t.length:l+f),c}return no(t,c,h),c}function vy(i){const t=i.options.offset,e=i._tickSize(),n=i._length/e+(t?0:1),s=i._maxLength/e;return Math.floor(Math.min(n,s))}function by(i,t,e){const n=Sy(i),s=t.length/e;if(!n)return Math.max(s,1);const r=cb(n);for(let o=0,a=r.length-1;o<a;o++){const l=r[o];if(l>s)return l}return Math.max(s,1)}function My(i){const t=[];let e,n;for(e=0,n=i.length;e<n;e++)i[e].major&&t.push(e);return t}function yy(i,t,e,n){let s=0,r=e[0],o;for(n=Math.ceil(n),o=0;o<i.length;o++)o===r&&(t.push(i[o]),s++,r=e[s*n])}function no(i,t,e,n,s){const r=Lt(n,0),o=Math.min(Lt(s,i.length),i.length);let a=0,l,c,h;for(e=Math.ceil(e),s&&(l=s-n,e=l/Math.floor(l/e)),h=r;h<0;)a++,h=Math.round(r+a*e);for(c=Math.max(r,0);c<o;c++)c===h&&(t.push(i[c]),a++,h=Math.round(r+a*e))}function Sy(i){const t=i.length;let e,n;if(t<2)return!1;for(n=i[0],e=1;e<t;++e)if(i[e]-i[e-1]!==n)return!1;return n}const Ey=i=>i==="left"?"right":i==="right"?"left":i,pu=(i,t,e)=>t==="top"||t==="left"?i[t]+e:i[t]-e,mu=(i,t)=>Math.min(t||i,i);function gu(i,t){const e=[],n=i.length/t,s=i.length;let r=0;for(;r<s;r+=n)e.push(i[Math.floor(r)]);return e}function Ty(i,t,e){const n=i.ticks.length,s=Math.min(t,n-1),r=i._startPixel,o=i._endPixel,a=1e-6;let l=i.getPixelForTick(s),c;if(!(e&&(n===1?c=Math.max(l-r,o-l):t===0?c=(i.getPixelForTick(1)-l)/2:c=(l-i.getPixelForTick(s-1))/2,l+=s<t?c:-c,l<r-a||l>o+a)))return l}function Ay(i,t){Jt(i,e=>{const n=e.gc,s=n.length/2;let r;if(s>t){for(r=0;r<s;++r)delete e.data[n[r]];n.splice(0,s)}})}function Fs(i){return i.drawTicks?i.tickLength:0}function _u(i,t){if(!i.display)return 0;const e=be(i.font,t),n=ke(i.padding);return(re(i.text)?i.text.length:1)*e.lineHeight+n.height}function wy(i,t){return fi(i,{scale:t,type:"scale"})}function Ry(i,t,e){return fi(i,{tick:e,index:t,type:"tick"})}function Cy(i,t,e){let n=Pl(i);return(e&&t!=="right"||!e&&t==="right")&&(n=Ey(n)),n}function Py(i,t,e,n){const{top:s,left:r,bottom:o,right:a,chart:l}=i,{chartArea:c,scales:h}=l;let u=0,d,f,g;const _=o-s,p=a-r;if(i.isHorizontal()){if(f=Ie(n,r,a),Yt(e)){const m=Object.keys(e)[0],v=e[m];g=h[m].getPixelForValue(v)+_-t}else e==="center"?g=(c.bottom+c.top)/2+_-t:g=pu(i,e,t);d=a-r}else{if(Yt(e)){const m=Object.keys(e)[0],v=e[m];f=h[m].getPixelForValue(v)-p+t}else e==="center"?f=(c.left+c.right)/2-p+t:f=pu(i,e,t);g=Ie(n,o,s),u=e==="left"?-fe:fe}return{titleX:f,titleY:g,maxWidth:d,rotation:u}}class Hi extends xn{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,e){return t}getUserBounds(){let{_userMin:t,_userMax:e,_suggestedMin:n,_suggestedMax:s}=this;return t=tn(t,Number.POSITIVE_INFINITY),e=tn(e,Number.NEGATIVE_INFINITY),n=tn(n,Number.POSITIVE_INFINITY),s=tn(s,Number.NEGATIVE_INFINITY),{min:tn(t,n),max:tn(e,s),minDefined:ue(t),maxDefined:ue(e)}}getMinMax(t){let{min:e,max:n,minDefined:s,maxDefined:r}=this.getUserBounds(),o;if(s&&r)return{min:e,max:n};const a=this.getMatchingVisibleMetas();for(let l=0,c=a.length;l<c;++l)o=a[l].controller.getMinMax(this,t),s||(e=Math.min(e,o.min)),r||(n=Math.max(n,o.max));return e=r&&e>n?n:e,n=s&&e>n?e:n,{min:tn(e,tn(n,e)),max:tn(n,tn(e,n))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){ne(this.options.beforeUpdate,[this])}update(t,e,n){const{beginAtZero:s,grace:r,ticks:o}=this.options,a=o.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this._margins=n=Object.assign({left:0,right:0,top:0,bottom:0},n),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+n.left+n.right:this.height+n.top+n.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=kb(this,r,s),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const l=a<this.ticks.length;this._convertTicksToLabels(l?gu(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),o.display&&(o.autoSkip||o.source==="auto")&&(this.ticks=xy(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),l&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,e,n;this.isHorizontal()?(e=this.left,n=this.right):(e=this.top,n=this.bottom,t=!t),this._startPixel=e,this._endPixel=n,this._reversePixels=t,this._length=n-e,this._alignToPixels=this.options.alignToPixels}afterUpdate(){ne(this.options.afterUpdate,[this])}beforeSetDimensions(){ne(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){ne(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),ne(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){ne(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const e=this.options.ticks;let n,s,r;for(n=0,s=t.length;n<s;n++)r=t[n],r.label=ne(e.callback,[r.value,n,t],this)}afterTickToLabelConversion(){ne(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){ne(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,e=t.ticks,n=mu(this.ticks.length,t.ticks.maxTicksLimit),s=e.minRotation||0,r=e.maxRotation;let o=s,a,l,c;if(!this._isVisible()||!e.display||s>=r||n<=1||!this.isHorizontal()){this.labelRotation=s;return}const h=this._getLabelSizes(),u=h.widest.width,d=h.highest.height,f=Ae(this.chart.width-u,0,this.maxWidth);a=t.offset?this.maxWidth/n:f/(n-1),u+6>a&&(a=f/(n-(t.offset?.5:1)),l=this.maxHeight-Fs(t.grid)-e.padding-_u(t.title,this.chart.options.font),c=Math.sqrt(u*u+d*d),o=Rl(Math.min(Math.asin(Ae((h.highest.height+6)/a,-1,1)),Math.asin(Ae(l/c,-1,1))-Math.asin(Ae(d/c,-1,1)))),o=Math.max(s,Math.min(r,o))),this.labelRotation=o}afterCalculateLabelRotation(){ne(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){ne(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:e,options:{ticks:n,title:s,grid:r}}=this,o=this._isVisible(),a=this.isHorizontal();if(o){const l=_u(s,e.options.font);if(a?(t.width=this.maxWidth,t.height=Fs(r)+l):(t.height=this.maxHeight,t.width=Fs(r)+l),n.display&&this.ticks.length){const{first:c,last:h,widest:u,highest:d}=this._getLabelSizes(),f=n.padding*2,g=gn(this.labelRotation),_=Math.cos(g),p=Math.sin(g);if(a){const m=n.mirror?0:p*u.width+_*d.height;t.height=Math.min(this.maxHeight,t.height+m+f)}else{const m=n.mirror?0:_*u.width+p*d.height;t.width=Math.min(this.maxWidth,t.width+m+f)}this._calculatePadding(c,h,p,_)}}this._handleMargins(),a?(this.width=this._length=e.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=e.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,e,n,s){const{ticks:{align:r,padding:o},position:a}=this.options,l=this.labelRotation!==0,c=a!=="top"&&this.axis==="x";if(this.isHorizontal()){const h=this.getPixelForTick(0)-this.left,u=this.right-this.getPixelForTick(this.ticks.length-1);let d=0,f=0;l?c?(d=s*t.width,f=n*e.height):(d=n*t.height,f=s*e.width):r==="start"?f=e.width:r==="end"?d=t.width:r!=="inner"&&(d=t.width/2,f=e.width/2),this.paddingLeft=Math.max((d-h+o)*this.width/(this.width-h),0),this.paddingRight=Math.max((f-u+o)*this.width/(this.width-u),0)}else{let h=e.height/2,u=t.height/2;r==="start"?(h=0,u=t.height):r==="end"&&(h=e.height,u=0),this.paddingTop=h+o,this.paddingBottom=u+o}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){ne(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:e}=this.options;return e==="top"||e==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let e,n;for(e=0,n=t.length;e<n;e++)Gt(t[e].label)&&(t.splice(e,1),n--,e--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const e=this.options.ticks.sampleSize;let n=this.ticks;e<n.length&&(n=gu(n,e)),this._labelSizes=t=this._computeLabelSizes(n,n.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,e,n){const{ctx:s,_longestTextCache:r}=this,o=[],a=[],l=Math.floor(e/mu(e,n));let c=0,h=0,u,d,f,g,_,p,m,v,x,y,b;for(u=0;u<e;u+=l){if(g=t[u].label,_=this._resolveTickFontOptions(u),s.font=p=_.string,m=r[p]=r[p]||{data:{},gc:[]},v=_.lineHeight,x=y=0,!Gt(g)&&!re(g))x=Lo(s,m.data,m.gc,x,g),y=v;else if(re(g))for(d=0,f=g.length;d<f;++d)b=g[d],!Gt(b)&&!re(b)&&(x=Lo(s,m.data,m.gc,x,b),y+=v);o.push(x),a.push(y),c=Math.max(x,c),h=Math.max(y,h)}Ay(r,e);const A=o.indexOf(c),S=a.indexOf(h),P=M=>({width:o[M]||0,height:a[M]||0});return{first:P(0),last:P(e-1),widest:P(A),highest:P(S),widths:o,heights:a}}getLabelForValue(t){return t}getPixelForValue(t,e){return NaN}getValueForPixel(t){}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const e=this._startPixel+t*this._length;return fb(this._alignToPixels?Mi(this.chart,e,0):e)}getDecimalForPixel(t){const e=(t-this._startPixel)/this._length;return this._reversePixels?1-e:e}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:e}=this;return t<0&&e<0?e:t>0&&e>0?t:0}getContext(t){const e=this.ticks||[];if(t>=0&&t<e.length){const n=e[t];return n.$context||(n.$context=Ry(this.getContext(),t,n))}return this.$context||(this.$context=wy(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,e=gn(this.labelRotation),n=Math.abs(Math.cos(e)),s=Math.abs(Math.sin(e)),r=this._getLabelSizes(),o=t.autoSkipPadding||0,a=r?r.widest.width+o:0,l=r?r.highest.height+o:0;return this.isHorizontal()?l*n>a*s?a/n:l/s:l*s<a*n?l/n:a/s}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const e=this.axis,n=this.chart,s=this.options,{grid:r,position:o,border:a}=s,l=r.offset,c=this.isHorizontal(),u=this.ticks.length+(l?1:0),d=Fs(r),f=[],g=a.setContext(this.getContext()),_=g.display?g.width:0,p=_/2,m=function(I){return Mi(n,I,_)};let v,x,y,b,A,S,P,M,w,N,z,q;if(o==="top")v=m(this.bottom),S=this.bottom-d,M=v-p,N=m(t.top)+p,q=t.bottom;else if(o==="bottom")v=m(this.top),N=t.top,q=m(t.bottom)-p,S=v+p,M=this.top+d;else if(o==="left")v=m(this.right),A=this.right-d,P=v-p,w=m(t.left)+p,z=t.right;else if(o==="right")v=m(this.left),w=t.left,z=m(t.right)-p,A=v+p,P=this.left+d;else if(e==="x"){if(o==="center")v=m((t.top+t.bottom)/2+.5);else if(Yt(o)){const I=Object.keys(o)[0],B=o[I];v=m(this.chart.scales[I].getPixelForValue(B))}N=t.top,q=t.bottom,S=v+p,M=S+d}else if(e==="y"){if(o==="center")v=m((t.left+t.right)/2);else if(Yt(o)){const I=Object.keys(o)[0],B=o[I];v=m(this.chart.scales[I].getPixelForValue(B))}A=v-p,P=A-d,w=t.left,z=t.right}const L=Lt(s.ticks.maxTicksLimit,u),F=Math.max(1,Math.ceil(u/L));for(x=0;x<u;x+=F){const I=this.getContext(x),B=r.setContext(I),J=a.setContext(I),$=B.lineWidth,Z=B.color,O=J.dash||[],G=J.dashOffset,ct=B.tickWidth,ht=B.tickColor,dt=B.tickBorderDash||[],xt=B.tickBorderDashOffset;y=Ty(this,x,l),y!==void 0&&(b=Mi(n,y,$),c?A=P=w=z=b:S=M=N=q=b,f.push({tx1:A,ty1:S,tx2:P,ty2:M,x1:w,y1:N,x2:z,y2:q,width:$,color:Z,borderDash:O,borderDashOffset:G,tickWidth:ct,tickColor:ht,tickBorderDash:dt,tickBorderDashOffset:xt}))}return this._ticksLength=u,this._borderValue=v,f}_computeLabelItems(t){const e=this.axis,n=this.options,{position:s,ticks:r}=n,o=this.isHorizontal(),a=this.ticks,{align:l,crossAlign:c,padding:h,mirror:u}=r,d=Fs(n.grid),f=d+h,g=u?-h:f,_=-gn(this.labelRotation),p=[];let m,v,x,y,b,A,S,P,M,w,N,z,q="middle";if(s==="top")A=this.bottom-g,S=this._getXAxisLabelAlignment();else if(s==="bottom")A=this.top+g,S=this._getXAxisLabelAlignment();else if(s==="left"){const F=this._getYAxisLabelAlignment(d);S=F.textAlign,b=F.x}else if(s==="right"){const F=this._getYAxisLabelAlignment(d);S=F.textAlign,b=F.x}else if(e==="x"){if(s==="center")A=(t.top+t.bottom)/2+f;else if(Yt(s)){const F=Object.keys(s)[0],I=s[F];A=this.chart.scales[F].getPixelForValue(I)+f}S=this._getXAxisLabelAlignment()}else if(e==="y"){if(s==="center")b=(t.left+t.right)/2-f;else if(Yt(s)){const F=Object.keys(s)[0],I=s[F];b=this.chart.scales[F].getPixelForValue(I)}S=this._getYAxisLabelAlignment(d).textAlign}e==="y"&&(l==="start"?q="top":l==="end"&&(q="bottom"));const L=this._getLabelSizes();for(m=0,v=a.length;m<v;++m){x=a[m],y=x.label;const F=r.setContext(this.getContext(m));P=this.getPixelForTick(m)+r.labelOffset,M=this._resolveTickFontOptions(m),w=M.lineHeight,N=re(y)?y.length:1;const I=N/2,B=F.color,J=F.textStrokeColor,$=F.textStrokeWidth;let Z=S;o?(b=P,S==="inner"&&(m===v-1?Z=this.options.reverse?"left":"right":m===0?Z=this.options.reverse?"right":"left":Z="center"),s==="top"?c==="near"||_!==0?z=-N*w+w/2:c==="center"?z=-L.highest.height/2-I*w+w:z=-L.highest.height+w/2:c==="near"||_!==0?z=w/2:c==="center"?z=L.highest.height/2-I*w:z=L.highest.height-N*w,u&&(z*=-1),_!==0&&!F.showLabelBackdrop&&(b+=w/2*Math.sin(_))):(A=P,z=(1-N)*w/2);let O;if(F.showLabelBackdrop){const G=ke(F.backdropPadding),ct=L.heights[m],ht=L.widths[m];let dt=z-G.top,xt=0-G.left;switch(q){case"middle":dt-=ct/2;break;case"bottom":dt-=ct;break}switch(S){case"center":xt-=ht/2;break;case"right":xt-=ht;break;case"inner":m===v-1?xt-=ht:m>0&&(xt-=ht/2);break}O={left:xt,top:dt,width:ht+G.width,height:ct+G.height,color:F.backdropColor}}p.push({label:y,font:M,textOffset:z,options:{rotation:_,color:B,strokeColor:J,strokeWidth:$,textAlign:Z,textBaseline:q,translation:[b,A],backdrop:O}})}return p}_getXAxisLabelAlignment(){const{position:t,ticks:e}=this.options;if(-gn(this.labelRotation))return t==="top"?"left":"right";let s="center";return e.align==="start"?s="left":e.align==="end"?s="right":e.align==="inner"&&(s="inner"),s}_getYAxisLabelAlignment(t){const{position:e,ticks:{crossAlign:n,mirror:s,padding:r}}=this.options,o=this._getLabelSizes(),a=t+r,l=o.widest.width;let c,h;return e==="left"?s?(h=this.right+r,n==="near"?c="left":n==="center"?(c="center",h+=l/2):(c="right",h+=l)):(h=this.right-a,n==="near"?c="right":n==="center"?(c="center",h-=l/2):(c="left",h=this.left)):e==="right"?s?(h=this.left+r,n==="near"?c="right":n==="center"?(c="center",h-=l/2):(c="left",h-=l)):(h=this.left+a,n==="near"?c="left":n==="center"?(c="center",h+=l/2):(c="right",h=this.right)):c="right",{textAlign:c,x:h}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,e=this.options.position;if(e==="left"||e==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(e==="top"||e==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:e},left:n,top:s,width:r,height:o}=this;e&&(t.save(),t.fillStyle=e,t.fillRect(n,s,r,o),t.restore())}getLineWidthForValue(t){const e=this.options.grid;if(!this._isVisible()||!e.display)return 0;const s=this.ticks.findIndex(r=>r.value===t);return s>=0?e.setContext(this.getContext(s)).lineWidth:0}drawGrid(t){const e=this.options.grid,n=this.ctx,s=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let r,o;const a=(l,c,h)=>{!h.width||!h.color||(n.save(),n.lineWidth=h.width,n.strokeStyle=h.color,n.setLineDash(h.borderDash||[]),n.lineDashOffset=h.borderDashOffset,n.beginPath(),n.moveTo(l.x,l.y),n.lineTo(c.x,c.y),n.stroke(),n.restore())};if(e.display)for(r=0,o=s.length;r<o;++r){const l=s[r];e.drawOnChartArea&&a({x:l.x1,y:l.y1},{x:l.x2,y:l.y2},l),e.drawTicks&&a({x:l.tx1,y:l.ty1},{x:l.tx2,y:l.ty2},{color:l.tickColor,width:l.tickWidth,borderDash:l.tickBorderDash,borderDashOffset:l.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:e,options:{border:n,grid:s}}=this,r=n.setContext(this.getContext()),o=n.display?r.width:0;if(!o)return;const a=s.setContext(this.getContext(0)).lineWidth,l=this._borderValue;let c,h,u,d;this.isHorizontal()?(c=Mi(t,this.left,o)-o/2,h=Mi(t,this.right,a)+a/2,u=d=l):(u=Mi(t,this.top,o)-o/2,d=Mi(t,this.bottom,a)+a/2,c=h=l),e.save(),e.lineWidth=r.width,e.strokeStyle=r.color,e.beginPath(),e.moveTo(c,u),e.lineTo(h,d),e.stroke(),e.restore()}drawLabels(t){if(!this.options.ticks.display)return;const n=this.ctx,s=this._computeLabelArea();s&&Vo(n,s);const r=this.getLabelItems(t);for(const o of r){const a=o.options,l=o.font,c=o.label,h=o.textOffset;ki(n,c,0,h,l,a)}s&&Go(n)}drawTitle(){const{ctx:t,options:{position:e,title:n,reverse:s}}=this;if(!n.display)return;const r=be(n.font),o=ke(n.padding),a=n.align;let l=r.lineHeight/2;e==="bottom"||e==="center"||Yt(e)?(l+=o.bottom,re(n.text)&&(l+=r.lineHeight*(n.text.length-1))):l+=o.top;const{titleX:c,titleY:h,maxWidth:u,rotation:d}=Py(this,l,e,a);ki(t,n.text,0,0,r,{color:n.color,maxWidth:u,rotation:d,textAlign:Cy(a,e,s),textBaseline:"middle",translation:[c,h]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,e=t.ticks&&t.ticks.z||0,n=Lt(t.grid&&t.grid.z,-1),s=Lt(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==Hi.prototype.draw?[{z:e,draw:r=>{this.draw(r)}}]:[{z:n,draw:r=>{this.drawBackground(),this.drawGrid(r),this.drawTitle()}},{z:s,draw:()=>{this.drawBorder()}},{z:e,draw:r=>{this.drawLabels(r)}}]}getMatchingVisibleMetas(t){const e=this.chart.getSortedVisibleDatasetMetas(),n=this.axis+"AxisID",s=[];let r,o;for(r=0,o=e.length;r<o;++r){const a=e[r];a[n]===this.id&&(!t||a.type===t)&&s.push(a)}return s}_resolveTickFontOptions(t){const e=this.options.ticks.setContext(this.getContext(t));return be(e.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class io{constructor(t,e,n){this.type=t,this.scope=e,this.override=n,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const e=Object.getPrototypeOf(t);let n;Iy(e)&&(n=this.register(e));const s=this.items,r=t.id,o=this.scope+"."+r;if(!r)throw new Error("class does not have id: "+t);return r in s||(s[r]=t,Ly(t,o,n),this.override&&le.override(t.id,t.overrides)),o}get(t){return this.items[t]}unregister(t){const e=this.items,n=t.id,s=this.scope;n in e&&delete e[n],s&&n in le[s]&&(delete le[s][n],this.override&&delete Ni[n])}}function Ly(i,t,e){const n=rr(Object.create(null),[e?le.get(e):{},le.get(t),i.defaults]);le.set(t,n),i.defaultRoutes&&Dy(t,i.defaultRoutes),i.descriptors&&le.describe(t,i.descriptors)}function Dy(i,t){Object.keys(t).forEach(e=>{const n=e.split("."),s=n.pop(),r=[i].concat(n).join("."),o=t[e].split("."),a=o.pop(),l=o.join(".");le.route(r,s,l,a)})}function Iy(i){return"id"in i&&"defaults"in i}class Oy{constructor(){this.controllers=new io(_n,"datasets",!0),this.elements=new io(xn,"elements"),this.plugins=new io(Object,"plugins"),this.scales=new io(Hi,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,e,n){[...e].forEach(s=>{const r=n||this._getRegistryForType(s);n||r.isForType(s)||r===this.plugins&&s.id?this._exec(t,r,s):Jt(s,o=>{const a=n||this._getRegistryForType(o);this._exec(t,a,o)})})}_exec(t,e,n){const s=wl(t);ne(n["before"+s],[],n),e[t](n),ne(n["after"+s],[],n)}_getRegistryForType(t){for(let e=0;e<this._typedRegistries.length;e++){const n=this._typedRegistries[e];if(n.isForType(t))return n}return this.plugins}_get(t,e,n){const s=e.get(t);if(s===void 0)throw new Error('"'+t+'" is not a registered '+n+".");return s}}var Mn=new Oy;class Uy{constructor(){this._init=void 0}notify(t,e,n,s){if(e==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const r=s?this._descriptors(t).filter(s):this._descriptors(t),o=this._notify(r,t,e,n);return e==="afterDestroy"&&(this._notify(r,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),o}_notify(t,e,n,s){s=s||{};for(const r of t){const o=r.plugin,a=o[n],l=[e,s,r.options];if(ne(a,l,o)===!1&&s.cancelable)return!1}return!0}invalidate(){Gt(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const e=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),e}_createDescriptors(t,e){const n=t&&t.config,s=Lt(n.options&&n.options.plugins,{}),r=Fy(n);return s===!1&&!e?[]:ky(t,r,s,e)}_notifyStateChanges(t){const e=this._oldCache||[],n=this._cache,s=(r,o)=>r.filter(a=>!o.some(l=>a.plugin.id===l.plugin.id));this._notify(s(e,n),t,"stop"),this._notify(s(n,e),t,"start")}}function Fy(i){const t={},e=[],n=Object.keys(Mn.plugins.items);for(let r=0;r<n.length;r++)e.push(Mn.getPlugin(n[r]));const s=i.plugins||[];for(let r=0;r<s.length;r++){const o=s[r];e.indexOf(o)===-1&&(e.push(o),t[o.id]=!0)}return{plugins:e,localIds:t}}function Ny(i,t){return!t&&i===!1?null:i===!0?{}:i}function ky(i,{plugins:t,localIds:e},n,s){const r=[],o=i.getContext();for(const a of t){const l=a.id,c=Ny(n[l],s);c!==null&&r.push({plugin:a,options:By(i.config,{plugin:a,local:e[l]},c,o)})}return r}function By(i,{plugin:t,local:e},n,s){const r=i.pluginScopeKeys(t),o=i.getOptionScopes(n,r);return e&&t.defaults&&o.push(t.defaults),i.createResolver(o,s,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function al(i,t){const e=le.datasets[i]||{};return((t.datasets||{})[i]||{}).indexAxis||t.indexAxis||e.indexAxis||"x"}function zy(i,t){let e=i;return i==="_index_"?e=t:i==="_value_"&&(e=t==="x"?"y":"x"),e}function Hy(i,t){return i===t?"_index_":"_value_"}function xu(i){if(i==="x"||i==="y"||i==="r")return i}function Vy(i){if(i==="top"||i==="bottom")return"x";if(i==="left"||i==="right")return"y"}function ll(i,...t){if(xu(i))return i;for(const e of t){const n=e.axis||Vy(e.position)||i.length>1&&xu(i[0].toLowerCase());if(n)return n}throw new Error(`Cannot determine type of '${i}' axis. Please provide 'axis' or 'position' option.`)}function vu(i,t,e){if(e[t+"AxisID"]===i)return{axis:t}}function Gy(i,t){if(t.data&&t.data.datasets){const e=t.data.datasets.filter(n=>n.xAxisID===i||n.yAxisID===i);if(e.length)return vu(i,"x",e[0])||vu(i,"y",e[0])}return{}}function Wy(i,t){const e=Ni[i.type]||{scales:{}},n=t.scales||{},s=al(i.type,t),r=Object.create(null);return Object.keys(n).forEach(o=>{const a=n[o];if(!Yt(a))return console.error(`Invalid scale configuration for scale: ${o}`);if(a._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${o}`);const l=ll(o,a,Gy(o,i),le.scales[a.type]),c=Hy(l,s),h=e.scales||{};r[o]=$s(Object.create(null),[{axis:l},a,h[l],h[c]])}),i.data.datasets.forEach(o=>{const a=o.type||i.type,l=o.indexAxis||al(a,t),h=(Ni[a]||{}).scales||{};Object.keys(h).forEach(u=>{const d=zy(u,l),f=o[d+"AxisID"]||d;r[f]=r[f]||Object.create(null),$s(r[f],[{axis:d},n[f],h[u]])})}),Object.keys(r).forEach(o=>{const a=r[o];$s(a,[le.scales[a.type],le.scale])}),r}function xf(i){const t=i.options||(i.options={});t.plugins=Lt(t.plugins,{}),t.scales=Wy(i,t)}function vf(i){return i=i||{},i.datasets=i.datasets||[],i.labels=i.labels||[],i}function Xy(i){return i=i||{},i.data=vf(i.data),xf(i),i}const bu=new Map,bf=new Set;function so(i,t){let e=bu.get(i);return e||(e=t(),bu.set(i,e),bf.add(e)),e}const Ns=(i,t,e)=>{const n=ui(t,e);n!==void 0&&i.add(n)};class jy{constructor(t){this._config=Xy(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=vf(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),xf(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return so(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,e){return so(`${t}.transition.${e}`,()=>[[`datasets.${t}.transitions.${e}`,`transitions.${e}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,e){return so(`${t}-${e}`,()=>[[`datasets.${t}.elements.${e}`,`datasets.${t}`,`elements.${e}`,""]])}pluginScopeKeys(t){const e=t.id,n=this.type;return so(`${n}-plugin-${e}`,()=>[[`plugins.${e}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,e){const n=this._scopeCache;let s=n.get(t);return(!s||e)&&(s=new Map,n.set(t,s)),s}getOptionScopes(t,e,n){const{options:s,type:r}=this,o=this._cachedScopes(t,n),a=o.get(e);if(a)return a;const l=new Set;e.forEach(h=>{t&&(l.add(t),h.forEach(u=>Ns(l,t,u))),h.forEach(u=>Ns(l,s,u)),h.forEach(u=>Ns(l,Ni[r]||{},u)),h.forEach(u=>Ns(l,le,u)),h.forEach(u=>Ns(l,sl,u))});const c=Array.from(l);return c.length===0&&c.push(Object.create(null)),bf.has(e)&&o.set(e,c),c}chartOptionScopes(){const{options:t,type:e}=this;return[t,Ni[e]||{},le.datasets[e]||{},{type:e},le,sl]}resolveNamedOptions(t,e,n,s=[""]){const r={$shared:!0},{resolver:o,subPrefixes:a}=Mu(this._resolverCache,t,s);let l=o;if(qy(o,e)){r.$shared=!1,n=di(n)?n():n;const c=this.createResolver(t,n,a);l=ys(o,n,c)}for(const c of e)r[c]=l[c];return r}createResolver(t,e,n=[""],s){const{resolver:r}=Mu(this._resolverCache,t,n);return Yt(e)?ys(r,e,void 0,s):r}}function Mu(i,t,e){let n=i.get(t);n||(n=new Map,i.set(t,n));const s=e.join();let r=n.get(s);return r||(r={resolver:Il(t,e),subPrefixes:e.filter(a=>!a.toLowerCase().includes("hover"))},n.set(s,r)),r}const Yy=i=>Yt(i)&&Object.getOwnPropertyNames(i).some(t=>di(i[t]));function qy(i,t){const{isScriptable:e,isIndexable:n}=Zd(i);for(const s of t){const r=e(s),o=n(s),a=(o||r)&&i[s];if(r&&(di(a)||Yy(a))||o&&re(a))return!0}return!1}var $y="4.5.1";const Ky=["top","bottom","left","right","chartArea"];function yu(i,t){return i==="top"||i==="bottom"||Ky.indexOf(i)===-1&&t==="x"}function Su(i,t){return function(e,n){return e[i]===n[i]?e[t]-n[t]:e[i]-n[i]}}function Eu(i){const t=i.chart,e=t.options.animation;t.notifyPlugins("afterRender"),ne(e&&e.onComplete,[i],t)}function Zy(i){const t=i.chart,e=t.options.animation;ne(e&&e.onProgress,[i],t)}function Mf(i){return Fl()&&typeof i=="string"?i=document.getElementById(i):i&&i.length&&(i=i[0]),i&&i.canvas&&(i=i.canvas),i}const _o={},Tu=i=>{const t=Mf(i);return Object.values(_o).filter(e=>e.canvas===t).pop()};function Jy(i,t,e){const n=Object.keys(i);for(const s of n){const r=+s;if(r>=t){const o=i[s];delete i[s],(e>0||r>t)&&(i[r+e]=o)}}}function Qy(i,t,e,n){return!e||i.type==="mouseout"?null:n?t:i}class cn{static register(...t){Mn.add(...t),Au()}static unregister(...t){Mn.remove(...t),Au()}constructor(t,e){const n=this.config=new jy(e),s=Mf(t),r=Tu(s);if(r)throw new Error("Canvas is already in use. Chart with ID '"+r.id+"' must be destroyed before the canvas with ID '"+r.canvas.id+"' can be reused.");const o=n.createResolver(n.chartOptionScopes(),this.getContext());this.platform=new(n.platform||_y(s)),this.platform.updateConfig(n);const a=this.platform.acquireContext(s,o.aspectRatio),l=a&&a.canvas,c=l&&l.height,h=l&&l.width;if(this.id=tb(),this.ctx=a,this.canvas=l,this.width=h,this.height=c,this._options=o,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new Uy,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=_b(u=>this.update(u),o.resizeDelay||0),this._dataChanges=[],_o[this.id]=this,!a||!l){console.error("Failed to create chart: can't acquire context from the given item");return}Un.listen(this,"complete",Eu),Un.listen(this,"progress",Zy),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:e},width:n,height:s,_aspectRatio:r}=this;return Gt(t)?e&&r?r:s?n/s:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return Mn}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():qh(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Xh(this.canvas,this.ctx),this}stop(){return Un.stop(this),this}resize(t,e){Un.running(this)?this._resizeBeforeDraw={width:t,height:e}:this._resize(t,e)}_resize(t,e){const n=this.options,s=this.canvas,r=n.maintainAspectRatio&&this.aspectRatio,o=this.platform.getMaximumSize(s,t,e,r),a=n.devicePixelRatio||this.platform.getDevicePixelRatio(),l=this.width?"resize":"attach";this.width=o.width,this.height=o.height,this._aspectRatio=this.aspectRatio,qh(this,a,!0)&&(this.notifyPlugins("resize",{size:o}),ne(n.onResize,[this,o],this),this.attached&&this._doResize(l)&&this.render())}ensureScalesHaveIDs(){const e=this.options.scales||{};Jt(e,(n,s)=>{n.id=s})}buildOrUpdateScales(){const t=this.options,e=t.scales,n=this.scales,s=Object.keys(n).reduce((o,a)=>(o[a]=!1,o),{});let r=[];e&&(r=r.concat(Object.keys(e).map(o=>{const a=e[o],l=ll(o,a),c=l==="r",h=l==="x";return{options:a,dposition:c?"chartArea":h?"bottom":"left",dtype:c?"radialLinear":h?"category":"linear"}}))),Jt(r,o=>{const a=o.options,l=a.id,c=ll(l,a),h=Lt(a.type,o.dtype);(a.position===void 0||yu(a.position,c)!==yu(o.dposition))&&(a.position=o.dposition),s[l]=!0;let u=null;if(l in n&&n[l].type===h)u=n[l];else{const d=Mn.getScale(h);u=new d({id:l,type:h,ctx:this.ctx,chart:this}),n[u.id]=u}u.init(a,t)}),Jt(s,(o,a)=>{o||delete n[a]}),Jt(n,o=>{Fe.configure(this,o,o.options),Fe.addBox(this,o)})}_updateMetasets(){const t=this._metasets,e=this.data.datasets.length,n=t.length;if(t.sort((s,r)=>s.index-r.index),n>e){for(let s=e;s<n;++s)this._destroyDatasetMeta(s);t.splice(e,n-e)}this._sortedMetasets=t.slice(0).sort(Su("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:e}}=this;t.length>e.length&&delete this._stacks,t.forEach((n,s)=>{e.filter(r=>r===n._dataset).length===0&&this._destroyDatasetMeta(s)})}buildOrUpdateControllers(){const t=[],e=this.data.datasets;let n,s;for(this._removeUnreferencedMetasets(),n=0,s=e.length;n<s;n++){const r=e[n];let o=this.getDatasetMeta(n);const a=r.type||this.config.type;if(o.type&&o.type!==a&&(this._destroyDatasetMeta(n),o=this.getDatasetMeta(n)),o.type=a,o.indexAxis=r.indexAxis||al(a,this.options),o.order=r.order||0,o.index=n,o.label=""+r.label,o.visible=this.isDatasetVisible(n),o.controller)o.controller.updateIndex(n),o.controller.linkScales();else{const l=Mn.getController(a),{datasetElementType:c,dataElementType:h}=le.datasets[a];Object.assign(l,{dataElementType:Mn.getElement(h),datasetElementType:c&&Mn.getElement(c)}),o.controller=new l(this,n),t.push(o.controller)}}return this._updateMetasets(),t}_resetElements(){Jt(this.data.datasets,(t,e)=>{this.getDatasetMeta(e).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const e=this.config;e.update();const n=this._options=e.createResolver(e.chartOptionScopes(),this.getContext()),s=this._animationsDisabled=!n.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const r=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let o=0;for(let c=0,h=this.data.datasets.length;c<h;c++){const{controller:u}=this.getDatasetMeta(c),d=!s&&r.indexOf(u)===-1;u.buildOrUpdateElements(d),o=Math.max(+u.getMaxOverflow(),o)}o=this._minPadding=n.layout.autoPadding?o:0,this._updateLayout(o),s||Jt(r,c=>{c.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(Su("z","_idx"));const{_active:a,_lastEvent:l}=this;l?this._eventHandler(l,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){Jt(this.scales,t=>{Fe.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,e=new Set(Object.keys(this._listeners)),n=new Set(t.events);(!Fh(e,n)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,e=this._getUniformDataChanges()||[];for(const{method:n,start:s,count:r}of e){const o=n==="_removeElements"?-r:r;Jy(t,s,o)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const e=this.data.datasets.length,n=r=>new Set(t.filter(o=>o[0]===r).map((o,a)=>a+","+o.splice(1).join(","))),s=n(0);for(let r=1;r<e;r++)if(!Fh(s,n(r)))return;return Array.from(s).map(r=>r.split(",")).map(r=>({method:r[1],start:+r[2],count:+r[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;Fe.update(this,this.width,this.height,t);const e=this.chartArea,n=e.width<=0||e.height<=0;this._layers=[],Jt(this.boxes,s=>{n&&s.position==="chartArea"||(s.configure&&s.configure(),this._layers.push(...s._layers()))},this),this._layers.forEach((s,r)=>{s._idx=r}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let e=0,n=this.data.datasets.length;e<n;++e)this.getDatasetMeta(e).controller.configure();for(let e=0,n=this.data.datasets.length;e<n;++e)this._updateDataset(e,di(t)?t({datasetIndex:e}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,e){const n=this.getDatasetMeta(t),s={meta:n,index:t,mode:e,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",s)!==!1&&(n.controller._update(e),s.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",s))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(Un.has(this)?this.attached&&!Un.running(this)&&Un.start(this):(this.draw(),Eu({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:n,height:s}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(n,s)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const e=this._layers;for(t=0;t<e.length&&e[t].z<=0;++t)e[t].draw(this.chartArea);for(this._drawDatasets();t<e.length;++t)e[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const e=this._sortedMetasets,n=[];let s,r;for(s=0,r=e.length;s<r;++s){const o=e[s];(!t||o.visible)&&n.push(o)}return n}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let e=t.length-1;e>=0;--e)this._drawDataset(t[e]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const e=this.ctx,n={meta:t,index:t.index,cancelable:!0},s=cf(this,t);this.notifyPlugins("beforeDatasetDraw",n)!==!1&&(s&&Vo(e,s),t.controller.draw(),s&&Go(e),n.cancelable=!1,this.notifyPlugins("afterDatasetDraw",n))}isPointInArea(t){return Vn(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,e,n,s){const r=KM.modes[e];return typeof r=="function"?r(this,t,n,s):[]}getDatasetMeta(t){const e=this.data.datasets[t],n=this._metasets;let s=n.filter(r=>r&&r._dataset===e).pop();return s||(s={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:e&&e.order||0,index:t,_dataset:e,_parsed:[],_sorted:!1},n.push(s)),s}getContext(){return this.$context||(this.$context=fi(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const e=this.data.datasets[t];if(!e)return!1;const n=this.getDatasetMeta(t);return typeof n.hidden=="boolean"?!n.hidden:!e.hidden}setDatasetVisibility(t,e){const n=this.getDatasetMeta(t);n.hidden=!e}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,e,n){const s=n?"show":"hide",r=this.getDatasetMeta(t),o=r.controller._resolveAnimations(void 0,s);or(e)?(r.data[e].hidden=!n,this.update()):(this.setDatasetVisibility(t,n),o.update(r,{visible:n}),this.update(a=>a.datasetIndex===t?s:void 0))}hide(t,e){this._updateVisibility(t,e,!1)}show(t,e){this._updateVisibility(t,e,!0)}_destroyDatasetMeta(t){const e=this._metasets[t];e&&e.controller&&e.controller._destroy(),delete this._metasets[t]}_stop(){let t,e;for(this.stop(),Un.remove(this),t=0,e=this.data.datasets.length;t<e;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:e}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),Xh(t,e),this.platform.releaseContext(e),this.canvas=null,this.ctx=null),delete _o[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,e=this.platform,n=(r,o)=>{e.addEventListener(this,r,o),t[r]=o},s=(r,o,a)=>{r.offsetX=o,r.offsetY=a,this._eventHandler(r)};Jt(this.options.events,r=>n(r,s))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,e=this.platform,n=(l,c)=>{e.addEventListener(this,l,c),t[l]=c},s=(l,c)=>{t[l]&&(e.removeEventListener(this,l,c),delete t[l])},r=(l,c)=>{this.canvas&&this.resize(l,c)};let o;const a=()=>{s("attach",a),this.attached=!0,this.resize(),n("resize",r),n("detach",o)};o=()=>{this.attached=!1,s("resize",r),this._stop(),this._resize(0,0),n("attach",a)},e.isAttached(this.canvas)?a():o()}unbindEvents(){Jt(this._listeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._listeners={},Jt(this._responsiveListeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,e,n){const s=n?"set":"remove";let r,o,a,l;for(e==="dataset"&&(r=this.getDatasetMeta(t[0].datasetIndex),r.controller["_"+s+"DatasetHoverStyle"]()),a=0,l=t.length;a<l;++a){o=t[a];const c=o&&this.getDatasetMeta(o.datasetIndex).controller;c&&c[s+"HoverStyle"](o.element,o.datasetIndex,o.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const e=this._active||[],n=t.map(({datasetIndex:r,index:o})=>{const a=this.getDatasetMeta(r);if(!a)throw new Error("No dataset found at index "+r);return{datasetIndex:r,element:a.data[o],index:o}});!Ro(n,e)&&(this._active=n,this._lastEvent=null,this._updateHoverStyles(n,e))}notifyPlugins(t,e,n){return this._plugins.notify(this,t,e,n)}isPluginEnabled(t){return this._plugins._cache.filter(e=>e.plugin.id===t).length===1}_updateHoverStyles(t,e,n){const s=this.options.hover,r=(l,c)=>l.filter(h=>!c.some(u=>h.datasetIndex===u.datasetIndex&&h.index===u.index)),o=r(e,t),a=n?t:r(t,e);o.length&&this.updateHoverStyle(o,s.mode,!1),a.length&&s.mode&&this.updateHoverStyle(a,s.mode,!0)}_eventHandler(t,e){const n={event:t,replay:e,cancelable:!0,inChartArea:this.isPointInArea(t)},s=o=>(o.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",n,s)===!1)return;const r=this._handleEvent(t,e,n.inChartArea);return n.cancelable=!1,this.notifyPlugins("afterEvent",n,s),(r||n.changed)&&this.render(),this}_handleEvent(t,e,n){const{_active:s=[],options:r}=this,o=e,a=this._getActiveElements(t,s,n,o),l=ob(t),c=Qy(t,this._lastEvent,n,l);n&&(this._lastEvent=null,ne(r.onHover,[t,a,this],this),l&&ne(r.onClick,[t,a,this],this));const h=!Ro(a,s);return(h||e)&&(this._active=a,this._updateHoverStyles(a,s,e)),this._lastEvent=c,h}_getActiveElements(t,e,n,s){if(t.type==="mouseout")return[];if(!n)return e;const r=this.options.hover;return this.getElementsAtEventForMode(t,r.mode,r,s)}}K(cn,"defaults",le),K(cn,"instances",_o),K(cn,"overrides",Ni),K(cn,"registry",Mn),K(cn,"version",$y),K(cn,"getChart",Tu);function Au(){return Jt(cn.instances,i=>i._plugins.invalidate())}function tS(i,t,e){const{startAngle:n,x:s,y:r,outerRadius:o,innerRadius:a,options:l}=t,{borderWidth:c,borderJoinStyle:h}=l,u=Math.min(c/o,Oe(n-e));if(i.beginPath(),i.arc(s,r,o-c/2,n+u/2,e-u/2),a>0){const d=Math.min(c/a,Oe(n-e));i.arc(s,r,a+c/2,e-d/2,n+d/2,!0)}else{const d=Math.min(c/2,o*Oe(n-e));if(h==="round")i.arc(s,r,d,e-Zt/2,n+Zt/2,!0);else if(h==="bevel"){const f=2*d*d,g=-f*Math.cos(e+Zt/2)+s,_=-f*Math.sin(e+Zt/2)+r,p=f*Math.cos(n+Zt/2)+s,m=f*Math.sin(n+Zt/2)+r;i.lineTo(g,_),i.lineTo(p,m)}}i.closePath(),i.moveTo(0,0),i.rect(0,0,i.canvas.width,i.canvas.height),i.clip("evenodd")}function eS(i,t,e){const{startAngle:n,pixelMargin:s,x:r,y:o,outerRadius:a,innerRadius:l}=t;let c=s/a;i.beginPath(),i.arc(r,o,a,n-c,e+c),l>s?(c=s/l,i.arc(r,o,l,e+c,n-c,!0)):i.arc(r,o,s,e+fe,n-fe),i.closePath(),i.clip()}function nS(i){return Dl(i,["outerStart","outerEnd","innerStart","innerEnd"])}function iS(i,t,e,n){const s=nS(i.options.borderRadius),r=(e-t)/2,o=Math.min(r,n*t/2),a=l=>{const c=(e-Math.min(r,l))*n/2;return Ae(l,0,Math.min(r,c))};return{outerStart:a(s.outerStart),outerEnd:a(s.outerEnd),innerStart:Ae(s.innerStart,0,o),innerEnd:Ae(s.innerEnd,0,o)}}function us(i,t,e,n){return{x:e+i*Math.cos(t),y:n+i*Math.sin(t)}}function Oo(i,t,e,n,s,r){const{x:o,y:a,startAngle:l,pixelMargin:c,innerRadius:h}=t,u=Math.max(t.outerRadius+n+e-c,0),d=h>0?h+n+e+c:0;let f=0;const g=s-l;if(n){const F=h>0?h-n:0,I=u>0?u-n:0,B=(F+I)/2,J=B!==0?g*B/(B+n):g;f=(g-J)/2}const _=Math.max(.001,g*u-e/Zt)/u,p=(g-_)/2,m=l+p+f,v=s-p-f,{outerStart:x,outerEnd:y,innerStart:b,innerEnd:A}=iS(t,d,u,v-m),S=u-x,P=u-y,M=m+x/S,w=v-y/P,N=d+b,z=d+A,q=m+b/N,L=v-A/z;if(i.beginPath(),r){const F=(M+w)/2;if(i.arc(o,a,u,M,F),i.arc(o,a,u,F,w),y>0){const $=us(P,w,o,a);i.arc($.x,$.y,y,w,v+fe)}const I=us(z,v,o,a);if(i.lineTo(I.x,I.y),A>0){const $=us(z,L,o,a);i.arc($.x,$.y,A,v+fe,L+Math.PI)}const B=(v-A/d+(m+b/d))/2;if(i.arc(o,a,d,v-A/d,B,!0),i.arc(o,a,d,B,m+b/d,!0),b>0){const $=us(N,q,o,a);i.arc($.x,$.y,b,q+Math.PI,m-fe)}const J=us(S,m,o,a);if(i.lineTo(J.x,J.y),x>0){const $=us(S,M,o,a);i.arc($.x,$.y,x,m-fe,M)}}else{i.moveTo(o,a);const F=Math.cos(M)*u+o,I=Math.sin(M)*u+a;i.lineTo(F,I);const B=Math.cos(w)*u+o,J=Math.sin(w)*u+a;i.lineTo(B,J)}i.closePath()}function sS(i,t,e,n,s){const{fullCircles:r,startAngle:o,circumference:a}=t;let l=t.endAngle;if(r){Oo(i,t,e,n,l,s);for(let c=0;c<r;++c)i.fill();isNaN(a)||(l=o+(a%oe||oe))}return Oo(i,t,e,n,l,s),i.fill(),l}function rS(i,t,e,n,s){const{fullCircles:r,startAngle:o,circumference:a,options:l}=t,{borderWidth:c,borderJoinStyle:h,borderDash:u,borderDashOffset:d,borderRadius:f}=l,g=l.borderAlign==="inner";if(!c)return;i.setLineDash(u||[]),i.lineDashOffset=d,g?(i.lineWidth=c*2,i.lineJoin=h||"round"):(i.lineWidth=c,i.lineJoin=h||"bevel");let _=t.endAngle;if(r){Oo(i,t,e,n,_,s);for(let p=0;p<r;++p)i.stroke();isNaN(a)||(_=o+(a%oe||oe))}g&&eS(i,t,_),l.selfJoin&&_-o>=Zt&&f===0&&h!=="miter"&&tS(i,t,_),r||(Oo(i,t,e,n,_,s),i.stroke())}class Gs extends xn{constructor(e){super();K(this,"circumference");K(this,"endAngle");K(this,"fullCircles");K(this,"innerRadius");K(this,"outerRadius");K(this,"pixelMargin");K(this,"startAngle");this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,e&&Object.assign(this,e)}inRange(e,n,s){const r=this.getProps(["x","y"],s),{angle:o,distance:a}=Hd(r,{x:e,y:n}),{startAngle:l,endAngle:c,innerRadius:h,outerRadius:u,circumference:d}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],s),f=(this.options.spacing+this.options.borderWidth)/2,g=Lt(d,c-l),_=ar(o,l,c)&&l!==c,p=g>=oe||_,m=zn(a,h+f,u+f);return p&&m}getCenterPoint(e){const{x:n,y:s,startAngle:r,endAngle:o,innerRadius:a,outerRadius:l}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],e),{offset:c,spacing:h}=this.options,u=(r+o)/2,d=(a+l+h+c)/2;return{x:n+Math.cos(u)*d,y:s+Math.sin(u)*d}}tooltipPosition(e){return this.getCenterPoint(e)}draw(e){const{options:n,circumference:s}=this,r=(n.offset||0)/4,o=(n.spacing||0)/2,a=n.circular;if(this.pixelMargin=n.borderAlign==="inner"?.33:0,this.fullCircles=s>oe?Math.floor(s/oe):0,s===0||this.innerRadius<0||this.outerRadius<0)return;e.save();const l=(this.startAngle+this.endAngle)/2;e.translate(Math.cos(l)*r,Math.sin(l)*r);const c=1-Math.sin(Math.min(Zt,s||0)),h=r*c;e.fillStyle=n.backgroundColor,e.strokeStyle=n.borderColor,sS(e,this,h,o,a),rS(e,this,h,o,a),e.restore()}}K(Gs,"id","arc"),K(Gs,"defaults",{borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1}),K(Gs,"defaultRoutes",{backgroundColor:"backgroundColor"}),K(Gs,"descriptors",{_scriptable:!0,_indexable:e=>e!=="borderDash"});function yf(i,t,e=t){i.lineCap=Lt(e.borderCapStyle,t.borderCapStyle),i.setLineDash(Lt(e.borderDash,t.borderDash)),i.lineDashOffset=Lt(e.borderDashOffset,t.borderDashOffset),i.lineJoin=Lt(e.borderJoinStyle,t.borderJoinStyle),i.lineWidth=Lt(e.borderWidth,t.borderWidth),i.strokeStyle=Lt(e.borderColor,t.borderColor)}function oS(i,t,e){i.lineTo(e.x,e.y)}function aS(i){return i.stepped?Cb:i.tension||i.cubicInterpolationMode==="monotone"?Pb:oS}function Sf(i,t,e={}){const n=i.length,{start:s=0,end:r=n-1}=e,{start:o,end:a}=t,l=Math.max(s,o),c=Math.min(r,a),h=s<o&&r<o||s>a&&r>a;return{count:n,start:l,loop:t.loop,ilen:c<l&&!h?n+c-l:c-l}}function lS(i,t,e,n){const{points:s,options:r}=t,{count:o,start:a,loop:l,ilen:c}=Sf(s,e,n),h=aS(r);let{move:u=!0,reverse:d}=n||{},f,g,_;for(f=0;f<=c;++f)g=s[(a+(d?c-f:f))%o],!g.skip&&(u?(i.moveTo(g.x,g.y),u=!1):h(i,_,g,d,r.stepped),_=g);return l&&(g=s[(a+(d?c:0))%o],h(i,_,g,d,r.stepped)),!!l}function cS(i,t,e,n){const s=t.points,{count:r,start:o,ilen:a}=Sf(s,e,n),{move:l=!0,reverse:c}=n||{};let h=0,u=0,d,f,g,_,p,m;const v=y=>(o+(c?a-y:y))%r,x=()=>{_!==p&&(i.lineTo(h,p),i.lineTo(h,_),i.lineTo(h,m))};for(l&&(f=s[v(0)],i.moveTo(f.x,f.y)),d=0;d<=a;++d){if(f=s[v(d)],f.skip)continue;const y=f.x,b=f.y,A=y|0;A===g?(b<_?_=b:b>p&&(p=b),h=(u*h+y)/++u):(x(),i.lineTo(y,b),g=A,u=0,_=p=b),m=b}x()}function cl(i){const t=i.options,e=t.borderDash&&t.borderDash.length;return!i._decimated&&!i._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!e?cS:lS}function hS(i){return i.stepped?lM:i.tension||i.cubicInterpolationMode==="monotone"?cM:Ai}function uS(i,t,e,n){let s=t._path;s||(s=t._path=new Path2D,t.path(s,e,n)&&s.closePath()),yf(i,t.options),i.stroke(s)}function dS(i,t,e,n){const{segments:s,options:r}=t,o=cl(t);for(const a of s)yf(i,r,a.style),i.beginPath(),o(i,t,a,{start:e,end:e+n-1})&&i.closePath(),i.stroke()}const fS=typeof Path2D=="function";function pS(i,t,e,n){fS&&!t.options.segment?uS(i,t,e,n):dS(i,t,e,n)}class si extends xn{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,e){const n=this.options;if((n.tension||n.cubicInterpolationMode==="monotone")&&!n.stepped&&!this._pointsUpdated){const s=n.spanGaps?this._loop:this._fullLoop;tM(this._points,n,t,s,e),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=mM(this,this.options.segment))}first(){const t=this.segments,e=this.points;return t.length&&e[t[0].start]}last(){const t=this.segments,e=this.points,n=t.length;return n&&e[t[n-1].end]}interpolate(t,e){const n=this.options,s=t[e],r=this.points,o=lf(this,{property:e,start:s,end:s});if(!o.length)return;const a=[],l=hS(n);let c,h;for(c=0,h=o.length;c<h;++c){const{start:u,end:d}=o[c],f=r[u],g=r[d];if(f===g){a.push(f);continue}const _=Math.abs((s-f[e])/(g[e]-f[e])),p=l(f,g,_,n.stepped);p[e]=t[e],a.push(p)}return a.length===1?a[0]:a}pathSegment(t,e,n){return cl(this)(t,this,e,n)}path(t,e,n){const s=this.segments,r=cl(this);let o=this._loop;e=e||0,n=n||this.points.length-e;for(const a of s)o&=r(t,this,a,{start:e,end:e+n-1});return!!o}draw(t,e,n,s){const r=this.options||{};(this.points||[]).length&&r.borderWidth&&(t.save(),pS(t,this,n,s),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}K(si,"id","line"),K(si,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),K(si,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),K(si,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});function wu(i,t,e,n){const s=i.options,{[e]:r}=i.getProps([e],n);return Math.abs(t-r)<s.radius+s.hitRadius}class xo extends xn{constructor(e){super();K(this,"parsed");K(this,"skip");K(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,e&&Object.assign(this,e)}inRange(e,n,s){const r=this.options,{x:o,y:a}=this.getProps(["x","y"],s);return Math.pow(e-o,2)+Math.pow(n-a,2)<Math.pow(r.hitRadius+r.radius,2)}inXRange(e,n){return wu(this,e,"x",n)}inYRange(e,n){return wu(this,e,"y",n)}getCenterPoint(e){const{x:n,y:s}=this.getProps(["x","y"],e);return{x:n,y:s}}size(e){e=e||this.options||{};let n=e.radius||0;n=Math.max(n,n&&e.hoverRadius||0);const s=n&&e.borderWidth||0;return(n+s)*2}draw(e,n){const s=this.options;this.skip||s.radius<.1||!Vn(this,n,this.size(s)/2)||(e.strokeStyle=s.borderColor,e.lineWidth=s.borderWidth,e.fillStyle=s.backgroundColor,rl(e,s,this.x,this.y))}getRange(){const e=this.options||{};return e.radius+e.hitRadius}}K(xo,"id","point"),K(xo,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),K(xo,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function Ef(i,t){const{x:e,y:n,base:s,width:r,height:o}=i.getProps(["x","y","base","width","height"],t);let a,l,c,h,u;return i.horizontal?(u=o/2,a=Math.min(e,s),l=Math.max(e,s),c=n-u,h=n+u):(u=r/2,a=e-u,l=e+u,c=Math.min(n,s),h=Math.max(n,s)),{left:a,top:c,right:l,bottom:h}}function ri(i,t,e,n){return i?0:Ae(t,e,n)}function mS(i,t,e){const n=i.options.borderWidth,s=i.borderSkipped,r=Kd(n);return{t:ri(s.top,r.top,0,e),r:ri(s.right,r.right,0,t),b:ri(s.bottom,r.bottom,0,e),l:ri(s.left,r.left,0,t)}}function gS(i,t,e){const{enableBorderRadius:n}=i.getProps(["enableBorderRadius"]),s=i.options.borderRadius,r=Ii(s),o=Math.min(t,e),a=i.borderSkipped,l=n||Yt(s);return{topLeft:ri(!l||a.top||a.left,r.topLeft,0,o),topRight:ri(!l||a.top||a.right,r.topRight,0,o),bottomLeft:ri(!l||a.bottom||a.left,r.bottomLeft,0,o),bottomRight:ri(!l||a.bottom||a.right,r.bottomRight,0,o)}}function _S(i){const t=Ef(i),e=t.right-t.left,n=t.bottom-t.top,s=mS(i,e/2,n/2),r=gS(i,e/2,n/2);return{outer:{x:t.left,y:t.top,w:e,h:n,radius:r},inner:{x:t.left+s.l,y:t.top+s.t,w:e-s.l-s.r,h:n-s.t-s.b,radius:{topLeft:Math.max(0,r.topLeft-Math.max(s.t,s.l)),topRight:Math.max(0,r.topRight-Math.max(s.t,s.r)),bottomLeft:Math.max(0,r.bottomLeft-Math.max(s.b,s.l)),bottomRight:Math.max(0,r.bottomRight-Math.max(s.b,s.r))}}}}function Ba(i,t,e,n){const s=t===null,r=e===null,a=i&&!(s&&r)&&Ef(i,n);return a&&(s||zn(t,a.left,a.right))&&(r||zn(e,a.top,a.bottom))}function xS(i){return i.topLeft||i.topRight||i.bottomLeft||i.bottomRight}function vS(i,t){i.rect(t.x,t.y,t.w,t.h)}function za(i,t,e={}){const n=i.x!==e.x?-t:0,s=i.y!==e.y?-t:0,r=(i.x+i.w!==e.x+e.w?t:0)-n,o=(i.y+i.h!==e.y+e.h?t:0)-s;return{x:i.x+n,y:i.y+s,w:i.w+r,h:i.h+o,radius:i.radius}}class vo extends xn{constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:e,options:{borderColor:n,backgroundColor:s}}=this,{inner:r,outer:o}=_S(this),a=xS(o.radius)?lr:vS;t.save(),(o.w!==r.w||o.h!==r.h)&&(t.beginPath(),a(t,za(o,e,r)),t.clip(),a(t,za(r,-e,o)),t.fillStyle=n,t.fill("evenodd")),t.beginPath(),a(t,za(r,e)),t.fillStyle=s,t.fill(),t.restore()}inRange(t,e,n){return Ba(this,t,e,n)}inXRange(t,e){return Ba(this,t,null,e)}inYRange(t,e){return Ba(this,null,t,e)}getCenterPoint(t){const{x:e,y:n,base:s,horizontal:r}=this.getProps(["x","y","base","horizontal"],t);return{x:r?(e+s)/2:e,y:r?n:(n+s)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}K(vo,"id","bar"),K(vo,"defaults",{borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0}),K(vo,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});var bS=Object.freeze({__proto__:null,ArcElement:Gs,BarElement:vo,LineElement:si,PointElement:xo});const hl=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],Ru=hl.map(i=>i.replace("rgb(","rgba(").replace(")",", 0.5)"));function Tf(i){return hl[i%hl.length]}function Af(i){return Ru[i%Ru.length]}function MS(i,t){return i.borderColor=Tf(t),i.backgroundColor=Af(t),++t}function yS(i,t){return i.backgroundColor=i.data.map(()=>Tf(t++)),t}function SS(i,t){return i.backgroundColor=i.data.map(()=>Af(t++)),t}function ES(i){let t=0;return(e,n)=>{const s=i.getDatasetMeta(n).controller;s instanceof Ci?t=yS(e,t):s instanceof Qs?t=SS(e,t):s&&(t=MS(e,t))}}function Cu(i){let t;for(t in i)if(i[t].borderColor||i[t].backgroundColor)return!0;return!1}function TS(i){return i&&(i.borderColor||i.backgroundColor)}function AS(){return le.borderColor!=="rgba(0,0,0,0.1)"||le.backgroundColor!=="rgba(0,0,0,0.1)"}var wS={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(i,t,e){if(!e.enabled)return;const{data:{datasets:n},options:s}=i.config,{elements:r}=s,o=Cu(n)||TS(s)||r&&Cu(r)||AS();if(!e.forceOverride&&o)return;const a=ES(i);n.forEach(a)}};function RS(i,t,e,n,s){const r=s.samples||n;if(r>=e)return i.slice(t,t+e);const o=[],a=(e-2)/(r-2);let l=0;const c=t+e-1;let h=t,u,d,f,g,_;for(o[l++]=i[h],u=0;u<r-2;u++){let p=0,m=0,v;const x=Math.floor((u+1)*a)+1+t,y=Math.min(Math.floor((u+2)*a)+1,e)+t,b=y-x;for(v=x;v<y;v++)p+=i[v].x,m+=i[v].y;p/=b,m/=b;const A=Math.floor(u*a)+1+t,S=Math.min(Math.floor((u+1)*a)+1,e)+t,{x:P,y:M}=i[h];for(f=g=-1,v=A;v<S;v++)g=.5*Math.abs((P-p)*(i[v].y-M)-(P-i[v].x)*(m-M)),g>f&&(f=g,d=i[v],_=v);o[l++]=d,h=_}return o[l++]=i[c],o}function CS(i,t,e,n){let s=0,r=0,o,a,l,c,h,u,d,f,g,_;const p=[],m=t+e-1,v=i[t].x,y=i[m].x-v;for(o=t;o<t+e;++o){a=i[o],l=(a.x-v)/y*n,c=a.y;const b=l|0;if(b===h)c<g?(g=c,u=o):c>_&&(_=c,d=o),s=(r*s+a.x)/++r;else{const A=o-1;if(!Gt(u)&&!Gt(d)){const S=Math.min(u,d),P=Math.max(u,d);S!==f&&S!==A&&p.push({...i[S],x:s}),P!==f&&P!==A&&p.push({...i[P],x:s})}o>0&&A!==f&&p.push(i[A]),p.push(a),h=b,r=0,g=_=c,u=d=f=o}}return p}function wf(i){if(i._decimated){const t=i._data;delete i._decimated,delete i._data,Object.defineProperty(i,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function Pu(i){i.data.datasets.forEach(t=>{wf(t)})}function PS(i,t){const e=t.length;let n=0,s;const{iScale:r}=i,{min:o,max:a,minDefined:l,maxDefined:c}=r.getUserBounds();return l&&(n=Ae(Hn(t,r.axis,o).lo,0,e-1)),c?s=Ae(Hn(t,r.axis,a).hi+1,n,e)-n:s=e-n,{start:n,count:s}}var LS={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(i,t,e)=>{if(!e.enabled){Pu(i);return}const n=i.width;i.data.datasets.forEach((s,r)=>{const{_data:o,indexAxis:a}=s,l=i.getDatasetMeta(r),c=o||s.data;if(Hs([a,i.options.indexAxis])==="y"||!l.controller.supportsDecimation)return;const h=i.scales[l.xAxisID];if(h.type!=="linear"&&h.type!=="time"||i.options.parsing)return;let{start:u,count:d}=PS(l,c);const f=e.threshold||4*n;if(d<=f){wf(s);return}Gt(o)&&(s._data=c,delete s.data,Object.defineProperty(s,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(_){this._data=_}}));let g;switch(e.algorithm){case"lttb":g=RS(c,u,d,n,e);break;case"min-max":g=CS(c,u,d,n);break;default:throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`)}s._decimated=g})},destroy(i){Pu(i)}};function DS(i,t,e){const n=i.segments,s=i.points,r=t.points,o=[];for(const a of n){let{start:l,end:c}=a;c=Xo(l,c,s);const h=ul(e,s[l],s[c],a.loop);if(!t.segments){o.push({source:a,target:h,start:s[l],end:s[c]});continue}const u=lf(t,h);for(const d of u){const f=ul(e,r[d.start],r[d.end],d.loop),g=af(a,s,f);for(const _ of g)o.push({source:_,target:d,start:{[e]:Lu(h,f,"start",Math.max)},end:{[e]:Lu(h,f,"end",Math.min)}})}}return o}function ul(i,t,e,n){if(n)return;let s=t[i],r=e[i];return i==="angle"&&(s=Oe(s),r=Oe(r)),{property:i,start:s,end:r}}function IS(i,t){const{x:e=null,y:n=null}=i||{},s=t.points,r=[];return t.segments.forEach(({start:o,end:a})=>{a=Xo(o,a,s);const l=s[o],c=s[a];n!==null?(r.push({x:l.x,y:n}),r.push({x:c.x,y:n})):e!==null&&(r.push({x:e,y:l.y}),r.push({x:e,y:c.y}))}),r}function Xo(i,t,e){for(;t>i;t--){const n=e[t];if(!isNaN(n.x)&&!isNaN(n.y))break}return t}function Lu(i,t,e,n){return i&&t?n(i[e],t[e]):i?i[e]:t?t[e]:0}function Rf(i,t){let e=[],n=!1;return re(i)?(n=!0,e=i):e=IS(i,t),e.length?new si({points:e,options:{tension:0},_loop:n,_fullLoop:n}):null}function Du(i){return i&&i.fill!==!1}function OS(i,t,e){let s=i[t].fill;const r=[t];let o;if(!e)return s;for(;s!==!1&&r.indexOf(s)===-1;){if(!ue(s))return s;if(o=i[s],!o)return!1;if(o.visible)return s;r.push(s),s=o.fill}return!1}function US(i,t,e){const n=BS(i);if(Yt(n))return isNaN(n.value)?!1:n;let s=parseFloat(n);return ue(s)&&Math.floor(s)===s?FS(n[0],t,s,e):["origin","start","end","stack","shape"].indexOf(n)>=0&&n}function FS(i,t,e,n){return(i==="-"||i==="+")&&(e=t+e),e===t||e<0||e>=n?!1:e}function NS(i,t){let e=null;return i==="start"?e=t.bottom:i==="end"?e=t.top:Yt(i)?e=t.getPixelForValue(i.value):t.getBasePixel&&(e=t.getBasePixel()),e}function kS(i,t,e){let n;return i==="start"?n=e:i==="end"?n=t.options.reverse?t.min:t.max:Yt(i)?n=i.value:n=t.getBaseValue(),n}function BS(i){const t=i.options,e=t.fill;let n=Lt(e&&e.target,e);return n===void 0&&(n=!!t.backgroundColor),n===!1||n===null?!1:n===!0?"origin":n}function zS(i){const{scale:t,index:e,line:n}=i,s=[],r=n.segments,o=n.points,a=HS(t,e);a.push(Rf({x:null,y:t.bottom},n));for(let l=0;l<r.length;l++){const c=r[l];for(let h=c.start;h<=c.end;h++)VS(s,o[h],a)}return new si({points:s,options:{}})}function HS(i,t){const e=[],n=i.getMatchingVisibleMetas("line");for(let s=0;s<n.length;s++){const r=n[s];if(r.index===t)break;r.hidden||e.unshift(r.dataset)}return e}function VS(i,t,e){const n=[];for(let s=0;s<e.length;s++){const r=e[s],{first:o,last:a,point:l}=GS(r,t,"x");if(!(!l||o&&a)){if(o)n.unshift(l);else if(i.push(l),!a)break}}i.push(...n)}function GS(i,t,e){const n=i.interpolate(t,e);if(!n)return{};const s=n[e],r=i.segments,o=i.points;let a=!1,l=!1;for(let c=0;c<r.length;c++){const h=r[c],u=o[h.start][e],d=o[h.end][e];if(zn(s,u,d)){a=s===u,l=s===d;break}}return{first:a,last:l,point:n}}class Cf{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,e,n){const{x:s,y:r,radius:o}=this;return e=e||{start:0,end:oe},t.arc(s,r,o,e.end,e.start,!0),!n.bounds}interpolate(t){const{x:e,y:n,radius:s}=this,r=t.angle;return{x:e+Math.cos(r)*s,y:n+Math.sin(r)*s,angle:r}}}function WS(i){const{chart:t,fill:e,line:n}=i;if(ue(e))return XS(t,e);if(e==="stack")return zS(i);if(e==="shape")return!0;const s=jS(i);return s instanceof Cf?s:Rf(s,n)}function XS(i,t){const e=i.getDatasetMeta(t);return e&&i.isDatasetVisible(t)?e.dataset:null}function jS(i){return(i.scale||{}).getPointPositionForValue?qS(i):YS(i)}function YS(i){const{scale:t={},fill:e}=i,n=NS(e,t);if(ue(n)){const s=t.isHorizontal();return{x:s?n:null,y:s?null:n}}return null}function qS(i){const{scale:t,fill:e}=i,n=t.options,s=t.getLabels().length,r=n.reverse?t.max:t.min,o=kS(e,t,r),a=[];if(n.grid.circular){const l=t.getPointPositionForValue(0,r);return new Cf({x:l.x,y:l.y,radius:t.getDistanceFromCenterForValue(o)})}for(let l=0;l<s;++l)a.push(t.getPointPositionForValue(l,o));return a}function Ha(i,t,e){const n=WS(t),{chart:s,index:r,line:o,scale:a,axis:l}=t,c=o.options,h=c.fill,u=c.backgroundColor,{above:d=u,below:f=u}=h||{},g=s.getDatasetMeta(r),_=cf(s,g);n&&o.points.length&&(Vo(i,e),$S(i,{line:o,target:n,above:d,below:f,area:e,scale:a,axis:l,clip:_}),Go(i))}function $S(i,t){const{line:e,target:n,above:s,below:r,area:o,scale:a,clip:l}=t,c=e._loop?"angle":t.axis;i.save();let h=r;r!==s&&(c==="x"?(Iu(i,n,o.top),Va(i,{line:e,target:n,color:s,scale:a,property:c,clip:l}),i.restore(),i.save(),Iu(i,n,o.bottom)):c==="y"&&(Ou(i,n,o.left),Va(i,{line:e,target:n,color:r,scale:a,property:c,clip:l}),i.restore(),i.save(),Ou(i,n,o.right),h=s)),Va(i,{line:e,target:n,color:h,scale:a,property:c,clip:l}),i.restore()}function Iu(i,t,e){const{segments:n,points:s}=t;let r=!0,o=!1;i.beginPath();for(const a of n){const{start:l,end:c}=a,h=s[l],u=s[Xo(l,c,s)];r?(i.moveTo(h.x,h.y),r=!1):(i.lineTo(h.x,e),i.lineTo(h.x,h.y)),o=!!t.pathSegment(i,a,{move:o}),o?i.closePath():i.lineTo(u.x,e)}i.lineTo(t.first().x,e),i.closePath(),i.clip()}function Ou(i,t,e){const{segments:n,points:s}=t;let r=!0,o=!1;i.beginPath();for(const a of n){const{start:l,end:c}=a,h=s[l],u=s[Xo(l,c,s)];r?(i.moveTo(h.x,h.y),r=!1):(i.lineTo(e,h.y),i.lineTo(h.x,h.y)),o=!!t.pathSegment(i,a,{move:o}),o?i.closePath():i.lineTo(e,u.y)}i.lineTo(e,t.first().y),i.closePath(),i.clip()}function Va(i,t){const{line:e,target:n,property:s,color:r,scale:o,clip:a}=t,l=DS(e,n,s);for(const{source:c,target:h,start:u,end:d}of l){const{style:{backgroundColor:f=r}={}}=c,g=n!==!0;i.save(),i.fillStyle=f,KS(i,o,a,g&&ul(s,u,d)),i.beginPath();const _=!!e.pathSegment(i,c);let p;if(g){_?i.closePath():Uu(i,n,d,s);const m=!!n.pathSegment(i,h,{move:_,reverse:!0});p=_&&m,p||Uu(i,n,u,s)}i.closePath(),i.fill(p?"evenodd":"nonzero"),i.restore()}}function KS(i,t,e,n){const s=t.chart.chartArea,{property:r,start:o,end:a}=n||{};if(r==="x"||r==="y"){let l,c,h,u;r==="x"?(l=o,c=s.top,h=a,u=s.bottom):(l=s.left,c=o,h=s.right,u=a),i.beginPath(),e&&(l=Math.max(l,e.left),h=Math.min(h,e.right),c=Math.max(c,e.top),u=Math.min(u,e.bottom)),i.rect(l,c,h-l,u-c),i.clip()}}function Uu(i,t,e,n){const s=t.interpolate(e,n);s&&i.lineTo(s.x,s.y)}var ZS={id:"filler",afterDatasetsUpdate(i,t,e){const n=(i.data.datasets||[]).length,s=[];let r,o,a,l;for(o=0;o<n;++o)r=i.getDatasetMeta(o),a=r.dataset,l=null,a&&a.options&&a instanceof si&&(l={visible:i.isDatasetVisible(o),index:o,fill:US(a,o,n),chart:i,axis:r.controller.options.indexAxis,scale:r.vScale,line:a}),r.$filler=l,s.push(l);for(o=0;o<n;++o)l=s[o],!(!l||l.fill===!1)&&(l.fill=OS(s,o,e.propagate))},beforeDraw(i,t,e){const n=e.drawTime==="beforeDraw",s=i.getSortedVisibleDatasetMetas(),r=i.chartArea;for(let o=s.length-1;o>=0;--o){const a=s[o].$filler;a&&(a.line.updateControlPoints(r,a.axis),n&&a.fill&&Ha(i.ctx,a,r))}},beforeDatasetsDraw(i,t,e){if(e.drawTime!=="beforeDatasetsDraw")return;const n=i.getSortedVisibleDatasetMetas();for(let s=n.length-1;s>=0;--s){const r=n[s].$filler;Du(r)&&Ha(i.ctx,r,i.chartArea)}},beforeDatasetDraw(i,t,e){const n=t.meta.$filler;!Du(n)||e.drawTime!=="beforeDatasetDraw"||Ha(i.ctx,n,i.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const Fu=(i,t)=>{let{boxHeight:e=t,boxWidth:n=t}=i;return i.usePointStyle&&(e=Math.min(e,t),n=i.pointStyleWidth||Math.min(n,t)),{boxWidth:n,boxHeight:e,itemHeight:Math.max(t,e)}},JS=(i,t)=>i!==null&&t!==null&&i.datasetIndex===t.datasetIndex&&i.index===t.index;class Nu extends xn{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e,n){this.maxWidth=t,this.maxHeight=e,this._margins=n,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let e=ne(t.generateLabels,[this.chart],this)||[];t.filter&&(e=e.filter(n=>t.filter(n,this.chart.data))),t.sort&&(e=e.sort((n,s)=>t.sort(n,s,this.chart.data))),this.options.reverse&&e.reverse(),this.legendItems=e}fit(){const{options:t,ctx:e}=this;if(!t.display){this.width=this.height=0;return}const n=t.labels,s=be(n.font),r=s.size,o=this._computeTitleHeight(),{boxWidth:a,itemHeight:l}=Fu(n,r);let c,h;e.font=s.string,this.isHorizontal()?(c=this.maxWidth,h=this._fitRows(o,r,a,l)+10):(h=this.maxHeight,c=this._fitCols(o,s,a,l)+10),this.width=Math.min(c,t.maxWidth||this.maxWidth),this.height=Math.min(h,t.maxHeight||this.maxHeight)}_fitRows(t,e,n,s){const{ctx:r,maxWidth:o,options:{labels:{padding:a}}}=this,l=this.legendHitBoxes=[],c=this.lineWidths=[0],h=s+a;let u=t;r.textAlign="left",r.textBaseline="middle";let d=-1,f=-h;return this.legendItems.forEach((g,_)=>{const p=n+e/2+r.measureText(g.text).width;(_===0||c[c.length-1]+p+2*a>o)&&(u+=h,c[c.length-(_>0?0:1)]=0,f+=h,d++),l[_]={left:0,top:f,row:d,width:p,height:s},c[c.length-1]+=p+a}),u}_fitCols(t,e,n,s){const{ctx:r,maxHeight:o,options:{labels:{padding:a}}}=this,l=this.legendHitBoxes=[],c=this.columnSizes=[],h=o-t;let u=a,d=0,f=0,g=0,_=0;return this.legendItems.forEach((p,m)=>{const{itemWidth:v,itemHeight:x}=QS(n,e,r,p,s);m>0&&f+x+2*a>h&&(u+=d+a,c.push({width:d,height:f}),g+=d+a,_++,d=f=0),l[m]={left:g,top:f,col:_,width:v,height:x},d=Math.max(d,v),f+=x+a}),u+=d,c.push({width:d,height:f}),u}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:e,options:{align:n,labels:{padding:s},rtl:r}}=this,o=gs(r,this.left,this.width);if(this.isHorizontal()){let a=0,l=Ie(n,this.left+s,this.right-this.lineWidths[a]);for(const c of e)a!==c.row&&(a=c.row,l=Ie(n,this.left+s,this.right-this.lineWidths[a])),c.top+=this.top+t+s,c.left=o.leftForLtr(o.x(l),c.width),l+=c.width+s}else{let a=0,l=Ie(n,this.top+t+s,this.bottom-this.columnSizes[a].height);for(const c of e)c.col!==a&&(a=c.col,l=Ie(n,this.top+t+s,this.bottom-this.columnSizes[a].height)),c.top=l,c.left+=this.left+s,c.left=o.leftForLtr(o.x(c.left),c.width),l+=c.height+s}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;Vo(t,this),this._draw(),Go(t)}}_draw(){const{options:t,columnSizes:e,lineWidths:n,ctx:s}=this,{align:r,labels:o}=t,a=le.color,l=gs(t.rtl,this.left,this.width),c=be(o.font),{padding:h}=o,u=c.size,d=u/2;let f;this.drawTitle(),s.textAlign=l.textAlign("left"),s.textBaseline="middle",s.lineWidth=.5,s.font=c.string;const{boxWidth:g,boxHeight:_,itemHeight:p}=Fu(o,u),m=function(A,S,P){if(isNaN(g)||g<=0||isNaN(_)||_<0)return;s.save();const M=Lt(P.lineWidth,1);if(s.fillStyle=Lt(P.fillStyle,a),s.lineCap=Lt(P.lineCap,"butt"),s.lineDashOffset=Lt(P.lineDashOffset,0),s.lineJoin=Lt(P.lineJoin,"miter"),s.lineWidth=M,s.strokeStyle=Lt(P.strokeStyle,a),s.setLineDash(Lt(P.lineDash,[])),o.usePointStyle){const w={radius:_*Math.SQRT2/2,pointStyle:P.pointStyle,rotation:P.rotation,borderWidth:M},N=l.xPlus(A,g/2),z=S+d;$d(s,w,N,z,o.pointStyleWidth&&g)}else{const w=S+Math.max((u-_)/2,0),N=l.leftForLtr(A,g),z=Ii(P.borderRadius);s.beginPath(),Object.values(z).some(q=>q!==0)?lr(s,{x:N,y:w,w:g,h:_,radius:z}):s.rect(N,w,g,_),s.fill(),M!==0&&s.stroke()}s.restore()},v=function(A,S,P){ki(s,P.text,A,S+p/2,c,{strikethrough:P.hidden,textAlign:l.textAlign(P.textAlign)})},x=this.isHorizontal(),y=this._computeTitleHeight();x?f={x:Ie(r,this.left+h,this.right-n[0]),y:this.top+h+y,line:0}:f={x:this.left+h,y:Ie(r,this.top+y+h,this.bottom-e[0].height),line:0},sf(this.ctx,t.textDirection);const b=p+h;this.legendItems.forEach((A,S)=>{s.strokeStyle=A.fontColor,s.fillStyle=A.fontColor;const P=s.measureText(A.text).width,M=l.textAlign(A.textAlign||(A.textAlign=o.textAlign)),w=g+d+P;let N=f.x,z=f.y;l.setWidth(this.width),x?S>0&&N+w+h>this.right&&(z=f.y+=b,f.line++,N=f.x=Ie(r,this.left+h,this.right-n[f.line])):S>0&&z+b>this.bottom&&(N=f.x=N+e[f.line].width+h,f.line++,z=f.y=Ie(r,this.top+y+h,this.bottom-e[f.line].height));const q=l.x(N);if(m(q,z,A),N=xb(M,N+g+d,x?N+w:this.right,t.rtl),v(l.x(N),z,A),x)f.x+=w+h;else if(typeof A.text!="string"){const L=c.lineHeight;f.y+=Pf(A,L)+h}else f.y+=b}),rf(this.ctx,t.textDirection)}drawTitle(){const t=this.options,e=t.title,n=be(e.font),s=ke(e.padding);if(!e.display)return;const r=gs(t.rtl,this.left,this.width),o=this.ctx,a=e.position,l=n.size/2,c=s.top+l;let h,u=this.left,d=this.width;if(this.isHorizontal())d=Math.max(...this.lineWidths),h=this.top+c,u=Ie(t.align,u,this.right-d);else{const g=this.columnSizes.reduce((_,p)=>Math.max(_,p.height),0);h=c+Ie(t.align,this.top,this.bottom-g-t.labels.padding-this._computeTitleHeight())}const f=Ie(a,u,u+d);o.textAlign=r.textAlign(Pl(a)),o.textBaseline="middle",o.strokeStyle=e.color,o.fillStyle=e.color,o.font=n.string,ki(o,e.text,f,h,n)}_computeTitleHeight(){const t=this.options.title,e=be(t.font),n=ke(t.padding);return t.display?e.lineHeight+n.height:0}_getLegendItemAt(t,e){let n,s,r;if(zn(t,this.left,this.right)&&zn(e,this.top,this.bottom)){for(r=this.legendHitBoxes,n=0;n<r.length;++n)if(s=r[n],zn(t,s.left,s.left+s.width)&&zn(e,s.top,s.top+s.height))return this.legendItems[n]}return null}handleEvent(t){const e=this.options;if(!nE(t.type,e))return;const n=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const s=this._hoveredItem,r=JS(s,n);s&&!r&&ne(e.onLeave,[t,s,this],this),this._hoveredItem=n,n&&!r&&ne(e.onHover,[t,n,this],this)}else n&&ne(e.onClick,[t,n,this],this)}}function QS(i,t,e,n,s){const r=tE(n,i,t,e),o=eE(s,n,t.lineHeight);return{itemWidth:r,itemHeight:o}}function tE(i,t,e,n){let s=i.text;return s&&typeof s!="string"&&(s=s.reduce((r,o)=>r.length>o.length?r:o)),t+e.size/2+n.measureText(s).width}function eE(i,t,e){let n=i;return typeof t.text!="string"&&(n=Pf(t,e)),n}function Pf(i,t){const e=i.text?i.text.length:0;return t*e}function nE(i,t){return!!((i==="mousemove"||i==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(i==="click"||i==="mouseup"))}var iE={id:"legend",_element:Nu,start(i,t,e){const n=i.legend=new Nu({ctx:i.ctx,options:e,chart:i});Fe.configure(i,n,e),Fe.addBox(i,n)},stop(i){Fe.removeBox(i,i.legend),delete i.legend},beforeUpdate(i,t,e){const n=i.legend;Fe.configure(i,n,e),n.options=e},afterUpdate(i){const t=i.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(i,t){t.replay||i.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(i,t,e){const n=t.datasetIndex,s=e.chart;s.isDatasetVisible(n)?(s.hide(n),t.hidden=!0):(s.show(n),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:i=>i.chart.options.color,boxWidth:40,padding:10,generateLabels(i){const t=i.data.datasets,{labels:{usePointStyle:e,pointStyle:n,textAlign:s,color:r,useBorderRadius:o,borderRadius:a}}=i.legend.options;return i._getSortedDatasetMetas().map(l=>{const c=l.controller.getStyle(e?0:void 0),h=ke(c.borderWidth);return{text:t[l.index].label,fillStyle:c.backgroundColor,fontColor:r,hidden:!l.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(h.width+h.height)/4,strokeStyle:c.borderColor,pointStyle:n||c.pointStyle,rotation:c.rotation,textAlign:s||c.textAlign,borderRadius:o&&(a||c.borderRadius),datasetIndex:l.index}},this)}},title:{color:i=>i.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:i=>!i.startsWith("on"),labels:{_scriptable:i=>!["generateLabels","filter","sort"].includes(i)}}};class Bl extends xn{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e){const n=this.options;if(this.left=0,this.top=0,!n.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=e;const s=re(n.text)?n.text.length:1;this._padding=ke(n.padding);const r=s*be(n.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=r:this.width=r}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:e,left:n,bottom:s,right:r,options:o}=this,a=o.align;let l=0,c,h,u;return this.isHorizontal()?(h=Ie(a,n,r),u=e+t,c=r-n):(o.position==="left"?(h=n+t,u=Ie(a,s,e),l=Zt*-.5):(h=r-t,u=Ie(a,e,s),l=Zt*.5),c=s-e),{titleX:h,titleY:u,maxWidth:c,rotation:l}}draw(){const t=this.ctx,e=this.options;if(!e.display)return;const n=be(e.font),r=n.lineHeight/2+this._padding.top,{titleX:o,titleY:a,maxWidth:l,rotation:c}=this._drawArgs(r);ki(t,e.text,0,0,n,{color:e.color,maxWidth:l,rotation:c,textAlign:Pl(e.align),textBaseline:"middle",translation:[o,a]})}}function sE(i,t){const e=new Bl({ctx:i.ctx,options:t,chart:i});Fe.configure(i,e,t),Fe.addBox(i,e),i.titleBlock=e}var rE={id:"title",_element:Bl,start(i,t,e){sE(i,e)},stop(i){const t=i.titleBlock;Fe.removeBox(i,t),delete i.titleBlock},beforeUpdate(i,t,e){const n=i.titleBlock;Fe.configure(i,n,e),n.options=e},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const ro=new WeakMap;var oE={id:"subtitle",start(i,t,e){const n=new Bl({ctx:i.ctx,options:e,chart:i});Fe.configure(i,n,e),Fe.addBox(i,n),ro.set(i,n)},stop(i){Fe.removeBox(i,ro.get(i)),ro.delete(i)},beforeUpdate(i,t,e){const n=ro.get(i);Fe.configure(i,n,e),n.options=e},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Ws={average(i){if(!i.length)return!1;let t,e,n=new Set,s=0,r=0;for(t=0,e=i.length;t<e;++t){const a=i[t].element;if(a&&a.hasValue()){const l=a.tooltipPosition();n.add(l.x),s+=l.y,++r}}return r===0||n.size===0?!1:{x:[...n].reduce((a,l)=>a+l)/n.size,y:s/r}},nearest(i,t){if(!i.length)return!1;let e=t.x,n=t.y,s=Number.POSITIVE_INFINITY,r,o,a;for(r=0,o=i.length;r<o;++r){const l=i[r].element;if(l&&l.hasValue()){const c=l.getCenterPoint(),h=il(t,c);h<s&&(s=h,a=l)}}if(a){const l=a.tooltipPosition();e=l.x,n=l.y}return{x:e,y:n}}};function bn(i,t){return t&&(re(t)?Array.prototype.push.apply(i,t):i.push(t)),i}function Fn(i){return(typeof i=="string"||i instanceof String)&&i.indexOf(`
`)>-1?i.split(`
`):i}function aE(i,t){const{element:e,datasetIndex:n,index:s}=t,r=i.getDatasetMeta(n).controller,{label:o,value:a}=r.getLabelAndValue(s);return{chart:i,label:o,parsed:r.getParsed(s),raw:i.data.datasets[n].data[s],formattedValue:a,dataset:r.getDataset(),dataIndex:s,datasetIndex:n,element:e}}function ku(i,t){const e=i.chart.ctx,{body:n,footer:s,title:r}=i,{boxWidth:o,boxHeight:a}=t,l=be(t.bodyFont),c=be(t.titleFont),h=be(t.footerFont),u=r.length,d=s.length,f=n.length,g=ke(t.padding);let _=g.height,p=0,m=n.reduce((y,b)=>y+b.before.length+b.lines.length+b.after.length,0);if(m+=i.beforeBody.length+i.afterBody.length,u&&(_+=u*c.lineHeight+(u-1)*t.titleSpacing+t.titleMarginBottom),m){const y=t.displayColors?Math.max(a,l.lineHeight):l.lineHeight;_+=f*y+(m-f)*l.lineHeight+(m-1)*t.bodySpacing}d&&(_+=t.footerMarginTop+d*h.lineHeight+(d-1)*t.footerSpacing);let v=0;const x=function(y){p=Math.max(p,e.measureText(y).width+v)};return e.save(),e.font=c.string,Jt(i.title,x),e.font=l.string,Jt(i.beforeBody.concat(i.afterBody),x),v=t.displayColors?o+2+t.boxPadding:0,Jt(n,y=>{Jt(y.before,x),Jt(y.lines,x),Jt(y.after,x)}),v=0,e.font=h.string,Jt(i.footer,x),e.restore(),p+=g.width,{width:p,height:_}}function lE(i,t){const{y:e,height:n}=t;return e<n/2?"top":e>i.height-n/2?"bottom":"center"}function cE(i,t,e,n){const{x:s,width:r}=n,o=e.caretSize+e.caretPadding;if(i==="left"&&s+r+o>t.width||i==="right"&&s-r-o<0)return!0}function hE(i,t,e,n){const{x:s,width:r}=e,{width:o,chartArea:{left:a,right:l}}=i;let c="center";return n==="center"?c=s<=(a+l)/2?"left":"right":s<=r/2?c="left":s>=o-r/2&&(c="right"),cE(c,i,t,e)&&(c="center"),c}function Bu(i,t,e){const n=e.yAlign||t.yAlign||lE(i,e);return{xAlign:e.xAlign||t.xAlign||hE(i,t,e,n),yAlign:n}}function uE(i,t){let{x:e,width:n}=i;return t==="right"?e-=n:t==="center"&&(e-=n/2),e}function dE(i,t,e){let{y:n,height:s}=i;return t==="top"?n+=e:t==="bottom"?n-=s+e:n-=s/2,n}function zu(i,t,e,n){const{caretSize:s,caretPadding:r,cornerRadius:o}=i,{xAlign:a,yAlign:l}=e,c=s+r,{topLeft:h,topRight:u,bottomLeft:d,bottomRight:f}=Ii(o);let g=uE(t,a);const _=dE(t,l,c);return l==="center"?a==="left"?g+=c:a==="right"&&(g-=c):a==="left"?g-=Math.max(h,d)+s:a==="right"&&(g+=Math.max(u,f)+s),{x:Ae(g,0,n.width-t.width),y:Ae(_,0,n.height-t.height)}}function oo(i,t,e){const n=ke(e.padding);return t==="center"?i.x+i.width/2:t==="right"?i.x+i.width-n.right:i.x+n.left}function Hu(i){return bn([],Fn(i))}function fE(i,t,e){return fi(i,{tooltip:t,tooltipItems:e,type:"tooltip"})}function Vu(i,t){const e=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return e?i.override(e):i}const Lf={beforeTitle:In,title(i){if(i.length>0){const t=i[0],e=t.chart.data.labels,n=e?e.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(n>0&&t.dataIndex<n)return e[t.dataIndex]}return""},afterTitle:In,beforeBody:In,beforeLabel:In,label(i){if(this&&this.options&&this.options.mode==="dataset")return i.label+": "+i.formattedValue||i.formattedValue;let t=i.dataset.label||"";t&&(t+=": ");const e=i.formattedValue;return Gt(e)||(t+=e),t},labelColor(i){const e=i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);return{borderColor:e.borderColor,backgroundColor:e.backgroundColor,borderWidth:e.borderWidth,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(i){const e=i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);return{pointStyle:e.pointStyle,rotation:e.rotation}},afterLabel:In,afterBody:In,beforeFooter:In,footer:In,afterFooter:In};function Xe(i,t,e,n){const s=i[t].call(e,n);return typeof s>"u"?Lf[t].call(e,n):s}class dl extends xn{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const e=this.chart,n=this.options.setContext(this.getContext()),s=n.enabled&&e.options.animation&&n.animations,r=new hf(this.chart,s);return s._cacheable&&(this._cachedAnimations=Object.freeze(r)),r}getContext(){return this.$context||(this.$context=fE(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,e){const{callbacks:n}=e,s=Xe(n,"beforeTitle",this,t),r=Xe(n,"title",this,t),o=Xe(n,"afterTitle",this,t);let a=[];return a=bn(a,Fn(s)),a=bn(a,Fn(r)),a=bn(a,Fn(o)),a}getBeforeBody(t,e){return Hu(Xe(e.callbacks,"beforeBody",this,t))}getBody(t,e){const{callbacks:n}=e,s=[];return Jt(t,r=>{const o={before:[],lines:[],after:[]},a=Vu(n,r);bn(o.before,Fn(Xe(a,"beforeLabel",this,r))),bn(o.lines,Xe(a,"label",this,r)),bn(o.after,Fn(Xe(a,"afterLabel",this,r))),s.push(o)}),s}getAfterBody(t,e){return Hu(Xe(e.callbacks,"afterBody",this,t))}getFooter(t,e){const{callbacks:n}=e,s=Xe(n,"beforeFooter",this,t),r=Xe(n,"footer",this,t),o=Xe(n,"afterFooter",this,t);let a=[];return a=bn(a,Fn(s)),a=bn(a,Fn(r)),a=bn(a,Fn(o)),a}_createItems(t){const e=this._active,n=this.chart.data,s=[],r=[],o=[];let a=[],l,c;for(l=0,c=e.length;l<c;++l)a.push(aE(this.chart,e[l]));return t.filter&&(a=a.filter((h,u,d)=>t.filter(h,u,d,n))),t.itemSort&&(a=a.sort((h,u)=>t.itemSort(h,u,n))),Jt(a,h=>{const u=Vu(t.callbacks,h);s.push(Xe(u,"labelColor",this,h)),r.push(Xe(u,"labelPointStyle",this,h)),o.push(Xe(u,"labelTextColor",this,h))}),this.labelColors=s,this.labelPointStyles=r,this.labelTextColors=o,this.dataPoints=a,a}update(t,e){const n=this.options.setContext(this.getContext()),s=this._active;let r,o=[];if(!s.length)this.opacity!==0&&(r={opacity:0});else{const a=Ws[n.position].call(this,s,this._eventPosition);o=this._createItems(n),this.title=this.getTitle(o,n),this.beforeBody=this.getBeforeBody(o,n),this.body=this.getBody(o,n),this.afterBody=this.getAfterBody(o,n),this.footer=this.getFooter(o,n);const l=this._size=ku(this,n),c=Object.assign({},a,l),h=Bu(this.chart,n,c),u=zu(n,c,h,this.chart);this.xAlign=h.xAlign,this.yAlign=h.yAlign,r={opacity:1,x:u.x,y:u.y,width:l.width,height:l.height,caretX:a.x,caretY:a.y}}this._tooltipItems=o,this.$context=void 0,r&&this._resolveAnimations().update(this,r),t&&n.external&&n.external.call(this,{chart:this.chart,tooltip:this,replay:e})}drawCaret(t,e,n,s){const r=this.getCaretPosition(t,n,s);e.lineTo(r.x1,r.y1),e.lineTo(r.x2,r.y2),e.lineTo(r.x3,r.y3)}getCaretPosition(t,e,n){const{xAlign:s,yAlign:r}=this,{caretSize:o,cornerRadius:a}=n,{topLeft:l,topRight:c,bottomLeft:h,bottomRight:u}=Ii(a),{x:d,y:f}=t,{width:g,height:_}=e;let p,m,v,x,y,b;return r==="center"?(y=f+_/2,s==="left"?(p=d,m=p-o,x=y+o,b=y-o):(p=d+g,m=p+o,x=y-o,b=y+o),v=p):(s==="left"?m=d+Math.max(l,h)+o:s==="right"?m=d+g-Math.max(c,u)-o:m=this.caretX,r==="top"?(x=f,y=x-o,p=m-o,v=m+o):(x=f+_,y=x+o,p=m+o,v=m-o),b=x),{x1:p,x2:m,x3:v,y1:x,y2:y,y3:b}}drawTitle(t,e,n){const s=this.title,r=s.length;let o,a,l;if(r){const c=gs(n.rtl,this.x,this.width);for(t.x=oo(this,n.titleAlign,n),e.textAlign=c.textAlign(n.titleAlign),e.textBaseline="middle",o=be(n.titleFont),a=n.titleSpacing,e.fillStyle=n.titleColor,e.font=o.string,l=0;l<r;++l)e.fillText(s[l],c.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+a,l+1===r&&(t.y+=n.titleMarginBottom-a)}}_drawColorBox(t,e,n,s,r){const o=this.labelColors[n],a=this.labelPointStyles[n],{boxHeight:l,boxWidth:c}=r,h=be(r.bodyFont),u=oo(this,"left",r),d=s.x(u),f=l<h.lineHeight?(h.lineHeight-l)/2:0,g=e.y+f;if(r.usePointStyle){const _={radius:Math.min(c,l)/2,pointStyle:a.pointStyle,rotation:a.rotation,borderWidth:1},p=s.leftForLtr(d,c)+c/2,m=g+l/2;t.strokeStyle=r.multiKeyBackground,t.fillStyle=r.multiKeyBackground,rl(t,_,p,m),t.strokeStyle=o.borderColor,t.fillStyle=o.backgroundColor,rl(t,_,p,m)}else{t.lineWidth=Yt(o.borderWidth)?Math.max(...Object.values(o.borderWidth)):o.borderWidth||1,t.strokeStyle=o.borderColor,t.setLineDash(o.borderDash||[]),t.lineDashOffset=o.borderDashOffset||0;const _=s.leftForLtr(d,c),p=s.leftForLtr(s.xPlus(d,1),c-2),m=Ii(o.borderRadius);Object.values(m).some(v=>v!==0)?(t.beginPath(),t.fillStyle=r.multiKeyBackground,lr(t,{x:_,y:g,w:c,h:l,radius:m}),t.fill(),t.stroke(),t.fillStyle=o.backgroundColor,t.beginPath(),lr(t,{x:p,y:g+1,w:c-2,h:l-2,radius:m}),t.fill()):(t.fillStyle=r.multiKeyBackground,t.fillRect(_,g,c,l),t.strokeRect(_,g,c,l),t.fillStyle=o.backgroundColor,t.fillRect(p,g+1,c-2,l-2))}t.fillStyle=this.labelTextColors[n]}drawBody(t,e,n){const{body:s}=this,{bodySpacing:r,bodyAlign:o,displayColors:a,boxHeight:l,boxWidth:c,boxPadding:h}=n,u=be(n.bodyFont);let d=u.lineHeight,f=0;const g=gs(n.rtl,this.x,this.width),_=function(P){e.fillText(P,g.x(t.x+f),t.y+d/2),t.y+=d+r},p=g.textAlign(o);let m,v,x,y,b,A,S;for(e.textAlign=o,e.textBaseline="middle",e.font=u.string,t.x=oo(this,p,n),e.fillStyle=n.bodyColor,Jt(this.beforeBody,_),f=a&&p!=="right"?o==="center"?c/2+h:c+2+h:0,y=0,A=s.length;y<A;++y){for(m=s[y],v=this.labelTextColors[y],e.fillStyle=v,Jt(m.before,_),x=m.lines,a&&x.length&&(this._drawColorBox(e,t,y,g,n),d=Math.max(u.lineHeight,l)),b=0,S=x.length;b<S;++b)_(x[b]),d=u.lineHeight;Jt(m.after,_)}f=0,d=u.lineHeight,Jt(this.afterBody,_),t.y-=r}drawFooter(t,e,n){const s=this.footer,r=s.length;let o,a;if(r){const l=gs(n.rtl,this.x,this.width);for(t.x=oo(this,n.footerAlign,n),t.y+=n.footerMarginTop,e.textAlign=l.textAlign(n.footerAlign),e.textBaseline="middle",o=be(n.footerFont),e.fillStyle=n.footerColor,e.font=o.string,a=0;a<r;++a)e.fillText(s[a],l.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+n.footerSpacing}}drawBackground(t,e,n,s){const{xAlign:r,yAlign:o}=this,{x:a,y:l}=t,{width:c,height:h}=n,{topLeft:u,topRight:d,bottomLeft:f,bottomRight:g}=Ii(s.cornerRadius);e.fillStyle=s.backgroundColor,e.strokeStyle=s.borderColor,e.lineWidth=s.borderWidth,e.beginPath(),e.moveTo(a+u,l),o==="top"&&this.drawCaret(t,e,n,s),e.lineTo(a+c-d,l),e.quadraticCurveTo(a+c,l,a+c,l+d),o==="center"&&r==="right"&&this.drawCaret(t,e,n,s),e.lineTo(a+c,l+h-g),e.quadraticCurveTo(a+c,l+h,a+c-g,l+h),o==="bottom"&&this.drawCaret(t,e,n,s),e.lineTo(a+f,l+h),e.quadraticCurveTo(a,l+h,a,l+h-f),o==="center"&&r==="left"&&this.drawCaret(t,e,n,s),e.lineTo(a,l+u),e.quadraticCurveTo(a,l,a+u,l),e.closePath(),e.fill(),s.borderWidth>0&&e.stroke()}_updateAnimationTarget(t){const e=this.chart,n=this.$animations,s=n&&n.x,r=n&&n.y;if(s||r){const o=Ws[t.position].call(this,this._active,this._eventPosition);if(!o)return;const a=this._size=ku(this,t),l=Object.assign({},o,this._size),c=Bu(e,t,l),h=zu(t,l,c,e);(s._to!==h.x||r._to!==h.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=a.width,this.height=a.height,this.caretX=o.x,this.caretY=o.y,this._resolveAnimations().update(this,h))}}_willRender(){return!!this.opacity}draw(t){const e=this.options.setContext(this.getContext());let n=this.opacity;if(!n)return;this._updateAnimationTarget(e);const s={width:this.width,height:this.height},r={x:this.x,y:this.y};n=Math.abs(n)<.001?0:n;const o=ke(e.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;e.enabled&&a&&(t.save(),t.globalAlpha=n,this.drawBackground(r,t,s,e),sf(t,e.textDirection),r.y+=o.top,this.drawTitle(r,t,e),this.drawBody(r,t,e),this.drawFooter(r,t,e),rf(t,e.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,e){const n=this._active,s=t.map(({datasetIndex:a,index:l})=>{const c=this.chart.getDatasetMeta(a);if(!c)throw new Error("Cannot find a dataset at index "+a);return{datasetIndex:a,element:c.data[l],index:l}}),r=!Ro(n,s),o=this._positionChanged(s,e);(r||o)&&(this._active=s,this._eventPosition=e,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,e,n=!0){if(e&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const s=this.options,r=this._active||[],o=this._getActiveElements(t,r,e,n),a=this._positionChanged(o,t),l=e||!Ro(o,r)||a;return l&&(this._active=o,(s.enabled||s.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,e))),l}_getActiveElements(t,e,n,s){const r=this.options;if(t.type==="mouseout")return[];if(!s)return e.filter(a=>this.chart.data.datasets[a.datasetIndex]&&this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index)!==void 0);const o=this.chart.getElementsAtEventForMode(t,r.mode,r,n);return r.reverse&&o.reverse(),o}_positionChanged(t,e){const{caretX:n,caretY:s,options:r}=this,o=Ws[r.position].call(this,t,e);return o!==!1&&(n!==o.x||s!==o.y)}}K(dl,"positioners",Ws);var pE={id:"tooltip",_element:dl,positioners:Ws,afterInit(i,t,e){e&&(i.tooltip=new dl({chart:i,options:e}))},beforeUpdate(i,t,e){i.tooltip&&i.tooltip.initialize(e)},reset(i,t,e){i.tooltip&&i.tooltip.initialize(e)},afterDraw(i){const t=i.tooltip;if(t&&t._willRender()){const e={tooltip:t};if(i.notifyPlugins("beforeTooltipDraw",{...e,cancelable:!0})===!1)return;t.draw(i.ctx),i.notifyPlugins("afterTooltipDraw",e)}},afterEvent(i,t){if(i.tooltip){const e=t.replay;i.tooltip.handleEvent(t.event,e,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(i,t)=>t.bodyFont.size,boxWidth:(i,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:Lf},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:i=>i!=="filter"&&i!=="itemSort"&&i!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},mE=Object.freeze({__proto__:null,Colors:wS,Decimation:LS,Filler:ZS,Legend:iE,SubTitle:oE,Title:rE,Tooltip:pE});const gE=(i,t,e,n)=>(typeof t=="string"?(e=i.push(t)-1,n.unshift({index:e,label:t})):isNaN(t)&&(e=null),e);function _E(i,t,e,n){const s=i.indexOf(t);if(s===-1)return gE(i,t,e,n);const r=i.lastIndexOf(t);return s!==r?e:s}const xE=(i,t)=>i===null?null:Ae(Math.round(i),0,t);function Gu(i){const t=this.getLabels();return i>=0&&i<t.length?t[i]:i}class fl extends Hi{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const e=this._addedLabels;if(e.length){const n=this.getLabels();for(const{index:s,label:r}of e)n[s]===r&&n.splice(s,1);this._addedLabels=[]}super.init(t)}parse(t,e){if(Gt(t))return null;const n=this.getLabels();return e=isFinite(e)&&n[e]===t?e:_E(n,t,Lt(e,t),this._addedLabels),xE(e,n.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let{min:n,max:s}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(n=0),e||(s=this.getLabels().length-1)),this.min=n,this.max=s}buildTicks(){const t=this.min,e=this.max,n=this.options.offset,s=[];let r=this.getLabels();r=t===0&&e===r.length-1?r:r.slice(t,e+1),this._valueRange=Math.max(r.length-(n?0:1),1),this._startValue=this.min-(n?.5:0);for(let o=t;o<=e;o++)s.push({value:o});return s}getLabelForValue(t){return Gu.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}K(fl,"id","category"),K(fl,"defaults",{ticks:{callback:Gu}});function vE(i,t){const e=[],{bounds:s,step:r,min:o,max:a,precision:l,count:c,maxTicks:h,maxDigits:u,includeBounds:d}=i,f=r||1,g=h-1,{min:_,max:p}=t,m=!Gt(o),v=!Gt(a),x=!Gt(c),y=(p-_)/(u+1);let b=kh((p-_)/g/f)*f,A,S,P,M;if(b<1e-14&&!m&&!v)return[{value:_},{value:p}];M=Math.ceil(p/b)-Math.floor(_/b),M>g&&(b=kh(M*b/g/f)*f),Gt(l)||(A=Math.pow(10,l),b=Math.ceil(b*A)/A),s==="ticks"?(S=Math.floor(_/b)*b,P=Math.ceil(p/b)*b):(S=_,P=p),m&&v&&r&&ub((a-o)/r,b/1e3)?(M=Math.round(Math.min((a-o)/b,h)),b=(a-o)/M,S=o,P=a):x?(S=m?o:S,P=v?a:P,M=c-1,b=(P-S)/M):(M=(P-S)/b,Ks(M,Math.round(M),b/1e3)?M=Math.round(M):M=Math.ceil(M));const w=Math.max(Bh(b),Bh(S));A=Math.pow(10,Gt(l)?w:l),S=Math.round(S*A)/A,P=Math.round(P*A)/A;let N=0;for(m&&(d&&S!==o?(e.push({value:o}),S<o&&N++,Ks(Math.round((S+N*b)*A)/A,o,Wu(o,y,i))&&N++):S<o&&N++);N<M;++N){const z=Math.round((S+N*b)*A)/A;if(v&&z>a)break;e.push({value:z})}return v&&d&&P!==a?e.length&&Ks(e[e.length-1].value,a,Wu(a,y,i))?e[e.length-1].value=a:e.push({value:a}):(!v||P===a)&&e.push({value:P}),e}function Wu(i,t,{horizontal:e,minRotation:n}){const s=gn(n),r=(e?Math.sin(s):Math.cos(s))||.001,o=.75*t*(""+i).length;return Math.min(t/r,o)}class Uo extends Hi{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,e){return Gt(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:e,maxDefined:n}=this.getUserBounds();let{min:s,max:r}=this;const o=l=>s=e?s:l,a=l=>r=n?r:l;if(t){const l=Tn(s),c=Tn(r);l<0&&c<0?a(0):l>0&&c>0&&o(0)}if(s===r){let l=r===0?1:Math.abs(r*.05);a(r+l),t||o(s-l)}this.min=s,this.max=r}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:e,stepSize:n}=t,s;return n?(s=Math.ceil(this.max/n)-Math.floor(this.min/n)+1,s>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${n} would result generating up to ${s} ticks. Limiting to 1000.`),s=1e3)):(s=this.computeTickLimit(),e=e||11),e&&(s=Math.min(e,s)),s}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,e=t.ticks;let n=this.getTickLimit();n=Math.max(2,n);const s={maxTicks:n,bounds:t.bounds,min:t.min,max:t.max,precision:e.precision,step:e.stepSize,count:e.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:e.minRotation||0,includeBounds:e.includeBounds!==!1},r=this._range||this,o=vE(s,r);return t.bounds==="ticks"&&zd(o,this,"value"),t.reverse?(o.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),o}configure(){const t=this.ticks;let e=this.min,n=this.max;if(super.configure(),this.options.offset&&t.length){const s=(n-e)/Math.max(t.length-1,1)/2;e-=s,n+=s}this._startValue=e,this._endValue=n,this._valueRange=n-e}getLabelForValue(t){return gr(t,this.chart.options.locale,this.options.ticks.format)}}class pl extends Uo{determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=ue(t)?t:0,this.max=ue(e)?e:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),e=t?this.width:this.height,n=gn(this.options.ticks.minRotation),s=(t?Math.sin(n):Math.cos(n))||.001,r=this._resolveTickFontOptions(0);return Math.ceil(e/Math.min(40,r.lineHeight/s))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}K(pl,"id","linear"),K(pl,"defaults",{ticks:{callback:Ho.formatters.numeric}});const hr=i=>Math.floor(ni(i)),Si=(i,t)=>Math.pow(10,hr(i)+t);function Xu(i){return i/Math.pow(10,hr(i))===1}function ju(i,t,e){const n=Math.pow(10,e),s=Math.floor(i/n);return Math.ceil(t/n)-s}function bE(i,t){const e=t-i;let n=hr(e);for(;ju(i,t,n)>10;)n++;for(;ju(i,t,n)<10;)n--;return Math.min(n,hr(i))}function ME(i,{min:t,max:e}){t=tn(i.min,t);const n=[],s=hr(t);let r=bE(t,e),o=r<0?Math.pow(10,Math.abs(r)):1;const a=Math.pow(10,r),l=s>r?Math.pow(10,s):0,c=Math.round((t-l)*o)/o,h=Math.floor((t-l)/a/10)*a*10;let u=Math.floor((c-h)/Math.pow(10,r)),d=tn(i.min,Math.round((l+h+u*Math.pow(10,r))*o)/o);for(;d<e;)n.push({value:d,major:Xu(d),significand:u}),u>=10?u=u<15?15:20:u++,u>=20&&(r++,u=2,o=r>=0?1:o),d=Math.round((l+h+u*Math.pow(10,r))*o)/o;const f=tn(i.max,d);return n.push({value:f,major:Xu(f),significand:u}),n}class ml extends Hi{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,e){const n=Uo.prototype.parse.apply(this,[t,e]);if(n===0){this._zero=!0;return}return ue(n)&&n>0?n:null}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=ue(t)?Math.max(0,t):null,this.max=ue(e)?Math.max(0,e):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!ue(this._userMin)&&(this.min=t===Si(this.min,0)?Si(this.min,-1):Si(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let n=this.min,s=this.max;const r=a=>n=t?n:a,o=a=>s=e?s:a;n===s&&(n<=0?(r(1),o(10)):(r(Si(n,-1)),o(Si(s,1)))),n<=0&&r(Si(s,-1)),s<=0&&o(Si(n,1)),this.min=n,this.max=s}buildTicks(){const t=this.options,e={min:this._userMin,max:this._userMax},n=ME(e,this);return t.bounds==="ticks"&&zd(n,this,"value"),t.reverse?(n.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),n}getLabelForValue(t){return t===void 0?"0":gr(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=ni(t),this._valueRange=ni(this.max)-ni(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(ni(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const e=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+e*this._valueRange)}}K(ml,"id","logarithmic"),K(ml,"defaults",{ticks:{callback:Ho.formatters.logarithmic,major:{enabled:!0}}});function gl(i){const t=i.ticks;if(t.display&&i.display){const e=ke(t.backdropPadding);return Lt(t.font&&t.font.size,le.font.size)+e.height}return 0}function yE(i,t,e){return e=re(e)?e:[e],{w:Rb(i,t.string,e),h:e.length*t.lineHeight}}function Yu(i,t,e,n,s){return i===n||i===s?{start:t-e/2,end:t+e/2}:i<n||i>s?{start:t-e,end:t}:{start:t,end:t+e}}function SE(i){const t={l:i.left+i._padding.left,r:i.right-i._padding.right,t:i.top+i._padding.top,b:i.bottom-i._padding.bottom},e=Object.assign({},t),n=[],s=[],r=i._pointLabels.length,o=i.options.pointLabels,a=o.centerPointLabels?Zt/r:0;for(let l=0;l<r;l++){const c=o.setContext(i.getPointLabelContext(l));s[l]=c.padding;const h=i.getPointPosition(l,i.drawingArea+s[l],a),u=be(c.font),d=yE(i.ctx,u,i._pointLabels[l]);n[l]=d;const f=Oe(i.getIndexAngle(l)+a),g=Math.round(Rl(f)),_=Yu(g,h.x,d.w,0,180),p=Yu(g,h.y,d.h,90,270);EE(e,t,f,_,p)}i.setCenterPoint(t.l-e.l,e.r-t.r,t.t-e.t,e.b-t.b),i._pointLabelItems=wE(i,n,s)}function EE(i,t,e,n,s){const r=Math.abs(Math.sin(e)),o=Math.abs(Math.cos(e));let a=0,l=0;n.start<t.l?(a=(t.l-n.start)/r,i.l=Math.min(i.l,t.l-a)):n.end>t.r&&(a=(n.end-t.r)/r,i.r=Math.max(i.r,t.r+a)),s.start<t.t?(l=(t.t-s.start)/o,i.t=Math.min(i.t,t.t-l)):s.end>t.b&&(l=(s.end-t.b)/o,i.b=Math.max(i.b,t.b+l))}function TE(i,t,e){const n=i.drawingArea,{extra:s,additionalAngle:r,padding:o,size:a}=e,l=i.getPointPosition(t,n+s+o,r),c=Math.round(Rl(Oe(l.angle+fe))),h=PE(l.y,a.h,c),u=RE(c),d=CE(l.x,a.w,u);return{visible:!0,x:l.x,y:h,textAlign:u,left:d,top:h,right:d+a.w,bottom:h+a.h}}function AE(i,t){if(!t)return!0;const{left:e,top:n,right:s,bottom:r}=i;return!(Vn({x:e,y:n},t)||Vn({x:e,y:r},t)||Vn({x:s,y:n},t)||Vn({x:s,y:r},t))}function wE(i,t,e){const n=[],s=i._pointLabels.length,r=i.options,{centerPointLabels:o,display:a}=r.pointLabels,l={extra:gl(r)/2,additionalAngle:o?Zt/s:0};let c;for(let h=0;h<s;h++){l.padding=e[h],l.size=t[h];const u=TE(i,h,l);n.push(u),a==="auto"&&(u.visible=AE(u,c),u.visible&&(c=u))}return n}function RE(i){return i===0||i===180?"center":i<180?"left":"right"}function CE(i,t,e){return e==="right"?i-=t:e==="center"&&(i-=t/2),i}function PE(i,t,e){return e===90||e===270?i-=t/2:(e>270||e<90)&&(i-=t),i}function LE(i,t,e){const{left:n,top:s,right:r,bottom:o}=e,{backdropColor:a}=t;if(!Gt(a)){const l=Ii(t.borderRadius),c=ke(t.backdropPadding);i.fillStyle=a;const h=n-c.left,u=s-c.top,d=r-n+c.width,f=o-s+c.height;Object.values(l).some(g=>g!==0)?(i.beginPath(),lr(i,{x:h,y:u,w:d,h:f,radius:l}),i.fill()):i.fillRect(h,u,d,f)}}function DE(i,t){const{ctx:e,options:{pointLabels:n}}=i;for(let s=t-1;s>=0;s--){const r=i._pointLabelItems[s];if(!r.visible)continue;const o=n.setContext(i.getPointLabelContext(s));LE(e,o,r);const a=be(o.font),{x:l,y:c,textAlign:h}=r;ki(e,i._pointLabels[s],l,c+a.lineHeight/2,a,{color:o.color,textAlign:h,textBaseline:"middle"})}}function Df(i,t,e,n){const{ctx:s}=i;if(e)s.arc(i.xCenter,i.yCenter,t,0,oe);else{let r=i.getPointPosition(0,t);s.moveTo(r.x,r.y);for(let o=1;o<n;o++)r=i.getPointPosition(o,t),s.lineTo(r.x,r.y)}}function IE(i,t,e,n,s){const r=i.ctx,o=t.circular,{color:a,lineWidth:l}=t;!o&&!n||!a||!l||e<0||(r.save(),r.strokeStyle=a,r.lineWidth=l,r.setLineDash(s.dash||[]),r.lineDashOffset=s.dashOffset,r.beginPath(),Df(i,e,o,n),r.closePath(),r.stroke(),r.restore())}function OE(i,t,e){return fi(i,{label:e,index:t,type:"pointLabel"})}class Xs extends Uo{constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=ke(gl(this.options)/2),e=this.width=this.maxWidth-t.width,n=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+e/2+t.left),this.yCenter=Math.floor(this.top+n/2+t.top),this.drawingArea=Math.floor(Math.min(e,n)/2)}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!1);this.min=ue(t)&&!isNaN(t)?t:0,this.max=ue(e)&&!isNaN(e)?e:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/gl(this.options))}generateTickLabels(t){Uo.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((e,n)=>{const s=ne(this.options.pointLabels.callback,[e,n],this);return s||s===0?s:""}).filter((e,n)=>this.chart.getDataVisibility(n))}fit(){const t=this.options;t.display&&t.pointLabels.display?SE(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,e,n,s){this.xCenter+=Math.floor((t-e)/2),this.yCenter+=Math.floor((n-s)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,e,n,s))}getIndexAngle(t){const e=oe/(this._pointLabels.length||1),n=this.options.startAngle||0;return Oe(t*e+gn(n))}getDistanceFromCenterForValue(t){if(Gt(t))return NaN;const e=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*e:(t-this.min)*e}getValueForDistanceFromCenter(t){if(Gt(t))return NaN;const e=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-e:this.min+e}getPointLabelContext(t){const e=this._pointLabels||[];if(t>=0&&t<e.length){const n=e[t];return OE(this.getContext(),t,n)}}getPointPosition(t,e,n=0){const s=this.getIndexAngle(t)-fe+n;return{x:Math.cos(s)*e+this.xCenter,y:Math.sin(s)*e+this.yCenter,angle:s}}getPointPositionForValue(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:e,top:n,right:s,bottom:r}=this._pointLabelItems[t];return{left:e,top:n,right:s,bottom:r}}drawBackground(){const{backgroundColor:t,grid:{circular:e}}=this.options;if(t){const n=this.ctx;n.save(),n.beginPath(),Df(this,this.getDistanceFromCenterForValue(this._endValue),e,this._pointLabels.length),n.closePath(),n.fillStyle=t,n.fill(),n.restore()}}drawGrid(){const t=this.ctx,e=this.options,{angleLines:n,grid:s,border:r}=e,o=this._pointLabels.length;let a,l,c;if(e.pointLabels.display&&DE(this,o),s.display&&this.ticks.forEach((h,u)=>{if(u!==0||u===0&&this.min<0){l=this.getDistanceFromCenterForValue(h.value);const d=this.getContext(u),f=s.setContext(d),g=r.setContext(d);IE(this,f,l,o,g)}}),n.display){for(t.save(),a=o-1;a>=0;a--){const h=n.setContext(this.getPointLabelContext(a)),{color:u,lineWidth:d}=h;!d||!u||(t.lineWidth=d,t.strokeStyle=u,t.setLineDash(h.borderDash),t.lineDashOffset=h.borderDashOffset,l=this.getDistanceFromCenterForValue(e.reverse?this.min:this.max),c=this.getPointPosition(a,l),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(c.x,c.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,e=this.options,n=e.ticks;if(!n.display)return;const s=this.getIndexAngle(0);let r,o;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(s),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((a,l)=>{if(l===0&&this.min>=0&&!e.reverse)return;const c=n.setContext(this.getContext(l)),h=be(c.font);if(r=this.getDistanceFromCenterForValue(this.ticks[l].value),c.showLabelBackdrop){t.font=h.string,o=t.measureText(a.label).width,t.fillStyle=c.backdropColor;const u=ke(c.backdropPadding);t.fillRect(-o/2-u.left,-r-h.size/2-u.top,o+u.width,h.size+u.height)}ki(t,a.label,0,-r,h,{color:c.color,strokeColor:c.textStrokeColor,strokeWidth:c.textStrokeWidth})}),t.restore()}drawTitle(){}}K(Xs,"id","radialLinear"),K(Xs,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:Ho.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}}),K(Xs,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),K(Xs,"descriptors",{angleLines:{_fallback:"grid"}});const jo={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},je=Object.keys(jo);function qu(i,t){return i-t}function $u(i,t){if(Gt(t))return null;const e=i._adapter,{parser:n,round:s,isoWeekday:r}=i._parseOpts;let o=t;return typeof n=="function"&&(o=n(o)),ue(o)||(o=typeof n=="string"?e.parse(o,n):e.parse(o)),o===null?null:(s&&(o=s==="week"&&(Ms(r)||r===!0)?e.startOf(o,"isoWeek",r):e.startOf(o,s)),+o)}function Ku(i,t,e,n){const s=je.length;for(let r=je.indexOf(i);r<s-1;++r){const o=jo[je[r]],a=o.steps?o.steps:Number.MAX_SAFE_INTEGER;if(o.common&&Math.ceil((e-t)/(a*o.size))<=n)return je[r]}return je[s-1]}function UE(i,t,e,n,s){for(let r=je.length-1;r>=je.indexOf(e);r--){const o=je[r];if(jo[o].common&&i._adapter.diff(s,n,o)>=t-1)return o}return je[e?je.indexOf(e):0]}function FE(i){for(let t=je.indexOf(i)+1,e=je.length;t<e;++t)if(jo[je[t]].common)return je[t]}function Zu(i,t,e){if(!e)i[t]=!0;else if(e.length){const{lo:n,hi:s}=Cl(e,t),r=e[n]>=t?e[n]:e[s];i[r]=!0}}function NE(i,t,e,n){const s=i._adapter,r=+s.startOf(t[0].value,n),o=t[t.length-1].value;let a,l;for(a=r;a<=o;a=+s.add(a,1,n))l=e[a],l>=0&&(t[l].major=!0);return t}function Ju(i,t,e){const n=[],s={},r=t.length;let o,a;for(o=0;o<r;++o)a=t[o],s[a]=o,n.push({value:a,major:!1});return r===0||!e?n:NE(i,n,s,e)}class ur extends Hi{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,e={}){const n=t.time||(t.time={}),s=this._adapter=new XM._date(t.adapters.date);s.init(e),$s(n.displayFormats,s.formats()),this._parseOpts={parser:n.parser,round:n.round,isoWeekday:n.isoWeekday},super.init(t),this._normalized=e.normalized}parse(t,e){return t===void 0?null:$u(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,e=this._adapter,n=t.time.unit||"day";let{min:s,max:r,minDefined:o,maxDefined:a}=this.getUserBounds();function l(c){!o&&!isNaN(c.min)&&(s=Math.min(s,c.min)),!a&&!isNaN(c.max)&&(r=Math.max(r,c.max))}(!o||!a)&&(l(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&l(this.getMinMax(!1))),s=ue(s)&&!isNaN(s)?s:+e.startOf(Date.now(),n),r=ue(r)&&!isNaN(r)?r:+e.endOf(Date.now(),n)+1,this.min=Math.min(s,r-1),this.max=Math.max(s+1,r)}_getLabelBounds(){const t=this.getLabelTimestamps();let e=Number.POSITIVE_INFINITY,n=Number.NEGATIVE_INFINITY;return t.length&&(e=t[0],n=t[t.length-1]),{min:e,max:n}}buildTicks(){const t=this.options,e=t.time,n=t.ticks,s=n.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&s.length&&(this.min=this._userMin||s[0],this.max=this._userMax||s[s.length-1]);const r=this.min,o=this.max,a=mb(s,r,o);return this._unit=e.unit||(n.autoSkip?Ku(e.minUnit,this.min,this.max,this._getLabelCapacity(r)):UE(this,a.length,e.minUnit,this.min,this.max)),this._majorUnit=!n.major.enabled||this._unit==="year"?void 0:FE(this._unit),this.initOffsets(s),t.reverse&&a.reverse(),Ju(this,a,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let e=0,n=0,s,r;this.options.offset&&t.length&&(s=this.getDecimalForValue(t[0]),t.length===1?e=1-s:e=(this.getDecimalForValue(t[1])-s)/2,r=this.getDecimalForValue(t[t.length-1]),t.length===1?n=r:n=(r-this.getDecimalForValue(t[t.length-2]))/2);const o=t.length<3?.5:.25;e=Ae(e,0,o),n=Ae(n,0,o),this._offsets={start:e,end:n,factor:1/(e+1+n)}}_generate(){const t=this._adapter,e=this.min,n=this.max,s=this.options,r=s.time,o=r.unit||Ku(r.minUnit,e,n,this._getLabelCapacity(e)),a=Lt(s.ticks.stepSize,1),l=o==="week"?r.isoWeekday:!1,c=Ms(l)||l===!0,h={};let u=e,d,f;if(c&&(u=+t.startOf(u,"isoWeek",l)),u=+t.startOf(u,c?"day":o),t.diff(n,e,o)>1e5*a)throw new Error(e+" and "+n+" are too far apart with stepSize of "+a+" "+o);const g=s.ticks.source==="data"&&this.getDataTimestamps();for(d=u,f=0;d<n;d=+t.add(d,a,o),f++)Zu(h,d,g);return(d===n||s.bounds==="ticks"||f===1)&&Zu(h,d,g),Object.keys(h).sort(qu).map(_=>+_)}getLabelForValue(t){const e=this._adapter,n=this.options.time;return n.tooltipFormat?e.format(t,n.tooltipFormat):e.format(t,n.displayFormats.datetime)}format(t,e){const s=this.options.time.displayFormats,r=this._unit,o=e||s[r];return this._adapter.format(t,o)}_tickFormatFunction(t,e,n,s){const r=this.options,o=r.ticks.callback;if(o)return ne(o,[t,e,n],this);const a=r.time.displayFormats,l=this._unit,c=this._majorUnit,h=l&&a[l],u=c&&a[c],d=n[e],f=c&&u&&d&&d.major;return this._adapter.format(t,s||(f?u:h))}generateTickLabels(t){let e,n,s;for(e=0,n=t.length;e<n;++e)s=t[e],s.label=this._tickFormatFunction(s.value,e,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const e=this._offsets,n=this.getDecimalForValue(t);return this.getPixelForDecimal((e.start+n)*e.factor)}getValueForPixel(t){const e=this._offsets,n=this.getDecimalForPixel(t)/e.factor-e.end;return this.min+n*(this.max-this.min)}_getLabelSize(t){const e=this.options.ticks,n=this.ctx.measureText(t).width,s=gn(this.isHorizontal()?e.maxRotation:e.minRotation),r=Math.cos(s),o=Math.sin(s),a=this._resolveTickFontOptions(0).size;return{w:n*r+a*o,h:n*o+a*r}}_getLabelCapacity(t){const e=this.options.time,n=e.displayFormats,s=n[e.unit]||n.millisecond,r=this._tickFormatFunction(t,0,Ju(this,[t],this._majorUnit),s),o=this._getLabelSize(r),a=Math.floor(this.isHorizontal()?this.width/o.w:this.height/o.h)-1;return a>0?a:1}getDataTimestamps(){let t=this._cache.data||[],e,n;if(t.length)return t;const s=this.getMatchingVisibleMetas();if(this._normalized&&s.length)return this._cache.data=s[0].controller.getAllParsedValues(this);for(e=0,n=s.length;e<n;++e)t=t.concat(s[e].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let e,n;if(t.length)return t;const s=this.getLabels();for(e=0,n=s.length;e<n;++e)t.push($u(this,s[e]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return Gd(t.sort(qu))}}K(ur,"id","time"),K(ur,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function ao(i,t,e){let n=0,s=i.length-1,r,o,a,l;e?(t>=i[n].pos&&t<=i[s].pos&&({lo:n,hi:s}=Hn(i,"pos",t)),{pos:r,time:a}=i[n],{pos:o,time:l}=i[s]):(t>=i[n].time&&t<=i[s].time&&({lo:n,hi:s}=Hn(i,"time",t)),{time:r,pos:a}=i[n],{time:o,pos:l}=i[s]);const c=o-r;return c?a+(l-a)*(t-r)/c:a}class _l extends ur{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),e=this._table=this.buildLookupTable(t);this._minPos=ao(e,this.min),this._tableRange=ao(e,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:e,max:n}=this,s=[],r=[];let o,a,l,c,h;for(o=0,a=t.length;o<a;++o)c=t[o],c>=e&&c<=n&&s.push(c);if(s.length<2)return[{time:e,pos:0},{time:n,pos:1}];for(o=0,a=s.length;o<a;++o)h=s[o+1],l=s[o-1],c=s[o],Math.round((h+l)/2)!==c&&r.push({time:c,pos:o/(a-1)});return r}_generate(){const t=this.min,e=this.max;let n=super.getDataTimestamps();return(!n.includes(t)||!n.length)&&n.splice(0,0,t),(!n.includes(e)||n.length===1)&&n.push(e),n.sort((s,r)=>s-r)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const e=this.getDataTimestamps(),n=this.getLabelTimestamps();return e.length&&n.length?t=this.normalize(e.concat(n)):t=e.length?e:n,t=this._cache.all=t,t}getDecimalForValue(t){return(ao(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const e=this._offsets,n=this.getDecimalForPixel(t)/e.factor-e.end;return ao(this._table,n*this._tableRange+this._minPos,!0)}}K(_l,"id","timeseries"),K(_l,"defaults",ur.defaults);var kE=Object.freeze({__proto__:null,CategoryScale:fl,LinearScale:pl,LogarithmicScale:ml,RadialLinearScale:Xs,TimeScale:ur,TimeSeriesScale:_l});const BE=[WM,bS,mE,kE];cn.register(...BE);const If=[{R:8.122,vc:229,stat:.2,source:tr.eilers,note:"Eilers: erro estatístico; sistemáticos estimados de 2–5% não incluídos."},{R:8.15,radiusError:.15,vc:236,stat:7,source:tr.reid,note:"Reid: masers; parâmetros ajustados conjuntamente."}];class zE{constructor(){K(this,"chart");K(this,"mode","energy");K(this,"samples",[]);K(this,"field",new fs);cn.defaults.color="#8999ad",cn.defaults.font.family="DM Sans, sans-serif",cn.defaults.font.size=9,this.chart=new cn(document.getElementById("scienceChart"),{type:"line",data:{datasets:[]},options:{responsive:!0,maintainAspectRatio:!1,animation:!1,normalized:!0,parsing:!1,plugins:{legend:{labels:{boxWidth:9,boxHeight:2,padding:8,font:{size:8}}}},scales:{x:{type:"linear",grid:{color:"#ffffff06"},ticks:{maxTicksLimit:5}},y:{grid:{color:"#ffffff09"},ticks:{maxTicksLimit:5}}}}})}setMode(t){this.mode=t,this.render()}reset(t){this.field=t,this.samples=[],this.render()}add(t){this.samples.push(t),this.samples.length>12e3&&this.samples.shift()}render(){const t=["#e9bd7f","#9bbde5","#91c9b8","#ed97af","#ad99d1","#e8e8e8"],e=(n,s,r,o=!1)=>({label:n,data:s,borderColor:t[r],borderWidth:1.4,pointRadius:0,borderDash:o?[4,3]:[]});if(this.mode==="rotation"){const n=Array.from({length:160},(a,l)=>ve.minRadius+(ve.maxRadius-ve.minRadius)*l/159),s=new fs({...this.field.components,halo:!1}),r=(this.field.components.disk?$t.disk.mass:0)+(this.field.components.bulge?$t.bulge.mass:0)+(this.field.components.nucleus?$t.nucleus.mass:0),o=a=>new fs({halo:!1,disk:!1,bulge:!1,nucleus:!1,[a]:this.field.components[a]});this.chart.data.datasets=[e("Selecionado",n.map(a=>({x:a,y:this.field.circularSpeed(a)})),0),e("Sem halo",n.map(a=>({x:a,y:s.circularSpeed(a)})),3),e("Halo",n.map(a=>({x:a,y:o("halo").circularSpeed(a)})),4),e("Disco",n.map(a=>({x:a,y:o("disk").circularSpeed(a)})),1),e("Kepler (massa bariônica)",n.map(a=>({x:a,y:Math.sqrt(yn*r/a)})),5,!0),...If.map((a,l)=>({...e(l===0?"Eilers 2019":"Reid 2019",[{x:a.R,y:a.vc}],2+l),pointRadius:4,showLine:!1}))],this.chart.options.scales.x.title={display:!0,text:"R [kpc]"},this.chart.options.scales.y.title={display:!0,text:"vc [km/s]"},document.getElementById("chart-note").textContent="Curvas teóricas, não dados simulados. Kepler concentra a massa bariônica no centro; não equivale a retirar o halo. Pontos observacionais: fontes e incertezas em Modelo & fontes."}else{const n=this.samples.slice(-300),s=r=>n.map(o=>({x:o.t,y:o[r]}));this.chart.data.datasets=this.mode==="energy"?[e("E total",s("E"),0),e("K",s("K"),1),e("Φ",s("phi"),4),e("E sem halo",s("comparisonE"),3,!0)]:[e("|ΔE| / escala",s("energyError"),0),e("|ΔLz| / escala",s("angularError"),2),e("ΔE sem halo",s("comparisonError"),3,!0)],this.chart.options.scales.x.title={display:!0,text:"t [Gyr]"},this.chart.options.scales.y.title={display:!0,text:this.mode==="energy"?"Energia específica [(km/s)²]":"Erro normalizado"},document.getElementById("chart-note").textContent=this.mode==="energy"?"E = K + Φ. Energias por unidade de massa; os cenários têm potenciais diferentes e energias iniciais diferentes.":"Máximos históricos são monitorados a cada passo. Escala E = max(|E₀|,K₀); escala L = max(|Lz₀|,|r₀||v₀|)."}this.chart.update("none")}}function HE(){document.getElementById("parameters").innerHTML=td.map(([e,n,s,r,o])=>`<tr><td>${e}<br><small>${n}</small></td><td>${s.toLocaleString("pt-BR",{maximumSignificantDigits:8})}</td><td>${r}</td><td><a href="${tr[o].url}" target="_blank" rel="noopener">Fonte ↗</a></td></tr>`).join(""),document.getElementById("references").innerHTML=Object.values(tr).map(e=>`<li><a href="${e.url}" target="_blank" rel="noopener">${e.title}</a></li>`).join(""),document.getElementById("observations").innerHTML=If.map(e=>`<p><a href="${e.source.url}" target="_blank" rel="noopener">${e.source.title}</a>: vc(${e.R} kpc) = ${e.vc} ± ${e.stat} km/s. ${e.note}</p>`).join("");const i=document.getElementById("info-dialog");document.getElementById("btn-info").onclick=()=>i.showModal(),document.getElementById("btn-close").onclick=()=>i.close();let t=0;document.getElementById("btn-panels").onclick=()=>{t=(t+1)%(innerWidth<=580?3:2),document.body.classList.toggle("mobile-metrics",innerWidth<=580&&t===1),document.body.classList.toggle("hide-panels",t===(innerWidth<=580?2:1)),document.getElementById("btn-panels").setAttribute("aria-expanded",String(!document.body.classList.contains("hide-panels")))}}function VE(i){const t=new Blob([JSON.stringify(i,null,2)],{type:"application/json"}),e=URL.createObjectURL(t),n=document.createElement("a");n.href=e,n.download="experimento-galactico.json",n.click(),setTimeout(()=>URL.revokeObjectURL(e),1e3)}class GE{constructor(){K(this,"debt",0);K(this,"maxStepsPerFrame",1e3)}advance(t,e,n,s){this.debt+=t*e;let r=0;for(;this.debt>=n&&r<this.maxStepsPerFrame;)if(this.debt-=n,r++,!s()){this.debt=0;break}return r}reset(){this.debt=0}}const Tt=i=>document.getElementById(i),Ve=i=>Tt(i);HE();function WE(){const i=new Tv;new Lv(i.scene);const t=new Pv(i.scene),e=new Ch(i.scene,16106619,1),n=new Ch(i.scene,15634856,2),s=new Ph(i.scene,16106619,1),r=new Ph(i.scene,15634856,2),o=new zE,a=new GE;let l,c,h=0,u=0,d=!1,f=!1,g=!1,_=$l(new fs,"solar"),p="solar",m=performance.now(),v=0,x=0,y=m,b=0,A=0,S,P;const M=()=>({halo:Ve("chk-halo").checked,disk:Ve("chk-disk").checked,bulge:Ve("chk-bulge").checked,nucleus:Ve("chk-nucleus").checked});function w(){Tt("btn-pause").textContent=d?"▶":"Ⅱ",Tt("btn-pause").setAttribute("aria-label",d?"Continuar simulação":"Pausar simulação"),Tt("run-status").textContent=f?"ATENÇÃO NUMÉRICA":d?"PAUSADO":"INTEGRANDO"}function N(){const I=l.state,B=Math.hypot(I.q[0],I.q[1]);return{t:I.t,K:S.K,phi:S.phi,E:S.E,Lz:S.Lz,energyError:S.energyError,angularError:S.angularError,comparisonE:P.E,comparisonError:P.energyError,R:B,z:I.q[2],vR:(I.q[0]*I.v[0]+I.q[1]*I.v[1])/B/Re,vPhi:(I.q[0]*I.v[1]-I.q[1]*I.v[0])/B/Re,vz:I.v[2]/Re}}function z(){const I=l.state,B=N(),J=l.field.acceleration(I.q);Tt("t-time").textContent=I.t.toFixed(3),Tt("t-radius").textContent=B.R.toFixed(3),Tt("t-height").textContent=I.q[2].toFixed(4),Tt("t-vel").textContent=(Math.hypot(...I.v)/Re).toFixed(2),Tt("t-acc").textContent=Math.hypot(...J).toExponential(2),Tt("velocity-components").textContent=`vR ${B.vR.toFixed(2)} · vφ ${B.vPhi.toFixed(2)} · vz ${B.vz.toFixed(2)} km/s`,Tt("t-energy").textContent=`${S.E.toFixed(1)} (km/s)²`,Tt("t-lz").textContent=`${S.Lz.toFixed(2)} kpc km/s`,Tt("t-error").textContent=S.maxEnergy.toExponential(2),Tt("t-lerror").textContent=S.maxAngular.toExponential(2),Tt("t-step").textContent=`${(h*1e3).toFixed(4)} Myr`;const $=S.warning||P.warning;Tt("numerical-status").classList.toggle("warning",$||f),Tt("numerical-status").textContent=$?S.domainError||P.domainError?"Pausado: trajetória fora do domínio operacional de 0,5–50 kpc. Isso não prova instabilidade física.":"Pausado: limite numérico excedido. Reinicie com maior resolução temporal.":`Precisão dentro dos limites · |ΔE|/escala < ${ve.energyTolerance} · hω ${S.resolution.toFixed(4)}`,Tt("compare-status").textContent=`Sem halo · t=${c.state.t.toFixed(3)} Gyr · máx. ΔE=${P.maxEnergy.toExponential(2)} · máx. ΔLz=${P.maxAngular.toExponential(2)}. Mesmo estado inicial.`,a.debt>h*a.maxStepsPerFrame&&(Tt("run-status").textContent="RITMO LIMITADO PELA CPU")}function q(){const I=new fs(M());p=Tt("preset").value;const B=p==="solar"?en.R:Number(Ve("radius").value),J=$l(I,p,B),$=Kf(I,B),Z=new fs({...I.components,halo:!1}),O=Z.frequencies(B),G=Math.sqrt(Math.max(O.omega2,O.kappa2,O.nu2));h=G>0?Math.min($,2*Math.PI/(ve.samplesPerFastPeriod*G)):$,_=lo(J),l=new ql(I,J),c=new ql(Z,J),u=0,A=0,a.reset(),f=!1,d=!1,s.clear(),r.clear(),s.addPoint(J.q),r.addPoint(J.q),S=l.diagnostics(h),P=c.diagnostics(h),o.reset(I),o.add(N()),o.render(),Ve("radius").disabled=p==="solar",p==="solar"&&(Ve("radius").value=String(en.R)),Tt("preset-note").textContent=p==="solar"?"R, z e movimento peculiar solares com fontes. vφ = vc do modelo + V☉.":p==="circular"?"z = vR = vz = 0; vφ calculada no campo selecionado.":"Perturbação experimental vR = 0,01 vc; não é excentricidade observada.",w(),z()}function L(){try{q()}catch(I){Tt("numerical-status").textContent=String(I),Tt("numerical-status").classList.add("warning")}}q();for(const I of["halo","disk","bulge","nucleus"])Ve(`chk-${I}`).onchange=()=>{if(!Object.values(M()).some(Boolean)){Ve(`chk-${I}`).checked=!0,Tt("numerical-status").textContent="Mantenha ao menos uma componente no cenário principal.";return}L()};Tt("preset").onchange=()=>{Ve("radius").disabled=Tt("preset").value==="solar",L()},Tt("btn-apply").onclick=L,Tt("btn-reset").onclick=L,Tt("btn-pause").onclick=()=>{f||(d=!d,a.reset(),w())},Ve("sl-speed").oninput=()=>{Tt("lbl-speed").textContent=`${(.02*Number(Ve("sl-speed").value)).toFixed(2)} Gyr/s`},Tt("btn-split").onclick=()=>{i.setSplit(!i.splitMode),document.body.classList.toggle("split",i.splitMode),Tt("split-labels").hidden=!i.splitMode,Tt("btn-split").setAttribute("aria-pressed",String(i.splitMode))},Tt("btn-cam-sun").onclick=()=>{g=!0,Tt("btn-cam-sun").classList.add("active")};for(const[I,B]of[["btn-cam-orbit","global"],["btn-top","top"],["btn-edge","edge"]])Tt(I).onclick=()=>{g=!1,Tt("btn-cam-sun").classList.remove("active"),i.view(B)};Ve("chk-visual").onchange=()=>{t.group.visible=Ve("chk-visual").checked},Tt("quality").onchange=()=>t.build(Number(Tt("quality").value));for(const I of["energy","rotation","errors"])Tt(`tab-${I}`).onclick=()=>{o.setMode(I);for(const B of document.querySelectorAll(".tabs button"))B.classList.remove("active");Tt(`tab-${I}`).classList.add("active")};Tt("btn-export").onclick=()=>VE({schemaVersion:1,model:$t,components:l.field.components,comparison:c.field.components,initial:_,state:l.state,comparisonState:c.state,preset:p,stepGyr:h,numerics:ve,units:{position:"kpc",velocity:"kpc/Gyr",time:"Gyr",sampleVelocity:"km/s",energy:"(km/s)^2",angularMomentum:"kpc km/s"},parameters:td,references:tr,diagnostics:S,comparisonDiagnostics:P,samples:o.samples,samplingNote:"Amostras a cada 16 passos; retém as últimas 12000. Visuais não exportados como dados físicos."}),document.addEventListener("visibilitychange",()=>{m=performance.now(),a.reset()}),i.renderer.domElement.addEventListener("webglcontextlost",I=>{I.preventDefault(),d=!0,f=!0,w(),Tt("numerical-status").textContent="Contexto WebGL perdido. Recarregue a página para reconstruir os buffers."});function F(I){requestAnimationFrame(F);const B=(I-m)/1e3;if(m=I,!document.hidden){if(!d)try{a.advance(B,.02*Number(Ve("sl-speed").value),h,()=>(l.step(h),c.step(h),u++,S=l.diagnostics(h),P=c.diagnostics(h),u%16===0&&(s.addPoint(l.state.q),r.addPoint(c.state.q),o.add(N()),A=u),S.warning||P.warning?(d=!0,f=!0,A!==u&&o.add(N()),w(),z(),!1):!0))}catch(J){d=!0,f=!0,w(),Tt("numerical-status").textContent=`Integração interrompida: ${String(J)}`}if(e.update(l.state.q,i.camera1),n.update(c.state.q,i.camera2),g){const J=1-Math.exp(-B*4);i.controls1.target.lerp(e.mesh.position,J),i.controls2.target.lerp(n.mesh.position,J)}I-v>100&&(z(),v=I),I-x>300&&(o.render(),x=I),i.render(),b++,I-y>1e3&&(Tt("performance").textContent=`${Math.round(b*1e3/(I-y))} FPS medidos · ${Math.round(i.renderer.info.render.points/1e3)} mil pontos/vista`,b=0,y=I)}}requestAnimationFrame(F),Object.defineProperty(window,"galacticSnapshot",{value:()=>({state:lo(l.state),comparison:lo(c.state),diagnostics:{...S},comparisonDiagnostics:{...P},h,paused:d,fault:f,components:{...l.field.components},split:i.splitMode}),writable:!1})}try{WE()}catch(i){Tt("run-status").textContent="INICIALIZAÇÃO INTERROMPIDA",Tt("numerical-status").textContent=`Não foi possível iniciar: ${String(i)}`,console.error(i)}
