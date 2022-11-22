const text = document.querySelector("#text-input");
const paragraph = document.querySelector("#output");

text.addEventListener('keydown', ()=>{
    paragraph.textContent = text.value;
})