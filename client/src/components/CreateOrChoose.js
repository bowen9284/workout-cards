import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const CreateOrChoose = (props) => {
  const createWorkoutHandler = () => {
    props.history.push('/createWorkout');
  };

  const chooseWorkoutHandler = () => {
    props.history.push('/workoutList');
  };

  return (
    <Grid
      className={styles.buttonContainer}
      container
      justify="center"
      spacing={5}
    >
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={createWorkoutHandler}
        >
          Create New Workout
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={chooseWorkoutHandler}
        >
          Choose Existing Workout
        </Button>
      </Grid>
    </Grid>
  );
};

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 500,
  },
  control: {
    padding: theme.spacing(2),
  },
  buttonContainer: {
    flex: 1,
    marginTop: 100,
  },
}));

export default withRouter(CreateOrChoose);
