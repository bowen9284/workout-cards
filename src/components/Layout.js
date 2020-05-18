import React, { Fragment } from 'react';
import Navigation from './Navigation';

import CreateOrChoose from './CreateOrChoose';

const Layout = () => {
  return (
    <Fragment>
      <Navigation></Navigation>
      <CreateOrChoose></CreateOrChoose>
    </Fragment>
  );
};



export default Layout;
