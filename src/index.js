const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

// Importar los esquemas y resolvers
const productTypeDefs = require('./schemas/productSchema');
const productResolvers = require('./resolvers/productResolver');
const userTypeDefs = require('./schemas/userSchema');
const userResolvers = require('./resolvers/userResolver');
const carritoTypeDefs = require('./schemas/shoppingCartSchema');
const carritoResolvers = require('./resolvers/shoppingCartResolver');


const startServer = async () => {
  // Conectar a MongoDB
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.yelht.mongodb.net/tet01?retryWrites=true&w=majority&appName=Cluster0');

  const server = new ApolloServer({
    typeDefs: [userTypeDefs, productTypeDefs, carritoTypeDefs],
    resolvers: [userResolvers, productResolvers, carritoResolvers],
    cors: {
      origin: '*', // O restringe a dominios específicos
      methods: ['GET', 'POST'],
    }
  });
    
    const PORT = process.env.PORT || 4000;

    server.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
  
  });
};

startServer();
