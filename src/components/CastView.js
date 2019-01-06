import React from 'react';
import { connect } from 'react-redux';
import {
	withRouter
} from 'react-router-dom';

class CastView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : props.content
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.content !== nextProps.content) {
      this.setState({
        data: nextProps.content,
      });
    }
  }

  eventTrigger = (e) => {
    this.props.history.push({
      pathname: '/view',
      view: `?id=${this.state.data.id}&media_type=person`,
      state: { id : this.state.data.id, media_type: 'person' }
    });
  }

  render() {
    let imgUrl = 'https://image.tmdb.org/t/p/w235_and_h235_face';
    let work = [];
    this.state.data.known_for.map((val, i) => {
      work[i] = val.original_name || val.original_title;
    });
    return (
      <div className="castview" onClick={this.eventTrigger}>
        <div className="cast-cover">
          <img src={ imgUrl + this.state.data.profile_path } />
        </div>
        <div className="cast-details">
          <div className="name">
            <p>{this.state.data.name}</p>
          </div>
          <div className="known-for">
            <p>{ work.map((el, i) => i < work.length-1 ? (el + ', ') : (el))}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(CastView));