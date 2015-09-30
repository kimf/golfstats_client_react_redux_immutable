import React                from 'react';
import ReactDOM             from 'react-dom';
import Root                 from 'containers/Root';
import configureStore       from './stores';

const target = document.getElementById('root');
const store  = configureStore();

const node = <Root store={store}/>;
ReactDOM.render(node, target);
