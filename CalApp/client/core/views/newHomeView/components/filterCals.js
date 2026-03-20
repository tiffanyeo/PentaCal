import { store } from "../../../store/store.js";

class FilterCals extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.filterdCals = [];

        store.subscribe(filterdCals, data => {
            
        })
    }

    html() {
        return `

        `
    }

    style() {

    }


    render() {
        this.shadowRoot.innerHTML = `
            ${this.style()}
            ${this.html()}
        
        `
    }


}