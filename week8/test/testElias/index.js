// GENERELL TEST-FETCHER 

async function test() {

    let req;
    let response;
    let resource;
    //Test 1
    req = new Request("http://localhost:8000/users", {
        headers: { "Content-type": "application/json" },
        method: "GET",
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT1").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 2
    req = new Request("http://localhost:8000/users", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            name: "test",
            email: "test@gmail.com",
            pwd: "123"
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT2").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 3
    req = new Request("http://localhost:8000/users", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            email: "test@gmail.com",
            pwd: "123"
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT3").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 4
    req = new Request("http://localhost:8000/users", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            name: "test",
            email: "test@gmail.com",
            pwd: "123"
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT4").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);
}
test();