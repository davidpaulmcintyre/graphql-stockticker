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
  stockByID: {
    type: stockType,
    args: {
      id: {
        type: GraphQLString,
      }
    },
    resolve: (object, {id}, context, info) => {
      return stocks.find(stock => `stock-${stock.id}` == id);
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
