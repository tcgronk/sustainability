import React, {Component} from 'react'
import ApiContext from '../ApiContext'


export default class Stores extends Component {
  static contextType = ApiContext    

    render(){
    const stores= this.context.stores
    console.log(stores)
    const id=parseInt((this.props.match.params.id).slice(1),10)
    console.log(id)
    const storeArr=[]
    for(let i=0; i<stores.length; i++){
      console.log(stores[i].category)
      if(stores[i].id===id){
        storeArr.push(stores[i])
      }
    }
  
    return (
    <div className="Stores">
     


<ul>
        {storeArr.map(store =>
             <>
             <br/>   
                    
             <li>{store.storename}</li>
                   
            <br/> 
            <li>{store.website}</li> 
                   
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