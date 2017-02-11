import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


const StockDetail = (props) => {
    console.log(props);
    return <div>Stock detail...</div>;
};

export default StockDetail;

export default graphql(gql`
  query StockDetailQuery($symbol: String!) {
    stockBySymbol(id: $symbol) {
            companyName
            symbol
            price
            change
            changePct
            openPrice
            marketCap
            exchange
    }
  }
`, {
  // These params come from React Router's URL pattern
  options: ({ params }) => {
    return { variables: { symbol: params.symbol } }
  },
})(StockDetail);