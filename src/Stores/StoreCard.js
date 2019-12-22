import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom';


export default class StoreCard extends Component {
  static contextType = ApiContext    

    render(){
    const stores= this.context.stores
    // const id=parseInt((this.props.match.params.id).slice(1),10)
    const id=parseInt(this.props.id,10)
    console.log(id)
    const storeArr=[]
    for(let i=0; i<stores.length; i++){
      console.log(stores[i].category)
      if(stores[i].category===id){
        storeArr.push(stores[i])
      }
    }
  
    return (
    <div className="StoreCard">
     


<ul>
        {storeArr.map(store =>
             <>
             <br/>   
                    
            <Link to={`/store/:${store.id}`} ><li>{store.storename}</li></Link>
                   
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