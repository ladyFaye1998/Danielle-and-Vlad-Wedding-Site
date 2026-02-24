const hourMarkers = document.querySelector('.hour-markers');
for (let i = 1; i <= 12; i++) {
    if (i % 3 !== 0) { // Skip positions where numerals are
        const marker = document.createElement('div');
        marker.className = 'hour-marker';
        marker.style.transform = `rotate(${i * 30}deg)`;
        hourMarkers.appendChild(marker);
    }
}

// Function to set the clock hands
function setTime() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Calculate the rotation angles
    // For the hour hand, we need to take minutes into account
    const hourDegrees = (hours * 30) + (minutes * 0.5); // 30 degrees per hour, 0.5 degrees per minute
    const minuteDegrees = (minutes * 6); // 6 degrees per minute
    const secondDegrees = (seconds * 6); // 6 degrees per second

    // Apply the rotations
    document.getElementById('hour-hand').style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
    document.getElementById('minute-hand').style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
    document.getElementById('second-hand').style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;

    // Update digital time display for reference
    const formattedHours = now.getHours().toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    document.getElementById('digital-time').textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Initial call to set the time
setTime();

// Update the time every second for ticking effect
setInterval(setTime, 1000);