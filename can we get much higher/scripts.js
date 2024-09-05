// script.js

// JavaScript to handle overlay
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay'); //change this shit to figure out which one youre using
    const oButton = document.querySelector('.o-button');
    const closeBtn = document.querySelector('.close-btn');

    // Show the overlay when the O-button is clicked
    oButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        overlay.style.display = 'block'; // Show the overlay
        create3DDisplay('overlay', 'assets/full arm v2.gltf'); //same here
    });

    // Hide the overlay when the close button is clicked
    closeBtn.addEventListener('click', function() {
        overlay.style.display = 'none'; // Hide the overlay
    });
});

function create3DDisplay(overlayId, modelPath) {
    const overlay = document.getElementById(overlayId);
    const rect = overlay.getBoundingClientRect();

    // Create the Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(rect.width * 0.9, rect.height * 0.9); // Adjust size to fit within overlay
    document.getElementById('3d-model-container').appendChild(renderer.domElement);

    // Load the 3D model
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        scene.add(gltf.scene);
        // Adjust camera position
        camera.position.set(0, 1, 3);
        // Start the animation loop
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();
    }, undefined, function(error) {
        console.error('An error occurred loading the model:', error);
    });
}

    


