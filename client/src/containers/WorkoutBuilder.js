import React from 'react';
import Grid from '@material-ui/core/Grid';
import CardInputForm from '../components/CardInputForm';

const WorkoutBuilder = () => {
  console.log('builder');
  return (
    <Grid item>
      <CardInputForm></CardInputForm>
    </Grid>
  );
};

export default WorkoutBuilder;
