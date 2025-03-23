window.onload = function() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const data = {
            username: username,
            password: password
        };

        login(data);
        
    });

}

async function login(data) {
    const url = 'http://localhost:3001/login';
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (result.status == 200) {
        console.log("Success");

        Swal.fire({
            icon: 'success',
            title: 'Login Success',
            text: 'You are logged in!',
            showConfirmButton: false,
            });

        setTimeout(function(){
            window.location.href = 'dashboard.html';
        }, 3000);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
        })
        console.log("Fail");
    }
}