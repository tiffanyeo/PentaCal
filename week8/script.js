let req = new Request("http://localhost:8000/users?id=65e10aa11a009", {
    headers: {"Content-type": "application/json"},
    method: "PATCH",
    body: JSON.stringify({
        pwd: "hejhejLösen"
    })
    
});

fetch(req).then(resp => resp.json()).then(reso => console.log(reso));

/*

*/