import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {Table, Column, Cell} from 'fixed-data-table';


const Stocks = ({ data: { loading } }) => {
  const rows = [];
  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h3>{'Stock Ticker'}</h3>
        <Table
          rowHeight={50}
          rowsCount={rows.length}
          width={5000}
          height={5000}
          headerHeight={50}>
          <Column
            header={<Cell>Col 1</Cell>}
            cell={<Cell>Column 1 static content</Cell>}
            width={2000}
          />
          <Column
            header={<Cell>Col 2</Cell>}
            cell={<MyCustomCell mySpecialProp="column2" />}
            width={1000}
          />
          <Column
            header={<Cell>Col 3</Cell>}
            cell={({rowIndex, ...props}) => (
              <Cell {...props}>
                Data for column 3: {rows[rowIndex][2]}
              </Cell>
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
