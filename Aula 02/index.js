function comparaNumero() {
    const a = Number(document.getElementById('primeiro-numero').value);
    const b = Number(document.getElementById('segundo-numero').value);

    let resultado = document.getElementById('compara-numero');

    if (a > b) {
        resultado.innerHTML = 'O primeiro número é maior'
        return
    }
    if (a < b) {
        resultado.innerHTML = 'O segundo número é maior'
        return
    }
    if (a === b) {
        resultado.innerHTML = 'Os números são iguais!'
        return
    }
}

function comparaString() {
    const a = document.getElementById('primeiro-string').value.length;
    const b = document.getElementById('segundo-string').value.length;

    let resultado = document.getElementById('compara-string');
    
    if (a > b) {
        resultado.innerHTML = 'O primeiro string é maior'
        return
    }
    if (a < b) {
        resultado.innerHTML = 'O segundo string é maior'
        return
    }
    if (a === b) {
        resultado.innerHTML = 'Os strings tem o mesmo tamanho!'
        return
    }
}