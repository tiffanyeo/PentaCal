import { store } from "../store/store.js";
//import { PubSub } from "../store/pubsub.js";

export function routerHandle(path) {
    const cleanPath = path.split("?")[0];
    console.log(cleanPath)
    switch (cleanPath) {
        case "/":
            console.log("currentPage: home")
            store.setState({ currentPage: "home" });
            break;

        case "/calendar":
            console.log("currentPage: calendar")
            store.setState({ currentPage: "calendar" });
            break;

        default:
            console.log("currentPage: notFound")
            store.setState({ currentPage: "notfound" });
            break;
    } 
}






