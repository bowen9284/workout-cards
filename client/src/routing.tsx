import React from 'react';
import Auth from './auth/Auth';
import { Router, Route, Switch } from 'react-router-dom';
import Callback from './components/Callback';
import App from './App';
import Layout from './components/Layout';
import { createBrowserHistory as createHistory } from 'history';

const history = createHistory();

const auth = new Auth(history);

const handleAuthentication = (props: any) => {
  const location = props.location;
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeAuthRouting = () => {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route
            path="/callback"
            render={(props) => {
              handleAuthentication(props);
              return <Callback />;
            }}
          />
          <Route
            render={(props) => {
              return <App auth={auth} {...props} />;
            }}
          />
        </Switch>
      </Layout>
    </Router>
  );
};
