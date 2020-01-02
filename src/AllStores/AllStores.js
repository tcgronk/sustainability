import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom';


export default class AllStores extends Component {

  static contextType = ApiContext    



render(){
      const stores = this.context.stores
      const ratings=this.context.ratings
      const packagings=this.context.packagings
      return (
        <div className="AllStores">
     
        <h2>{stores.length} Stores have been added to Shop Sustainably so far!</h2>
        {stores.map(store =>
        <ul key={store.storeid}>
                
                     <>
                     <br/>   
                        
                    <Link to={`/store/:${store.storeid}`} ><li>{store.storename}</li></Link>
                    <br/> 
                    <li>{store.categories}</li> 
                    <br/> 
                    <li>{store.website}</li> 
                    <br/> 
                    {packagings.map(packaging =>
                    packaging.packagingsid===store.packagingsid
                    ? <li key={packaging.packagingsid}>Sustainable Packaging?: {packaging.packagingsdescription}</li>
                    : null)}
                    <br/> 
                    {ratings.map(rating =>
                      rating.ratingsid===store.ratingsid
                      ?<li key={rating.ratingsid}>Rating: {rating.ratingsdescription}</li>
                    : null)}
                    <br/> 
                    <li>Last Modified: {(store.lastdatemodified).slice(0,10)}</li> 
                           
                           <br/> 
                          </>   
                   
                   
                
                
                
               
        
                </ul>
             )}
            </div>
  );



}
}