const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env

// Importar los esquemas y resolvers
const productTypeDefs = require('./schemas/productSchema');
const productResolvers = require('./resolvers/productResolver');
const userTypeDefs = require('./schemas/userSchema');
const userResolvers = require('./resolvers/userResolver');
const carritoTypeDefs = require('./schemas/shoppingCartSchema');
const carritoResolvers = require('./resolvers/shoppingCartResolver');

// Función para iniciar el servidor
const startServer = async () => {
  // Conectar a MongoDB utilizando la URI almacenada en las variables de entorno
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }

  // Configuración del servidor Apollo
  const server = new ApolloServer({
    typeDefs: [userTypeDefs, productTypeDefs, carritoTypeDefs],
    resolvers: [userResolvers, productResolvers, carritoResolvers],
    introspection: process.env.NODE_ENV === 'development',  // Solo en desarrollo
    playground: process.env.NODE_ENV === 'development',   // Solo en desarrollo
    cors: {
      origin: process.env.CORS_ORIGIN.split(','),  // Permitir orígenes configurados en las variables de entorno
      credentials: true,
    },
  });

  // Puerto donde se ejecutará el servidor
  const PORT = process.env.PORT || 4000;

  // Iniciar el servidor Apollo
  server.listen(PORT).then(({ url }) => {
    console.log(`Servidor corriendo en ${url}`);
  });
};

// Iniciar el servidor
startServer();
