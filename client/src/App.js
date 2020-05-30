import React from 'react';
import './App.css';
import Layout from './components/Layout';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import CreateOrChoose from './components/CreateOrChoose';
import WorkoutBuilder from './containers/WorkoutBuilder';
import WorkoutList from './containers/WorkoutList';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/createWorkout" component={WorkoutBuilder} />
          <Route path="/workoutList" component={WorkoutList} />
          <Route path="/" component={CreateOrChoose} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
