import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

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

const WorkoutFinished = () => {
  const classes = useStyles();

  return (
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
              Congratulations!
            </Typography>

            <Typography variant="body2" component="p">
              wegwegwegwgeewg
            </Typography>
          </CardContent>
          {/* <CardActions>{progressButton(buttonAction)}</CardActions> */}
        </Card>
      </Grid>
    </Grid>
  );
};

export default WorkoutFinished;
