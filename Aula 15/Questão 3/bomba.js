const selectMinutes = document.querySelector("#set-minutes");
const selectSeconds = document.querySelector("#set-seconds");
const button = document.querySelector("button");
const timer = document.querySelector(".timer");
const alarm = new Audio('./assets/alarm.mp3');
const tick = new Audio('./assets/ticking.wav');

let time, ticking, startingTime;

createSelect();

selectMinutes.addEventListener('change', () => { 
    timer.innerText = selectMinutes.value + ':' + selectSeconds.value;
});

selectSeconds.addEventListener('change', () => { 
    timer.innerText = selectMinutes.value + ':' + selectSeconds.value;
});

button.addEventListener('click', () => {
    if (button.textContent === 'Começar') {
        setTimer();
        startTimer();
    } else {
        stopTimer();
    };
});

function createSelect() {
    for (let i = 0; i < 60; i++) {
        const time = document.createElement("option");
        if (i < 10) {
            time.innerText = '0' + i;
        } else {
            time.innerText = i;
        };
        selectMinutes.appendChild(time);
    }; 
    for (let i = 0; i < 60; i++) {
        const time = document.createElement("option");
        if (i < 10) {
            time.innerText = '0' + i;
        } else {
            time.innerText = i;
        };
        selectSeconds.appendChild(time);
    };
    selectMinutes.selectedIndex = 0;
    selectSeconds.selectedIndex = 0;
    setTimer();
};

function setTimer() {
    timer.innerText = selectMinutes.value + ':' + selectSeconds.value;
};

function startTimer(){
    time = setTimeout(detonateAlarm, getTime()*1000);
    ticking = setInterval(tickingClock, 1000);
    startingTime = getTime();
    button.textContent = 'Parar';
    disableSelect(true);
};

function stopTimer(){
    clearTimeout(time);
    clearInterval(ticking);
    tick.pause();
    timer.style.color = 'rgb(250, 250, 168)';
    button.textContent = 'Começar';
    stopAlarm();
};

function updateTimer() {
    let minutes, seconds;
    const remainingTime = getTime() - 1;
    if (Math.floor(remainingTime/60) < 10) {
        minutes = '0' + Math.floor(remainingTime/60);
    } else {
        minutes = Math.floor(remainingTime/60);
    }
    if (remainingTime%60 < 10) {
        seconds = '0' + remainingTime%60;
    } else {
        seconds = remainingTime%60;
    };
    timer.textContent = minutes + ':' + seconds;
};

function detonateAlarm() {
    alarm.play();
    alarm.loop = true;
};

function stopAlarm() {
    alarm.pause();
    alarm.load();
    disableSelect(false);
};

function tickingClock() {
    if (getTime() > 0) {
        tick.play();
        updateTimer();
        if (getTime()/startingTime <= 5/100) {
            timer.style.color = 'rgb(245, 126, 126)';
        }
    } else {
        tick.pause();
        clearInterval(ticking);
    };
};

function getTime() {
    const minutes = Number(timer.textContent.slice(0, 2));
    const seconds = Number(timer.textContent.slice(3, 5));
    return (minutes*60 + seconds);
};

function disableSelect(state) {
    selectMinutes.disabled = state;
    selectSeconds.disabled = state;
};