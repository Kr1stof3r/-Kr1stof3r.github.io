// reyndi depth sensing en viðist vera eitthvað library issue krassar alltaf lína 48
// Reyndi shadowmap a renderinn er líka til eitthvað sem heitir Lighting Estimation en það er bara web core
// Ætlaði að prófa qr code en þarf að fara í Ar.js, Hiro image detection virkar ekki


async function activateXR() {

    console.log("activateXR")
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const gl = canvas.getContext("webgl", {xrCompatible: true});
  
    const scene = new THREE.Scene();

    const directionalLight = new THREE.DirectionalLight(0xffffff, 11  );
    directionalLight.position.set(10, 15, 10);
    // directionalLight.castShadow = true; // Enable shadow casting

    // // Set up shadow properties
    // directionalLight.shadow.mapSize.width = 1024; // Adjust as needed
    // directionalLight.shadow.mapSize.height = 1024; // Adjust as needed
    // directionalLight.shadow.camera.near = 0.1;
    // directionalLight.shadow.camera.far = 100;
    // directionalLight.shadow.camera.top = 50;
    // directionalLight.shadow.camera.bottom = -50;
    // directionalLight.shadow.camera.left = -50;
    // directionalLight.shadow.camera.right = 50;

    scene.add(directionalLight);

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        preserveDrawingBuffer: true,
        canvas: canvas,
        context: gl
        //antialias: true 
    });
    renderer.autoClear = false;
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    

    const camera = new THREE.PerspectiveCamera();
    camera.matrixAutoUpdate = false;

    const session = await navigator.xr.requestSession("immersive-ar", {requiredFeatures: ['hit-test']});

    // const session = await navigator.xr.requestSession("immersive-ar", {requiredFeatures: ['hit-test'],
    //   requiredFeatures: ["depth-sensing"],
    //   depthSensing: {
    //     usagePreference: ["cpu-optimized", "gpu-optimized"],
    //     formatPreference: ["luminance-alpha", "float32"]
    //   } Þett krassar allt 

    session.updateRenderState({
    baseLayer: new XRWebGLLayer(session, gl)
    });

    const referenceSpace = await session.requestReferenceSpace('local');
    const viewerSpace = await session.requestReferenceSpace('viewer');
    const hitTestSource = await session.requestHitTestSource({ space: viewerSpace });



    const loader = new THREE.GLTFLoader();
    let reticle;
    loader.load("https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf", function(gltf) {
    reticle = gltf.scene;
    reticle.visible = false;
    scene.add(reticle);
    })

    let rove;
    loader.load("https://raw.githubusercontent.com/Kr1stof3r/Kr1stof3r.github.io/main/Vidmotsforritun/Verkefni3/RangeRoverSports2018.glb", function(gltf) {
    rove = gltf.scene;
    });

    session.addEventListener("select", (event) => {
        if (rove) {
          const clone = rove.clone();
          const scalePercentage = 0.2;
          clone.scale.multiplyScalar(scalePercentage);
          clone.position.copy(reticle.position);
          // clone.castShadow = true;
          // clone.receiveShadow = true;
          scene.add(clone);
        }
      });



    const onXRFrame = (time, frame) => {
        session.requestAnimationFrame(onXRFrame);
    
        gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer.framebuffer)
    
        const pose = frame.getViewerPose(referenceSpace);
        if (pose) {

        const view = pose.views[0];
    
        const viewport = session.renderState.baseLayer.getViewport(view);
        renderer.setSize(viewport.width, viewport.height)
    
        camera.matrix.fromArray(view.transform.matrix)
        camera.projectionMatrix.fromArray(view.projectionMatrix);
        camera.updateMatrixWorld(true);

        const hitTestResults = frame.getHitTestResults(hitTestSource);
        if (hitTestResults.length > 0 && reticle) {
          const hitPose = hitTestResults[0].getPose(referenceSpace);
          reticle.visible = true;
          reticle.position.set(hitPose.transform.position.x, hitPose.transform.position.y, hitPose.transform.position.z)
          reticle.updateMatrixWorld(true);
        }

            renderer.render(scene, camera)
        }
    }
    session.requestAnimationFrame(onXRFrame);

  }

const button = document.querySelector("#thebutton");

button.addEventListener("click", function() {activateXR()});

