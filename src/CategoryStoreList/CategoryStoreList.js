import React, {Component} from 'react'
import dummystore from'../dummystore.js';
import ApiContext from '../ApiContext'
import StoreCard from '../Stores/StoreCard'



export default class CategoryStoreList extends Component {
  constructor(props){
    super(props);
    this.state={
      value: '',
    }
  }
  static contextType = ApiContext    

  filterEntry=(e)=>{
    const packing=e.target.value
    this.setState({value: packing})
  }
 

  render(){
    let Arr=[]
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
    console.log(categoryId)
        return (
            <div className="CategoryStoreList">
              <p>{category}</p>
              <div class="filter-section">
                <label htmlFor="packaging"><br/>Packaging:{" "}<br/></label>
                <select
                type='text'
                className='field'
                name='packaging'
                id='packaging'
                ref={packagings }
                onChange={ e=>this.filterEntry(e) } required>
                    <option value={ null }>Select Packaging Type:</option>
                    { packingList }
                </select>
            </div>
            <StoreCard value={this.state.value} id={categoryId}/>

           
          </div>
    );
  


}
}