import React from 'react';

export class SelectYear extends React.Component {
	constructor(props) {
		super(props);
	}

	onSelectChange = (e) => {
		let year = e.target.value;
		this.props.onSelectYearChange(year);
	}

	render() {
		let arr = [];
		for (var i = 2019; i >= 1900; i--) {
			arr.push(i);
		}
		return(
			<div>
				<select className="year" onChange={this.onSelectChange}>
					<option value="">None</option>
					{ arr.map(year => <option value={year} key={year}>{year}</option>) }
				</select>
			</div>
		);
	}
}

//this is select sort 
export class SelectSortBy extends React.Component {
	constructor(props) {
		super(props);
	}

	onSelectChange = (e) =>  {
		let sortby = e.target.value;
		this.props.onSelectSortByChange(sortby);
	}

	render() {
		return(
			<div>
				<select className="sortby" onChange={this.onSelectChange}>
					<option value="popularity_descending">Popularity Descending</option>
					<option value="popularity_ascending">Popularity Ascending</option>
					<option value="rating_descending">Rating Descending</option>
					<option value="rating_ascending">Rating Ascending</option>
					<option value="release_date_descending">Release date Descending</option>
					<option value="release_date_Ascending">Release date Ascending</option>
					<option value="Title_A_Z">Title(A-Z)</option>
					<option value="Title_Z_A">Title(Z-A)</option>
				</select>
			</div>
		);
	}
}

export class SelectGenres extends React.Component {
	constructor(props) {
		super(props);
	}

	onSelectChange = (e) =>  {
		let genres = e.target.value;
		this.props.onSelectGenresChange(genres);
	}

	render() {
		return(
			<div>
				<select className="genres" onChange={this.onSelectChange}>
					<option value="">Default</option>
					<option value="28">Action</option>
					<option value="12">Adventure</option>
					<option value="16">Animation</option>
					<option value="35">Comedy</option>
					<option value="80">Crime</option>
					<option value="19">Documentary</option>
					<option value="18">Drama</option>
					<option value="10751">Family</option>
					<option value="14">Fantasy</option>
					<option value="36">History</option>
					<option value="27">Horror</option>
					<option value="10402">Music</option>
					<option value="9648">Mystery</option>
					<option value="10749">Romance</option>
					<option value="878">Science Fiction</option>
					<option value="10770">TV Movie</option>
					<option value="53">Thriller</option>
					<option value="10752">War</option>
					<option value="37">Western</option>
				</select>
			</div>
		);
	}
}