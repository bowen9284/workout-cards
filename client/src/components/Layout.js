import React, { Fragment } from 'react';
import Navigation from './Navigation';
import Container from '@material-ui/core/Container';

const Layout = (props) => {
  return (
    <Fragment>
      <Navigation />
      <Container maxWidth="lg">
        <div>{props.children}</div>
      </Container>
    </Fragment>
  );
};

export default Layout;
