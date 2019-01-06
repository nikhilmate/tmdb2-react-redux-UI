import React from 'react';
import axios from 'axios';
import CardView from './CardView';
import CastView from './CastView';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'movies': [],
      'tv' : [],
      'casts' : []
    };
  }
  
  componentDidMount() {
    let movies = [];
    let tv = [];
    let casts = [];
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=`)
    .then(res => {
      for (let i = 0; i < 4; i++) {
        movies.push(res.data.results[i]);
      }
      this.setState({
        movies
      });
    });
    axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`)
    .then(res => {
      for (let i = 0; i < 4; i++) {
        tv.push(res.data.results[i]);
      }
      this.setState({
        tv
      });
    });
    axios.get(`https://api.themoviedb.org/3/person/popular?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&page=1`)
    .then(res => {
      for (let i = 0; i < 8; i++) {
        casts.push(res.data.results[i]);
      }
      this.setState({
        casts
      });
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="searchbox">
        <div className="container blacker">
          <h1>CONTENTS</h1>
        </div>
        <div className="container">
          <h2>MOVIES</h2>
          <div className="list-movies">
            {
              this.state.movies.length > 0 &&
              this.state.movies.map((movie) => 
              (<CardView 
                content={movie}
                media_type="movie"
              />))
            }
          </div>  
          <h2>TV SHOWS</h2>
          <div className="list-tv">
            {
              this.state.tv.length > 0 &&
              this.state.tv.map((tv) => 
              (<CardView 
                content={tv}
                media_type="tv"
              />))
            }
          </div>
          <h2>CASTS</h2>
          <div className="list-casts">
            {
              this.state.casts.length > 0 &&
              this.state.casts.map((cast) => 
              (<CastView 
                content={cast}
              />))
            }
          </div>
          
        </div>
      </div>
    );
  }
}

export default SearchBox;
