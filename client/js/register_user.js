let userName = document.getElementById('userName');
let regLogin = document.getElementById('regLogin');
let regPass = document.getElementById('regPass');

function userStorage(event) {
    event.preventDefault();
    
    if (userName.value == "" || regLogin.value == "" || regPass.value == "") {
       return helper.message(false, 'You have empty fields!');
    } 

    if (helper.validateEmail(regLogin.value) != true && helper.validatePass(regPass.value) != true ) {
        return helper.message(false, 'Email and password are not validated!');
    } else if (helper.validateEmail(regLogin.value) != true) {
        return helper.message(false, 'Email does not pass validation!');
    } else if (helper.validatePass(regPass.value) != true) {
        return helper.message(false, 'The password does not pass validation!');
    }

    let users = {
        'username': userName.value,
        'email': regLogin.value,  
        'password': regPass.value,
        'events':[],
        'auth': false,
    }
    
    fetch('https://frozen-badlands-30191.herokuapp.com/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(users)
      })
    .then(res => res.json())
    .then(result => {
        console.log("Response server")
        console.log(result)
        helper.message(result.status, result.message);
        if(result.status == true) {
            helper.link('sign-in.html');
        }
    })
}


