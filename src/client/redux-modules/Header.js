import { Observable } from 'rxjs'
import Immutable from 'immutable'
import { ajax } from 'rxjs/observable/dom/ajax'

import { Header } from '../constants/ActionTypes.js'
import createReducer from '../redux-helper/createReducer.js'

const $initialState = Immutable.fromJS({})

/* action creator determining the app's action */
const fetchUser = username => ({
  type: Header.FETCH_USER,
  payload: username,
})

const fetchUserFulfilled = payload => ({
  type: Header.FETCH_USER_FULFILLED,
  payload,
})

const fetchUserCancel = () => ({
  type: Header.FETCH_USER_CANCELLED,
})

const fetchUserRejected = payload => ({
  type: Header.FETCH_USER_REJECTED,
  payload,
})

const actions = {
  fetchUser,
  fetchUserCancel,
}


/* redux-observable epics handle the async action */
const	fetchUserEpic = actions$ =>
		actions$
			.ofType(Header.FETCH_USER)
			.mergeMap(action => {
				return ajax
					.getJSON(`https://api.github.com/users/${action.payload}`)
	        .map(response => {
	        	return fetchUserFulfilled(response)
	        })
          .takeUntil(actions$.ofType(Header.FETCH_USER_CANCELLED))
          .catch(error =>
            fetchUserRejected({ error: error.message })
          )
			})

/* reducer handle the app state */
const reducers = createReducer($initialState, {
  [Header.FETCH_USER](state, { payload }) {
    return state.set('isFetching', true)
  },
  [Header.FETCH_USER_FULFILLED](state, { payload }) {
    return state.set('message', payload)
                .set('isFetching', false)
  },
  [Header.FETCH_USER_CANCELLED](state) {
    return state.set('isCancel', true)
  },
  [Header.FETCH_USER_REJECTED](state, { payload }) {
    return state.set('error', payload.error)
  },
})

const epics = [
  fetchUserEpic
]

export { actions, reducers, epics }
