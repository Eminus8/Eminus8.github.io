// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // for smooth interaction
controls.dampingFactor = 0.05;

// Add a light source
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Load the 3D model
const loader = new THREE.GLTFLoader();
loader.load(
    'assets/full arm v2.gltf', // Path to your model
    function (gltf) {
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

// Set the camera position
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer.render(scene, camera);
}
animate();
