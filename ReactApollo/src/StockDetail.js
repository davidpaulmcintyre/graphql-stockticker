import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


const StockDetail = (props) => {
    console.log(props);
    return (
      <div>
        <h2>Stock detail</h2>
        <div><b>CompanyName: <span>props.companyName</span>  </div>
        <div><b>Symbol: <span>props.symbol</span>  </div>
        <div><b>Price: <span>props.price</span>  </div>
        <div><b>Change: <span>props.change</span>  </div>
        <div><b>Change Percentage: <span>props.changePct</span>  </div>
        <div><b>Open Price: <span>props.openPrice</span>  </div>
        <div><b>Market Cap: <span>props.marketCap</span>  </div>
        <div><b>Exchange: <span>props.exchange</span>  </div>
      </div>
    );
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