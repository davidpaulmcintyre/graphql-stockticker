import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router'

const StockDetail = ({data: {stockBySymbol }}) => {
    stockBySymbol = stockBySymbol || {};
    return (
      <div style={{padding: '20px'}}>
        <Link to='/'>Home</Link>
        <h2>Stock detail</h2>
        <div><b>CompanyName: </b><span>{stockBySymbol.companyName}</span>  </div>
        <div><b>Symbol: </b><span>{stockBySymbol.symbol}</span>  </div>
        <div><b>Price: </b><span>{stockBySymbol.price}</span>  </div>
        <div><b>Change: </b><span>{stockBySymbol.change}</span>  </div>
        <div><b>Change Percentage: </b><span>{stockBySymbol.changePct}</span>  </div>
        <div><b>Open Price: </b><span>{stockBySymbol.openPrice}</span>  </div>
        <div><b>Market Cap: </b><span>{stockBySymbol.marketCap}</span>  </div>
        <div><b>Exchange: </b><span>{stockBySymbol.exchange}</span>  </div>
      </div>
    );
};

export default StockDetail;

export default graphql(gql`
  query StockDetailQuery($symbol: String!) {
    stockBySymbol(symbol: $symbol) {
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