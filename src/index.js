import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import configureStore from './stores';
import ohcrash from 'ohcrash';

ohcrash('M28zhqe0eziYXIt6lECbahqY');

const target = document.getElementById('root');
const store = configureStore();

const node = <Root store={store}/>;
ReactDOM.render(node, target);
