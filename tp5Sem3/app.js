const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 5002;
const axios = require('axios');

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mongo_sem3')
  .then(() => console.log('Connected!'));

// base de datos guardar en base de datos de mongoDB

const PersonaModel = mongoose.model("personas", new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String
}))

let users = [];

axios.get('https://randomuser.me/api' , {
    params: {
        results: 1,
        inc:'name, email',
        format: 'json'
    }
})

.then(function (response){
    users = response.data.results;
    console.log(users);
})

app.post("/", async (_req,res) => {
    console.log('cargando...');
    await PersonaModel.create({
        nombre:users[0].name.first, 
        apellido:users[0].name.last, 
        email:users[0].email})
    return res.send("Pasajero cargado")
})


app.set('view engine', 'ejs');

    app.get("/", async (_req, res) => {
    console.log("listando....");
    const personas = await PersonaModel.find();
    console.log(personas);
    return res.render("index", {users})
   
})


app.listen(port, () =>{
    console.log('desde el puerto', port);
})