let login = document.getElementById('login');
let pass = document.getElementById('pass');

function login_user(event) {
    event.preventDefault();
    if (login.value == "" || pass.value == "") {
        return helper.message(false, 'You have empty fields!');
    } 

    fetch('https://frozen-badlands-30191.herokuapp.com/sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email: login.value,
            password: pass.value,
        })
      })
      .then(res => res.json())
      .then(result => {
          console.log("Server response:")
          localStorage.setItem('token', result.token);
          helper.message(result.status, result.message);
          if(result.status == true) {
            helper.link('calendar.html');
        }
      })
}