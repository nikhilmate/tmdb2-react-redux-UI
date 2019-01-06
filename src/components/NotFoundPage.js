import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <h1>Not Found!</h1>
    <NavLink to='/Home' exact={true}>Home</NavLink>
  </div>
);

export default NotFoundPage;