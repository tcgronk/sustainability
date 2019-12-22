import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext'


export default class App extends Component {

  static contextType = ApiContext    


  render(){
  const categories = this.context.categories
  return (
    <div className="List">

      <ul>
        <br/>
      {categories.map(category =>
        <li key={category.id} ><Link to={`category/${category.id.toString()}`}><button>{category.name}</button></Link></li> 
     
     )}     
        
       <br/>
      </ul>
    </div>
  );
}
}
