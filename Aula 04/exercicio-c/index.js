function interval() {

    let number = document.querySelector('#input').value.replace(',','.');

    if (isNaN(number) || number === '') {
        alert('Insira um valor numérico');
        return
    }
    
    number = parseFloat(number, 10);

    const min = Math.floor(number);
    const max = Math.ceil(number);
    
    document.querySelector('#min').value = min;
    document.querySelector('#max').value = max;
}