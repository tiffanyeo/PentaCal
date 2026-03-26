
import { apiRequest } from "./api.js";
import { PubSub } from "../store/pubsub.js";
import { EVENTS } from "../store/events.js";

export function ChatService() {


    // Payload = {userId, msgType}
    PubSub.subscribe(EVENTS.REQUEST.GET.CHAT, async function (payload) {

        PubSub.publish(EVENTS.REQUEST.RECEIVED.CHAT)

        const userId = payload.userId;
        const msgType = payload.msgType;

        if (msgType == "all") {

            try {

                const resourceUserCalendars = apiRequest({
                    entity: "/user_calendars",
                    method: "GET"
                })

                const resourcePrivateMsg = apiRequest({
                    entity: "/private_msg",
                    method: "GET"
                })

                const resourceCalendarMsg = apiRequest({
                    entity: "/calendar_msg",
                    method: "GET"
                })

                // Get users calendars
                let filteredUGCals = []
                for (let currUg of resourceUserCalendars) {
                    if (currUg.userId = userId) {
                        filteredUGCals.push(currUg);
                    }
                }

                // Get all calendar msgs for all UGS
                let filteredCalMsg = [];
                for (let currCalMsg of resourceCalendarMsg) {
                    for (let currUG of filteredUGCals) {
                        if (currCalMsg.calId == currUG.calId) {
                            filteredCalMsg.push(currCalMsg);
                        }
                    }
                }

                // Get users private msgs
                let filteredPrivateMsg = [];
                for (let currPM of resourcePrivateMsg) {
                    if (currPM.senderId == userId || currPM.receiver == userId) {
                        filteredPrivateMsg.push(currPM);
                    }
                }

                // Response
                PubSub.publish(EVENTS.RESPONSE.RECEIVED.CHAT.GET, resourceUserCalendars)
                PubSub.publish(EVENTS.RESPONSE.RECEIVED.CHAT.GET, resourceCalendarMsg)
                PubSub.publish(EVENTS.RESPONSE.RECEIVED.CHAT.GET, resourcePrivateMsg)
                // Resource
                PubSub.publish(EVENTS.RESOURCE.RECEIVED.CHAT.GET, resourceUserCalendars)
                PubSub.publish(EVENTS.RESOURCE.RECEIVED.CHAT.GET, resourceCalendarMsg)
                PubSub.publish(EVENTS.RESOURCE.RECEIVED.CHAT.GET, resourcePrivateMsg)

                
                return {
                    privateMSG: filteredPrivateMsg,
                    calendarMSG: filteredCalMsg
                }

            } catch {

                PubSub.publish(EVENTS.REQUEST.ERROR.CHAT.GET, err)

            }

        } else if (msgType == "private") {

            try {

                const resourcePrivateMsg = apiRequest({
                    entity: "/private_msg",
                    method: "GET"
                })

                let filteredPrivateMsg = [];
                for (let currPM of resourcePrivateMsg) {
                    if (currPM.senderId == userId || currPM.receiver == userId) {
                        filteredPrivateMsg.push(currPM);
                    }
                }

                
                // Response
                PubSub.publish(EVENTS.RESPONSE.RECEIVED.CHAT.GET, resourcePrivateMsg)
                
                // Resource
                PubSub.publish(EVENTS.RESOURCE.RECEIVED.CHAT.GET, resourcePrivateMsg)

                return {
                    privateMSG: filteredPrivateMsg,
                }

            } catch {
                PubSub.publish(EVENTS.REQUEST.ERROR.CHAT.GET, err)
            }

        } else if (msgType == "calendar") {

            try {

                const resourceUserCalendars = apiRequest({
                    entity: "/user_calendars",
                    method: "GET"
                })

                const resourceCalendarMsg = apiRequest({
                    entity: "/calendar_msg",
                    method: "GET"
                })

                let filteredUGCals = []
                for (let currUg of resourceUserCalendars) {
                    if (currUg.userId = userId) {
                        filteredUGCals.push(currUg);
                    }
                }

                // Get all calendar msgs for all UGS
                let filteredCalMsg = [];
                for (let currCalMsg of resourceCalendarMsg) {
                    for (let currUG of filteredUGCals) {
                        if (currCalMsg.calId == currUG.calId) {
                            filteredCalMsg.push(currCalMsg);
                        }
                    }
                }

                // Response
                PubSub.publish(EVENTS.RESPONSE.RECEIVED.CHAT.GET, resourceUserCalendars)
                PubSub.publish(EVENTS.RESPONSE.RECEIVED.CHAT.GET, resourceCalendarMsg)

                // Resource
                PubSub.publish(EVENTS.RESOURCE.RECEIVED.CHAT.GET, resourceUserCalendars)
                PubSub.publish(EVENTS.RESOURCE.RECEIVED.CHAT.GET, resourceCalendarMsg)

                return {
                    calendarMSG: filteredCalMsg
                }

            } catch {
                PubSub.publish(EVENTS.REQUEST.ERROR.CHAT.GET, err)
            }
        }

        PubSub.publish(EVENTS.REQUEST.RECEIVED.ERROR);

    })

}

ChatService();