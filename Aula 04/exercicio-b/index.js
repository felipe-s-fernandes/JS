function sortNumber () {

    let min = document.querySelector('#min').value.replace(',','.');
    let max = document.querySelector('#max').value.replace(',','.');

    if (min === '' || max === '') {
        alert('Insira os valores máximo e mínimo!')
        return
    }
    if (isNaN(min) || isNaN(max)) {
        alert('Insira valores NUMÉRICOS');
        return
    }

    min = parseFloat(min, 10);
    max = parseFloat(max, 10);

    if (min >= max) {
        alert('O valor máximo deve ser maior que o valor mínimo!')
        return
    }
    
    const result = Math.random() * (max - min) + min;
    
    document.querySelector('#output').value = result.toFixed(2);
}