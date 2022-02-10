let addModal = document.getElementById("myModal");
let addBtn = document.getElementById("openModal");
let addSpan = document.getElementsByClassName("close")[0];

addBtn.onclick = () => {
  addModal.style.display = "block";
}

addSpan.onclick = () => {
  addModal.style.display = "none";
}

window.onclick = (event) => {
  if (event.target == addModal) {
    addModal.style.display = "none";
  }
}


let title = document.getElementById("title");
let date = document.getElementById("date");
let description = document.getElementById("description");
let modalBtn = document.querySelector('.modalBtn');

var dateMask = IMask(date, {
    mask: Date,
    min: new Date(1990, 0, 1),
    max: new Date(3000, 0, 1),
    lazy: false
});

function generateEvents(e) {
  e.preventDefault();
  if (helper.validateDate(date.value) == true && title.value != "") {
  let events = {
    title: title.value,
    date: date.value,
    description: description.value
  };
  fetch('http://localhost:3000/add-events', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(events)
      })
      .then(res => res.json())
      .then(result => {
        console.log(result)
  })
  let calendar = new Calendar();
  calendar.renderCalendar();
  helper.message(true, "Event Add Complete!");
  title.value = "";
  date.value = "";
  description.value = "";
  addModal.style.display = "none";
  } else return helper.message(false, "No validate date");
}


