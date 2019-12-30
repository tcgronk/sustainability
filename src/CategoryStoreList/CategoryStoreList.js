import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import StoreCard from '../Stores/StoreCard'
import { Link } from 'react-router-dom';



export default class CategoryStoreList extends Component {
  constructor(props){
    super(props);
    this.state={
      value: 0,
      rating:0

    }
  }
  static contextType = ApiContext    

  filterEntryPackaging=(e)=>{
    const packing=parseInt(e.target.value,10)
    this.setState({value: packing})
  }
  filterEntryRating=(e)=>{
    const rating=parseInt(e.target.value,10)
    this.setState({rating: rating})
  }
  

  render(){
    const categoryId= parseInt(this.props.match.params.id)
    let category=''
    if(this.context.categories.length>0){
    category=this.context.categories[categoryId-1].categoriesdescription
    }
    else category="Food & Coffee"
    const packagings = this.context.packagings
    const packingList = packagings.map((packaging) => {
        return(
          <option
            key= {packaging.packagingsid}
            value = {packaging.packagingsid}>
            {packaging.packagingsdescription}
          </option>
        )
      })
      const ratings = this.context.ratings
      const options = ratings.map((rating) => {
          return(
            <option
              key= {rating.ratingsid}
              value = {rating.ratingsid}>
              {rating.ratingsdescription}
            </option>
          )
        })
       
        return (
            <div className="CategoryStoreList">
              <div className="back"><Link to='/'><button>Back to All Categories</button></Link></div>
              <p>{category}</p>
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
            ref={this.options }
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