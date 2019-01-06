import React from 'react';
import { connect } from 'react-redux';
//import { withRouter } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import Footer from './Footer';
import QueryBox from './QueryBox';
import CardView from './CardView';
import CastView from './CastView';

function isEmpty(obj) {
  for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }
  return true;
}

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'home_query': props.location.state.query ? props.location.state.query : '',
      'movies': [],
      'tv': [],
      'casts': [],
      'multi' : [],
      'queries' : {},
      'active_tab' : 'movies',
      'media_type' : props.location.state.media_type ? props.location.state.media_type : ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(11, prevProps, prevState, this.state);
    if (prevProps !== prevState) {
      this.setState((prevState) => {
        if (!isEmpty(this.state.queries)) {
          if (prevState.home_query !== this.state.queries.input) {
            return({
              home_query : this.state.queries.input
            });
          }  
        }
      });
      //fetchResultFromNewState();
    }
    /*if (prevProps.location.state.media_type !== this.state.media_type) {
      this.setState({
        media_type : this.props.location.state.media_type
      });
    }*/
    if (prevState.queries !== this.state.queries) {
      if(!isEmpty(this.state.queries)) {
        let movies = [];
        let tv = [];
        let casts = [];
        let queries = this.state.queries;
        switch(queries.type) {
          case 'multi':
            if (queries.input === '') {
              axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&sort_by=${queries.sortby}&include_adult=false&primary_release_year=${queries.year}&with_genres=${queries.genre}`)	
              .then(res => {
                movies = res.data.results;
                this.setState({
                  movies
                });
              });
              axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&sort_by=${queries.sortby}&first_air_date_year=${queries.year}&with_genres=${queries.genre}`)
              .then(res => {
                tv = res.data.results;
                this.setState({
                  tv
                });
              });
              axios.get(`https://api.themoviedb.org/3/search/person?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&page=1`)
              .then(res => {
                casts = res.data.results;
                this.setState({
                  casts
                });
              });
            } else {
              axios.get(`https://api.themoviedb.org/3/search/movie?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&query=${queries.input}&page=1`)	
              .then(res => {
                movies = res.data.results;
                this.setState({
                  movies
                });
              });
              axios.get(`https://api.themoviedb.org/3/search/tv?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&query=${queries.input}&page=1`)
              .then(res => {
                tv = res.data.results;
                this.setState({
                  tv
                });
              });
              axios.get(`https://api.themoviedb.org/3/search/person?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&query=${queries.input}&page=1`)
              .then(res => {
                casts = res.data.results;
                this.setState({
                  casts
                });
              });
            }
            break;
          case 'movie':
            if (queries.input === '') {
              axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&sort_by=${queries.sortby}&include_adult=false&primary_release_year=${queries.year}&with_genres=${queries.genre}`)	
              .then(res => {
                movies = res.data.results;
                this.setState({
                  movies
                });
              });
            } else {
              axios.get(`https://api.themoviedb.org/3/search/movie?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&query=${queries.input}&page=1`)	
              .then(res => {
                movies = res.data.results;
                this.setState({
                  movies
                });
              });
            }
            break;
          case 'tv':
            if (queries.input === '') {
              axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&sort_by=${queries.sortby}&first_air_date_year=${queries.year}&with_genres=${queries.genre}`)
              .then(res => {
                tv = res.data.results;
                this.setState({
                  tv
                });
              });
            } else {
              axios.get(`https://api.themoviedb.org/3/search/tv?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&query=${queries.input}&page=1`)
              .then(res => {
                tv = res.data.results;
                this.setState({
                  tv
                });
              });
            }
            break;
          case 'people':
            if (queries.input === '') {
              axios.get(`https://api.themoviedb.org/3/search/person?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&page=1`)
              .then(res => {
                casts = res.data.results;
                this.setState({
                  casts
                });
              });
            } else {
              axios.get(`https://api.themoviedb.org/3/search/person?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&query=${queries.input}&page=1`)
              .then(res => {
                casts = res.data.results;
                this.setState({
                  casts
                });
              });
            }
            break;
          default :
          console.log("Default");
        }
      }
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.location.state.media_type !== nextProps.location.state.media_type) {
      console.log(this.props.location.state.media_type, nextProps.location.state.media_type);
      this.setState({
        media_type : nextProps.location.state.media_type
      });
      let media_type = nextProps.location.state.media_type;
      if (media_type !== '') {
        switch(media_type) {
          case 'movie':
            axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&sort_by=popularity.desc&include_adult=false&page=1`)	
            .then(res => {
              let movies = res.data.results;
              this.setState({
                movies
              });
            });
            break;
          case 'tv' :
            axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&sort_by=popularity.desc&page=1`)	
            .then(res => {
              let tv = res.data.results;
              this.setState({
                tv
              });
            });
            break;
          case 'person' :
            axios.get(`https://api.themoviedb.org/3/person/popular?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&page=1`)
            .then(res => {
              let casts = res.data.results;
              this.setState({
                casts
              });
            });
            break;
          default :
            console.log("default");
        }
      }
    }
  }

  componentDidMount(){
    let query = this.state.home_query;
    
    let movies = [];
    let tv = [];
    let casts =[];
    
    if (this.state.media_type !== '' && this.state.home_query == '') {
      switch(this.state.media_type) {
        case 'movie':
          axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&sort_by=popularity.desc&include_adult=false&page=1`)	
          .then(res => {
            movies = res.data.results;
            this.setState({
              movies
            });
          });
          console.log("movie");
          break;
        case 'tv' :
          axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&sort_by=popularity.desc&page=1`)	
          .then(res => {
            tv = res.data.results;
            this.setState({
              tv
            });
          });
          console.log("tv");
          break;
        case 'person' :
          axios.get(`https://api.themoviedb.org/3/person/popular?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&page=1`)
          .then(res => {
            casts = res.data.results;
            this.setState({
              casts
            });
          });
          console.log("person");
          break;
        default :
          console.log("default");
      }
    } else if (query !== '') {
      console.log("query");
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&query=${query}`)
      .then(res => {
        movies = res.data.results;
        this.setState({
          movies
        });
      });
      
      axios.get(`https://api.themoviedb.org/3/search/tv?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&query=${query}&page=1`)
      .then(res => {
        tv = res.data.results;
        this.setState({
          tv
        });
      });
      
      axios.get(`https://api.themoviedb.org/3/search/person?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&query=${query}&page=1`)
      .then(res => {
        casts = res.data.results;
        this.setState({
          casts
        });
      });

      axios.get(`https://api.themoviedb.org/3/search/multi?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&query=${query}&page=1`)
      .then(res => {
        let multi = res.data.results;
        this.setState({
          multi
        });
      });      
    }
  }

  onChangeInputField = (obj) => {
    this.setState({
      queries : obj
    });
  }

  tabChange = (e) => {
  	if (e.target.parentNode !== 'active') {
  		e.target.parentNode.className = 'active';
  	}
  	let tab = e.target.getAttribute('data-value');
  	this.setState(() => ({
  		active_tab : tab
  	}));
  }

  render() {
    console.log(this.state);
    // imp do not delete it
    let content = ['movies', 'tv', 'casts'];
    return (
      <div className="searchpage">
        <Header />
        <QueryBox 
          input={this.state.home_query}
          ChangeInputField={this.onChangeInputField}
        />
        <div className="results">
          <div className="container">

              <div className="tabbar">
	              <ul>
	                {
	                  content.map((val, i) => 
	                  this.state.active_tab === val ?
	                  <li className="active" key={i}><a key={i} role="tab" data-toggle="tab" /*href={'#'+val}*/ data-value={val} onClick={this.tabChange}>{val}</a></li>
	                  : <li className="" key={i}><a key={i} role="tab" data-toggle="tab" /*href={'#'+val}*/ data-value={val} onClick={this.tabChange}>{val}</a></li>
	                  )
	                }
	              </ul>
            	</div>
          </div>
          <div className="container">
              <div className="tab-content">
                { 
                  this.state.multi.length < 1 && <p className="alert">No Results</p> 
                }

            		<div className={this.state.active_tab === 'movies' ? "tab-pane fade active in": "tab-pane fade"} id="movies">
                  {
                    this.state.movies.length < 1 &&
                    <p>No Results</p>
                  }
                  <div className="list-movies">
                  {
                    this.state.movies.length > 0 &&
                    this.state.movies.map(movie => 
                    <CardView 
                      content={movie}
                      media_type='movie'
                    />
                    )
                  }
                  </div>
                </div>
            		<div className={this.state.active_tab === 'tv' ? "tab-pane fade active in": "tab-pane fade"} id="tv">
                  {
                    this.state.tv.length < 1 &&
                    <p>No Results</p>
                  }
                  <div className="list-tv">
                  {
                    this.state.tv.length > 0 &&
                    this.state.tv.map(tvs => 
                    <CardView 
                      content={tvs}
                      media_type='tv'
                    />
                    )
                  }
                  </div>
            		</div>
            		<div className={this.state.active_tab === 'casts' ? "tab-pane fade active in": "tab-pane fade"} id="movies">
                  {
                    this.state.casts.length < 1 &&
                    <p>No Results</p>
                  }
                  <div className="list-casts">
                  {
                    this.state.casts.length > 0 &&
                    this.state.casts.map(cast => 
                    <CastView 
                      content={cast}
                    />
                    )
                  }
                  </div>
            		</div>
            	</div>

          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect()(SearchPage);
/*
{ 
              this.state.multi.length < 1 && <p className="alert">No Results</p> 
            }
            {
              this.state.movies.length > 0 &&
              <p>Movies</p>
            }
            <div className="list-movies">
            {
              this.state.movies.length > 0 &&
              this.state.movies.map(movie => 
              <CardView 
                content={movie}
              />
              )
            }
            </div>
            {
              this.state.tv.length > 0 &&
              <p>TV</p>
            }
            <div className="list-tv">
            {
              this.state.tv.length > 0 &&
              this.state.tv.map(tvs => 
              <CardView 
                content={tvs}
              />
              )
            }
            </div>
            {
              this.state.casts.length > 0 &&
              <p>Casts</p>
            }
            <div className="list-casts">
            {
              this.state.casts.length > 0 &&
              this.state.casts.map(cast => 
              <CastView 
                content={cast}
              />
              )
            }


<li class="active"><a role="tab" data-toggle="tab" href="#movies">Movies</a></li>
                <li class=""><a role="tab" data-toggle="tab" href="#tv">TV</a></li>
                <li class=""><a role="tab" data-toggle="tab" href="#people">People</a></li>
              



<QueryBox 
          input={this.state.home_query}
          ChangeInputField={this.onChangeInputField}
        />
        <div className="results">
          <div className="container">
            { 
              this.state.multi.length < 1 && <p className="alert">No Results</p> 
            }
            {
              this.state.movies.length > 0 &&
              <p>Movies</p>
            }
            {
              this.state.movies.length > 0 &&
              this.state.movies.map(movie => 
              <CardView 
                content={movie}
              />
              )
            }
            {
              this.state.tv.length > 0 &&
              <p>TV</p>
            }
            {
              this.state.tv.length > 0 &&
              this.state.tv.map(tvs => 
              <CardView 
                content={tvs}
              />
              )
            }
            {
              this.state.casts.length > 0 &&
              <p>Casts</p>
            }
            {
              this.state.casts.length > 0 &&
              this.state.casts.map(cast => 
              <CastView 
                content={cast}
              />
              )
            }
          </div>
        </div>

if(!isEmpty(this.state.queries)) {
        let movies = [];
        let tv = [];
        let casts = [];
        let queries = this.state.queries;
        switch(queries.type) {
          case 'multi':
            if (queries.input === '') {
              axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&sort_by=${queries.sortby}&include_adult=false&primary_release_year=${queries.year}&with_genres=${queries.genre}`)	
              .then(res => {
                movies = res.data.results;
                this.setState({
                  movies
                });
              });
              axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&sort_by=${queries.sortby}&first_air_date_year=${queries.year}&with_genres=${queries.genre}`)
              .then(res => {
                tv = res.data.results;
                this.setState({
                  tv
                });
              });
              axios.get(`https://api.themoviedb.org/3/search/person?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&page=1`)
              .then(res => {
                casts = res.data.results;
                this.setState({
                  casts
                });
              });
            } else {
              axios.get(`https://api.themoviedb.org/3/search/movie?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&query=${queries.input}&page=1`)	
              .then(res => {
                movies = res.data.results;
                this.setState({
                  movies
                });
              });
              axios.get(`https://api.themoviedb.org/3/search/tv?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&query=${queries.input}&page=1`)
              .then(res => {
                tv = res.data.results;
                this.setState({
                  tv
                });
              });
              axios.get(`https://api.themoviedb.org/3/search/person?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&query=${queries.input}&page=1`)
              .then(res => {
                casts = res.data.results;
                this.setState({
                  casts
                });
              });
            }
          case 'movie':
            if (queries.input === '') {
              axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&sort_by=${queries.sortby}&include_adult=false&primary_release_year=${queries.year}&with_genres=${queries.genre}`)	
              .then(res => {
                movies = res.data.results;
                this.setState({
                  movies
                });
              });
            } else {
              axios.get(`https://api.themoviedb.org/3/search/movie?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&query=${queries.input}&page=1`)	
              .then(res => {
                movies = res.data.results;
                this.setState({
                  movies
                });
              });
            }
          case 'tv':
            if (queries.input === '') {
              axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&sort_by=${queries.sortby}&first_air_date_year=${queries.year}&with_genres=${queries.genre}`)
              .then(res => {
                tv = res.data.results;
                this.setState({
                  tv
                });
              });
            } else {
              axios.get(`https://api.themoviedb.org/3/search/tv?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&query=${queries.input}&page=1`)
              .then(res => {
                tv = res.data.results;
                this.setState({
                  tv
                });
              });
            }
          case 'people':
            if (queries.input === '') {
              axios.get(`https://api.themoviedb.org/3/search/person?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&page=1`)
              .then(res => {
                casts = res.data.results;
                this.setState({
                  casts
                });
              });
            } else {
              axios.get(`https://api.themoviedb.org/3/search/person?api_key=662d8c8ed4562cc2cd4abe9664b04552&language=en-US&query=${queries.input}&page=1`)
              .then(res => {
                casts = res.data.results;
                this.setState({
                  casts
                });
              });
            }
          default :
          console.log("Default");
        }
      }














*/