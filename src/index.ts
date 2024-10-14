import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import connectDB from './db/connect';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001

// middleware
app.use(cors()); 
app.use(bodyParser.json()); 

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers, 
});

// Start the Apollo server and apply it as middleware to Express
const startServer = async () => {
    await connectDB(); // Connect to MongoDB
    await server.start();
  
    app.use('/graphql', expressMiddleware(server));
  
    app.listen(PORT, () => {
      console.log('🚀 Server ready at http://localhost:3001/graphql');
    });
  };
  
  startServer();
