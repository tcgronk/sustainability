import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import StoreCard from '../Stores/StoreCard'
import { Link } from 'react-router-dom';
import './CategoryStoreList.css'



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
    let category={categoriesdescription: 'Food & Coffee'}
    const categoryId= parseInt(this.props.match.params.id)
    const categories=this.context.categories
    category=categories.filter(category=>category.categoriesid===categoryId)
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
              <p className='categoryTitle'>{category[0].categoriesdescription}</p>
              <div className="filter-section">
                <label className='gridItem' htmlFor="packaging">Sustainable Packaging?</label>
                <select
                
                type='text'
                className='field'
                name='packaging'
                id='packaging'
                onChange={ e=>this.filterEntryPackaging(e) } required>
                    <option value={ null }>All</option>
                    { packingList }
                </select>
                <label className='gridItem' htmlFor="store-rating"><br/>Rating? {" "}</label>
            <select
            type='text'
            className='field'
            name='storeRating'
            id='storeRating'
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