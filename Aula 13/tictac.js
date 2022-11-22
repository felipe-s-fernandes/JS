const buttons = document.querySelectorAll(".element");
const wrapper = document.querySelector(".wrapper");
const newGame = document.querySelector("#newGame");
const message = document.querySelector("#player");

let turn = 'x';
let turnsPassed = 0;
let game = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

function showSelection() {
    if (turn === 'x') {
        return '<img src="./assets/x.webp">'
    };
    if (turn === 'o') {
        return '<img src="./assets/circle.png">'
    };
};

function blockClick(element) {
    element.style.pointerEvents = 'none';
};

function verifyGame(row, column) {
    if (verifyRow(row) || verifyColumn(column) || verifyDiagonal()) {
        blockClick(wrapper);
        newGame.value = 'Jogar novamente';
        message.textContent = `Vencedor: ${turn}`;
        return 'end';
    };
    if (turnsPassed === 8) {
        newGame.value = 'Jogar novamente';
        message.textContent = 'Deu velha!';
        return 'end';
    };
};

function verifyRow(row) {
    let count = 0;
    for (let j = 0; j < 3; j++) {
        if (game[row][j] === turn) {
            count++;
        };
    };
    if (count === 3) {
        return true;
    };
    return false;
};

function verifyColumn(column) {
    let count = 0;
    for (let i = 0; i < 3; i++) {
        if (game[i][column] === turn) {
            count++;
        };
    };
    if (count === 3) {
        return true;
    };
    return false;
}

function verifyDiagonal() {
    let count1 = 0, count2 = 0;
    for (let i = 0; i < 3; i++) {
        if (game[i][i] === turn) {
            count1++;
        };
        if (game[i][2-i] === turn) {
            count2++;
        };
    };
    if (count1 === 3 || count2 === 3) {
        return true;
    };
    return false;
};

function resetGame() {
    buttons.forEach((button) => {
        button.innerHTML = '';
        button.style.pointerEvents = 'auto';
        button.dataset.clicked = 'false';
        message.textContent = 'Vez do Jogador: x'
        game = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        turnsPassed = 0;
    });
}

buttons.forEach((button) =>{
    button.addEventListener('click', (event) =>{
        const clickedButton = event.target;
        const rowID = clickedButton.dataset.position[0];
        const columnID = clickedButton.dataset.position[1];

        if (clickedButton.dataset.clicked === 'false') {
            game[rowID][columnID] = turn;
            clickedButton.dataset.clicked = 'true';
        };
        blockClick(clickedButton);
        clickedButton.innerHTML = showSelection();
        if (verifyGame(rowID, columnID) !== 'end') {
            if (turn === 'x') {turn = 'o'} else {turn = 'x'};
            message.textContent = `Vez do Jogador: ${turn}`;
        };

        turnsPassed++;
    });
});

newGame.addEventListener('click', () => {
    newGame.value = 'Reiniciar jogo';
    resetGame();
});