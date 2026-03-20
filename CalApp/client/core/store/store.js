import { state } from "./state.js";

export class Store {

    static allStates = [];
    static allListeners = {};

    constructor(initialState) {
        this._state = initialState;
        this.lastState = null;
        Store.allStates.push(this._state)
    }

    getState() {
        return structuredClone(this._state);
    }

    // Förväntar sig keyName för att kalla på notify internt
    // Förväntar sig data för datan från setState

    setState(newState) {

        // Neka fel format
        if (typeof newState !== "object" || Array.isArray(newState)) {
            return false;
        }

        this.lastState = this._state;
        this._state = Object.assign(this._state, newState);

        // Notifyar alla keyNames som blivit ändrat
        for (let keyName in newState) {
            this.notify(keyName, newState[keyName])
        }

    }

    set state(value) {
        throw new Error("Not allowed");
    }

    // eventName -> keyName
    subscribe(keyName, listener) {

        if (!Store.allListeners[keyName]) {

            console.log("Hej event ", keyName)
            Store.allListeners[keyName] = []
        };

        Store.allListeners[keyName].push(listener);
    }


    // Byt ut till keyName 
    notify(keyName, data) {

        if (!Store.allListeners[keyName]) {

            return "No listeners for event"
        } else {

            Store.allListeners[keyName].forEach(listener => listener(data));
        }
    }
}

export const store = new Store(state);