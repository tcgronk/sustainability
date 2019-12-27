import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom';


export default class AllStores extends Component {

  static contextType = ApiContext    



render(){
      const stores = this.context.stores
      return (
        <div className="AllStores">
     


        <ul>
                {stores.map(store =>
                     <>
                     <br/>   
                        
                    <Link to={`/store/:${store.id}`} ><li>{store.storename}</li></Link>
                    <br/> 
                    <li>{store.category}</li> 
                    <br/> 
                    <li>{store.website}</li> 
                    <br/> 
                    <li>{store.packaging}</li> 
                    <br/> 
                    <li>Rating:{store.rating}</li> 
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