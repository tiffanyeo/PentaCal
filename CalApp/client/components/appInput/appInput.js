
/* Implementation, exempel:

    <app-input
        label="Description"
        placeholder="Enter description of the group"
        width="100%"
        height="100px"
        id="calendarDesc"
    ></app-input>
    
*/

export class AppInput extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }

                .label-input-container {
                    display: flex;
                    flex-direction: column;
                    margin-top: 10px;
                    margin-bottom: 10px;
                }

                .label {
                    display: block;
                    font-weight: bold;
                    font-size: 16px;
                    margin-bottom: 4px;
                    color: #333;
                }

                .input {
                    width: 100%;
                    padding: 10px;
                    font-size: small;
                    border-radius: 8px;
                    background-color: rgb(224, 227, 227);
                    border: 1px solid #ccc;
                    box-sizing: border-box;
                    resize: vertical;
                }

                .input:focus {
                    border-color: #007aff;
                    box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);
                }
            </style>
            
            <div class="label-input-container">
                <label class="label"></label>
                <input class="input" />
            </div>
        `;
    }
    
    connectedCallback() {

        this.shadowRoot.querySelector(".label").textContent =
            this.getAttribute("label") || "";
        
        const widthAttribute = this.getAttribute("width");
        if (widthAttribute) {
            this.style.width = widthAttribute;
        }

        const heightAttribute = this.getAttribute("height");
        const container = this.shadowRoot.querySelector(".label-input-container");

        let field;

        if (heightAttribute) {
            // Om view själv vill styra height
            field = document.createElement("textarea");
            field.style.height = heightAttribute;
        } else {
            field = document.createElement("input");
            field.type = "text";
        }

        field.classList.add("input");
        field.placeholder = this.getAttribute("placeholder") || "";
        field.value = this.getAttribute("value") || "";

        const old = this.shadowRoot.querySelector(".input");
        container.replaceChild(field, old);
    }
    
    // Komponentens "public API" 
    getValue() {
        return this.shadowRoot.querySelector(".input").value;
    }
    
    setValue(newValue) {
        this.shadowRoot.querySelector(".input").value = newValue;
    }
}

customElements.define("app-input", AppInput);
