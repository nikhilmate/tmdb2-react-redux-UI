import React from 'react';
import { findGenre, dateConvert } from './Ufunctions';
//import { connect } from 'react-redux';
import {
	withRouter
} from 'react-router-dom';

class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : props.content,
      media_type : props.media_type
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.content !== nextProps.content) {
      this.setState({
        data: nextProps.content,
        media_type : nextProps.media_type
      });
    }
  }
  
  redirection = (e) => {
    console.log(this.state.media_type);
    if (this.state.media_type === 'movie') {
      this.props.history.push({
        pathname: '/view',
        search: `?id=${this.state.data.id}&media_type=movie`,
        state: { id : this.state.data.id, media_type: 'movie' }
      });
    } else if (this.state.media_type === 'tv') {
      this.props.history.push({
        pathname: '/view',
        search: `?id=${this.state.data.id}&media_type=tv`,
        state: { id : this.state.data.id, media_type: 'tv' }
      });
    }
  };

  render() {
    let year = (new Date(this.state.data.release_date || this.state.data.first_air_date)).getFullYear();
    let day = (new Date(this.state.data.release_date || this.state.data.first_air_date)).getDate();
    let month = (new Date(this.state.data.release_date || this.state.data.first_air_date)).toLocaleString('en-us', { month: 'long'});
    let imgUrl = 'https://image.tmdb.org/t/p/w500';
    let score = parseInt(this.state.data.vote_average * 10);
    let genres = [];
    this.state.data.genre_ids.map((genre, i) => {
      genres[i] = findGenre(genre);
    });
    return(
      <div className="cardview">
        
        <div className="cover">
            <img src={imgUrl + this.state.data.poster_path} />           
        </div>

        <div className="details">
            
            <div className="head-container">
              <div className="score-container">
                 <span>{score}</span>
              </div>
              <div className="title-container">
                  <div className="title"> 
                     <h3>{this.state.data.title || this.state.data.name}</h3>
                  </div>
                  <div className="date">
                      <p>{month+' '+day+', '+year}</p>
                  </div>  
              </div>          
            </div>

            <div className="genre">
              <p><b>Genre: </b>
              { genres.map((genre, i) => i < genres.length-1 ? (genre + ', ') : (genre)) }
              </p>
            </div>

            <div className="overview">
              <p>{this.state.data.overview}</p>
            </div>

            <div className="more">
              <a onClick={this.redirection}>...More Info</a>
            </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CardView);