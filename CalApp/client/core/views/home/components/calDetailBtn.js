import { store } from "../../../store/store.js";
import { PubSub } from "../../../store/pubsub.js";

export class CalDetailBtn extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.isOpen = false;
        this.render();

    }

    connectedCallback() {
        this.detail = this.getCalName(this.detail);
        this.render();
        
        this._sub = PubSub.subscribe("change:detail-btn", (calId) => {
            this.detail = this.getCalName(calId);
            this.render();
    });
    }

    getCalName(id) {
        if (!id){
            return "All";
        }
        const calendars = store.getState().cals;
        const cal = calendars.find(c => c.id === id);
        if (cal){
            return cal.name;
        } else {
            return "All";
        }
    }
    
    render(){
        const calendars = store.getState().cals;
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: inline-block;
                position: relative;
            }

            button {
                background-color: rgba(255, 255, 255, 0.5);
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                font: bold 16px Helvetica;
                text-decoration: underline;
                cursor: pointer;
            }

            #dropdown {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                background: #f9f9f9;
                min-width: 130px;
                box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                padding: 8px 0;
                z-index: 10;
            }

            #dropdown.open {
                display: block;
            }

            .item {
                padding: 8px 16px;
                cursor: pointer;
            }

            .item:hover {
                background: #eee;
            }
        </style>
        <button id="detail">${this.detail}</button>
        <div id="dropdown">
            <div class="item" id="All">All</div>
            ${calendars.map(c => `<div class="item" id="${c.id}">${c.name}</div>`).join("")}
        </div>
        `;

        this.setUpEvents();
    }

    setUpEvents(){
        const detailButton = this.shadowRoot.querySelector("#detail");
        const dropdown = this.shadowRoot.querySelector("#dropdown");

        let isDown = false;
        let holdTime = 200;

        let clicked = 0;

        detailButton.addEventListener("click", () =>{
            this.toggleDropdown(true);
        })
        detailButton.addEventListener("pointerdown", () =>{
            if (isDown === false){
                isDown = true;
                setTimeout(() =>{
                    if (isDown){
                        this.toggleDropdown(true);
                    }
                }, (holdTime));
            }
        })
        detailButton.addEventListener("pointerup", () => {
            isDown = false;
            this.toggleDropdown(isDown);
            clicked = 1;
        })

        dropdown.addEventListener("click", (e) => {
            const item = e.target.closest(".item");
            if (!item) return;
            this.detail = item.textContent;
            detailButton.textContent = this.detail;
            PubSub.publish("change:detail-btn", item.id);
            this.toggleDropdown(false);
        });
        document.addEventListener("click", (e) => {
            if (!e.composedPath().includes(this)){
                this.toggleDropdown(false)
            }
        });
    }



    toggleDropdown(open){
        this.isOpen = open;
        const dropdown = this.shadowRoot.querySelector("#dropdown");
        dropdown.classList.toggle("open", open);
    }

}

customElements.define("cal-detail-btn", CalDetailBtn);