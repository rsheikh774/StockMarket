import { Outlet, Link } from 'react-router-dom';
import React from 'react';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        <li><a href='/form' >Form</a></li>
      </ul>
      <Outlet />
    </nav>
  );
}

export default Navbar;
