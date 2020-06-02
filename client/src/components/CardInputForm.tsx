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

const CardInputForm: React.FC = (props: any) => {
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

  const selectFields = [
    {
      id: 'hearts-select',
      label: 'Hearts',
      name: 'heartsActivity',
      validation: false,
    },
    {
      id: 'diamonds-select',
      label: 'Diamonds',
      name: 'diamondsActivity',
      validation: false,
    },
    {
      id: 'spade-select',
      label: 'Spades',
      name: 'spadesActivity',
      validation: false,
    },
    {
      id: 'club-select',
      label: 'Clubs',
      name: 'clubsActivity',
      validation: false,
    },
    {
      id: 'jacks-select',
      label: 'Jacks',
      name: 'jacksActivity',
      validation: false,
    },
    {
      id: 'queens-select',
      label: 'Queens',
      name: 'queensActivity',
      validation: false,
    },
    {
      id: 'kings-select',
      label: 'Kings',
      name: 'kingsActivity',
      validation: false,
    },
    {
      id: 'aces-select',
      label: 'Aces',
      name: 'acesActivity',
      validation: false,
    },
    {
      id: 'jokers-select',
      label: 'Jokers',
      name: 'jokersActivity',
      validation: false,
    },
  ];

  interface FormField {
    id: string
    label: string
    name: string
    validation: boolean
  }

  interface Values {
    createdBy: string
    workoutName: string
    heartsActivity: string
    spadesActivity: string
    clubsActivity: string
    diamondsActivity: string
    jacksActivity: string
    queensActivity:string
    kingsActivity: string
    acesActivity: string
    jokersActivity: string
    workoutId?: string
  }

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
      jokersActivity: workoutOptions[0].name
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
    onSubmit: (values: Values) => {
      let workoutToSave = { ...values };
      workoutToSave.workoutId = uuid();

      _handleSubmit(workoutToSave);
      props.history.push('/');
    },
  });

  async function _handleSubmit(workout: any) {
    await createWorkout(props.auth.idToken, workout);
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

          {selectFields.map((sf: FormField) => (
            <Grid item>
              <InputLabel id={sf.id}>{sf.label}</InputLabel>
              <Select
                labelId={sf.id}
                name={sf.name}
                value={formik.values[sf.name as keyof Values]}
                onChange={formik.handleChange}
              >
                {workoutOptions.map((workout) => (
                  <MenuItem key={workout.value} value={workout.value}>
                    {workout.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          ))}

          <Grid item>
            <Button
              type="submit"
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
