import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';
const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene()


const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(2,2,5)
scene.add(light)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1,100)
camera.position.set(0,0.0,2)
camera.lookAt(scene.position);
scene.add(camera)
window.addEventListener('resize', function(){
  var width = window.innerWidth;
  var height = window.innerHeight; 
  renderer.setSize(width, height);
  camera.aspect = width/height; 
  camera.updateProjectionMatrix(); 
  
})

const loadingBarElement = document.querySelector('.loading-bar');
const loadingManager=  new THREE.LoadingManager(
  //Loaded
  () =>{
    window.setTimeout(()=>{
      gsap.to(overlayMaterial.uniforms.uAlpha, {
        duration:3,  value:0, delay: 1
       })
       loadingBarElement.classList.add('ended')
       loadingBarElement.style.transform = ''

    }, 500)

  },
  // Progress
  (itemUrl, itemsLoaded, itemsTotal)=>{
   const progressRatio = itemsLoaded/itemsTotal; 
   loadingBarElement.style.transform = `scaleX(${progressRatio}`
  
  }
)
const overlayGeometry = new THREE.PlaneBufferGeometry(2,2,1,1)
const overlayMaterial = new THREE.ShaderMaterial({
  transparent: true,
  uniforms: {
    uAlpha: {value: 1}
  },
  vertexShader: `
  void main(){
    gl_Position =vec4(position, 1.0);
  }`,
  fragmentShader : `
  uniform float uAlpha; 
  void main(){
    gl_FragColor = vec4(0.0,0.0,0.0,uAlpha);
  }`
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)



const loader = new GLTFLoader(loadingManager)
loader.load("./world.gltf", function(gltf){
  const root = gltf.scene; 
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  root.scale.set(0.065, 0.065, 0.065)
  createjs.Tween.get(root.scale).wait(2000).to({x: 0.5, y:0.5, z:0.5}, 1500, createjs.Ease.getPowInOut(3))
  const earth = root.children[0].children[1]
  const text = root.children[0].children[2]
  function animate(){
    requestAnimationFrame(animate);
    earth.rotation.y +=0.003; 
    text.rotation.z += 0.004
    renderer.render(scene,camera);
  }
  animate()
  scene.add(root);
})




const renderer = new THREE.WebGL1Renderer({
  canvas:  canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled= true
renderer.gammaOutput = true


function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene,camera)
}
animate()