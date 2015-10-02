import { Route }      from 'react-router';
import React          from 'react';
import CoreLayout     from 'layouts/CoreLayout';
import SetupRoundView from 'views/SetupRoundView';

export default (
  <Route component={CoreLayout}>
    <Route name='home' path='/' component={SetupRoundView} />
  </Route>
);
