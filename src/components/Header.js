import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/*
import {
  Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
*/

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  linkChange = (e) => {
    let value = e.target.getAttribute("data-value");
    console.log(value);
    this.props.history.push({
      pathname: '/search',
      search: `?media_type=${value}`,
      state: { media_type: value }
    });
  }

  Linkhome = (e) => {
    this.props.history.push({
      pathname: '/',
      search: ``,
      state: { media_type: '', id : null }
    });
  }

  render() {
    return (
      <div className="header">
        <div className="container">
        <div class="logo">
          <h1 onClick={this.Linkhome}>TMDB<span>2</span></h1>
        </div>
        <div className="nav">
          <div className="navbar">
            <ul>
              <li><a onClick={this.linkChange} data-value="movie">MOVIES</a></li>
              <li><a onClick={this.linkChange} data-value="tv">TV SHOWS</a></li>
              <li><a onClick={this.linkChange} data-value="person">PEOPLE</a></li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(Header));