import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { SUBSCRIPTION_QUERY } from './App';
import gql from 'graphql-tag';

import {Table, Column, Cell} from 'fixed-data-table';
import TextCell from './TextCell';
import LinkCell from './LinkCell';
import NumericColorCell from './NumericColorCell';
import NumberCell from './NumberCell';
import '../node_modules/fixed-data-table/dist/fixed-data-table.min.css';

const StocksTable = (props) => {
    const headerHeight = 50;
    const rowHeight = 50;
    const stocks = props.stocks;
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
            cell={<LinkCell data={stocks} field="symbol" />
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
            cell={<NumberCell data={stocks} field="price" />
            }
            width={200}
          />

          <Column
            header={<Cell>Change</Cell>}
            cell={<NumericColorCell data={stocks} field="change" />
            }
            width={200}
          />

          <Column
            header={<Cell>{'% Change'}</Cell>}
            cell={<NumericColorCell data={stocks} field="changePct" />
            }
            width={200}
          />


        </Table>

      </div>
  );
}


class Subscription extends Component {
  constructor(props) {
    super(props);

    this.state = { stocks: {} };
  }
  componentDidMount() {
    this.subscribe(gql`
      subscription StocksQuery {
        stockUpdated(symbol: "GOOG") {
          companyName,
          symbol,
          price,
          change,
          changePct,
          openPrice,
          marketCap,
          exchange
        }
      }
    `);
    console.log('mounted subscription');
  }
  subscribe(updateQuery){
    let self = this;
    // call the "subscribe" method on Apollo Client
    this.subscriptionObserver = this.props.client.subscribe({
      query: updateQuery,
      variables: { symbol: this.props.symbol },
    }).subscribe({
      next(data) {
        self.setState((state) => ({ stocks: Object.assign({}, state.stocks, {[data.stockUpdated.symbol]: data.stockUpdated }) }));
        console.log(`data: ${JSON.stringify(data)}`);
      }
    });
  }
  render() {
    const {loading, stockUpdated} = this.props.data;
    console.log(`rendered, loading: ${loading}`);
    if (loading) {
      return <div>Loading</div>;
    }
console.log(`stocks: ${JSON.stringify(this.state.stocks)}`);
    return (
      <StocksTable stocks={Object.values(this.state.stocks)} />
    );
  }
}

Subscription.propTypes = {
  updateStocksQuery: PropTypes.object,
  client: PropTypes.object,
  data: PropTypes.object,
}

export const SubscriptionWithData = graphql(gql`
  subscription StocksQuery {
    stockUpdated(symbol: "GOOG") {
      companyName,
      symbol,
      price,
      change,
      changePct,
      openPrice,
      marketCap,
      exchange
    }
  }
`)(Subscription);

export default SubscriptionWithData;
