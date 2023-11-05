import * as THREE from 'three';
import * as ORB from 'OrbitControls';


// Get a reference to the container element that will hold our scene
const container = document.querySelector('#scene-container');
// Create a Scene
const scene = new THREE.Scene();

// Set the background color
scene.background = new THREE.Color("skyblue");

// Create a camera
const fov = 35; // AKA Field of View
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// Move the camera back so we can view the scene
camera.position.set(0, 5, 30);

const material = new THREE.MeshStandardMaterial({color: 0x994320});

const textureVid = document.createElement("video");
textureVid.src = './img/cat.mp4';
textureVid.loop = true;

// Create a video texture
const videoTexture = new THREE.VideoTexture(textureVid);
videoTexture.format = THREE.RGBAFormat;
videoTexture.magFilter = THREE.NearestFilter;
videoTexture.generateMipmaps = false;
textureVid.play();


const cubematerial = new THREE.MeshBasicMaterial({map: videoTexture});
const cubegeometry = new THREE.BoxGeometry(4, 4, 4);
const cube = new THREE.Mesh(cubegeometry, cubematerial);


const glaxytex = new THREE.TextureLoader().load('./img/galx.jpg'); 
const donutmaterial = new THREE.MeshStandardMaterial({map: glaxytex});
const ballgeometry = new THREE.SphereGeometry(2, 32 , 32);
const ball = new THREE.Mesh(ballgeometry, donutmaterial);
ball.position.set(0, 4, 0);


const donutgeometry = new THREE.TorusKnotGeometry (2, 0.8, 140, 16); 
const donut = new THREE.Mesh(donutgeometry, donutmaterial);
donut.position.set(0,9.5,0);

// Create the renderer
const renderer = new THREE.WebGLRenderer();

const controls = new ORB.OrbitControls( camera, renderer.domElement );


// Next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth, container.clientHeight);

// Finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);

// Add the automatically created <canvas> element to the page
container.append(renderer.domElement);


const group = new THREE.Group();
group.add(cube);
group.add(ball);
group.add(donut);


scene.add(group);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.7);
directionalLight.position.set(10, 10, 10);
directionalLight.target = cube;
scene.add(directionalLight);

function animate() {
	requestAnimationFrame( animate );

	group.rotation.y += 0.01;

    if (textureVid.readyState >= textureVid.HAVE_FUTURE_DATA) {
        textureVid.play();
      }

    controls.update();


    

	renderer.render( scene, camera );
}

animate();

  