require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const {
  typeDefs, resolvers, context, schemaDirectives,
} = require('./rootSchema');
const { getUser } = require('./user/functions');

const configurations = {
  production: { ssl: true, port: 40443 },
  development: { ssl: false, port: 4000 },
};

const environment = process.env.NODE_ENV || 'production';
const config = configurations[environment];

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const allowedRoutes = ['login', 'register'];
    if (allowedRoutes.includes(req.body.operationName)) {
      return context;
    }
    const token = req.headers.authorization || '';
    const jwtResp = getUser(token);

    return { ...context, userId: jwtResp ? jwtResp.user : null };
  },
  schemaDirectives,
});

const app = express();

app.get("/ping", (req, res) => {
  console.log(path.resolve('./'))
  res.send("Pong!");
});

apollo.applyMiddleware({ app });

let server;
if (config.ssl) {
  server = https.createServer(
    {
      key: fs.readFileSync('./private.key'),
      cert: fs.readFileSync('./certificate.crt'),
    },
    app,
  );
} else {
  server = http.createServer(app);
}

server.listen({ port: config.port }, () => console.log(
  `🚀 Server ready at port ${config.port}`,
));
