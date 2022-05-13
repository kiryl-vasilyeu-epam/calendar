const dayNames = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
]
const days = [
    { name: 'Все', both: true, color: 'rgb(87, 0, 186)' },
    { name: 'Вася', both: false, color: 'rgb(254, 89, 89)' },
    { name: 'Вася', both: true, color: 'rgb(254, 89, 89)' },
    { name: 'Валя', both: false, color: 'rgb(89, 138, 254)' },
    { name: 'Валя', both: true, color: 'rgb(89, 138, 254)' },
    { name: 'Тоша', both: false, color: 'rgb(10, 238, 154)' },
    { name: 'Тоша', both: true, color: 'rgb(10, 238, 154)' },
];
const months = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
];

let currentData = Date.now();

const getCurrentData = () => {
    const now = new Date(currentData);

    const day = dayNames[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const onDuty = days[now.getDay()];

    return {
        day,
        date,
        month,
        onDuty
    }
}

const displayCurrentData = () => {
    const {
        day,
        date,
        month,
        onDuty
    } = getCurrentData();
    const dayElement = document.getElementsByClassName('day')[0];
    dayElement.innerText = day;

    const nameElement = document.getElementsByClassName('name')[0];
    nameElement.innerText = onDuty.name;

    const dateElement = document.getElementsByClassName('date')[0];
    dateElement.innerText = `${date} ${month}`;

    const progressDay = document.getElementsByClassName('progressDay')[0];
    const progressDay1 = document.getElementsByClassName('progressDay')[1];
    progressDay.style.backgroundColor = onDuty.color;

    if (onDuty.both) {
        progressDay1.style.backgroundColor = onDuty.color;  
    } else {
        progressDay1.style.backgroundColor = 'white';  
    }
}

const updateCurrentData = (isPlusDay) => {
    if (isPlusDay) {
        currentData += 86400000;
    } else {
        currentData -= 86400000;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayCurrentData();

    const leftButton = document.getElementsByClassName('button')[0];
    leftButton.addEventListener('click', () => {
        updateCurrentData(false);
        displayCurrentData();
    });

    const rightButton = document.getElementsByClassName('button')[1];
    rightButton.addEventListener('click', () => {
        updateCurrentData(true);
        displayCurrentData();
    });
});