function calculaIMC () {

    const weight = document.querySelector('#weight').value.replace(',','.');
    const height = document.querySelector('#height').value.replace(',','.');
    let result;

    if (isNaN(weight) || weight < 0 || weight === '') {
        alert('Insira um valor VÁLIDO para o PESO!');
        return
    }
    if (isNaN(height) || height < 0 || weight === '') {
        alert('Insira um valor VÁLIDO para a ALTURA!')
        return
    }

    const imc = parseFloat(weight)/(parseFloat(height/100)**2);
    document.querySelector('#output').value = imc.toFixed(2);

    if (imc < 18.5) {
        result = 'IMC menor que 18.5: ABAIXO DO PESO';
    }
    else if (imc >= 18.5 && imc < 24.9) {
        result = 'IMC entre 18.5 e 24.9: PESO NORMAL'
    }
    else if (imc >= 24.9 && imc < 30.0) {
        result = 'IMC entre 24.9 e 30.0: SOBREPESO'
    }
    else if (imc >= 30.0) {
        result = 'IMC igual ou acima de 30.0: OBESIDADE'
    }
    
    document.querySelector('#result').textContent = result;
}