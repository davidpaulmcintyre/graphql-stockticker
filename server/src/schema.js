import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import {stocks} from './db';
import stockType from './stockType';

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
      id: {
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
};

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'QueryRoot',
    fields: rootFields,
  }),
});

export default schema;
