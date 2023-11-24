import * as THREE from "three";

// Get a reference to the container element that will hold our scene
const container = document.querySelector("#scene-container");
// Create a Scene
const scene = new THREE.Scene();

// Set the background color
scene.background = new THREE.Color("white");

// Create a camera
const fov = 35; // AKA Field of View
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// Move the camera back so we can view the scene
camera.position.set(0, 5, 30);

const cubematerial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0xff0000),
});
const cubegeometry = new THREE.BoxGeometry(4, 4, 4);
const cube = new THREE.Mesh(cubegeometry, cubematerial);

const donutmaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0xadd8e6),
});
const ballgeometry = new THREE.SphereGeometry(2, 32, 32);
const ball = new THREE.Mesh(ballgeometry, donutmaterial);
ball.position.set(0, 4, 0);

// Create the renderer
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  preserveDrawingBuffer: true,
  precision: "lowp",
  antialias: true
}); // canvas: canvas

// Next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth, container.clientHeight);

// Finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);

// Add the automatically created <canvas> element to the page
container.append(renderer.domElement);

const group = new THREE.Group();
group.add(cube);
group.add(ball);

scene.add(group);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
directionalLight.target = cube;
scene.add(directionalLight);

const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

function onWindowResize() {
  location.reload();
}
window.addEventListener("resize", onWindowResize);

import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
let gestureRecognizer;
let runningMode = "VIDEO";
let enableWebcamButton;
let webcamRunning = false;
const videoWidth = "480px";
const videoHeight = "360px";

const createGestureRecognizer = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
  );
  gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
      delegate: "GPU",
    },
    runningMode: runningMode,
  });
};
createGestureRecognizer();

const video = document.getElementById("webcam");
const canvasElement = document.getElementById("output_canvas");
const canvasCtx = canvasElement.getContext("2d");
const gestureOutput = document.getElementById("gesture_output");
const xOutput = document.getElementById("x_output");
const yOutput = document.getElementById("y_output");

enableWebcamButton = document.getElementById("webcamButton");
enableWebcamButton.addEventListener("click", enableCam);

function enableCam(event) {
  if (!gestureRecognizer) {
    alert("Please wait for gestureRecognizer to load");
    return;
  }
  if (webcamRunning === true) {
    webcamRunning = false;
  } else {
    webcamRunning = true;
  }
  // getUsermedia parameters.
  const constraints = {
    video: true,
  };
  // Activate the webcam stream.
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video.srcObject = stream;
    video.addEventListener("loadeddata", predictWebcam);
  });
}
let lastVideoTime = -1;
let results = undefined;
async function predictWebcam() {

    console.log("threerender");

    group.rotation.y += 0.1;
  
    renderer.render(scene, camera);


    console.log("webrender")
  const webcamElement = document.getElementById("webcam");
  // Now let's start detecting the stream.
  if (runningMode === "IMAGE") {
    runningMode = "VIDEO";
    await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
  }

  let nowInMs = Date.now();

  if (video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;
    results = gestureRecognizer.recognizeForVideo(video, nowInMs);
  }

  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  const drawingUtils = new DrawingUtils(canvasCtx);
  canvasElement.style.height = videoHeight;
  webcamElement.style.height = videoHeight;
  canvasElement.style.width = videoWidth;
  webcamElement.style.width = videoWidth;

  if (results.landmarks) {
    for (const landmarks of results.landmarks) {
      drawingUtils.drawConnectors(
        landmarks,
        GestureRecognizer.HAND_CONNECTIONS,
        {
          color: "#00FF00",
          lineWidth: 5,
        }
      );
      drawingUtils.drawLandmarks(landmarks, {
        color: "#FF0000",
        lineWidth: 2,
      });
    }
  }

  canvasCtx.restore();
  if (results.gestures.length > 0) {
    gestureOutput.style.display = "block";
    gestureOutput.style.width = videoWidth;
    gestureOutput.innerText = results.gestures[0][0].categoryName;

    parseFloat((xOutput.innerText = results.landmarks[0][0].x.toFixed(2)));
    parseFloat((yOutput.innerText = results.landmarks[0][0].y.toFixed(2)));

    console.log(gestureOutput.innerText);
  } else {
    gestureOutput.style.display = "none";
  }

    window.requestAnimationFrame(predictWebcam);
  
}
//     async function animate() {
//       requestAnimationFrame(animate);

//       // Update webcam predictions less frequently, e.g., every few frames
//       if (frameCounter % 5 === 0) {
//           const webcamElement = document.getElementById('webcam');

//           if (runningMode === 'IMAGE') {
//               runningMode = 'VIDEO';
//               await gestureRecognizer.setOptions({ runningMode: 'VIDEO' });
//           }

//           let nowInMs = Date.now();

//           if (video.currentTime !== lastVideoTime) {
//               lastVideoTime = video.currentTime;
//               results = gestureRecognizer.recognizeForVideo(video, nowInMs);
//           }

//           canvasCtx.save();
//           canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//           const drawingUtils = new DrawingUtils(canvasCtx);
//           canvasElement.style.height = videoHeight;
//           webcamElement.style.height = videoHeight;
//           canvasElement.style.width = videoWidth;
//           webcamElement.style.width = videoWidth;

//           if (results.landmarks) {
//               for (const landmarks of results.landmarks) {
//                   drawingUtils.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, {
//                       color: '#00FF00',
//                       lineWidth: 5
//                   });
//                   drawingUtils.drawLandmarks(landmarks, {
//                       color: '#FF0000',
//                       lineWidth: 2
//                   });
//               }
//           }

//           canvasCtx.restore();
//           if (results.gestures.length > 0) {
//               gestureOutput.style.display = 'block';
//               gestureOutput.style.width = videoWidth;
//               gestureOutput.innerText = results.gestures[0][0].categoryName;

//               parseFloat(xOutput.innerText = results.landmarks[0][0].x.toFixed(2));
//               parseFloat(yOutput.innerText = results.landmarks[0][0].y.toFixed(2));

//               console.log(gestureOutput.innerText);
//           } else {
//               gestureOutput.style.display = 'none';
//           }
//       }

//       group.rotation.y += 0.01;

//       if (textureVid.readyState >= textureVid.HAVE_FUTURE_DATA) {
//           textureVid.play();
//       }

//       controls.update();

//       renderer.render(scene, camera);

//       frameCounter++;
//   }

//   // Call the combined loop to start both rendering and webcam prediction
//   animate();
