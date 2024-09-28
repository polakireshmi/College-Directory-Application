document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
    });

    const data = await response.json();

    if (response.ok) {
        // Redirect based on user role
        switch (data.role) {
            case 'student':
                window.location.href = '/student-dashboard';
                break;
            case 'faculty':
                window.location.href = '/faculty-dashboard';
                break;
            case 'admin':
                window.location.href = '/admin-dashboard';
                break;
        }
    } else {
        // Show error message
        document.getElementById('error-message').innerText = data.message || 'Invalid credentials';
    }
});
