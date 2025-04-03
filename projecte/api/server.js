import express from 'express';
import {routerApi, routerViews} from './routes/router.js';

const PORT = 3010
const app = express ();


app.use(express.json());

app.use(express.static("public"));//carpeta publica pel css
app.set('view engine','ejs'); //Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs

app.use('/api', routerApi);
app.use('/', routerViews);


app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
    }
);

