const bomb = document.querySelector("#bomb");

function detonateBomb() {
    bomb.innerHTML = "";
    const explosion = document.createElement("img");
    explosion.src = './assets/boom.webp';
    explosion.alt = 'Explosão!';
    playBoom();
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

function playBoom() {
    const boom = new Audio('./assets/vine-boom.mp3');
    boom.play();
};

const time = setTimeout(detonateBomb, 10000);

bomb.addEventListener('click', () => {
    clearTimeout(time);
    stopBomb();
});

