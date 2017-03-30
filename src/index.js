import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import store from './stores'

const target = document.getElementById('root')
const node = <Root store={store} />

ReactDOM.render(node, target)
