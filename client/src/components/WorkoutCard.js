import React from 'react';
import Grid from '@material-ui/core/Grid';
import { CardMedia } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const WorkoutCard = ({currentCard, workoutActivity}) => {

  if (!currentCard) {
    return null;
  }
  console.log('currentcard', currentCard);
  const image = require(`../assets${currentCard.image}`);

  const currentExerciseContent = () => {
    let result = '';
    if (typeof currentCard.value === 'string') {
      switch (currentCard.value) {
        case 'J':
          result = 'jacksActivity';
          break;
        case 'Q':
          result = 'queensActivity';
          break;
        case 'K':
          result = 'kingsActivity';
          break;
        case 'A':
          result = 'acesActivity';
          break;
        case 'JO':
          result = 'jokersActivity';
          break;
        default:
          result = ' ';
      }
    } else {
      result = Object.keys(workoutActivity).filter((workout) =>
        workout.includes(currentCard.suit)
      );
    }

    return (
      <CardContent style={styles.content}>
        <Typography component="h5" variant="h5">
          {workoutActivity[result]}
        </Typography>{' '}
        <Typography variant="subtitle1" color="textSecondary">
          {currentCard.value} of {currentCard.suit}
        </Typography>
      </CardContent>
    );
  };

  //   const cardDetail = () => {
  //       switch (cardActivity) {
  //           default
  //       }

  //       return (<div>afwfag</div>)
  //   }

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ minHeight: '50vh' }}
    >
      <Grid item>
        <Card style={styles.root}>
          <CardMedia
            image={image}
            title="Current Card"
            style={styles.cardImage}
          />
          <div style={styles.details}>
            <CardContent style={styles.content}>
              {currentExerciseContent()}
            </CardContent>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

const styles = {
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cardImage: {
    margin: 20,
    minHeight: 278,
    minWidth: 180,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 2,
    paddingBottom: 2,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
};

export default WorkoutCard;
