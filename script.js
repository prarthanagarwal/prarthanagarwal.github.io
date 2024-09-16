function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    document.getElementById('local-time').textContent = timeString;
}

setInterval(updateTime, 1000);
