import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import auth from 'basic-auth';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { subscriptionManager, pubsub } from './subscriptions';

const app = express();
app.use(cors());

app.use('/graphql', (req, res)=>{
  var user = auth(req);
  graphqlHTTP({
    schema: schema,
    pretty: true,
    graphiql: true,
    rootValue: {user: user},
  })(req,res);
});

const port = process.env.NODE_ENV ? 80 : 5000;

app.listen(port, () => {
  console.log(`app started on port ${port}`);
});

const WS_PORT = 5001;

// Create WebSocket listener server
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

// Bind it to port and start listening
websocketServer.listen(WS_PORT, () => console.log(
  `Websocket Server is now running on http://localhost:${WS_PORT}`
));

new SubscriptionServer(
  {
    subscriptionManager,
  },
  {
    server: websocketServer,
    path: '/'
  }
);

// once app is started, execute queries like so:
// curl localhost:5000 -d "query={authors{id,name, books{id}}}"
