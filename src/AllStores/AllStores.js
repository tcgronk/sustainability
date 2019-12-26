import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext'
import StoreCard from '../Stores/StoreCard'


export default class AllStores extends Component {
  constructor(props){
    super(props);
    this.state={
      value: '',
      rating:''

    }
  }
  static contextType = ApiContext    

  filterEntryPackaging=(e)=>{
    const packing=e.target.value
    this.setState({value: packing})
  }
  filterEntryRating=(e)=>{
    const rating=e.target.value
    this.setState({rating: rating})
  }
  

//     render(){
//        const stores = this.context.stores
//     return (
//     <div className="AllStores">
//         <ul>
//         {stores.map(store =>       
            
//              <>
//              <br/>   
                    
//              <Link to={`store/:${store.id}`} ><li >{store.storename}</li></Link>
                   
//             <br/> 
//             <li >{store.website}</li> 
                   
//                    <br/> 
//             <li >{store.packaging}</li> 
//             <br/> 
//             <li >Rating: {store.rating}</li> 
//             <br/> 
//             <li >Last Modified: {store.lastdatemodified}</li> 
                   
//                    <br/> 
//                   </>   
           
           
        
        
        
//         )}

//         </ul>
//     </div>
//   );
// }
// }


render(){
  const categoryId='all'
  const packagings = this.context.packaging
  console.log(categoryId)
  const packingList = packagings.map((packaging) => {
      return(
        <option
          key= {packaging.packagingid}
          value = {packaging.packagingid}>
          {packaging.description}
        </option>
      )
    })
    const ratings = this.context.ratings
    const options = ratings.map((rating) => {
        return(
          <option
            key= {rating.ratingid}
            value = {rating.ratingid}>
            {rating.description}
          </option>
        )
      })
      return (
          <div className="CategoryStoreList">
            <p>All</p>
            <div className="filter-section">
              <label htmlFor="packaging"><br/>Sustainable Packaging? {" "}<br/></label>
              <select
              type='text'
              className='field'
              name='packaging'
              id='packaging'
              ref={packagings }
              onChange={ e=>this.filterEntryPackaging(e) } required>
                  <option value={ null }>All</option>
                  { packingList }
              </select>
              <label htmlFor="store-rating"><br/>Rating? {" "}<br/></label>
          <select
          type='text'
          className='field'
          name='storeRating'
          id='storeRating'
          ref={this.context.options }
          onChange={ e=>this.filterEntryRating(e) } required>
          <option value={ null }>All</option>
              { options }
          </select>
          </div>
          <StoreCard  value={this.state.value} rating={this.state.rating} id={categoryId}/>

         
        </div>
  );



}
}