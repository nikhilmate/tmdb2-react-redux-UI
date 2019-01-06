import React from 'react';
//import { SelectYear, SelectSortBy, SelectGenres } from './UComponents';


class QueryBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input : this.props.input,
			type : 'multi',
			year : '',
			sortby : 'popularity.desc',
			genre : ''
		};
	}
 
	componentDidUpdate(prevProps, prevState) {
		if (prevState !== this.state) {
			this.props.ChangeInputField(this.state);
		}
		//let queries = this.state;
	}

	onInputChange = (e) => {
		let input = e.target.value;
		this.setState(() => ({
			input
		}));
	}

	onTypeChange = (e) => {
		let type = e.target.value;
		this.setState(() => ({
			type
		}));
	}

	onSelectYearChange = (e) => {
		let year = e.target.value;
		this.setState(() => ({
			year
		}));
	}

	onSelectSortByChange = (e) => {
		let sortby = e.target.value;
		this.setState(() => ({
			sortby
		}));
	}

	onSelectGenresChange = (e) => {
		let genre = e.target.value;
		this.setState(() => ({
			genre
		}));
	}

	render() {
		let arr = [];
		for (var i = 2019; i >= 1900; i--) {
			arr.push(i);
		}
		return(
			<div className="querybox">
				<div className="container">
				<span className="search-tag">?</span>
					<div className="c1">
						<input type="text" value={this.state.input} placeholder="Enter Name of movie, tv show or people" name="main-input" onChange={this.onInputChange}/>
					</div>
				</div>
				<div className="container">
					<div className="c2">
						<div className="filter-option">
							<span className="filter-label">Type</span>
							<select className="type" onChange={this.onTypeChange}>
								<option value="multi">All</option>
								<option value="movie">Movie</option>
								<option value="tv">TV</option>
								<option value="people">Casts</option>
							</select>
						</div>
						<div className="filter-option">
							<span className="filter-label">Year</span>
							<select className="year" onChange={this.onSelectYearChange}>
								<option value="">None</option>
								{ arr.map(year => <option value={year} key={year}>{year}</option>) }
							</select>
						</div>
						<div className="filter-option">
							<span className="filter-label">Sort By</span>
							<select className="sortby" onChange={this.onSelectSortByChange}>
								<option value="popularity.desc">Popularity Descending</option>
								<option value="popularity.asc">Popularity Ascending</option>
								<option value="vote_average.desc">Rating Descending</option>
								<option value="vote_average.asc">Rating Ascending</option>
								<option value="release_date.desc">Release date Descending</option>
								<option value="release_date.asc">Release date Ascending</option>
							</select>							
						</div>
						<div className="filter-option">
						  <span className="filter-label">Genre</span>
							<select className="genres" onChange={this.onSelectGenresChange}>
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
					</div>					
				</div>
			</div>
		);
	}
}

export default QueryBox;

/*
<SelectYear onSelectYearChange={this.onSelectYearChange}/>

<SelectSortBy onSelectSortByChange={this.onSelectSortByChange}/>

<SelectGenres onSelectGenresChange={this.onSelectGenresChange}/>

<div className="filter-option">
						  <span className="filter-label">Keyword</span>
							<input type="text" placeholder="Enter specific keywords" name="keyword" onChange={this.onKeywordChange}/>
						</div>

onKeywordChange = (e) => {
		let keyword = e.target.value;
		this.setState(() => ({
			keyword
		}));
	}

const SelectYear = (props) => (
	<div>
		<select className="year">
			<option value="">None</option>
				
		</select>
	</div>
);



const SelectGenres = (props) => (
	<div>
		<select className="genres">

		</select>
	</div>
);

const SelectSortBy = (props) => (
	<div>
		<select className="sortby" onChange={props.onSelectSortByChange}>
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

const SelectGenres = (props) => (
	<div>
		<select className="genres">

		</select>
	</div>
);
*/