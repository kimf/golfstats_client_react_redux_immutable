import { applyMiddleware, createStore, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'

import rootReducer from 'reducers'

const middleware = [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...middleware),
    autoRehydrate()
  )
)

persistStore(store)

export default store
