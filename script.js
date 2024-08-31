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
