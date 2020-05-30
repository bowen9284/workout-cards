import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';

const CardInputForm = () => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const workoutOptions = [
    { name: 'squats', value: 'squats' },
    { name: 'bicep curls', value: 'bicepCurls' },
    { name: 'push ups', value: 'pushUps' },
    { name: 'lunges', value: 'lunges' },
    { name: 'crunches', value: 'crunches' },
    { name: '', value: '' },
    { name: '', value: '' },
    { name: '', value: '' },
    { name: '', value: '' },
    { name: '', value: '' },
  ];

  const formik = useFormik({
    initialValues: {
      createdBy: '',
      workoutName: '',
      heartSelect: 'squats',
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
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid item xs={12}>
        <Grid container direction="column" justify="center" spacing={2}>
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
              id="demo-simple-select"
              value={formik.values.heartSelect}
              onChange={handleChange}
            >
              <MenuItem value={'lunges'}>Lunges</MenuItem>
              <MenuItem value={'squats'}>Squats</MenuItem>
              <MenuItem value={'pushups'}>Pushups</MenuItem>
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="heart-select">Hearts</InputLabel>
            <Select
              labelId="heart-select"
              id="demo-simple-select"
              value={formik.values.heartSelect}
              onChange={handleChange}
            >
              <MenuItem value={'lunges'}>Lunges</MenuItem>
              <MenuItem value={'squats'}>Squats</MenuItem>
              <MenuItem value={'pushups'}>Pushups</MenuItem>
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="heart-select">Diamonds</InputLabel>
            <Select
              labelId="heart-select"
              id="demo-simple-select"
              value={formik.values.heartSelect}
              onChange={handleChange}
            >
              <MenuItem value={'lunges'}>Lunges</MenuItem>
              <MenuItem value={'squats'}>Squats</MenuItem>
              <MenuItem value={'pushups'}>Pushups</MenuItem>
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="heart-select">Clubs</InputLabel>
            <Select
              labelId="heart-select"
              id="demo-simple-select"
              value={formik.values.heartSelect}
              onChange={handleChange}
            >
              <MenuItem value={'lunges'}>Lunges</MenuItem>
              <MenuItem value={'squats'}>Squats</MenuItem>
              <MenuItem value={'pushups'}>Pushups</MenuItem>
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="heart-select">Jack</InputLabel>
            <Select
              labelId="heart-select"
              id="demo-simple-select"
              value={formik.values.heartSelect}
              onChange={handleChange}
            >
              <MenuItem value={'lunges'}>Lunges</MenuItem>
              <MenuItem value={'squats'}>Squats</MenuItem>
              <MenuItem value={'pushups'}>Pushups</MenuItem>
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="heart-select">Queen</InputLabel>
            <Select
              labelId="heart-select"
              id="demo-simple-select"
              value={formik.values.heartSelect}
              onChange={handleChange}
            >
              <MenuItem value={'lunges'}>Lunges</MenuItem>
              <MenuItem value={'squats'}>Squats</MenuItem>
              <MenuItem value={'pushups'}>Pushups</MenuItem>
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="heart-select">King</InputLabel>
            <Select
              labelId="heart-select"
              id="demo-simple-select"
              value={formik.values.heartSelect}
              onChange={handleChange}
            >
              <MenuItem value={'lunges'}>Lunges</MenuItem>
              <MenuItem value={'squats'}>Squats</MenuItem>
              <MenuItem value={'pushups'}>Pushups</MenuItem>
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="heart-select">Joker</InputLabel>
            <Select
              labelId="heart-select"
              id="demo-simple-select"
              value={formik.values.heartSelect}
              onChange={handleChange}
            >
              <MenuItem value={'lunges'}>Lunges</MenuItem>
              <MenuItem value={'squats'}>Squats</MenuItem>
              <MenuItem value={'pushups'}>Pushups</MenuItem>
            </Select>
          </Grid>

          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

const classes = makeStyles({
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CardInputForm;
