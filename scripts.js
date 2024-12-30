document.querySelectorAll('.O-button').forEach(button => {
    button.addEventListener('click', function () {

        const overlay = document.getElementById('overlay');
        overlay.style.display = 'block';
        backdrop.style.display = 'block';

        if(this.getAttribute('data-model') == "N/A")
        {   
            test3DDisplay2();
        }
        else
        {
            const modelPath = this.getAttribute('data-model');
            create3DDisplay(modelPath, '3d-container');
        }
    });
});

document.querySelector('.close-btn').addEventListener('click', function () {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    backdrop.style.display = 'none';
    const container = document.getElementById('3d-container');
    while (container.firstChild) {
        container.removeChild(container.firstChild); // Clear the 3D scene
    }
});


function test3DDisplay(containerId)
{
    const container = document.getElementById(containerId);
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    scene.background = new THREE.Color(0x0000FF);
    
    //render loads what we're currently seeing per frame
    //camera generates where we're looking
    //scene holds all the 3d shit in 3d space
    renderer.render(scene, camera);
}

function test3DDisplay2(containerId)
{
    const container = document.getElementById(containerId);
    const width = container.clientWidth;
    const height = container.clientHeight;

    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 2;

    const scene = new THREE.Scene();

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const material = new THREE.MeshBasicMaterial({color: 0x44aa88});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    renderer.render(scene, camera);
}


function create3DDisplay(modelPath, containerId) {
    const container = document.getElementById(containerId);
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    scene.background = new THREE.Color(0xFFFFFF);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5).normalize();
    scene.add(directionalLight);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // Set up the DracoLoader
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

    const loader = new THREE.GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    // Create the composer for post-processing
    const composer = new THREE.EffectComposer(renderer);

    // Add RenderPass for basic rendering of the scene
    const renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Set up the OutlinePass for adding outlines to models
    const outlinePass = new THREE.OutlinePass(new THREE.Vector2(width, height), scene, camera);
    outlinePass.edgeStrength = 0; // Controls thickness of the outline
    outlinePass.edgeGlow = 0;   // Controls glow around the edges
    outlinePass.edgeThickness = 0; // Controls thickness of edges
    outlinePass.visibleEdgeColor.set('#000000'); // black outline color
    outlinePass.hiddenEdgeColor.set('#000000');  // Hidden edges (optional)    
    composer.addPass(outlinePass);

    const selectedObjects = [];  // Initialize selected objects array

    loader.load(modelPath, function (gltf) {
        const model = gltf.scene;
        if(modelPath === 'assets/full_arm_v3.gltf') {
            model.scale.set(100, 100, 100); // Scale the model
        }
        scene.add(model);
        model.position.set(0, -5, 0);
        camera.position.set(10, 10, 10);
        camera.lookAt(model.position);

        // Now push the model to the selectedObjects array
        selectedObjects.push(model);
        outlinePass.selectedObjects = selectedObjects; // Assign selected objects to outline
    });

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        composer.render(); // Use composer instead of renderer for post-processing
    }
    animate();
}


