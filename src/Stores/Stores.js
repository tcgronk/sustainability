import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom';
import config from '../config'


export default class Stores extends Component {
  static contextType = ApiContext    

  handleEdit(id){
    const storeid=id
    this.context.handleStoreId(storeid)
  }
  handleClickDelete = e => {
    e.preventDefault()
    const storeid = parseInt((this.props.match.params.id).slice(1),10)
    console.log(storeid)
    fetch(`${config.API_BASE_URL}/api/stores/${storeid}`, {
      method: 'DELETE',
      
      headers: {
        'content-type': 'application/json'
      },
    })
  
      .then(res => {
        if(!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
      })
      .then(() => {
        
        this.context.handleDeleteStore(storeid)
        this.props.history.push(`/`)
        
      })
      .catch(error => {
        console.error({ error })
      })

  }

    render(){
    const stores= this.context.stores
    const id=parseInt((this.props.match.params.id).slice(1),10)
    const storeArr=[]
    for(let i=0; i<stores.length; i++){
      if(stores[i].storeid===id){
        storeArr.push(stores[i])
      }
    }
    const ratings=this.context.ratings
    const packagings=this.context.packagings

  
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
            <li>{store.lastdatemodified}</li> 
                   
                   <br/> 

            <Link to='/edit-store'><button onClick={()=>this.handleEdit(id)} >Edit Store</button></Link>
                    
           
           <button className='store__delete'
          type='button'
          onClick={this.handleClickDelete}>Delete Store</button>

           </> 
        
        
        )}

        </ul>
    
    </div>
  );
}
}