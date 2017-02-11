import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


const StockDetail = ({ data: { stockBySymbol } }) => {

    return <div>hello.</div>;
};

export default StockDetail;

export default graphql(gql`
  query StockDetailQuery($symbol: String!) {
    stockBySymbol(symbol: $symbol) {
            companyName
            symbol
            price
    }
  }
`, {
  // These params come from React Router's URL pattern
  options: ({ params }) => {
    return { variables: { symbol: params.symbol } }
  },
})(StockDetail);