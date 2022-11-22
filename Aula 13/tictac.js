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
        lightUp('row', row);
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
        lightUp('column', column)
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
        if (count1 === 3) {
            lightUp('diag1');
        } else {
            lightUp('diag2');
        }
        return true;
    };
    return false;
};

function resetGame() {
    buttons.forEach((button) => {
        button.innerHTML = '';
        button.style.pointerEvents = 'auto';
        button.style.backgroundColor = 'white';
        button.dataset.clicked = 'false';
        message.textContent = 'Vez do Jogador: x'
        game = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        turnsPassed = 0;
    });
};

function lightUp(identification, k = 0) {
    if (identification === 'row') {
        for (let j = 0; j < 3; j++) {
            buttons[3*k + j].style.backgroundColor = 'green';
        };
    };
    if (identification === 'column') {
        for (let i = 0; i < 3; i++) {
            console.log(i, k)
            buttons[3*i + k].style.backgroundColor = 'green';
        };
    };
    if (identification === 'diag1') {
        for (let i = 0; i < 3; i++) {
            buttons[3*i + i].style.backgroundColor = 'green';
        };
    };
    if (identification === 'diag2') {
        for (let i = 0; i < 3; i++) {
            buttons[3*i + 2-i].style.backgroundColor = 'green';
        };
    };
};

buttons.forEach((button) =>{
    button.addEventListener('click', (event) =>{
        const clickedButton = event.target;
        const rowID = Number(clickedButton.dataset.position[0]);
        const columnID = Number(clickedButton.dataset.position[1]);

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