// Import ORM MongoDb Moongose
const moongose = require('mongoose');

// Importamos el archivo de variables
require('dotenv').config({ path: 'variables.env'});

const connectDB = async () => {
 try {
     await moongose.connect(process.env.DB_MONGO,{
         useNewUrlParser:true,
         useUnifiedTopology: true,
         useFindAndModify: false,
         useCreateIndex: true
     });
     console.log('DB Connected');
 } catch (error) {
     console.log(error);
     // Detiene el app
     process.exit(1);
 }
};

module.exports = connectDB;