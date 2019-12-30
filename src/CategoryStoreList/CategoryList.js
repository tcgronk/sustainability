import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext'


export default class App extends Component {

  static contextType = ApiContext    


  render(){
  const categories = this.context.categories
  return (
    <div className="List">
      <p className='mission'>Want to live more sustainably, but not sure what resources are available? Shop sustainably is a collection of stores that are making efforts to be more sustainable. Know of a sustainable store that more people should know about? Add it to the list!</p>

      <ul>
        <br/>
      {categories.map(category =>
        <li key={category.categoriesid} ><Link to={`category/${category.categoriesid.toString()}`}><button>{category.categoriesdescription}</button></Link></li> 
     
     )}     
        
       <br/>
      </ul>
    </div>
  );
}
}
