// Importar el servidor
const express = require('express');
// Importamos la conexion de la bd del archivo Config/db.js
const connectDB = require('./config/db');
// Importar cors
const cors = require('cors')
// Importar body-parser
const bodyParser = require ('body-parser')

// Creamos el servidor
const app = express();

// Conectar a la base de datos
connectDB();

// Habilitar Cors
app.use(cors());

// habilitamos el body parser
app.use(bodyParser.json());

// Habilitar express.json
app.use(express.json({ extended: true}));

// Usamos el puerto del archivo env o por defecto el 4000
// puerto del app
const PORT = process.env.PORT || 4000;

// Importar rutas
app.use('/api/users', require('./routes/usersroute'));
app.use('/api/auth', require('./routes/authsroute'));
app.use('/api/projects', require('./routes/projectsroute'));
app.use('/api/tasks', require('./routes/tasksroute'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`El servidor se ejecuta en el puerto ${PORT}`);
})