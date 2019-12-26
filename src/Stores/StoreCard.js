import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom';


export default class StoreCard extends Component {

  
  static contextType = ApiContext    
    
  
    render(){
    let storeArr=[]
    
    const stores= this.context.stores
    let result=[]
    const id=parseInt(this.props.id,10)
    // storeArr=(stores.filter(store => store.category ===id))
    console.log(id)
    storeArr=[]
    if(this.props.value === 'Yes' || this.props.value === "Somewhat" || this.props.value === "No" || this.props.value === "N/A" ){
      for(let i=0; i<stores.length; i++){
        if(stores[i].packaging===this.props.value && stores[i].category===id ){
          storeArr.push(stores[i])
          
        }

        result=storeArr   
    }
    }

    else for(let i=0; i<stores.length; i++){

      if(stores[i].category===id){
        storeArr.push(stores[i])
        
      }
      result=storeArr
    }
    if(this.props.rating ==="Excellent Sustainability" || this.props.rating ==="Somewhat Sustainable" || this.props.rating ==="Significantly Sustainable"|| this.props.rating ==="Waste-Free"){
    result = result.filter(store => store.rating ===this.props.rating);
    
  }

  
    return (
    <div className="StoreCard">
     


<ul>
        {result.map(store =>
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