import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

import MovieView from './views/MovieView';
import PeopleView from './views/PeopleView';
import TvView from './views/TvView';

function isEmpty(obj) {
  for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }
  return true;
}

class ContentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'id': props.location.state.id,
      'media_type': props.location.state.media_type,
      'data': {},
      'known_for': {},
      'movie_add' : {},
      'tv_add' : {}
    };
  }

  componentDidMount() {
    let id = this.state.id;
    let data = {};

    if (this.state.media_type === 'person') {
      let known_for = {};
      axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US`)
        .then(res => {
          data = res.data;
          this.setState({
            data
          });
        });
      axios.get(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US`)
        .then(res => {
          known_for = res.data;
          this.setState({
            known_for
          });
        });
    }
    if (this.state.media_type === 'movie') {
      let movie_add = {};
      axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US`)
        .then(res => {
          data = res.data;
          this.setState({
            data
          });
        });
      axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US`)
        .then(res => {
          movie_add = res.data;
          this.setState({
            movie_add
          });
        });
    }
    if (this.state.media_type === 'tv') {
      let tv_add = {};
      axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US`)
        .then(res => {
          data = res.data;
          this.setState({
            data
          });
        });
      axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US`)
        .then(res => {
          tv_add = res.data;
          this.setState({
            tv_add
          });
        });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="contentview">
        <Header />
        {
          this.state.media_type === 'person' &&
          !isEmpty(this.state.data) &&
          !isEmpty(this.state.known_for) && 
          <PeopleView
            id={this.state.id}
            data={this.state.data}
            known_for={this.state.known_for}
          />
        }
        {
          this.state.media_type === 'movie' &&
          !isEmpty(this.state.data) &&
          !isEmpty(this.state.movie_add) &&
          <MovieView
            id={this.state.id}
            data={this.state.data}
            movie_add={this.state.movie_add}
          />
        }
        {
          this.state.media_type === 'tv' &&
          !isEmpty(this.state.data) &&
          !isEmpty(this.state.tv_add) &&
          <TvView
            id={this.state.id}
            data={this.state.data}
            tv_add={this.state.tv_add}
          />
        }
        <Footer />
      </div>
    );
  }
}

export default connect()(ContentView);

/*

            data={this.state.data}
            known_for={this.state.known_for}

*/