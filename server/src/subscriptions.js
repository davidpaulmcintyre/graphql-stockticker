import { SubscriptionManager, PubSub } from 'graphql-subscriptions';
import schema from './schema';

const pubsub = new PubSub();
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {
    stockUpdated: (options, args) => ({
      stockUpdated: (stock) => stock.symbol === args.symbol,
    }),
  },
});

export { subscriptionManager, pubsub };
