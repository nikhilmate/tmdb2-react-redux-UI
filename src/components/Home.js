import React from 'React';
//import { NavLink } from "react-router-dom";
import Header from './Header';
import Search from './Search';
import HomeBody from './HomeBody';
import SearchBox from './SearchBox';
import Footer from './Footer';
import { connect } from 'react-redux';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="Home">          
        <Header />
        <Search />
        <HomeBody />
        <SearchBox />
        <Footer />
      </div>
    );
  }
}

export default connect()(Home);