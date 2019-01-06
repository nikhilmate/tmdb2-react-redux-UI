import React from 'react';
import { connect } from 'react-redux';
import {
  withRouter
} from 'react-router-dom';
//import axios from 'axios';


const PosterView = (props) => (
  <div className="posterview" id={props.id}>
    <div className="poster-container">
      <img src={props.poster_path} />
    </div>
    <div className="poster-title">
      <a>{props.title}</a>
    </div>
  </div>
);

// incomplete filtering
function filterCast(cast) {
  if (cast.length < 5) {
    let cast1 = [];
    cast1 = cast.sort(filterArr);
    return cast1;
  } else {
    return cast;
  }
}

function filterByDate(a, b) {
  let dateA = new Date(a.release_date || a.first_air_date);
  let dateB = new Date(b.release_date || b.first_air_date);
  if (dateA > dateB) { return -1; }
  else if(dateA < dateB) { return 1; }
  return 0;      
}

function filterArr(a, b) {
  //let dateA = new Date(a.release_date || a.first_air_date);
      //let dateB = new Date(b.release_date || b.first_air_date);
      //var dateA = new Date(a.release), dateB = new Date(b.release);
            
      if (a.vote_average < b.vote_average) { return 1; }
      if (a.vote_average > b.vote_average) { return -1; }
}

class PeopleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'id': props.id,
      'data': props.data,
      'known_for': props.known_for
    };
  }

  render() {
    let year = (new Date(this.state.data.birthday)).getFullYear();
    let day = (new Date(this.state.data.birthday)).getDate();
    let month = (new Date(this.state.data.birthday)).toLocaleString('en-us', { month: 'long'});
    let altNames = this.state.data.also_known_as;
    let gender = this.state.data.gender === '1' ? 'Female' : (this.state.data.gender === '2' ? 'Male' : 'Female');
    let Biography = this.state.data.biography !== 'undefined' && this.state.data.biography.split("\n\n");
    let imgPath = "https://image.tmdb.org/t/p/w500";
    let movie_known_work = [];
    let tv_known_work = [];
    let temp = {
      'id' : null,
      'poster_path': '',
      'title': ''
    };
    let initialTemp = {
      'id' : null,
      'poster_path': '',
      'title': ''
    };
    let count = 0;
    let sorted1 = [];
    sorted1 = this.state.known_for.cast.sort(function(a, b) {
      if (a.media_type === 'movie' && b.media_type === 'movie') { return 1; }
      else { return 0; }
    });
    let sorted2 = [];
    sorted2 = sorted1.sort(filterArr);
    let sorted3 = [];
    sorted3 = sorted2.sort(filterByDate);

    console.log(sorted3);
    sorted3.map((content, i) => {
      count = i+1;
      if (content.vote_average >= 6.5) {
        if (content.media_type === 'movie') {
          console.log(content);
          temp = {
            'id' : content.id,
            'poster_path' : content.poster_path,
            'title' : content.original_title
          };
          //temp.poster_path = content.poster_path;
          //temp.title = content.original_title;
          movie_known_work.push(temp);
          temp = {
            'id' : null,
            'poster_path': '',
            'title': ''
          };
        }
        if (content.media_type === 'tv') {
          console.log(content);
          temp = {
            'id' : content.id,
            'poster_path' : content.poster_path,
            'title' : content.name
          };
          //temp.poster_path = content.poster_path;
          //temp.title = content.name;
          tv_known_work.push(temp);
          temp = {
            'id' : null,
            'poster_path': '',
            'title': ''
          };
        }
      }
    });
    console.log(movie_known_work, tv_known_work);
    return (
      <div className="peopleview">
        <div className="container">
          <div className="header-info">

            <div className="col-4">
              <div className="profile-img">
                <img src={imgPath + this.state.data.profile_path} />
              </div>
            </div>

            <div className="col-8">
              <div className="header-title">

                <div className="row">
                  <div className="title">
                    <h1>{this.state.data.name}</h1><a href={this.state.data.homepage} target="_blank"><img src="images/house.png" /></a>
                  </div>
                </div>

                <div className="row paddingTop">
                  <div className="biography-title">
                    <h3>Biography</h3>
                  </div>
                  <div className="biography-content">
                    {
                      Biography.map((bio, i) => <p key={i} id={i}>{bio}</p>)
                    }
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="content-info">
            <div className="col-4">
              <h2 className="notValidForGrid">Personal Info</h2>

              <div className="stats">
                <div className="stats-title">
                  <h3>Known For</h3>
                </div>
                <div className="stats-content">
                  <p>{this.state.data.known_for_department}</p>
                </div>
              </div>

              <div className="stats">
                <div className="stats-title">
                  <h3>Gender</h3>
                </div>
                <div className="stats-content">
                  <p>{gender}</p>
                </div>
              </div>

              <div className="stats">
                <div className="stats-title">
                  <h3>Known Credits</h3>
                </div>
                <div className="stats-content">
                  <p>{count}</p>
                </div>
              </div>

              <div className="stats">
                <div className="stats-title">
                  <h3>Birthday</h3>
                </div>
                <div className="stats-content">
                  <p>{month+' '+day+', '+year}</p>
                </div>
              </div>

              <div className="stats">
                <div className="stats-title">
                  <h3>Place of Birth</h3>
                </div>
                <div className="stats-content">
                  <p>{this.state.data.place_of_birth}</p>
                </div>
              </div>

              <div className="stats">
                <div className="stats-title">
                  <h3>Also Known As</h3>
                </div>
                <div className="stats-content">
                  {
                    altNames.map((val, i) => <p key={i} id={i}>{val}</p>)
                  }
                </div>
              </div>

            </div>
            <div className="col-8">
              <div className="row">
                <div className="work-title">
                  <h2>Known Work</h2>
                </div>
                {
                  movie_known_work.length > 0 &&
                  <div>
                    <h4>Movies</h4>
                  </div>
                }
                <div className="work-content">
                  {
                    movie_known_work.map((val, i) =>
                      <PosterView
                        key={i}
                        title={val.title}
                        poster_path={imgPath + val.poster_path}
                      />
                    )
                  }
                </div>
                {
                  tv_known_work.length > 0 &&
                  <div>
                    <h4>TV Shows</h4>
                  </div>
                }
                <div className="work-content">
                  {
                    tv_known_work.map((val, i) => (
                      <PosterView
                        key={i}
                        title={val.title}
                        poster_path={imgPath + val.poster_path}
                      />
                    ))
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

export default withRouter(connect()(PeopleView));



/*
componentDidMount() {
    let id = this.state.id;
    console.log(id);
    let data = {};
    let known_for = {};
      axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US`)
      .then(res => {
        console.log(res);
        datas = res.data;
        this.setState({
          data : datas
        });
      });
      axios.get(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US`)
      .then(res => {
        console.log(res);
        known_for = res.data;
        this.setState({
          known_for
        });
      });
  }


  render() {
    if (this.state.data !== {} && this.state.known_for !== {}) {
      let altNames = this.state.data.also_known_as;
      let gender = this.state.data.gender === '1' ? 'Female' : 'Male';
      let Biography = this.state.data.biography.split("\n\n");
      let imgPath = "https://image.tmdb.org/t/p/w500";
      let movie_known_work = [];
      let tv_known_work = [];
      temp = {
        'poster_path' : '',
        'title' : ''
      };
      initialTemp = {
        'poster_path' : '',
        'title' : ''
      };
      let count = 0;
      this.state.known_for.cast.map((content, i) => {
        count = i;
        if (content.vote_average > 6.3) {
          if (content.media_type === 'movie') {
            temp.poster_path = content.poster_path;
            temp.title = content.original_title;
            movie_known_work.append(temp);
            temp = initialTemp;
          }
          if (content.media_type === 'tv') {
            temp.poster_path = content.poster_path;
            temp.title = content.name;
            tv_known_work.append(temp);
            temp = initialTemp;
          }
        }
      });
    }

    return (
      <div className="peopleview">
        <div className="container">
          <div className="header-info">

            <div className="col-4">
              <div className="profile-img">
                <img src={imgPath + this.state.data.profile_path} />
              </div>
            </div>

            <div className="col-8">
              <div className="header-title">

                <div className="row">
                  <div className="title">
                    <h1>{this.state.data.name}</h1><a href={this.state.data.homepage} target="_blank"><img src="house.png" /></a>
                  </div>
                </div>

                <div className="row paddingTop">
                  <div className="biography-title">
                    <h3>Biography</h3>
                  </div>
                  <div className="biography-content">
                    {
                      Biography.map((bio, i) => <p key={i} id={i}>{bio}</p>)
                    }
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="content-info">
            <div className="col-4">
              <h2 className="notValidForGrid">Personal Info</h2>

              <div className="stats">
                <div className="stats-title">
                  <h3>Known For</h3>
                </div>
                <div className="stats-content">
                  <p>{this.state.data.known_for_department}</p>
                </div>
              </div>

              <div className="stats">
                <div className="stats-title">
                  <h3>Gender</h3>
                </div>
                <div className="stats-content">
                  <p>{gender}</p>
                </div>
              </div>

              <div className="stats">
                <div className="stats-title">
                  <h3>Known Credits</h3>
                </div>
                <div className="stats-content">
                  <p>{count}</p>
                </div>
              </div>

              <div className="stats">
                <div className="stats-title">
                  <h3>Birthday</h3>
                </div>
                <div className="stats-content">
                  <p>{this.state.data.birthday}</p>
                </div>
              </div>

              <div className="stats">
                <div className="stats-title">
                  <h3>Place of Birth</h3>
                </div>
                <div className="stats-content">
                  <p>{this.state.data.place_of_birth}</p>
                </div>
              </div>

              <div className="stats">
                <div className="stats-title">
                  <h3>Also Known As</h3>
                </div>
                <div className="stats-content">
                  {
                    altNames.map((val, i) => <p key={i} id={i}>val</p>)
                  }
                </div>
              </div>

            </div>
            <div className="col-8">
              <div className="row">
                <div className="work-title">
                  <h2>Known Work</h2>
                </div>
                {
                  movie_known_work.length > 0 &&
                  <div>
                    <h4>Movies</h4>
                  </div>
                }
                <div className="work-content">
                  {
                    movie_known_work.map((val, i) => (
                      <div className="posterview">
                        <div className="poster-container">
                          <img src={imgPath + val.poster_path} />
                        </div>
                        <div className="poster-title">
                          <a>{val.title}</a>
                        </div>
                      </div>
                    ))
                  }
                </div>
                {
                  tv_known_work.length > 0 &&
                  <div>
                    <h4>TV Shows</h4>
                  </div>
                }
                <div className="work-content">
                  {
                    tv_known_work.map((val, i) => (
                      <div className="posterview">
                        <div className="poster-container">
                          <img src={imgPath + val.poster_path} />
                        </div>
                        <div className="poster-title">
                          <a>{val.title}</a>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  */