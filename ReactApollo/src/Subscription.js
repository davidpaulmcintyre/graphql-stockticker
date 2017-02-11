import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { SUBSCRIPTION_QUERY } from './App';
import gql from 'graphql-tag';

class Subscription extends Component {
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
    // call the "subscribe" method on Apollo Client
    this.subscriptionObserver = this.props.client.subscribe({
      query: updateQuery,
      variables: { symbol: this.props.symbol },
    }).subscribe({
      next(data) {
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

    return (
      <div>{stockUpdated.symbol} {stockUpdated.price}</div>
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
