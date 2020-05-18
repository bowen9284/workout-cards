import React from 'react';
import logo from './logo.svg';
import './App.css';
import joker from './assets/J.png';
import Layout from './components/Layout';
import { Switch, Route } from 'react-router-dom';
import CreateOrChoose from './components/CreateOrChoose';
import WorkoutBuilder from './containers/WorkoutBuilder';
import ExistingWorkoutList from './containers/ExistingWorkoutList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Layout>
          <Switch>
            <Route path="/createWorkout" component={WorkoutBuilder} />
            <Route path="/workoutList" component={ExistingWorkoutList} />
            <Route path="/" exact component={CreateOrChoose} />
          </Switch>
        </Layout>
      </header>
    </div>
  );
}

export default App;
