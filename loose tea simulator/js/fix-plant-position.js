// Script to fix plant position permanently
document.addEventListener('DOMContentLoaded', function() {
    // First attempt to fix position
    fixPlantPosition();

    // Run again after a short delay to override any other scripts
    setTimeout(fixPlantPosition, 100);

    // And again after full page load to be sure
    window.addEventListener('load', function() {
        fixPlantPosition();

        // Run periodically to keep position fixed
        setInterval(fixPlantPosition, 500);
    });

    function fixPlantPosition() {
        const plant = document.querySelector('.main__left__plant');
        if (plant) {
            // Force position inside window
            plant.style.position = 'absolute';
            plant.style.right = '25%';
            plant.style.bottom = '30%';
            plant.style.top = 'auto';
            plant.style.left = 'auto';
            plant.style.transform = 'none';
            plant.style.zIndex = '2';

            // Prevent the element from being moved
            plant.classList.add('fixed-position');

            // Fix SVG size
            const svg = plant.querySelector('svg');
            if (svg) {
                svg.style.height = '220px';
                svg.style.width = '100px';
            }

            // Log to console for debugging
            console.log('Fixed plant position');
        }
    }
});