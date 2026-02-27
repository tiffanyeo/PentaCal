const button = document.querySelector("button");
const usrName = document.querySelector("#usrName");
const pwd = document.querySelector("#pwd");
const store = createStore({ usrName: null, pwd: null, isLoggedIn: false});

store.subscribe((state) => {
  console.log("State changed:", state);
});

//store.setState({ count: 1 });
credentials = {
    usrName: "test",
    pwd: "123"
}
button.addEventListener("click", () => {
    if (usrName.value === credentials.usrName && pwd.value === credentials.pwd) {
        store.setState({usrName: credentials.usrName, pwd: credentials.pwd, isLoggedIn: true});
    } else {
        console.log("Incorrect username or password");
    }

    let p = document.createElement("p");
    p.textContent = `Welcome ${store.getState().usrName}!`;
    document.body.appendChild(p);
});