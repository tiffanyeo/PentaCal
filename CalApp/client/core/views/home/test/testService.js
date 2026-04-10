
import { PubSub } from "../../../store/pubsub";
import { EVENTS } from "../../../store/events";

export class testService {

    constructor() {

        this.subs();
        this.eListeners();
        this.url = window.location.origin; // ***
    }

    subs() {

        // Router pub?
        PubSub.subscribe("change:page", (data) => {
            if (data.page === "home") {
                this.render();
            }
        })

        // Login
        PubSub.subscribe(EVENTS.AUTH.LOGIN.SUCCESS, () => {
            PubSub.publish(EVENTS.VIEW.PAGE.SHOW.HOME, { page: "home" }, true);
        }, true);

        // Logout
        PubSub.subscribe(EVENTS.AUTH.LOGOUT.SUCCESS, () => {
            PubSub.publish(EVENTS.VIEW.PAGE.SHOW.HOME, { page: "home" }, true);
        }, true);

        // Open comp1/popup


        // Open comp1/popup
    }

    eListeners() {

        const testContainer = document.querySelector("test-container");
        const testCard = document.querySelector("test-card");

        testContainer.addEventListener("click", () => {

            PubSub.publish(
                EVENTS.VIEW.POPUP.SHOW.TEST1,
                () => { },
                false
            )

        });

        testCard.addEventListener("click", () => {

            this.setURL(urlParams)

            PubSub.publish(
                EVENTS.VIEW.POPUP.SHOW.TEST2,
                function (urlParams) {
                    // ???
                },
                false
            )
        })

    }

    setURL(newURL) {

        // Sätt url till view
        
        urlPaths = newURL.pathname.split("/").filter(Boolean);
        mainPath = urlPaths[0];
        subPath = urlPaths[1];
        
        newURL.preventDefault();
        window.history.pushState({}, "", test);
        const viewUrl = new URL(newURL, window.location.origin);

        this.url = viewUrl;

    }


}

// Eller andra alt?
export const TestService = new testService();
