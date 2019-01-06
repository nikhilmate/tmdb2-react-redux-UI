import React from 'react';
import { connect } from 'react-redux';
import {
  withRouter
} from 'react-router-dom';

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

const SeasonView = (props) => (
  <div className="season-container">
    <div className="season-cover">
      <img src={props.poster_path} />
    </div>
    <div className="season-details">
      <div className="label">
        <h2>{props.name}</h2>
        <span>{props.year} | {props.episodes} Episodes</span>
      </div>
      <div className="s-overview">
        <p>{props.overview}</p>
      </div>
    </div>
  </div>
);

class TvView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      data: props.data,
      tv_add: props.tv_add,
      view_all_seasons : false
    };
  }

  viewAll = (e) => {
    this.setState((prevState) => ({
      view_all_seasons : !prevState.view_all_seasons
    }));
  }

  render() {
    let imgLogoPath = 'https://image.tmdb.org/t/p/h30/';
    let imgPath = "https://image.tmdb.org/t/p/w500";
    let score = parseInt(this.state.data.vote_average * 10);
    let year = (new Date(this.state.data.first_air_date)).getFullYear();
    let day = (new Date(this.state.data.first_air_date)).getDate();
    let month = (new Date(this.state.data.first_air_date)).toLocaleString('en-us', { month: 'long' });
    let runtime = '';
    this.state.data.episode_run_time.map((time, i) => {
      if (i === this.state.data.episode_run_time.length - 1) {
        runtime = runtime + time + 'm';
      } else {
        runtime = runtime + time + 'm, ';
      }
    });
    let casts = [];
    let temp = {
      'id': null,
      'poster_path': '',
      'title': '',
      'character': ''
    };
    this.state.tv_add.cast.map((cast, i) => {
      if (i >= 6) {
        return;
      } else {
        temp = {
          'id': cast.id,
          'poster_path': imgPath + cast.profile_path,
          'title': cast.name,
          'character': cast.character
        }
        casts.push(temp);
        temp = {
          'id': null,
          'poster_path': '',
          'title': '',
          'character': ''
        };
      }
    });
    let seasons = [];
    let temp1 = {
      'poster_path' : '',
      'name': '',
      'year': '',
      'episodes': '',
      'overview': ''
    };
    this.state.data.seasons.map((season) => {
      temp1 = {
        'poster_path' : imgPath + season.poster_path,
        'name': season.name,
        'year': season.air_date === null ? 'NA' : (new Date(season.air_date)).getFullYear(),
        'episodes': season.episode_count > 0 || season.episode_count !== null ? season.episode_count : 0,
        'overview': season.overview
      } 
      seasons.push(temp1);
      temp1 = {
        'poster_path' : '',
        'name': '',
        'year': '',
        'episodes': '',
        'overview': ''
      };
    });
    
    return (
      <div className="tvview">
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
                    <h1>{this.state.data.name}</h1><span className="year">{year}</span>
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
                      this.state.data.video &&
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
                  <h3>Networks</h3>
                </div>
                <div className="stats-content">
                  {
                    this.state.data.networks.map((net,i) => <p id="network" key={i+1}><img src={imgLogoPath + net.logo_path} alt={net.name}/></p>)
                  }
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
                  <h3>type</h3>
                </div>
                <div className="stats-content">
                  <p>{this.state.data.type}</p>
                </div>
              </div>

              <div className="stats">
                <div className="stats-title">
                  <h3>Origin country</h3>
                </div>
                <div className="stats-content">
                  <p>{this.state.data.origin_country.map(con => con + ' ')}</p>
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
                    this.state.data.genres.map((genre, i) => <a key={i + 1}>{genre.name}</a>)
                  }
                </div>
              </div>
              <div className="row">
                <div className="product-title">
                  <h3>Production componies</h3>
                </div>
                <div className="product-content">
                  {
                    this.state.data.production_companies.map((src, i) => <img src={imgLogoPath + src.logo_path} key={i + 1} id={src.id} alt={src.name} />)
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
                        key={i + 1}
                        id={cast.id}
                        poster_path={cast.poster_path}
                        title={cast.title}
                        character={cast.character}
                      />
                    )
                  }
                </div>
              </div>

              <div className="row">
                <div className="season-title">
                  <h3>Current Season</h3>
                </div>
                  {
                    this.state.view_all_seasons === false ?
                    (<SeasonView 
                      poster_path={seasons[seasons.length-1].poster_path}
                      name={seasons[seasons.length-1].name}
                      year={seasons[seasons.length-1].year}
                      episodes={seasons[seasons.length-1].episodes}
                      overview={seasons[seasons.length-1].overview}
                    />) : (
                      seasons.map((season, i) => 
                        <SeasonView 
                          poster_path={season.poster_path}
                          name={season.name}
                          year={season.year}
                          episodes={season.episodes}
                          overview={season.overview}                       
                        />
                      )
                    )
                  }
                <div className="link-seasons">
                  <a onClick={this.viewAll}>{
                    this.state.view_all_seasons === false ? 'View All Seasons' : 'Toggle Seasons'
                  }</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(TvView));