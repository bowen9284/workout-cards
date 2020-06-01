import React from 'react';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { v4 as uuid } from 'uuid';
import { withRouter } from 'react-router-dom';

import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import { createWorkout } from '../api/workouts-api';

const CardInputForm = (props) => {
  const workoutOptions = [
    { name: 'Please Select...', value: 'Please Select...' },
    { name: 'squats', value: 'Squats' },
    { name: 'bicep curls', value: 'Bicep Curls' },
    { name: 'push ups', value: 'Push Ups' },
    { name: 'lunges', value: 'Lunges' },
    { name: 'crunches', value: 'Crunches' },
    { name: 'jumping jacks', value: 'Jumping Jacks' },
    { name: 'squat jump', value: 'Squat Jump' },
  ];

  const formik = useFormik({
    initialValues: {
      createdBy: '',
      workoutName: '',
      heartsActivity: workoutOptions[0].name,
      spadesActivity: workoutOptions[0].name,
      clubsActivity: workoutOptions[0].name,
      diamondsActivity: workoutOptions[0].name,
      jacksActivity: workoutOptions[0].name,
      queensActivity: workoutOptions[0].name,
      kingsActivity: workoutOptions[0].name,
      acesActivity: workoutOptions[0].name,
      jokersActivity: workoutOptions[0].name,
      timestamp: workoutOptions[0].name,
    },
    validationSchema: Yup.object({
      createdBy: Yup.string()
        .min(2, 'Must be 2 characters or greater')
        .max(20, 'Must be 15 characters or less')
        .required('Required'),
      workoutName: Yup.string()
        .min(2, 'Must be 2 characters or greater')
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      let workoutToSave = { ...values };
      workoutToSave.workoutId = uuid();

      _handleSubmit(workoutToSave);
    },
  });

  async function _handleSubmit(workout) {
    const result = await createWorkout(props.auth.idToken, workout);
    if (result) {
      props.history.push('/');
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid item xs={12}>
        <Grid
          container
          direction="column"
          justify="center"
          align-items="flex-end"
          spacing={2}
        >
          <Grid item>
            <TextField
              label="Created By"
              name="createdBy"
              onChange={formik.handleChange}
              value={formik.values.createdBy}
            />
            {formik.touched.createdBy && formik.errors.createdBy ? (
              <div>{formik.errors.createdBy}</div>
            ) : null}
          </Grid>
          <Grid item>
            <TextField
              label="Workout name"
              name="workoutName"
              onChange={formik.handleChange}
              value={formik.values.workoutName}
            />
            {formik.touched.workoutName && formik.errors.workoutName ? (
              <div>{formik.errors.workoutName}</div>
            ) : null}
          </Grid>

          <Grid item>
            <InputLabel id="heart-select">Hearts</InputLabel>
            <Select
              labelId="heart-select"
              name="heartsActivity"
              value={formik.values.heartsActivity}
              onChange={formik.handleChange}
            >
              {workoutOptions.map((workout) => (
                <MenuItem key={workout.value} value={workout.value}>
                  {workout.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="spade-select">Spades</InputLabel>
            <Select
              labelId="spade-select"
              name="spadesActivity"
              value={formik.values.spadesActivity}
              onChange={formik.handleChange}
            >
              {workoutOptions.map((workout) => (
                <MenuItem key={workout.value} value={workout.value}>
                  {workout.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="diamond-select">Diamonds</InputLabel>
            <Select
              labelId="diamond-select"
              name="diamondsActivity"
              value={formik.values.diamondsActivity}
              onChange={formik.handleChange}
            >
              {workoutOptions.map((workout) => (
                <MenuItem key={workout.value} value={workout.value}>
                  {workout.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="club-select">Clubs</InputLabel>
            <Select
              labelId="club-select"
              name="clubsActivity"
              value={formik.values.clubsActivity}
              onChange={formik.handleChange}
            >
              {workoutOptions.map((workout) => (
                <MenuItem key={workout.value} value={workout.value}>
                  {workout.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="jack-select">Jack</InputLabel>
            <Select
              labelId="jack-select"
              name="jacksActivity"
              value={formik.values.jacksActivity}
              onChange={formik.handleChange}
            >
              {workoutOptions.map((workout) => (
                <MenuItem key={workout.value} value={workout.value}>
                  {workout.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="queen-select">Queen</InputLabel>
            <Select
              labelId="queen-select"
              name="queensActivity"
              value={formik.values.queensActivity}
              onChange={formik.handleChange}
            >
              {workoutOptions.map((workout) => (
                <MenuItem key={workout.value} value={workout.value}>
                  {workout.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="king-select">King</InputLabel>
            <Select
              labelId="king-select"
              name="kingsActivity"
              value={formik.values.kingsActivity}
              onChange={formik.handleChange}
            >
              {workoutOptions.map((workout) => (
                <MenuItem key={workout.value} value={workout.value}>
                  {workout.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="ace-select">Ace</InputLabel>
            <Select
              labelId="ace-select"
              name="acesActivity"
              value={formik.values.acesActivity}
              onChange={formik.handleChange}
            >
              {workoutOptions.map((workout) => (
                <MenuItem key={workout.value} value={workout.value}>
                  {workout.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="joker-select">Joker</InputLabel>
            <Select
              labelId="joker-select"
              name="jokersActivity"
              value={formik.values.jokersActivity}
              onChange={formik.handleChange}
            >
              {workoutOptions.map((workout) => (
                <MenuItem key={workout.value} value={workout.value}>
                  {workout.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item>
            <Button
              type="submit"
              onSubmit={formik.handleSubmit}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default withRouter(CardInputForm);
