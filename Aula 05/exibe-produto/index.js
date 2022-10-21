function changeImg() {
    const character = document.querySelector('#input').value;
    let result;

    if (character === '') {
        alert('Selecione um personagem!');
        return
    }
    else {
    switch (character) {
            case 'rean': result = 'rean.png'; break
            case 'altina': result = 'altina.png'; break
            case 'lloyd': result = 'lloyd.png'; break
            case 'crow': result = 'crow.png'; break
            case 'aurelia': result = 'aurelia.png'; break
        }
    }

    document.querySelector('#image').src = './src/' + result
}