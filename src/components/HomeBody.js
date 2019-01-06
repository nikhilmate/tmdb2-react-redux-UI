import React from 'react';

class HomeBody extends React.Component {
  render() {
    return (
      <div className="homebody">
        <div className="jumbotron">
          <div className="first container">
            <div className="col-5 minmax">
              <p>thisis jumbotron</p>
            </div>
            <div className="col-7">
              <img src="images/home.jpg" className="tmbi-pic"/>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default HomeBody;