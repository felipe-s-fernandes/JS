import Home from "./pages/home.js";
import Brigadeiros from "./pages/brigadeiros.js";
import Cupcakes from "./pages/cupcakes.js";
import Doces from "./pages/doces.js";

export default function Router() {
    const router = {
        "/home": Home(),
        "/brigadeiros": Brigadeiros(),
        "/cupcakes": Cupcakes(),
        "/doces": Doces(),
        getPage: function(url) {
            return this[url];
        }
    };
    return router;
};