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
  try {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.yelht.mongodb.net/tet01?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }

  const server = new ApolloServer({
    typeDefs: [userTypeDefs, productTypeDefs, carritoTypeDefs],
    resolvers: [userResolvers, productResolvers, carritoResolvers],
    introspection: true, // Permite que el esquema sea consultado en producción
    playground: true, // Activa la consola en producción (Apollo Studio)
    cors: {
      origin: 'https://carrito-d53913b23d26.herokuapp.com', // Permitir solo esta URL
      credentials: true,
      introspection: true,
      playground: true
    },
  });

  const PORT = process.env.PORT || 4000;

  server.listen(PORT).then(({ url }) => {
    console.log(`Servidor corriendo en ${url}`);
  });
};

startServer();
