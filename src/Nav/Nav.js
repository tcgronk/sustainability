import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className="Nav">
        <Link to='/'>Shop Sustainable</Link>
        <br/>
        <Link to='/addstore'><button>Add Store</button></Link>
    </div>
  );
}

export default Nav;