import { HomeView } from "./homeView.js"

export function renderHome() {
    let app = document.getElementById("app");
    app.replaceChildren("<home-view></home-view>")

}
