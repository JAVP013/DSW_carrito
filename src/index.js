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
    introspection: true, // Permite que el esquema sea consultado en producción
    playground: true, // Activa la consola en producción (Apollo Studio)
  });

  app.use((req, res, next) => {
    const allowedOrigins = ['https://carrito-d53913b23d26.herokuapp.com'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


    const PORT = process.env.PORT || 4000;

    server.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
  
  });
};

startServer();
