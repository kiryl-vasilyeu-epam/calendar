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
let canSwipe = true;

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

const waiterInMs = async (ms) => {
    await new Promise(res => setTimeout(res, ms))
}

const displayCurrentData = async (isPlusDay) => {
    if(!canSwipe) return;
    canSwipe = false;
    await hideAnimation(isPlusDay);
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
    await showAnimation(isPlusDay);
    canSwipe = true;
}

const updateCurrentData = (isPlusDay) => {
    if (isPlusDay) {
        currentData += 86400000;
    } else {
        currentData -= 86400000;
    }
}

const setPrevDate = () => {
    updateCurrentData(false);
    displayCurrentData(false);
}

const setNextDate = () => {
    updateCurrentData(true);
    displayCurrentData(true);
}

const hideAnimationElement = (element, isPlusDay) => {
    element.classList.add('animated');
    element.classList.add('zeroOpacity');
    element.classList.add(isPlusDay ? 'rightAnimation' : 'leftAnimation');
}

const showAnimationElement = async (element, isPlusDay) => {
    element.classList.remove('animated');

    element.classList.remove(isPlusDay ? 'rightAnimation' : 'leftAnimation');
    element.classList.add(isPlusDay ? 'leftAnimation' : 'rightAnimation');

    await waiterInMs(20);
    
    element.classList.add('animated');
    element.classList.remove(isPlusDay ? 'leftAnimation' : 'rightAnimation');
    element.classList.remove('zeroOpacity');

}

const hideAnimation = async (isPlusDay) => {
    const dayElement = document.getElementsByClassName('day')[0];
    hideAnimationElement(dayElement, isPlusDay);

    const nameElement = document.getElementsByClassName('name')[0];
    hideAnimationElement(nameElement, isPlusDay);

    const dateElement = document.getElementsByClassName('date')[0];
    hideAnimationElement(dateElement, isPlusDay);

    await waiterInMs(350);
}

const showAnimation = async (isPlusDay) => {
    const dayElement = document.getElementsByClassName('day')[0];
    await showAnimationElement(dayElement, isPlusDay);

    const nameElement = document.getElementsByClassName('name')[0];
    await showAnimationElement(nameElement, isPlusDay);

    const dateElement = document.getElementsByClassName('date')[0];
    await showAnimationElement(dateElement, isPlusDay);
}

document.addEventListener('DOMContentLoaded', () => {
    displayCurrentData();

    const leftButton = document.getElementsByClassName('button')[0];
    leftButton.addEventListener('click', setPrevDate);

    const rightButton = document.getElementsByClassName('button')[1];
    rightButton.addEventListener('click', setNextDate);

    let touchstartX = 0;
    document.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX
    })
    document.addEventListener('touchend', e => {
        const touchEnd = e.changedTouches[0].screenX;
        if (Math.abs(touchstartX - touchEnd) < 40) return;
        
        if (touchstartX > touchEnd) {
            setNextDate();
        } else {
            setPrevDate();
        }
    })
});