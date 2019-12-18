import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className="Nav">
        <Link to='/'><h1>Shop Sustainably</h1></Link>
        <Link to='/addstore'><button>Add Store</button></Link>
    </div>
  );
}

export default Nav;