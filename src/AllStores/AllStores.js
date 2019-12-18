import React, {Component} from 'react'

export default class AllStores extends Component {
    render(){
       const stores = this.props.stores
    return (
    <div className="AllStores">
        <ul>
        {stores.map(store =>
             <>
             <br/>   
                    
             <li><a href={store.website} target='_blank' >{store.storename}</a></li> 
                   
            <br/> 
            <li>{store.comments}</li> 
            <br/> 
            <li>{store.packaging}</li> 
            <br/> 
            <li>{store.rating}</li> 
            <br/> 
            <li>{store.lastdatemodified}</li> 
                   
                   <br/> 
                  </>   
           
           
        
        
        
        )}

        </ul>
    </div>
  );
}
}