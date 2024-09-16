function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
    document.getElementById('local-time').textContent = timeString;
}

setInterval(updateTime, 1000);
