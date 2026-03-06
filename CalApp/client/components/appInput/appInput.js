
export class AppInput extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    
    connectedCallback() {
        // Initial attribuyte
    }
    
    getValue() {
        // ... this.shadowRoot...
    }
    
    setValue(newVal) {
        //... this.shadowRoot... tilldela nytt värde
    }
}

// customElements.define("app-input", AppInput);