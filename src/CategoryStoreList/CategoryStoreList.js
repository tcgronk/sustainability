import React, {Component} from 'react'
import dummystore from'../dummystore.js';
import ApiContext from '../ApiContext'
import StoreCard from '../Stores/StoreCard'



export default class CategoryStoreList extends Component {
  static contextType = ApiContext    


  render(){

    
    const categoryId= parseInt(this.props.match.params.id)
    // const stores=this.context.stores
    // const category=this.context.categories
    // const storeArr=[]
    // console.log(categoryId)
    // for(let i=0; i<stores.length; i++){
    //   console.log(stores[i].category)
    //   if(stores[i].category===categoryId){
    //     storeArr.push(stores[i])
    //   }
    // }
    console.log(categoryId)
        return (
            <div className="CategoryStoreList">

            <StoreCard id={categoryId}/>

           
          </div>
    );
  


}
}