import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { getWorkouts } from '../api/workouts-api';
import { Route, useRouteMatch, withRouter } from 'react-router-dom';
import Workout from './Workout';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function WorkoutList(props) {
  const [workoutList, setWorkoutList] = useState([]);
  let { path, url } = useRouteMatch();

  useEffect(() => {
    const loadWorkouts = async () => {
      const workouts = await getWorkouts();
      setWorkoutList(workouts.Items);
    };
    loadWorkouts();
  }, []);

  function createData(workoutName, createdBy, workoutId) {
    return { workoutName, createdBy, workoutId };
  }

  const rows = workoutList.map((workout) => {
    return createData(
      workout.workoutName,
      workout.createdBy,
      workout.workoutId
    );
  });

  const classes = useStyles();
  const handleClick = (workoutId) => {
    props.history.push(`${path}/${workoutId}`);
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Workout Name</TableCell>
            <TableCell align="right">Created By</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.workoutName}>
              <TableCell component="th" scope="row">
                {row.workoutName}
              </TableCell>
              <TableCell align="right">{row.createdBy}</TableCell>
              <TableCell align="right">
                <Button
                  color="secondary"
                  onClick={() => handleClick(row.workoutId)}
                >
                  start
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default withRouter(WorkoutList);
