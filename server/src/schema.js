import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSubscriptionType,
} from 'graphql';
import {stocks} from './db';
import stockType from './stockType';

const SubscriptionType = new GraphQLObjectType({
    name: "StockUpdated",
    fields: {
        stockUpdated: {
            type: stockType,
            description: "Send newly updated stock",
            args: {
                symbol: {type: GraphQLString}
            },
            resolve: (object, {symbol}, context, info) => {
              return object;
            }
            // start(subscriptionId, {symbol}) {
            //     const onStock = stock => {
            //         Transport.push(subscriptionId, stock);
            //     };
            //     const key = subscriptionId;
            //     const type = 'stockUpdated';
            //     MyQueueService.on(key, type, {postId}, onComment);
            // },
            // stop(subscriptionId) {
            //     MyQueueService.removeListener(subscriptionId);
            // }
        }
    }
});

const rootFields = {
  stocks: {
    type: new GraphQLList(stockType),
    resolve: _ => {
      return stocks;
    }
  },
  stockBySymbol: {
    type: stockType,
    args: {
      symbol: {
        type: GraphQLString,
      }
    },
    resolve: (object, {symbol}, context, info) => {
      return stocks.find(stock => stock.symbol == symbol);
    }
  },
  stockSearch: {
    type: new GraphQLList(stockType),
    args: {
      keyword: {
        type: GraphQLString,
      }
    },
    resolve: (object, {keyword}, context, info) => {
      return stocks.filter(stock => stock.companyName.includes(keyword) || stock.symbol == keyword);
    }
  },
  stockUpdated: {
    type: SubscriptionType,
    args: {
      symbol: {
        type: GraphQLString,
      },
    },
    resolve: (object, {symbol}, context, info) => {
      return stocks.find(stock => stock.symbol == symbol);
    }
  },
};

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'QueryRoot',
    fields: rootFields,
  }),
  subscription: SubscriptionType,
});

export default schema;
