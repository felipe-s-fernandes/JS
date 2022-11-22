const text = document.querySelector("#text-input");
const number = document.querySelector("#number-input");
const paragraph = document.querySelector("#output");

function writeRoma() {
    let i = 0;
    paragraph.textContent = '';
    while (i < Number(number.value)) {

        
        if (i === Number(number.value) - 1) {
            paragraph.textContent += ` ${text.value}.`;
        } else {
            if (i === 0) {
                paragraph.textContent += `${text.value}`;
            } else {
                paragraph.textContent += ` ${text.value}`;
            }
        }
        i++;
    }
};