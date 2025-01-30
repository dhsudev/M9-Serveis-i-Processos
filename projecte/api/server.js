import express from 'express';
import routes from './routes/router.js';

const PORT = 3010
const app = express ();


app.use(express.json());
app.use('/api', routes);

// Endpoint to make sure the server is running
app.get("/status", (request, response) => {
    //console.log(request)
    const status = {
        "Status" : "Running",
        "Avalible EndPoints" : ["/status", "/resources"] 
    };
    response.status(200).json(status);
})

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
    }
);

