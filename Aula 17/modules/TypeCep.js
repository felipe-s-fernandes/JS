export default function TypeCep(event, cep) {
    const cepValue = event.target.value.replace(/[^0-9]/g, "");
    let cursorPosition = event.target.selectionStart;

    if (cepValue.length < 6) {
        cep.value = cepValue;
    } else {
        cep.value = `${cepValue.slice(0, 5)}-${cepValue.slice(5, 8)}`;
    }
    if (cepValue.length >= 6 && cursorPosition === 6 && event.inputType !== 'deleteContentBackward') {
        cursorPosition++;
        event.target.selectionStart = cursorPosition;    
    }
    event.target.selectionEnd = cursorPosition;
};
