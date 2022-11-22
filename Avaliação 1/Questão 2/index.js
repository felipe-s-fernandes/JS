


function verify() {
    const num = document.querySelector("#text-input").value;
    const paragraph = document.querySelector("#output");
    if (isNaN(num) || num === '') {
        paragraph.textContent = `O valor ${num} não é um número`;
        return;
    }
    if (Number(num) < 10) {
        paragraph.textContent = `O valor ${num} é um número MENOR que 10`;
        return;
    }
    if (Number(num) === 10) {
        paragraph.textContent = `O valor ${num} é um número IGUAL a 10`;
        return;
    }
    if (Number(num) > 10) {
        paragraph.textContent = `O valor ${num} é um número MAIOR que 10`;
        return
    }
};