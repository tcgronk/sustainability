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
     


        <ul>
                {stores.map(store =>
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
                    ? <li>Sustainable Packaging?: {packaging.packagingsdescription}</li>
                    : null)}
                    <br/> 
                    {ratings.map(rating =>
                      rating.ratingsid===store.ratingsid
                      ?<li>Rating: {rating.ratingsdescription}</li>
                    : null)}
                    <br/> 
                    <li>Last Modified: {store.lastdatemodified}</li> 
                           
                           <br/> 
                          </>   
                   
                   
                
                
                
                )}
        
                </ul>
            
            </div>
  );



}
}