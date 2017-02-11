import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {Table, Column, Cell} from 'fixed-data-table';
import TextCell from './TextCell';
import NumbericColorCell from './NumbericColorCell';

const Stocks = ({ data: { loading } }) => {
    const stocks = [
      {
        "companyName": "Facebook",
        "symbol": "FB",
        "price": 134.19,
        "change": 0.05,
        "changePct": 0.04,
        "openPrice": 134.1,
        "marketCap": "387.81B",
        "exchange": "NASDAQ"
      },
      {
        "companyName": "Alphabet",
        "symbol": "GOOG",
        "price": 813.67,
        "change": 4.11,
        "changePct": 0.51,
        "openPrice": 811.7,
        "marketCap": "569.09B",
        "exchange": "NASDAQ"
      }
    ]
  ];
  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h3>{'Stock Ticker'}</h3>
        <Table
          rowHeight={50}
          rowsCount={stocks.length}
          width={5000}
          height={5000}
          headerHeight={50}>
          <Column
            header={<Cell>Symbol</Cell>}
            align='left'
            cell={<TextCell data={rows}
              field="symbol"
            />}
            width={100}
          />
          <Column
            header={<Cell>Company Name</Cell>}
            align='left'
            cell={<TextCell data={stocks}
              field="companyName"
            />}
            width={1000}
          />
          <Column
            header={<Cell>Price</Cell>}
            align='right'
            cell={({rowIndex, ...props}) => (
             cell={<TextCell data={stocks}
              field="price"
            />}
            )}
            width={2000}
          />
          <Column
            header={<Cell>Change</Cell>}
            align='right'
            cell={({rowIndex, ...props}) => (
           cell={<NumbericColorCell data={stocks}
              field="change"
            />}
            )}
            width={2000}
          />
          <Column
            header={<Cell>{'% Change'}</Cell>}
            align='right'
            cell={({rowIndex, ...props}) => (
           cell={<NumbericColorCell data={stocks}
              field="percentChange"
            />}
            )}
            width={2000}
          />
        </Table>
      </div>
    );
  }
};

export default graphql(gql`
  query StocksQuery {
    stocks {
      companyName,
      symbol,
      price,
      change,
      changePct,
      openPrice,
      marketCap,
      exchange,
    }
  }
`, {
  // These params come from React Router's URL pattern
  options: ({ params }) => {
    return { }
  },
})(Stocks);
