import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
} from 'graphql';
import {stocks} from './db';

export const stockType = new GraphQLObjectType({
  name: 'Stock',
  description: 'Information about a company\'s publicly traded stock',
  fields:() => ({
    companyName: {type: GraphQLString},
    symbol: {type: GraphQLString},
    price: {type: GraphQLFloat},
    change: {type: GraphQLFloat},
    changePct: {type: GraphQLFloat},
    openPrice: {type: GraphQLFloat},
    marketCap: {type: GraphQLString},
    exchange: {type: GraphQLString},
  }),
});

export default stockType;
