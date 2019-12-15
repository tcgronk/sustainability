import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';


export default class App extends Component {

  render(){
  const categories = this.props.categories
  console.log(this.props.stores)
 
  return (
    <div className="List">

      <ul>
        <br/>
      {categories.map(category =>
        <li key={category.id}><Link to={`category/${category.id.toString()}`}><button>{category.name}</button></Link></li>
      )}
       <br/>
      </ul>
    </div>
  );
}
}
