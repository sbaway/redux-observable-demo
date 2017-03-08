import { createStore, combineReducers, applyMiddleware } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { rootReducer, rootEpics }  from '../redux-modules'

export default function(initialState) {
	const epics = combineEpics(...rootEpics)
	const epicMiddleware = createEpicMiddleware(epics)
  const reducers = combineReducers(rootReducer)
  return createStore(reducers, initialState, applyMiddleware(epicMiddleware))
}
