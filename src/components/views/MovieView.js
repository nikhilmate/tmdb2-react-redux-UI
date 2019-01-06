import React from 'react';
import { connect } from 'react-redux';
import {
  withRouter
} from 'react-router-dom';
//import { groupArray } from 'group-array';


const PosterView = (props) => (
  <div className="posterview" id={props.id}>
    <div className="poster-container">
      <img src={props.poster_path} />
    </div>
    <div className="poster-title">
      <a>{props.title}</a>
      <p>{props.character}</p>
    </div>
  </div>
);

function filterCrew(crew) {
  let base =  ['Director', 'Writer', 'Story', 'Screenplay'];
  let arr = [];
  //arr = groupArray(crew, 'name');
  return arr;
}

class movieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id : props.id,
      data : props.data,
      movie_add : props.movie_add
    };
  }

  render() {
    let imgPath = "https://image.tmdb.org/t/p/w500";
    let score = parseInt(this.state.data.vote_average * 10);
    let year = (new Date(this.state.data.release_date)).getFullYear();
    let day = (new Date(this.state.data.release_date)).getDate();
    let month = (new Date(this.state.data.release_date)).toLocaleString('en-us', { month: 'long'});
    let runtime = `${parseInt(this.state.data.runtime / 60)}hr ${this.state.data.runtime % 60}min`;
    let casts = [];
    let temp = {
      'id' : null,
      'poster_path' : '',
      'title' : '',
      'character' : ''
    };
    this.state.movie_add.cast.map((cast, i) => {
      if (i >= 6) {
        return;
      } else {
        temp = {
          'id' : cast.id,
          'poster_path' : imgPath + cast.profile_path,
          'title' : cast.name,
          'character' : cast.character
        }
        casts.push(temp);
        temp = {
          'id' : null,
          'poster_path' : '',
          'title' : '',
          'character' : ''
        };
      }
    });
    console.log(filterCrew(this.state.movie_add.crew));

    return (
      <div className="movieview">
        <div className="container">
          <div className="header-info">

            <div className="col-4">
              <div className="poster-img">
                <img src={imgPath + this.state.data.poster_path} />
              </div>
              <div className="cover-img">
                <img src={imgPath + this.state.data.backdrop_path} />
              </div>
            </div>

            <div className="col-8">
              <div className="header-title">

                <div className="row">
                  <div className="title">
                    <h1>{this.state.data.original_title}</h1><span className="year">{year}</span>
                  </div>
                </div>

                <div className="row centering">
                  <div className="score">
                    <div className="score-container">
                      <span>{score}<sup>%</sup></span>
                    </div>
                    <div className="score-title">
                      <span>User score</span>
                    </div>
                  </div>

                  <div className="links">
                    <div className="home-link">
                      <a href={this.state.data.homepage}><img src="images/house.png" /></a>
                      <span>Homepage</span>
                    </div>
                    {
                      this.state.data.video !== 'false' &&
                      <div className="trailer-link">
                        <a href=""><img src="images/trailer.png" /></a>
                        <span>Trailer</span>
                      </div>
                    }
                  </div>
                </div>

                <div className="row paddingTop">
                  <div className="overview-title">
                    <h3>Overview</h3>
                  </div>
                  <div className="overview-content">
                    <p>{this.state.data.overview}</p>
                  </div>
                </div>

                <div className="row paddingTop">
                  <div className="crew-title">
                    <h3>Featured Crew</h3>
                  </div>
                  <div className="crew-members">
                    <div className="member">
                      <h4>Will Beall</h4>
                      <p>Screenplay, Story</p>
                    </div>
                    <div className="member">
                      <h4>Will Beall</h4>
                      <p>Screenplay, Story</p>
                    </div>
                    <div className="member">
                      <h4>Will Beall</h4>
                      <p>Screenplay, Story</p>
                    </div>
                    <div className="member">
                      <h4>Will Beall</h4>
                      <p>Screenplay, Story</p>
                    </div>
                    <div className="member">
                      <h4>Characters David Leslie Johnson-McGoldrick</h4>
                      <p>Screenplay</p>
                    </div>
                    <div className="member">
                      <h4>Will Beall</h4>
                      <p>Screenplay, Story</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="line"></div>

          <div className="content-info">
            <div className="col-4">

              <div className="stats">
                <div className="stats-title">
                  <h3>Status</h3>
                </div>
                <div className="stats-content">
                  <p>{this.state.data.status}</p>
                </div>
              </div>

              <div className="stats">
                <div className="stats-title">
                  <h3>Release Information</h3>
                </div>
                <div className="stats-content">
                  <p>{month+' '+day+', '+year}</p>
                </div>
              </div>

              <div className="stats">
                <div className="stats-title">
                  <h3>Original Language</h3>
                </div>
                <div className="stats-content">
                  <p>{this.state.data.original_language}</p>
                </div>
              </div>

              <div className="stats">
                <div className="stats-title">
                  <h3>Runtime</h3>
                </div>
                <div className="stats-content">
                  <p>{runtime}</p>
                </div>
              </div>

              <div className="stats">
                <div className="stats-title">
                  <h3>Budget</h3>
                </div>
                <div className="stats-content">
                  <p>{this.state.data.budget}</p>
                </div>
              </div>

              <div className="stats">
                <div className="stats-title">
                  <h3>Revenue</h3>
                </div>
                <div className="stats-content">
                  <p>{this.state.data.revenue}</p>
                </div>
              </div>

            </div>

            <div className="col-8">
              <div className="row">
                <div className="genre-title">
                  <h3>Genres</h3>
                </div>
                <div className="genre-content">
                  {
                    this.state.data.genres.map((genre, i) => <a key={i+1}>{genre.name}</a>)
                  }
                </div>
              </div>

              <div className="row paddingTop">
                <div className="casts-title">
                  <h3>Casts</h3>
                </div>
                <div className="casts-content">
                  {
                    casts.map((cast, i) => 
                    <PosterView
                      key={i+1} 
                      id={cast.id}
                      poster_path={cast.poster_path}
                      title={cast.title}
                      character={cast.character}
                    />
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(movieView));