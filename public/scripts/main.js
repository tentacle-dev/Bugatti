import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from 'gsap';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';



const scene  = new THREE.Scene();

//  const geometry = new THREE.SphereGeometry( 3, 64, 64 );
//  const material = new THREE.MeshStandardMaterial({
//      color : "#ffefef" ,
//     roughness : 0.2
// })

// const mesh = new THREE.Mesh( geometry, material );
// scene.add(mesh);




var loader = new GLTFLoader();
            
loader.load( 'dist/bugatti.glb', function ( gltf )
{
    let car = gltf.scene;  // car 3D object is loaded
    car.position.y = -5;

    scene.add(car);
    car.translateZ(10)
} );

const sizes = {
    width : window.innerWidth,
    height : window.innerHeight,
}
let lightValue = 0x000000;
let lights = new THREE.PointLight(lightValue , 10 , 100);
lights.position.set(0 , 20 , 10)
scene.add(lights);


const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height , 0.1 , 100);
camera.position.z = -35;
scene.add(camera)
//render

const canvas = document.querySelector('.bugatti');
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(sizes.width , sizes.height);
renderer.setPixelRatio(2)
renderer.render(scene,camera);


const controls = new OrbitControls(camera , canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;


let rotatebtn = document.querySelector('.rotatebtn');
let rotate = true;
rotatebtn.addEventListener('click' , () => {
    rotate = !rotate;
    if(rotate){
        controls.autoRotate = true;
        controls.rotateSpeed = 20;
    } else {
        controls.autoRotate = false;
    }
})

window.addEventListener('resize' , () => {
    sizes.width = window.innerWidth,
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width , sizes.height);
})
  
  
 
  // We need number format
  // Random Color is String
  // We need it to be a number


//   setInterval( () => {
//     const randomColor = Math.floor(Math.random()*16777215).toString(16);
//     console.log(typeof(randomColor));
//     console.log(randomColor);
//     const threeColor = '0x'
//     const lightValue = threeColor.concat(randomColor);
//     console.log(typeof(lightValue));
//     lights = new THREE.PointLight(lightValue , 10 , 100);
//     scene.add(lights);
//   }, 5000);

let lightToggle = false;


let btn = document.querySelector('.check-number');
btn.addEventListener('click' , 

function checkNumber() {
    console.log(lightToggle);
    lightToggle = !lightToggle
    console.log(lightToggle);
    if(lightToggle){
        lightValue = 0xffffff;
        lights = new THREE.PointLight(lightValue , 5 , 100);
        lights.position.set(0 , 20 , 10)
        scene.add(lights);
    } else {
        lights.visible = false;
        
    }
}
)

const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}
loop()

const t1 = gsap.timeline({defaults : {duration : 1}})
// t1.fromTo(mesh.scale , {z : 0 , x: 0, y :0} , { z: 1 , x:1 , y: 1})
t1.fromTo('.bugatti' , {y : "-100%"} , {y : '0%'})
t1.fromTo('nav' , {y : "100%"} , {y : '0%'})
t1.fromTo('.title' , {opacity : 0} , {opacity : 1})
t1.fromTo('.other' , {y : "100%"} , { y : "0%"})

// let mouseDown = true;
// let rgb = []
// window.addEventListener('mousedown', () => mouseDown = true)
// window.addEventListener('mouseup', () => mouseDown = false)

// window.addEventListener("mousemove", (e) => {
//     if(mouseDown) {
//         rgb = [
//             Math.round((e.pageX / sizes.width) * 255),
//             Math.round((e.pageY / sizes.height) * 255),
//             150,
//         ]
//         let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
//         gsap.to(mesh.material.color , {

//             r : newColor.r,
//             g : newColor.g,
//             b : newColor.b,
//         })
//     }
// })



