import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes/AppRouter';
import { Provider } from 'react-redux';

import { addFavourites, changeView } from './actions/moviedb';
import configureStore from './store/configureStore';
const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});

store.dispatch(addFavourites(123,"HITMAN","MOVIES",2018));
store.dispatch(changeView(123, "MOVIES", "HITMAN", 2018, "FUN", "MOST KILLED TIMER"));

import 'normalize.css/normalize.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/style.scss';

const App = (
	<Provider store={store}>
		<AppRouter />	
	</Provider>
);

let app = document.getElementById('app');
ReactDOM.render(App, app);
