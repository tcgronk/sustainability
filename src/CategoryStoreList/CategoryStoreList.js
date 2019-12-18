import React, {Component} from 'react'
import dummystore from'../dummystore.js';
import ApiContext from '../ApiContext'



export default class CategoryStoreList extends Component {
  static contextType = ApiContext    


  render(){

    
    const categoryId= this.props.match.params.id
    const stores=this.context.stores
    const category=this.context.categories
    const storeArr=[]
    console.log(categoryId)
    for(let i=0; i<stores.length; i++){
      console.log(stores[i].category)
      if(stores[i].category.toString()===categoryId){
        storeArr.push(stores[i])
      }
    }
    console.log(storeArr)
        return (
            <div className="CategoryStoreList">

            <ul>
              
              {storeArr.map((item) =>
              <>
               <li>{item.storename}</li>
               <br/>   
                
                <li>{item.website}</li> 
               
                <br/> 
                <li>{item.comments}</li> 
              <br/> 
                <li>{item.packaging}</li> 
                <br/> 
                <li>{item.rating}</li> 
                <br/> 
                <li>{item.lastdatemodified}</li> 
               
               <br/> 
              </>        
              )}

            <br/>
            </ul>
          </div>
    );
  


}
}