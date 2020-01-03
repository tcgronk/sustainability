import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTshirt, faGem, faHome, faBone, faStar, faBath, faCoffee, faFootballBall} from '@fortawesome/free-solid-svg-icons';
import './CategoryList.css'

library.add(faTshirt,faGem, faHome, faBone, faStar, faBath, faCoffee, faFootballBall);

export default class App extends Component {

  static contextType = ApiContext    


  render(){
  const categories = this.context.categories
  return (
    <div className="List">
      <p className='mission'>Want to live more sustainably, but not sure what resources are available? <br/><br/> Shop sustainably is a collection of stores that are making efforts to be more sustainable. Know of a sustainable store that more people should know about? Add it to the list!</p>
      <br/><br/> 
      <ul className='grid' >
      {/* <ul > */}

      
      {categories.map(category =>

        
       <li key={category.categoriesid} ><Link to={`category/${category.categoriesid.toString()}`}><button className='iconButton' ><FontAwesomeIcon className='icon' icon={(category.icons).slice(7)}/> <br/><br/>{category.categoriesdescription}</button></Link></li> 
 
     )}     
        
       <br/>
      </ul>
    </div>
  );
}
}
