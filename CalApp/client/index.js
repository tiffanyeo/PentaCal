// ROUTER
import { routerHandle } from "./core/router/router.js"

// GLOBAL COMPONENTS
/*
import "./components/appInput/appInput.js";
import "./components/bottomNav/bottomNav.js";
import "./components/toggleBtn/toggleBtn.js";
*/




// SERVICES. (views i renderApp.js)
/*
import "../services/calendarService.js";
import "./core/services/calendarService.js";

*/

console.log("index loaded")

routerHandle(window.location.pathname);


