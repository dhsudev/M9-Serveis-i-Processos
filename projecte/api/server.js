import express from 'express';
import {routerApi, routerViews} from './routes/router.js';
import chalk from 'chalk';

const PORT = 3010
const app = express();


app.use(express.json());

app.use(express.static("public")); //carpeta publica pel css
app.set('view engine','ejs'); //Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs

app.use('/api', routerApi);
app.use('/', routerViews);


app.listen(PORT, () => {
    console.log(chalk.green("Server Listening on PORT:"), chalk.blue(PORT));
    console.log(chalk.yellow(`Api status endpoint: `) + chalk.cyan(`http://localhost:${PORT}/api/status`));
    console.log(chalk.yellow(`Web endpoint: `) + chalk.cyan(`http://localhost:${PORT}/`));
    }
);

