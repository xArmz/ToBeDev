function showError(message) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
    })
}


window.onload = function() {
    document.getElementById('btnLogin').addEventListener('click', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        //validate data
        if (username == "" || password == "") {
            showError("Please fill in all fields");
        }

        const data = {
            username: username,
            password: password
        };

        login(data);
        
    });

}

async function login(data) {

    try {
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
                window.location.href = 'Profile.html';
            }, 3000);
        } else {
            showError("Invalid username or password");
        }
    }
    catch (error) {
        showError("An error occurred. Please try again later");
    }

}