// script.js
document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.getElementById('openOverlay');
    const overlay = document.getElementById('overlay');
    const closeButton = document.querySelector('.close-btn');

    // Function to open the overlay
    function openOverlay() {
        overlay.style.display = 'block';
    }

    // Function to close the overlay
    function closeOverlay() {
        overlay.style.display = 'none';
    }

    // Event listener to open the overlay
    openButton.addEventListener('click', openOverlay);

    // Event listener to close the overlay when clicking the close button
    closeButton.addEventListener('click', closeOverlay);

    // Event listener to close the overlay when clicking outside the content
    window.addEventListener('click', (event) => {
        if (event.target === overlay) {
            closeOverlay();
        }
    });
});

// JavaScript to handle overlay
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay');
    const oButton = document.querySelector('.o-button');
    const closeBtn = document.querySelector('.close-btn');

    // Show the overlay when the O-button is clicked
    oButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        overlay.style.display = 'block'; // Show the overlay
        create3DDisplay('overlay1', 'assets/full arm v2.gltf');
    });

    // Hide the overlay when the close button is clicked
    closeBtn.addEventListener('click', function() {
        overlay.style.display = 'none'; // Hide the overlay
    });
});

// Function to initialize the 3D model with Three.js
function init3DModel() {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth/2, window.innerHeight/2);
    document.body.appendChild(renderer.domElement);

    // Set up orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // for smooth interaction
    controls.dampingFactor = 0.05;

    // Add a light source
    const ambientLight = new THREE.AmbientLight(0x404040); // Color: soft white
    scene.add(ambientLight);


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
}

function create3DDisplay(overlayId, modelPath) {
    const overlay = document.getElementById(overlayId);

    // Clear any existing content in the overlay
    overlay.innerHTML = '';

    // Create a new div for the 3D display
    const displayContainer = document.createElement('div');
    displayContainer.style.width = '90%'; // 90% of the overlay width
    displayContainer.style.height = '90%'; // 90% of the overlay height
    displayContainer.style.margin = '5%'; // Margin between the display and overlay edges
    overlay.appendChild(displayContainer);

    // Set up the Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, displayContainer.clientWidth / displayContainer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(displayContainer.clientWidth, displayContainer.clientHeight);
    displayContainer.appendChild(renderer.domElement);

    // Load the 3D model
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        scene.add(gltf.scene);
        animate();
    });

    camera.position.z = 5;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    // Start rendering
    animate();
}
    


