import React, { Component } from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import './App.css';

import Stocks from './Stocks';

const Layout = ({ children }) => (
  <div>{ children }</div>
);

// Replace this Uri with your GraphQL server Uri
// const serverUri = 'http://localhost:5000/';
const serverUri = 'http://loki.graphql.tk:5000/graphql';

class App extends Component {
  constructor(...args) {
    super(...args);

    const networkInterface = createNetworkInterface({
      uri: serverUri,
      opts: { cors: true },
    });

    this.client = new ApolloClient({
      networkInterface,

      // Our backend has unique IDs, so we should use them for cache consistency
      dataIdFromObject: r => r.id,
    });
  }
  render() {
    return (
      <ApolloProvider client={this.client}>
        <Router history={browserHistory}>
          <Route path="/" component={Layout}>
            <IndexRoute component={Stocks} />
          </Route>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
