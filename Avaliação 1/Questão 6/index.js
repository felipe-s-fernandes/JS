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
        console.log(values);

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