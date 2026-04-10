/* Vid en specifik popup (ex. events?id=65afetd522) */
import { PubSub } from "../../../store/pubsub";
import { EVENTS } from "../../../store/events";


export class TestComp2 extends HTMLElement {

    constructor() {

        super();
        this.attachShadow({ mode: "open" });
        this.subs()

    }

    subs() {

        PubSub.subscribe(EVENTS.VIEW.POPUP.SHOW.TEST1, () => {
            this.openPopup();
        })

        PubSub.subscribe(EVENTS.VIEW.POPUP.CLOSE.TEST1, () => {
            this.closePopup();
        })

    }

    getValue() {
        // Metod om komponent ska returnera något
        // Ex. en lista events, användare, T/F etc
    }

    setValue() {
        // Metod om komponent ska ta emot värde
    }

    openPopup() {
        this.popupContainer.classList.remove("hidden");
    }

    closePopup() {
        this.popupContainer.classList.add("hidden");
        // koppla disc
    }

    connectedCallback() {
        // Komponentens egna "constructor" -> ?
    }

    disconnectedCallback() {
        // Ta bort globala lyssnare (om inaktiv komponent) -?
        if (this.unsubscribe) this.unsubscribe();
        this.closePopup();
    }


}

customElements.define("test-comp-2", TestComp2);