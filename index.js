import express from 'express'; //trae la libreria Express a mi proyecto
import mongoose from 'mongoose'; //trae la libreria Mongoose a mi proyecto

const app = express(); //crea una instancia de la aplicación Express

app.use(express.json()); //le decís a Express que convierta automáticamente el cuerpo de las peticiones en objetos JSON.

app.get('/', (req, res) => {
    res.send('Hola desde GET en la API');
}); //sirve para probar que tu servidor funciona.

app.post('/', (req, res) => { //sirve para recibir datos enviados por el cliente.
    const data = req.body;
    res.json({
        message: 'Hola desde POST en la API',
        data
    });
    });

await mongoose.connect('mongodb://localhost:27017/mi_base_de_datos'); //conecta a la base de datos MongoDB
console.log('Conectado a la base de datos MongoDB');

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
}); //inicia el servidor en el puerto 3000 y muestra un mensaje en la terminal.
