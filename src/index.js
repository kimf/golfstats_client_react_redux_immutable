import React                from 'react';
import ReactDOM             from 'react-dom';
import Root                 from 'containers/Root';
import configureStore       from './stores';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const target = document.getElementById('root');
const store  = configureStore();

const node = <Root routerHistory={createBrowserHistory()} store={store}/>;
ReactDOM.render(node, target);
