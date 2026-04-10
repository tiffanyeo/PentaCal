/* Allmän komponent/popup som ej kan länkas till */

import { PubSub } from "../../../store/pubsub";

export class TestComp1 extends HTMLElement {

    constructor() {

        super();
        this.attachShadow({ mode: "open" });

    }

    // Komponentens egna "constructor"
    connectedCallback() { }

    // Ta bort globala lyssnare (om inaktiv komponent)
    disconnectedCallback() {
        if (this.unsubscribe) this.unsubscribe();
    }

    getValue() {
        // Metod om komponent ska returnera något
        // Ex. en lista events, användare, T/F etc
    }

    setValue() {
        // Metod om komponent ska ta emot värde
    }
    
}

customElements.define("test-comp-1", TestComp1);