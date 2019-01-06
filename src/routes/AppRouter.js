import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../components/Home';
import Movies from '../components/Movies';
import Tv from '../components/Tv';
import SearchPage from '../components/SearchPage';
import NotFoundPage from '../components/NotFoundPage';
import ContentView from '../components/ContentView';

const AppRouter = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" exact={true} component={Home} />
			<Route path="/search/" exact={true} component={SearchPage} />
			<Route path="/search/movies" exact={true} component={Movies} />
			<Route path="/search/tv" exact={true} component={Tv} />
			<Route path="/view" exact={true} component={ContentView} />
			<Route component={NotFoundPage} />
		</Switch>
	</BrowserRouter>
);

//<Route path="/search/anime/" exact={true} component={anime} />

export default AppRouter;