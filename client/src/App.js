import React from 'react';
import './App.css';
import { Switch, Route, Router } from 'react-router-dom';
import CreateOrChoose from './components/CreateOrChoose';
import WorkoutList from './containers/WorkoutList';
import CardInputForm from './components/CardInputForm';
import Workout from './containers/Workout';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const App = (props) => {
  let classes = useStyles();
  const handleLogin = () => {
    props.auth.login();
  };

  const handleLogout = () => {
    props.auth.logout();
  };

  const logInLogOutButton = () => {
    if (props.auth.isAuthenticated()) {
      return (
        <Button name="logout" variant="contained" onClick={handleLogout}>
          Log Out
        </Button>
      );
    } else {
      return (
        <Button name="login" variant="contained" onClick={handleLogin}>
          Log In
        </Button>
      );
    }
  };

  const generateCurrentPage = () => {
    // if (!props.auth.isAuthenticated()) {
    //   return null;
    // }
    return (
      <Switch>
        <Route
          path="/createWorkout"
          render={() => {
            return <CardInputForm {...props} auth={props.auth} />;
          }}
        />
        <Route path="/workouts/:workoutId" component={Workout} />
        <Route
          path="/workouts"
          render={() => {
            return <WorkoutList {...props} auth={props.auth} />;
          }}
        />
        <Route path="/" component={CreateOrChoose} />
      </Switch>
    );
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Router history={props.history}>
          {generateCurrentPage()}
          {logInLogOutButton()}
        </Router>
      </Grid>
    </Grid>
  );
};

export default App;
