import React from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const CreateOrChoose = (props) => {
  let history = useHistory();

  const createWorkoutHandler = () => {
    history.push('/createWorkout');
  };

  const chooseWorkoutHandler = () => {
    history.push('/workoutList');
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
          onClick={createWorkoutHandler}
          variant="contained"
          color="secondary"
          size="large"
        >
          Create New Workout
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={chooseWorkoutHandler}
          variant="contained"
          color="secondary"
          size="large"
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
    marginTop: 100,
  },
}));

export default CreateOrChoose;
