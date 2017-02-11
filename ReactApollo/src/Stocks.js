import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {Table, Column, Cell} from 'fixed-data-table';
import TextCell from './TextCell';
import NumbericColorCell from './NumbericColorCell.js';
import '../node_modules/fixed-data-table/dist/fixed-data-table.min.css';

const Stocks = ({ data: { loading, stocks } }) => {
  if (loading) {
    return <div>Loading...</div>;
  } else {
    const headerHeight = 50;
    const rowHeight = 50;
    const height = stocks.length * rowHeight + headerHeight;
    return (
      <div style={{padding: '20px'}}>
        <h3>{'Stock Ticker'}</h3>

        <Table
          rowHeight={rowHeight}
          rowsCount={stocks.length}
          width={1000}
          height={height}
          headerHeight={headerHeight}>

          <Column
            header={<Cell>Symbol</Cell>}
            cell={<TextCell data={stocks} field="symbol" />
            }
            width={200}
          />
              
          <Column
            header={<Cell>{'Company Name'}</Cell>}
            cell={<TextCell data={stocks} field="companyName" />
            }
            width={200}
          />
                 
          <Column
            header={<Cell>Price</Cell>}
            cell={<TextCell data={stocks} field="price" />
            }
            width={200}
          />

          <Column
            header={<Cell>Change</Cell>}
            cell={<TextCell data={stocks} field="symbol" />
            }
            width={200}
          />

          <Column
            header={<Cell>{'% Change'}</Cell>}
            cell={<TextCell data={stocks} field="changePct" />
            }
            width={200}
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
`
)(Stocks);
