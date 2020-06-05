import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useParams, useRouteMatch, Route } from 'react-router-dom';
import { getWorkout } from '../api/workouts-api';
import Grid from '@material-ui/core/Grid';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import cards from '../assets/cards.json';
import WorkoutCard from '../components/WorkoutCard';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import WorkoutFinished from '../components/WorkoutFinished';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 200,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  previewRoot: {
    flexGrow: 1,
  },
  redSuit: {
    color: '#f44336',
    fontSize: '3rem',
  },
  blackSuit: {
    color: '#212121',
  },
}));

const Workout = ({ history }) => {
  const classes = useStyles();

  let { workoutId } = useParams();
  let { url } = useRouteMatch();

  const [expanded, setExpanded] = React.useState(true);
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
    setExpanded(false);
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                10
              </Avatar>
            }
            title={workout.workoutName}
            subheader={workout.createdBy}
          />

          <CardActions>{progressButton(buttonAction)}</CardActions>
          <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.previewRoot}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography paragraph variant="h5">
                    <span className={classes.redSuit}>
                      <i className="fa fa-heart"></i>
                    </span>
                    {workout.heartsActivity}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography paragraph>
                    Diamonds {workout.diamondsActivity}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography paragraph>
                    Clubs {workout.clubsActivity}{' '}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography paragraph>Spades</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography paragraph>Jacks</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography paragraph>Queens</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography paragraph>Kings</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography paragraph>Aces</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography paragraph>Jokers</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>

      <Grid item xs={12}>
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
