function writeOut() {
    const number = document.querySelector('#input').value;
    let result;

    if (validateInput(number)) {
        switch (parseFloat(number)) {
            case 0: result = 'zero'; break
            case 1: result = 'um'; break
            case 2: result = 'dois'; break
            case 3: result = 'três'; break
            case 4: result = 'quatro'; break
            case 5: result = 'cinco'; break
            case 6: result = 'seis'; break
            case 7: result = 'sete'; break
            case 8: result = 'oito'; break
            case 9: result = 'nove'; break
            case 10: result = 'dez'; break
        }
        document.querySelector('#output').value = result;
    }
}

function validateInput(input) {
    if (input === '') {
        alert('Insira um valor!')
        return false
    }
    if (isNaN(input) || !Number.isInteger(parseFloat(input))) {
    }
    else if (parseInt(input) >= 0 && parseInt(input) <= 10) {
        return true
    }
    alert('Insira um número INTEIRO de 0 a 10!')
    return false
}

