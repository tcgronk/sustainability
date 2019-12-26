import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import StoreCard from '../Stores/StoreCard'



export default class CategoryStoreList extends Component {
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
  

  render(){
    const categoryId= parseInt(this.props.match.params.id)
    const category=this.context.categories[categoryId-1].name
    const packagings = this.context.packaging
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