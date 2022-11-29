import NewCustomEvent from "../customEvents.js";

export default function Home() {
    const h1 = document.createElement("h1");
    h1.innerText = "Página Principal";

    const brigadeiros = document.createElement("button");
    brigadeiros.innerText = 'Brigadeiros';
    brigadeiros.addEventListener('click', () => {
        window.dispatchEvent(NewCustomEvent('/brigadeiros'));
    });

    const cupcakes = document.createElement("button");
    cupcakes.innerText = 'Cupcakes';
    cupcakes.addEventListener('click', () => {
        window.dispatchEvent(NewCustomEvent('/cupcakes'));
    });
    
    const doces = document.createElement("button");
    doces.innerText = 'Doces';
    doces.addEventListener('click', () => {
        window.dispatchEvent(NewCustomEvent('/doces'));
    });

    const div = document.createElement("div");
    div.appendChild(h1);
    div.appendChild(brigadeiros);
    div.appendChild(cupcakes);
    div.appendChild(doces);

    return div;
};