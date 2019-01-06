import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import {
	withRouter
} from 'react-router-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_query : ''
    };
  }
  
  queryChange = (e) => {
    e.preventDefault();
    let query = e.target.value;
    this.setState(() => ({ search_query : query }));
  }

  queryOnSubmit = (e) => {
    e.preventDefault();
    if (!(this.state.search_query == '')) {
      //this.props.history.push('/search');
      this.props.history.push({
        pathname: '/search',
        search: `?query=${this.state.search_query}`,
        state: { query : this.state.search_query }
      });
    }
  };

  render() {
    return (
      <div className="search">
        <div className="container">

          <div className="Greetings">
            <h1 class="title">THE TMDB2</h1>
            <h3 class="intro">Welcome to the <span className="content-changer">movie</span> search portal!</h3>
            <p class="label">Search movie by <span class="keyload">GENRE</span></p>
          </div>

          <div className="search-form">
            <p>Do instant search!</p>
            <form>
              <input onChange={this.queryChange} type="text" name="search-query" placeholder="Movie, tv, cast etc" />
              <button onClick={this.queryOnSubmit} className="search-btn">Go</button>
            </form>
          </div>

        </div>
        <div className="by container">
          <p>By</p>
        </div>
        <div className="second container">
          <div className="col-3">
            <Button>RATING</Button>
          </div>
          <div className="col-3">
            <Button>POPULARITY</Button>
          </div>
          <div className="col-3">
            <Button>GENRE</Button>
          </div>
          <div className="col-3">
            <Button>YEAR</Button>
          </div>

        </div>
      </div>
    );
  }
}
//map state to props simply a provider-consumer connection method parent component dos not need to send data to child it just save it in store and access by any component from method mapstatetoprops and same goes to dispatch method.
export default withRouter(connect()(Search));