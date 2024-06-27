document.getElementById('button').addEventListener('click', async function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('matkhau').value;

    if (email && password) {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.text();
        alert(result);
    } else {
        alert('Please fill out all fields');
    }
});
