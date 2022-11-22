const input = document.querySelector("#text-input");
const output = document.querySelector('#output');
const errorMessage = document.querySelector("#mensagem-erro");

let values = [];

function addValue (){
    try {
        if (input.value === '') {
            throw 'Erro: tentativa de adicionar valor vazio'
        }
        values.push(input.value);

        errorMessage.style.visibility = 'hidden';
    } catch (error) {
        errorMessage.textContent = error;
        errorMessage.style.visibility = 'visible';
    }
}

function listValue() {
    const jsonString = JSON.stringify(Object.assign({}, values));
    output.textContent = jsonString;
}

function resetValue() {
    values = [];
    output.textContent = '';
}

function printValue() {
    let i = 0;
    let count = 0;
    while (i < values.length) {
        if (values[i][0] === 'a') {
            console.log(`Valor ${i}:${values[i]} começa com a`);
            count++;
        }
        i++;
    }
    console.log(count);
}