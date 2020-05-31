import React from 'react';
import './App.css';
import Layout from './components/Layout';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import CreateOrChoose from './components/CreateOrChoose';
import WorkoutBuilder from './containers/WorkoutBuilder';
import WorkoutList from './containers/WorkoutList';
import Workout from './containers/Workout';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/createWorkout" component={WorkoutBuilder} />
          <Route path="/workouts/:workoutId" component={Workout} />
          <Route path="/workouts" component={WorkoutList} />
          <Route path="/" component={CreateOrChoose} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
