class Calendar {
    constructor() {
        this.dt = new Date();
        this.days = "";
    }
    selectMonth() {
        let selectMonth = document.getElementById('select-month');
        selectMonth.selectedIndex = this.dt.getMonth();
    }
    changeMonth() {
        let selectMonth = document.getElementById('select-month');
        this.dt.setMonth(selectMonth.options[selectMonth.selectedIndex].value);
        this.renderCalendar();
    }
    DayOfTheWeek() {
        this.dt.setDate(1);
        let dayIndex = 0;
        const firstDayIndex = this.dt.getDay();
        for(let i = 0; i <= firstDayIndex; i++) {
            if (firstDayIndex == 0) {
                dayIndex = 7; 
            }
            else dayIndex = firstDayIndex;
        }
        return dayIndex;
    }
    daysReset() {
        this.days = "";
    }
    prevDate() {
        const prevLastDay = new Date(this.dt.getFullYear(), this.dt.getMonth(), 0).getDate(); 
        for(let i = this.DayOfTheWeek()-1; i > 0; i--) {
            this.days += `<div class="calendar-box prevDate">${prevLastDay - i +1}</div>`;
        }
    }
    daysMonth() {
        const month = this.dt.getMonth();
        const year = this.dt.getFullYear();
        const lastDay = new Date(this.dt.getFullYear(), this.dt.getMonth() + 1, 0).getDate();
        for (let i = 1; i <= lastDay; i++) {
            if (i === new Date().getDate() && this.dt.getMonth() === new Date().getMonth() && this.dt.getFullYear() === new Date().getFullYear()) {
                this.days += `<div class="calendar-box today" onclick="openModal(${i},${month+1},${year});">${i} <div class="point" id="point_${i}_${month+1}_${year}"></div></div>`
            } else {
                this.days += `<div class="calendar-box" onclick="openModal(${i},${month+1},${year});">${i} <div class="point" id="point_${i}_${month+1}_${year}"></div></div>`;
            } 
        }
    }
    nextDate() {
        const monthDays = document.getElementById('calendar');
        const lastDayIndex = new Date(this.dt.getFullYear(), this.dt.getMonth() + 1, 0).getDay();
        const nextDays = 7 - lastDayIndex;
        for (let i = 1; i <= nextDays; i++) {
            this.days += `<div class="calendar-box nextDate">${i}</div>`;
            monthDays.innerHTML = this.days;
        }
    }
    async displayPoint() {
        await fetch('https://frozen-badlands-30191.herokuapp.com/events', {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
        .then(res => res.json())
        .then(async result => {
            for(let i = 0; i < result.length; i++) {
                await helper.datePoint(result[i].date);
            }
        })
    }
    displayYear() {
        const year = this.dt.getFullYear();
        let displayYear = document.querySelector('.year');
        displayYear.innerHTML = year;
    }
    addYear() {
        this.dt.setFullYear(this.dt.getFullYear() + 1);
        this.renderCalendar();
    }
    subYear() {
        this.dt.setFullYear(this.dt.getFullYear() - 1);
        this.renderCalendar();
    }
    renderCalendar() {
        this.displayYear();
        this.selectMonth();
        this.daysReset();
        this.prevDate();
        this.daysMonth();
        this.nextDate();
        setTimeout(() => this.displayPoint(), 100); 
    }
}
