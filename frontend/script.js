document.getElementById('saveIPButton').addEventListener('click', async () => {
    const ipInput = document.getElementById('ipInput').value;

    try {
        const response = await fetch('/save-ip-location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ip: ipInput }),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
        } else {
            alert(result.error || 'Error occurred');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to save IP location data.');
    }
});
