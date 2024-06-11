import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // you can change
// import "prismjs/themes/prism-twilight.css"; // you can change

const usePrism = () => {
    window.Prism = window.Prism || {};
    window.Prism.manual = true;
    Prism.highlightAll();
}

export default usePrism;