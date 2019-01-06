import { createStore, combineReducers } from 'redux';
import reducer from '../reducers/moviedb';

export default () => {
	const store = createStore(
		combineReducers({
			moviedb : reducer
		})
	);
	return store;
};