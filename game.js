import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const mount=document.getElementById('game');
const scene=new THREE.Scene();scene.background=new THREE.Color(0x111722);scene.fog=new THREE.Fog(0x111722,18,42);
const camera=new THREE.PerspectiveCamera(43,innerWidth/innerHeight,.1,100);camera.position.set(0,5.2,12.5);
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;mount.appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0x9fb9e8,0x28202a,2.0));
const keyLight=new THREE.SpotLight(0xffe4bd,180,35,Math.PI/5,.45,1.5);keyLight.position.set(-3,11,3);keyLight.castShadow=true;keyLight.shadow.mapSize.set(1024,1024);scene.add(keyLight);
const rimLight=new THREE.SpotLight(0x76aaff,130,35,Math.PI/4,.6,1);rimLight.position.set(4,9,-5);scene.add(rimLight);
const fillLight=new THREE.PointLight(0xffbd78,35,18);fillLight.position.set(0,5,5);scene.add(fillLight);

const mat=(color,rough=.65,metal=0)=>new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal});
const floor=new THREE.Mesh(new THREE.PlaneGeometry(80,80),mat(0x171b24));floor.rotation.x=-Math.PI/2;floor.position.y=-.12;floor.receiveShadow=true;scene.add(floor);
function box(w,h,d,m,x,y,z,parent=scene){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
function cylinder(rt,rb,h,m,x,y,z,parent=scene,segments=24){const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,segments),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
const ring= new THREE.Group();scene.add(ring);
box(8,.22,8,mat(0x252a34),0,.02,0,ring);box(7.7,.08,7.7,mat(0xaaa9a0,.85),0,.17,0,ring);
for(let i=0;i<4;i++){const z=-3.55+i*.08;box(7.8,.025,.025,mat(i%2?0x253e66:0x9a2935),0,.225,z,ring)}
for(const x of [-3.9,3.9])for(const z of [-3.9,3.9]){box(.24,1.7,.24,mat(0x9d9fa5,.3,.6),x,1,z,ring);box(.42,.3,.42,mat(0xc3a66b,.3,.5),x,1.9,z,ring)}
for(let y of [0.65,1.05,1.45]){const rope= new THREE.Mesh(new THREE.BoxGeometry(7.9,.055,.055),mat(y===1.05?0xf1f1ed:0xb52e3a,.3));for(let z of [-3.82,3.82]){let r=rope.clone();r.position.set(0,y,z);r.castShadow=true;ring.add(r)}const side=new THREE.Mesh(new THREE.BoxGeometry(.055,.055,7.65),mat(0xe8e8e4,.3));for(let x of [-3.82,3.82]){let s=side.clone();s.position.set(x,y,0);ring.add(s)}}
for(let i=0;i<36;i++){let a=i/36*Math.PI*2;let x=Math.sin(a)*7.4,z=Math.cos(a)*7.4;let person=cylinder(.12,.15,.75,mat(i%3===0?0xb38c64:i%3===1?0x425d86:0x733d48),x,.38,z,scene,8);person.rotation.z=(Math.random()-.5)*.12}
for(let i=0;i<10;i++){const lamp= new THREE.PointLight(0xffdfb2,7,7);let a=i/10*Math.PI*2;lamp.position.set(Math.sin(a)*8,5,Math.cos(a)*8);scene.add(lamp)}

const skinA=mat(0x8a573d,.7),skinB=mat(0xb97853,.68),dark=mat(0x181b22),gold=mat(0xd5ad5e,.35,.4),red=mat(0x9e2634),blue=mat(0x244c83),white=mat(0xd9d9d4),gloveRed=mat(0x9e1f2b,.38),gloveBlue=mat(0x183c72,.38);
function limb(parent,a,b,r1,r2,m){const d=new THREE.Vector3().subVectors(b,a);const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r2,r1,d.length(),16),m);mesh.position.copy(a).add(b).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());mesh.castShadow=true;parent.add(mesh);return mesh}
function sphere(parent,r,m,x,y,z,sx=1,sy=1,sz=1){const o=new THREE.Mesh(new THREE.SphereGeometry(r,20,16),m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
function makeFighter({name,skin,shorts,gloves,hair,beard,build=1.0,stance=1}) {
 const root=new THREE.Group();scene.add(root);const body=new THREE.Group();root.add(body);
 const pelvis=sphere(body,.38,shorts,0,1.0,0,1.12,.75,.8);
 const torso=sphere(body,.55,skin,0,1.65,0,.9,1.25,.62);
 sphere(body,.29,skin,0,2.25,0,1,1,.92);
 const neck=cylinder(.14,.17,.25,skin,0,2.23,0,body);
 const head=sphere(body,.34,skin,0,2.65,0,.82,1.05,.82);
 sphere(body,.35,hair,0,2.85,-.015,.88,.42,.9);
 sphere(body,.13,dark,-.14,2.68,.285,.75,.35,.5);sphere(body,.13,dark,.14,2.68,.285,.75,.35,.5);
 sphere(body,.045,white,-.12,2.69,.33);sphere(body,.045,white,.12,2.69,.33);
 sphere(body,.027,dark,-.12,2.69,.37);sphere(body,.027,dark,.12,2.69,.37);
 sphere(body,.09,skin,0,2.54,.29,.8,.5,.65);
 if(beard)sphere(body,.25,hair,0,2.42,.07,.9,.38,.75);
 const shoulderL=sphere(body,.23,skin,-.55,1.98,0),shoulderR=sphere(body,.23,skin,.55,1.98,0);
 const armL=new THREE.Group();armL.position.set(-.58,1.98,0);body.add(armL);const armR=new THREE.Group();armR.position.set(.58,1.98,0);body.add(armR);
 function buildArm(g,side){sphere(g,.19,skin,0,-.18,0,.95,1.15,.95);limb(g,new THREE.Vector3(0,-.25,0),new THREE.Vector3(side*.06,-.62,.04),.16,.13,skin);sphere(g,.14,skin,side*.06,-.62,.04);const glove=sphere(g,.23,gloves,side*.08,-.85,.15,1.05,.88,1.18);sphere(g,.08,white,side*.08,-.78,.31,1,.5,.4);return glove}
 const gloveL=buildArm(armL,-1),gloveR=buildArm(armR,1);
 const legL=new THREE.Group();legL.position.set(-.23,.88,0);body.add(legL);const legR=new THREE.Group();legR.position.set(.23,.88,0);body.add(legR);
 function buildLeg(g,side){limb(g,new THREE.Vector3(0,0,0),new THREE.Vector3(side*.05,-.48,.02),.2,.15,skin);sphere(g,.17,skin,side*.05,-.5,.02);limb(g,new THREE.Vector3(side*.05,-.5,.02),new THREE.Vector3(side*.08,-.86,.08),.15,.12,skin);box(.3,.15,.48,mat(0x16181e),side*.08,-.91,.18,g)}
 buildLeg(legL,-1);buildLeg(legR,1);
 const gloveTag=sphere(body,.055,gold,.25,1.12,.31);
 root.userData={body,armL,armR,legL,legR,gloveL,gloveR,baseX:0,baseZ:0,phase:Math.random()*6,style:name,stance,build};
 return root;
}
const player=makeFighter({name:'MANQ',skin:skinA,shorts:dark,gloves:gloveRed,hair:dark,beard:true,stance:1});
const opponents=[
 {name:'VOLKOV',style:'TECHNICAL OUT-BOXER',desc:'Keeps range and punishes missed punches.',skin:skinB,shorts:white,gloves:gloveBlue,hair:mat(0x806348),beard:false,pace:.78,range:2.6,guard:.8,aggression:.38,counter:.9},
 {name:'BIG JOE',style:'HEAVY PRESSURE FIGHTER',desc:'Slow steps, heavy pressure and strong counters.',skin:mat(0x704832),shorts:dark,gloves:gloveRed,hair:dark,beard:true,pace:.58,range:1.65,guard:.48,aggression:.8,counter:.55,build:1.2},
 {name:'KID DYNAMO',style:'FAST COMBINATION BOXER',desc:'Quick entries, short combinations and exits.',skin:mat(0x9b6548),shorts:blue,gloves:gold,hair:mat(0x25252b),beard:false,pace:1.2,range:1.9,guard:.6,aggression:.75,counter:.45},
 {name:'THE HAMMER',style:'CHAMPION PRESSURE BOXER',desc:'Adapts to your rhythm and changes tempo.',skin:mat(0x986548),shorts:gold,gloves:gloveRed,hair:dark,beard:true,pace:.9,range:1.8,guard:.72,aggression:.7,counter:.8}
];
let oppIndex=0,enemy,oppData,started=false,over=false,roundTime=180,last=performance.now(),toastTimer=0;
function spawnOpponent(){if(enemy)scene.remove(enemy);oppData=opponents[oppIndex];enemy=makeFighter(oppData);enemy.position.set(0,0,-2.35);enemy.rotation.y=Math.PI;player.position.set(0,0,2.35);player.rotation.y=0;document.getElementById('oppName').textContent=oppData.name;document.getElementById('oppStyle').textContent=oppData.style;document.getElementById('opponentInfo').textContent=`NEXT CHALLENGER · ${oppData.name} — ${oppData.desc}`;resetStats()}
let p={health:100,stamina:100,vel:new THREE.Vector3(),cool:0,block:false,dodge:0,hit:0,score:0},e={health:100,stamina:100,vel:new THREE.Vector3(),cool:1,block:false,dodge:0,hit:0,score:0};
function resetStats(){p.health=100;p.stamina=100;p.vel.set(0,0,0);p.cool=0;p.block=false;p.dodge=0;p.hit=0;e.health=100;e.stamina=100;e.vel.set(0,0,0);e.cool=1;e.block=false;e.dodge=0;e.hit=0;roundTime=180;over=false;updateHud()}
function updateHud(){document.getElementById('pHealth').style.width=p.health+'%';document.getElementById('eHealth').style.width=e.health+'%';document.getElementById('pStamina').style.width=p.stamina+'%';document.getElementById('eStamina').style.width=e.stamina+'%';document.getElementById('round').innerHTML=`ROUND 1<br><span style="font-size:10px;color:#d6dbe4">${Math.floor(roundTime/60)}:${String(Math.floor(roundTime%60)).padStart(2,'0')}</span>`}
function say(t){const el=document.getElementById('toast');el.textContent=t;el.style.opacity=1;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.style.opacity=0,1000)}
const keys={};addEventListener('keydown',ev=>{keys[ev.key.toLowerCase()]=true;if(ev.key.toLowerCase()==='j')attack('jab');if(ev.key.toLowerCase()==='k')attack('cross');if(ev.key.toLowerCase()==='l')p.block=true;if(ev.code==='Space'){ev.preventDefault();dodge()}if(ev.key.toLowerCase()==='r')resetStats()});
addEventListener('keyup',ev=>{keys[ev.key.toLowerCase()]=false;if(ev.key.toLowerCase()==='l')p.block=false});
document.querySelectorAll('[data-key]').forEach(b=>{const k=b.dataset.key;b.addEventListener('pointerdown',ev=>{ev.preventDefault();keys[k]=true});['pointerup','pointercancel','pointerleave'].forEach(t=>b.addEventListener(t,()=>keys[k]=false))});
document.querySelectorAll('[data-action]').forEach(b=>{const a=b.dataset.action;b.addEventListener('pointerdown',ev=>{ev.preventDefault();if(a==='block')p.block=true;else if(a==='dodge')dodge();else attack(a) });['pointerup','pointercancel','pointerleave'].forEach(t=>b.addEventListener(t,()=>{if(a==='block')p.block=false}))});
function attack(kind,who='player'){let self=who==='player'?p:e,target=who==='player'?e:p,actor=who==='player'?player:enemy,other=who==='player'?enemy:player;if(self.cool>0||self.stamina<(kind==='cross'?17:10)||over||!started)return;self.stamina-=kind==='cross'?17:10;self.cool=kind==='cross'?.72:.42;let right=kind==='cross';let arm=right?actor.userData.armR:actor.userData.armL;arm.userData.punch={time:0,duration:.24,kind};const dist=actor.position.distanceTo(other.position);const facing=Math.abs(actor.rotation.y-other.rotation.y)>2?1:0;const accuracy=(dist<2.5?1:Math.max(.12,1-(dist-2.5)*.7));const landed=Math.random()<accuracy*(target.dodge>0?.15:1);if(landed){let damage=(kind==='cross'?12:7)*(target.block?.32:1)*(target.dodge>0?.2:1);target.health=Math.max(0,target.health-damage);target.hit=.18;target.vel.z+=(who==='player'?-1:1)*(kind==='cross'?.9:.45);say(`${who==='player'?'MANQ':'OPPONENT'} ${kind.toUpperCase()} CONNECTS`)}else if(dist>=2.5)say('OUT OF RANGE');updateHud()}
function dodge(){if(p.stamina<12||p.cool>0||!started)return;p.stamina-=12;p.dodge=.38;p.vel.x+=(Math.random()>.5?1:-1)*2.4;p.vel.z+=1.5;p.cool=.35}
function moveFighter(actor,state,isPlayer,dt){let x=0,z=0;if(isPlayer){if(keys.a||keys.arrowleft)x-=1;if(keys.d||keys.arrowright)x+=1;if(keys.w||keys.arrowup)z-=1;if(keys.s||keys.arrowdown)z+=1}else{const dx=player.position.x-actor.position.x,dz=player.position.z-actor.position.z,dist=Math.hypot(dx,dz);let desired=oppData.range;if(oppData.name==='VOLKOV'){z=dist<desired?-.25:.5;x=dx*.3}else if(oppData.name==='BIG JOE'){z=dist>desired?1:-.15;x=dx*.5}else if(oppData.name==='KID DYNAMO'){z=dist>desired?1:-.3;x=Math.sin(performance.now()/350)*.8+dx*.25}else{z=dist>desired?1:-.2;x=dx*.35;if(p.score>4)state.block=Math.random()<.7}if(Math.abs(dx)>.5)x=Math.sign(dx)*.55;if(state.cool<=0&&dist<2.65&&Math.random()<oppData.aggression*dt*1.4){if(Math.random()<.18)state.block=true;else attack(Math.random()<oppData.counter?'cross':'jab','enemy')}else state.block=false}
 const speed=isPlayer?3.2:2.5*oppData.pace;const desiredVel=new THREE.Vector3(x,0,z);if(desiredVel.length()>1)desiredVel.normalize();desiredVel.multiplyScalar(speed*(state.stamina<20?.72:1));state.vel.x=THREE.MathUtils.damp(state.vel.x,desiredVel.x,8,dt);state.vel.z=THREE.MathUtils.damp(state.vel.z,desiredVel.z,8,dt);if(state.hit>0){state.vel.multiplyScalar(.88);state.hit-=dt}actor.position.x+=state.vel.x*dt;actor.position.z+=state.vel.z*dt;actor.position.x=THREE.MathUtils.clamp(actor.position.x,-2.8,2.8);actor.position.z=THREE.MathUtils.clamp(actor.position.z,-3.0,3.0);actor.rotation.y=Math.atan2(player.position.x-actor.position.x,player.position.z-actor.position.z)+(isPlayer?Math.PI:0);if(isPlayer)actor.rotation.y=Math.PI;state.dodge=Math.max(0,state.dodge-dt);state.cool=Math.max(0,state.cool-dt);state.stamina=Math.min(100,state.stamina+dt*(state.block?4:9));}
function animateFighter(actor,state,t,dt){const u=actor.userData;u.phase+=dt*8;u.body.position.y=Math.abs(Math.sin(u.phase))*.035;u.body.rotation.z=Math.sin(u.phase*.5)*.025;u.legL.rotation.x=Math.sin(u.phase)*.12;u.legR.rotation.x=-Math.sin(u.phase)*.12;u.armL.rotation.x=state.block?-.9:Math.sin(u.phase)*.07;u.armR.rotation.x=state.block?-.9:Math.sin(u.phase+1)*.07;for(const arm of [u.armL,u.armR])if(arm.userData.punch){let q=arm.userData.punch;q.time+=dt;let k=Math.min(1,q.time/q.duration);arm.rotation.x=-Math.sin(k*Math.PI)*1.9;if(k>=1)delete arm.userData.punch}if(state.hit>0)u.body.rotation.x=-.18}
function frame(now){requestAnimationFrame(frame);const dt=Math.min(.033,(now-last)/1000);last=now;if(started&&!over){moveFighter(player,p,true,dt);moveFighter(enemy,e,false,dt);animateFighter(player,p,now,dt);animateFighter(enemy,e,now,dt);roundTime-=dt;if(roundTime<=0){roundTime=0;over=true;document.getElementById('message').textContent=p.health>=e.health?'MANQ WINS ON POINTS':'OPPONENT WINS ON POINTS'}if(p.health<=0||e.health<=0){over=true;document.getElementById('message').textContent=e.health<=0?'MANQ — KNOCKOUT!':'MANQ DOWN — FIGHT OVER'}updateHud()}else{animateFighter(player,p,now,dt);animateFighter(enemy,e,now,dt)}
const mid=new THREE.Vector3().addVectors(player.position,enemy.position).multiplyScalar(.5);const dist=player.position.distanceTo(enemy.position);const targetCam=new THREE.Vector3(mid.x*.35,5.1+Math.min(1,dist*.12),mid.z+11.5+dist*.35);camera.position.lerp(targetCam,.035);camera.lookAt(mid.x,1.1,mid.z-.3);renderer.render(scene,camera)}
spawnOpponent();requestAnimationFrame(frame);
document.getElementById('start').onclick=()=>{started=true;document.getElementById('overlay').style.display='none';document.getElementById('message').textContent='FIGHT!';setTimeout(()=>{if(started)document.getElementById('message').textContent=''},1200)};
document.getElementById('nextOpponent').onclick=()=>{oppIndex=(oppIndex+1)%opponents.length;spawnOpponent()};
document.getElementById('restart').onclick=()=>{resetStats();document.getElementById('message').textContent='FIGHT!'};
document.getElementById('menu').onclick=()=>{started=false;document.getElementById('overlay').style.display='flex'};
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
