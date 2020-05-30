import React from 'react';
import { withRouter } from 'react-router-dom';

import { Grid } from '@material-ui/core';

function WorkoutList(props) {

  const someText = 'atagsga';
  console.log('this component');
  return (
    <Grid item>
      {someText}
      <div>Workout List</div>
    </Grid>
  );
};

export default withRouter(WorkoutList);
