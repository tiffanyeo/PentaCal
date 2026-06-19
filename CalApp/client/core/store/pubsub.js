
export class Pubsub {

    constructor() {
        this.events = {};
    }

    subscribe(event, callBack, consoleLogIt = false, loggingFrom = null) {

        // Development support
        if (consoleLogIt) {
            if (loggingFrom) console.log("New sub: ", event, " with: ", callBack, "from: ", loggingFrom);
            console.log("New sub: ", event, " with: ", callBack);
        }
        
        if (!this.events[event]) {
            this.events[event] = [];
        }
        
        this.events[event].push(callBack);
        
        // Unsubscribe
        return () => {
            this.events[event] = this.events[event].filter(eventCallback => eventCallback != callBack);
        }
    }
    
    publish(event, data = null, consoleLogIt = false) {
        
        // Development support
        if (consoleLogIt) {
            if (loggingFrom) console.log("New sub: ", event, " with: ", callBack, "from: ", loggingFrom);
            console.log("New pub: ", event, " with: ", data);
        }

        if (!this.events[event]) {
            return;
        }

        for (let callBack of this.events[event]) {
            callBack(data);
        }
    }

}

export const PubSub = new Pubsub();