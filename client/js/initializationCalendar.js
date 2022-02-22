let userName = document.querySelector('.name');
let calendar = new Calendar();
calendar.renderCalendar();
fetch('https://frozen-badlands-30191.herokuapp.com/calendar', {
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token') }

})
.then(res => res.json())
.then(result => {
    if (result == null) {
        localStorage.clear();
        document.location.href = 'sign-in.html'
    } else if(result.status == false) {
        document.location.href = 'sign-in.html';
    } 
    userName.innerHTML = `Name: ${result.username}`;
});




