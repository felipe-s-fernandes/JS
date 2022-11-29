import NewCustomEvent from "../customEvents.js";

export default function Brigadeiros() {
    const h1 = document.createElement("h1");
    h1.innerText = "Brigadeiros";

    const home = document.createElement("button");
    home.innerText = "Página Principal";
    home.addEventListener('click', () => {
        window.dispatchEvent(NewCustomEvent('/home'));
    });

    const div = document.createElement("div");
    div.appendChild(h1);
    div.appendChild(home);

    return div;
};