import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom';


export default class Stores extends Component {
  static contextType = ApiContext    

  handleEdit(id){
    const storeid=id
    console.log(storeid)
    this.context.handleStoreId(storeid)
  }

    render(){
    const stores= this.context.stores
    console.log(this.context.handleStoreId)
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

            <Link to='/edit-store'><button onClick={()=>this.handleEdit(id)} >Edit Store</button></Link>
                  </>   
           
           
        
        
        
        )}

        </ul>
    
    </div>
  );
}
}