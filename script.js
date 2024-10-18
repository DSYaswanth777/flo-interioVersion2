// Function to open fullscreen for the specific image
function openFullscreen(img, images) {
    let fullscreenOverlay = document.getElementById('fullscreen-overlay');
    let fullscreenImage = document.getElementById('fullscreen-image');
    
    fullscreenOverlay.style.display = 'flex';
    fullscreenImage.src = img.src;

    // Store the current index and images array for the fullscreen view
    fullscreenImage.currentIndex = images.indexOf(img);
    fullscreenImage.images = images; // Store the specific carousel images for navigation
}

// Function to close fullscreen
function closeFullscreen() {
    let fullscreenOverlay = document.getElementById('fullscreen-overlay');
    fullscreenOverlay.style.display = 'none';
}

// Function to change image in fullscreen mode
function changeImage(direction) {
    let fullscreenImage = document.getElementById('fullscreen-image');
    let images = fullscreenImage.images; // Get the current carousel images

    let currentIndex = (fullscreenImage.currentIndex + direction + images.length) % images.length;
    fullscreenImage.src = images[currentIndex].src;
    fullscreenImage.currentIndex = currentIndex; // Update the index
}

// Function to refresh the slider for each carousel
function refreshSlider(sliderContainer) {
    let images = Array.from(sliderContainer.querySelectorAll('.slider-image'));

    // Add click event to open fullscreen for each image
    images.forEach(img => {
        img.onclick = () => openFullscreen(img, images);
    });

    // Add navigation arrows (if not already added)
    if (!sliderContainer.querySelector('.prev')) {
        let prevArrow = document.createElement('span');
        prevArrow.className = 'prev';
        prevArrow.innerHTML = '&#10094;';
        prevArrow.onclick = () => { changeImage(-1); };
        sliderContainer.prepend(prevArrow);

        let nextArrow = document.createElement('span');
        nextArrow.className = 'next';
        nextArrow.innerHTML = '&#10095;';
        nextArrow.onclick = () => { changeImage(1); };
        sliderContainer.appendChild(nextArrow);
    }
}

// Initialize the slider for each image-slider container
document.querySelectorAll('.image-slider').forEach(slider => refreshSlider(slider));

// Event listeners for keyboard navigation in fullscreen mode
document.addEventListener('keydown', function(event) {
    let fullscreenOverlay = document.getElementById('fullscreen-overlay');
    
    if (fullscreenOverlay.style.display === 'flex') {
        if (event.key === 'ArrowRight') {
            changeImage(1);
        } else if (event.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (event.key === 'Escape') {
            closeFullscreen();
        }
    }
});
