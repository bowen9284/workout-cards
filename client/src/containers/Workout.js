import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useParams, useRouteMatch, Route } from 'react-router-dom';
import { getWorkout } from '../api/workouts-api';
import Grid from '@material-ui/core/Grid';
import cards from '../assets/cards.json';
import WorkoutCard from '../components/WorkoutCard';
import WorkoutFinished from '../components/WorkoutFinished';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Workout = ({ history }) => {
  const classes = useStyles();

  let { workoutId } = useParams();
  let { url } = useRouteMatch();

  const [workout, setWorkout] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(null);
  const [buttonAction, setButtonAction] = useState('Start');
  const [deckSize, setDeckSize] = useState(cards.length);

  useEffect(() => {
    const loadWorkout = async () => {
      const result = await getWorkout(workoutId);
      setWorkout(result[0]);
    };
    loadWorkout();
    history.push(`${url}`);
  }, []);

  useEffect(() => {
    if (currentCardIndex) {
      history.push(`${url}/${currentCardIndex}`);
    }
  }, [currentCardIndex]);

  const getRandomIndex = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const handleStartClick = () => {
    setCurrentCardIndex(getRandomIndex(1, 54));
    setDeckSize(deckSize - 1);
    setButtonAction('Next Card');
  };

  const handleNextClick = () => {
    cards.splice(currentCardIndex, 1);
    setDeckSize(deckSize - 1);

    if (deckSize === 0) {
      setButtonAction('Done');
      return;
    }

    getNextCard();
  };

  const getNextCard = () => {
    setCurrentCardIndex(getRandomIndex(0, deckSize));
  };

  const handleDoneClick = () => {
    history.push(`${url}/complete`);
  };

  const progressButton = (action) => {
    switch (action) {
      case 'Next Card':
        return (
          <Button
            onClick={handleNextClick}
            size="small"
            variant="contained"
            color="secondary"
          >
            Next Card
          </Button>
        );
      case 'Done':
        return (
          <Button
            onClick={handleDoneClick}
            size="small"
            variant="contained"
            color="primary"
          >
            Done
          </Button>
        );
      case 'Start':
      default:
        return (
          <Button
            onClick={handleStartClick}
            size="small"
            variant="contained"
            color="primary"
          >
            Start
          </Button>
        );
    }
  };

  return (
    <Grid container spacing={2} alignItems="center" justify="center">
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Name: {workout.workoutName}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Created By: {workout.createdBy}
            </Typography>
            <Typography variant="body2" component="p"></Typography>
          </CardContent>
          <CardActions>{progressButton(buttonAction)}</CardActions>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Name: {workout.workoutName}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Created By: {workout.createdBy}
            </Typography>
            <Typography variant="body2" component="p"></Typography>
          </CardContent>
          <CardActions>{progressButton(buttonAction)}</CardActions>
        </Card>
      </Grid>

      <Grid container spacing={4}>
        <Route path={`${url}/`}></Route>
        <Route exact path={`${url}/:cardIndex`}>
          <WorkoutCard
            currentCard={cards[currentCardIndex]}
            workoutActivity={workout}
          />
        </Route>
        <Route exact path={`${url}/complete`}>
          <WorkoutFinished></WorkoutFinished>
        </Route>
      </Grid>
    </Grid>
  );
};

export default Workout;
