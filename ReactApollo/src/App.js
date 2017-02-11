import React, { Component } from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import gql from 'graphql-tag';

import './App.css';

import Stocks from './Stocks';
import StockDetail from './StockDetail';
import SubscriptionWithData from './Subscription';

import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
const wsClient = new SubscriptionClient('ws://loki.graphql.tk:5001/', {
  reconnect: true
});

const Layout = ({ children }) => (
  <div>{ children }</div>
);

export const STOCKS_QUERY = gql`
query stocks {
  stocks {
    companyName,
    symbol,
    price,
    change,
    changePct,
    openPrice,
    marketCap,
    exchange
  }
}`;

export const SUBSCRIPTION_QUERY = gql`
  subscription StocksQuery($symbol: String!) {
    stockUpdated(symbol: $symbol) {
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
`;

// Replace this Uri with your GraphQL server Uri
const serverUri = 'http://localhost:5000/';
// const serverUri = 'http://loki.graphql.tk:5000/graphql';

class App extends Component {
  constructor(...args) {
    super(...args);

    const networkInterface = createNetworkInterface({
      uri: serverUri,
      opts: { cors: true },
    });

    const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
      networkInterface,
      wsClient,
    );

    this.client = new ApolloClient({
      networkInterface: networkInterfaceWithSubscriptions,

      // Our backend has unique IDs, so we should use them for cache consistency
      dataIdFromObject: r => r.symbol,
    });
  }
  render() {
    return (
      <ApolloProvider client={this.client}>
        <Router history={browserHistory}>
          <Route path="/" component={Layout}>
            <IndexRoute component={Stocks} />
            <Route path="stocks/:symbol" component={StockDetail} />
            <Route path="/subscription" component={() => (
              <SubscriptionWithData
                client={this.client}
                updateStocksQuery={SUBSCRIPTION_QUERY} />
              )} />
          </Route>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
