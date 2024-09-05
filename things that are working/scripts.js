// Create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0); // Light grey background similar to SolidWorks

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, overlay.clientWidth / overlay.clientHeight, 0.1, 1000);
camera.position.set(2, 2, 5);

// Add ambient light to brighten the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Adjust intensity as needed
scene.add(ambientLight);

// Add a directional light to simulate a light source
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Adjust intensity as needed
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Set up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(overlay.clientWidth, overlay.clientHeight);
overlay.appendChild(renderer.domElement);

// Load the GLTF model
const loader = new THREE.GLTFLoader();
loader.load('assets/full_arm_v2.gltf', function (gltf) {
    const model = gltf.scene;
    scene.add(model);

    // Optional: Adjust the position, scale, and rotation of the model
    model.position.set(0, -0.5, 0);
    model.scale.set(1, 1, 1);

    // Render the scene
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}, undefined, function (error) {
    console.error(error);
});
