import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';

const Navigation = () => {
  return (
    <div className={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6" className={styles.title}>
                <Link to="/">Workout Cards</Link>
              </Typography>
            </Grid>

            <Grid item></Grid>
              <Typography variant="h6" className={styles.title}>
                Login
              </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
export default Navigation;
