import { reducers as Header, epics as HeaderEpics } from './Header.js'

export const rootReducer = {
	Header,
}

export const rootEpics = [ ...HeaderEpics ]
