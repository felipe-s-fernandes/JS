const bomb = document.querySelector("#bomb");
const timer = document.querySelector(".timer");
const boom = new Audio('./assets/vine-boom.mp3');
const tick = new Audio('./assets/ticking.wav');

function detonateBomb() {
    bomb.innerHTML = "";
    const explosion = document.createElement("img");
    explosion.src = './assets/boom.webp';
    explosion.alt = 'Explosão!';
    boom.play();
    bomb.style.pointerEvents = 'none';
    bomb.appendChild(explosion);
};

function stopBomb() {
    bomb.innerHTML = "";
    const explosion = document.createElement("img");
    explosion.src = './assets/bomba-apagada.png';
    explosion.alt = 'Bomba com pavio apagado';
    bomb.style.pointerEvents = 'none';
    bomb.appendChild(explosion);
};

function tickingClock() {
    if (timer.textContent !== '0') {
        tick.play();
        timer.textContent = Number(timer.textContent) - 1
    } else {
        tick.pause();
        clearInterval(ticking);
    };
};

const time = setTimeout(detonateBomb, Number(timer.textContent)*1000);
const ticking = setInterval(tickingClock, 1000)

bomb.addEventListener('click', () => {
    clearTimeout(time);
    clearInterval(ticking);
    stopBomb();
});

