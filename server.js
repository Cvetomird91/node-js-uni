import express from "express";
import {ApolloServer} from "apollo-server-express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import schema from "./graphql/graphql-schema.js";
import { verifyToken } from "./helpers/jwt.js";

dotenv.config();

const db = process.env.MONGODB_URL;

const graphqlPath = "/graphql";

mongoose.connect(db, {
    useNewUrlParser: true,
    autoIndex: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log('connected to mongodb')
}).catch((e)=> {
    console.log(e);
})

async function startApolloServer() {
  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    context: ({req}) => {
        if (req.body.query.includes("login")) {
          return null;
        }
        const token = req.headers.authentication;
        return verifyToken(token);
    }
  });

  const app = express();

  server.applyMiddleware({ app, path: graphqlPath });
  await new Promise(resolve => app.listen({ port: process.env.PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
  return { server, app };
}

startApolloServer();