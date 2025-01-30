import routes from '/home/lua.trevin.7e8/Escriptori/M9-Serveis-i-Processos/projecte/api/routes/router.js'

const PORT = 3000
const app = express ();


app.use(express.json());
app.use('./', routes);

// Test endpoint to make sure the server is running
app.get("/status", (request, response) => {
    const status = {
        "Status" : "Running",
        "Avalible EndPoints" : ["/status", "/resources"] 
    };
    response.send(status);
})

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

