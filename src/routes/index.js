import { Route }      from 'react-router';
import React          from 'react';
import CoreLayout     from 'layouts/CoreLayout';

import SetupRoundContainer from 'containers/SetupRoundContainer';
import PlayContainer       from 'containers/PlayContainer';

export default (
  <Route component={CoreLayout}>
    <Route name='home' path='/' component={SetupRoundContainer} />
    <Route name='play' path='/play/:index' component={PlayContainer} />
  </Route>
);
