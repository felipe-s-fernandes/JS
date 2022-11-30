import Router from "./router.js";

const route = Router();
const root = document.querySelector("#root");

const page = route.getPage("/home");
root.innerHTML = "";
root.appendChild(page);
history.pushState({}, "", "/home");

window.addEventListener('onstatechange', (event) => {
    const url = event.detail.url;
    const page = route.getPage(url);
    history.pushState({}, "", url);
    root.innerHTML = "";
    root.appendChild(page);
});