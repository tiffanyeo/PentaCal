let req = new Request("http://localhost:8000/users?id=65e10aa11a00a", {
    headers: {"Content-type": "application/json"},
    method: "GET",
    
});

fetch(req).then(resp => resp.json()).then(reso => console.log(reso));

/*
body: JSON.stringify({
        name: "test",
        email: "test@gmail.com",
        pwd: "123"
    })
*/