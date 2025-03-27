import express from 'express'
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import bodyParser from 'body-parser';

// Utils per llegir de la BD
const readData = () => JSON.parse(fs.readFileSync('./db.json'));
const writeData = (data) => fs.writeFileSync('./db.json', JSON.stringify(data));

// Creació de la app
const PORT = 3010;
const app = express();

app.use(express.static("public"));//carpeta publica pel css
app.set('view engine','ejs');//Fem servir el motor ejs
app.set('views', './public/views'); //carpeta on desem els arxius .ejs

app.use(express.json())


// Metodes 
function getProducts(req, res) {
    try {
        const data = readData();
        res.status(200).json(data.products);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            "message": "Something went wrong",
            "error": e
        });
    } 
}
function getProductsById(req, res) {
    try {
        const data = readData();
        const target = data.products.find((p) => p.id == req.params.id)
        if(!target){
            res.status(400).json({
                "message": `Product with id ${req.params.id} not found`
            });
        }
        res.status(200).json(target);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            "message": "Something went wrong",
            "error": e
        });
    }
}
function createProduct(req, res) {
    try {
        const data = readData();
        // Aqui cal una verificacio de que tenim tots els parametres pero no em dona temps
        const newProduct = {
            "id": uuidv4(),
            "nom" : req.body.nom,
            "preu" : req.body.preu,
            "categoria" : req.body.categoria
        }
        data.products.push(newProduct)
        writeData(data)
        res.status(201).json(newProduct);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            "message": "Something went wrong",
            "error": e
        });
    }
}

function updateProduct(req, res) {
    try {
        if(!req.params.id){
            res.status(400).json({
                "message" : "Id is required when updating a product"
            })
        }
        // Aqui cal una verificacio de que tenim tots els parametres pero no em dona temps
        const data = readData();
        const index = data.products.findIndex((p) => p.id == req.params.id)
        if(index == -1){
            res.status(400).json({
                "message": `Product with id ${req.params.id} not found`
            });
        }
        const newProduct = {
            "id": data.products.at(index).id,
            "nom" : req.body.nom,
            "preu" : req.body.preu,
            "categoria" : req.body.categoria
        }
        const first = data.products.slice(0, index)
        const end = data.products.slice(index + 1, data.products.lenght - 1)
        data.products = [...first , newProduct,  ...end]
        writeData(data)
        res.status(200).json(newProduct);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            "message": "Something went wrong",
            "error": e
        });
    }
}

function deleteProduct(req, res) {
    try {
        if(!req.params.id){
            res.status(400).json({
                "message" : "Id is required when deleting a product"
            })
        }
        const data = readData();
        const index = data.products.findIndex((p) => p.id == req.params.id)
        if(index == -1){
            res.status(400).json({
                "message": `Product with id ${req.params.id} not found`
            });
        }
        const first = data.products.slice(0, index)
        const end = data.products.slice(index + 1, data.products.lenght - 1)
        data.products = [...first , ...end]
        writeData(data)
        res.status(200).json(data.products);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            "message": "Something went wrong",
            "error": e
        });
    }
}


 
// Rutes
const routerProducts = express.Router()
routerProducts.get('/:id?', (req, res) => {
    if(req.params.id){
        getProductsById(req, res)
    } else{
        const data = readData();
        res.status(200).render('products', { products: data.products, user: {name: "lua trevin"}, htmlMessage: "" });
    }
})
routerProducts.post('/', createProduct)
routerProducts.put('/:id?', updateProduct)
routerProducts.delete('/:id?', deleteProduct)


app.use('/products', routerProducts)

// Init server
app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
})