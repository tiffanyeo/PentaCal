let req = new Request("http://localhost:8000/users", {
    headers: {"Content-type": "application/json"},
    method: "POST",
    body: JSON.stringify({
        name: "test",
        email: "test@gmail.com",
        pwd: "123"
    })
});

fetch(req).then(resp => resp.json()).then(reso => console.log(reso));

/*

*/