
// import displayHome from "../views/home/home.js";
import { CreateCalendarView } from "../views/createCalendar/createCalendarView.js";
import { CreateNotificationsView } from "../views/notifications/notifications.js";
import { createGroupLandingView } from "../views/groupLanding/groupLanding.js";
import HomeView from "../views/home/homeView.js";


const routes = {
    "/": () => {
        const app = document.querySelector("#app");
        app.replaceChildren(new HomeView());
    },
    "groupsView": () => {
        groupsView();
    },
    "/createNewCalendar": () => {
        const view = new CreateCalendarView(document.querySelector("#app"));
        view.render();
    },
    "/notifications": () => {
        const view = new CreateNotificationsView(document.querySelector("#app"));
        view.render();
    },
    "/groupLandingView": () => {
        createGroupLandingView();
    }
};

export function UrlRouter() {
    /*     const url = window.location.pathname;
        routes[url](); */

    const fullPath = window.location.pathname;
    const path = "/" + fullPath.split("/").pop(); // tar sista delen

    if (routes[path]) {
        routes[path]();
    } else {
        console.warn("No route found: ", path);
        // routes["/"]();
    }
}

// Lyssnar på framåt och tillbaka 
window.addEventListener("popstate", UrlRouter);