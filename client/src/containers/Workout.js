import React, { useEffect, useState, Fragment } from 'react';
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

const Workout = (props) => {
  const classes = useStyles();
  const cardsCopy = [...cards];

  let { workoutId } = useParams();
  let { url } = useRouteMatch();

  const getRandomIndex = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const [workout, setWorkout] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(
    getRandomIndex(0, 53)
  );
  const [buttonAction, setButtonAction] = useState('Start');
  const [deckSize, setDeckSize] = useState(cardsCopy.length);

  useEffect(() => {
    const loadWorkout = async () => {
      const result = await getWorkout(workoutId);
      setWorkout(result[0]);
    };
    loadWorkout();
  },);

  const handleStartClick = () => {
    setDeckSize(deckSize - 1);

    getNextCard();
    setButtonAction('Next Card');
  };

  const handleNextClick = () => {
    cards.splice(currentCardIndex, 1);
    setDeckSize(deckSize - 1);

    console.log('size', deckSize);

    if (deckSize === 1) {
      setButtonAction('Done');
      return;
    }
    
    getNextCard();
  };

  const getNextCard = () => {
    setCurrentCardIndex(getRandomIndex(0, deckSize));
    props.history.push(`${url}/${currentCardIndex}`);
  };

  const handleDoneClick = () => {
    //transition to congrats page
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
    <Fragment>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ minHeight: '50vh' }}
      >
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
          <Grid container spacing={4}>
            <Route exact path={`${url}/:cardIndex`}>
              <WorkoutCard
                currentCard={cards[currentCardIndex]}
                workoutActivity={workout}
              />
            </Route>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Workout;
