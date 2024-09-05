document.querySelector('.O-button').addEventListener('click', function () {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
    backdrop.style.display = 'block';
    create3DDisplay('assets/full arm v2.gltf', '3d-container');
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

function create3DDisplay(modelPath, containerId) {
    const container = document.getElementById(containerId);
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    scene.background = new THREE.Color(0xadd8e6);

/*
                // Compute the bounding box of the model
                const box = new THREE.Box3().setFromObject(modelPath);

                // Get the center and size of the bounding box
                const center = new THREE.Vector3();
                const size = new THREE.Vector3();
                box.getCenter(center);
                box.getSize(size);

                // Position the camera based on the bounding box
                const distance = Math.max(size.x, size.y, size.z) * 1.5; // Adjust this multiplier as needed
                camera.position.set(center.x, center.y, distance);
                camera.lookAt(center);

                // Set the controls target to the center of the model
                controls.target.set(center.x, center.y, center.z);
*/

    const ambientLight = new THREE.AmbientLight(0xffffff, 0);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5).normalize();
    scene.add(directionalLight);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        model.position.set(0, -5, 0);
        camera.position.set(10, 10, 10);
        camera.lookAt(model.position);
    });

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}
