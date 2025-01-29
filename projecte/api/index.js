const express = require('express');
const PORT = 3000
const app = express ();


app.use(express.json());


app.get("/status", (request, response) => {
    const status = {
        "Status" : "Running",
        "Avalible EndPoints" : ["/status", "/resources"] 
    };
    response.send(status);
})

app.get("/test", (request, response) => {
    console.log(request.body)
    response.send({"hola": "hola"})
})


app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

