import React from 'react';
import Auth from './auth/Auth';
import { Router, Route, Switch } from 'react-router-dom';
import Callback from './components/Callback';
import createHistory from 'history/createBrowserHistory';
import App from './App';
import Layout from './components/Layout';
import CreateOrChoose from './components/CreateOrChoose';
import WorkoutBuilder from './containers/WorkoutBuilder';
import WorkoutList from './containers/WorkoutList';
import Workout from './containers/Workout';

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
            render={(props: any) => {
              handleAuthentication(props);
              return <Callback />;
            }}
          />
          <Route
            render={(props: any) => {
              return <App auth={auth} {...props} />;
            }}
          />
          <Route path="/createWorkout" component={WorkoutBuilder} />
          <Route path="/workouts/:workoutId" component={Workout} />

          <Route path="/workouts" component={WorkoutList} />

          <Route path="/" component={CreateOrChoose} />
        </Switch>
      </Layout>
    </Router>
  );
};
