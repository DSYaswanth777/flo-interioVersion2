let currentIndex = 0;
let images = Array.from(document.querySelectorAll('.slider-image'));
let fullscreenOverlay = document.getElementById('fullscreen-overlay');
let fullscreenImage = document.getElementById('fullscreen-image');

function openFullscreen(img) {
    fullscreenOverlay.style.display = 'flex';
    fullscreenImage.src = img.src;
    currentIndex = images.indexOf(img);
}

function closeFullscreen() {
    fullscreenOverlay.style.display = 'none';
}

function changeImage(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;

    // Update the fullscreen image if in fullscreen mode
    if (fullscreenOverlay.style.display === 'flex') {
        fullscreenImage.src = images[currentIndex].src;
    }
}

// Event listeners for the arrow keys in fullscreen mode
document.addEventListener('keydown', function(event) {
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

// Function to refresh the main slider images every time an arrow is clicked
function refreshSlider(sliderContainer) {
    let images = Array.from(sliderContainer.querySelectorAll('.slider-image'));
    sliderContainer.innerHTML = '';

    images.forEach((img, i) => {
        let newImg = document.createElement('img');
        newImg.src = images[(currentIndex + i) % images.length].src;
        newImg.alt = `Image ${i + 1}`;
        newImg.className = 'slider-image';
        newImg.onclick = () => openFullscreen(newImg);
        sliderContainer.appendChild(newImg);
    });

    // Add navigation arrows
    let prevArrow = document.createElement('span');
    prevArrow.className = 'prev';
    prevArrow.innerHTML = '&#10094;';
    prevArrow.onclick = () => { changeImage(-1); refreshSlider(sliderContainer); };
    sliderContainer.prepend(prevArrow);

    let nextArrow = document.createElement('span');
    nextArrow.className = 'next';
    nextArrow.innerHTML = '&#10095;';
    nextArrow.onclick = () => { changeImage(1); refreshSlider(sliderContainer); };
    sliderContainer.appendChild(nextArrow);
}

// Initialize the slider for each slider container
document.querySelectorAll('.image-slider').forEach(slider => refreshSlider(slider));


// Initialize the slider for the first time
refreshSlider();
