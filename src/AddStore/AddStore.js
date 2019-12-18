import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import { getDefaultWatermarks } from 'istanbul-lib-report';




export default class AddStore extends Component {
    constructor(props){
        super(props);
        this.state={
            formValid:true
        }
    }
    static contextType = ApiContext

    validateEntry=(e)=>{
        e.preventDefault();
       
 

        //add testing

        this.setState({
            formValid: true
        })

        

    }

    handleSubmit(e){
        e.preventDefault();
        let categoryid=e.target['categories'].value
        if(categoryid==="Food & Coffee"){
            categoryid =1
        }
        else if(categoryid==="Clothing"){
            categoryid =2
        }
        else if(categoryid==="Luxury Goods"){
            categoryid =3
        }
        else if(categoryid==="Homeware"){
            categoryid =4
        }
        else if(categoryid==="Beauty"){
            categoryid =5
        }
        else categoryid='Null'
        let date=new Date();
        let today=(date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear()
        const store = {
            storename: e.target['storename'].value,
            website: e.target['website'].value,
            lastdatemodified: today,
            comments: e.target['comments'].value,
            packaging: e.target['packaging'].value,
            categoryname: e.target['categories'].value,
            category: categoryid,
            rating: e.target['storeRating'].value

        }
        this.context.handleAddStore(store)
        this.props.history.push(`/`)
    }

    handleCancelAdd = () => {
        this.props.history.push(`/`)
      }

  render(){
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
      const categories = this.context.categories
      const categoryList = categories.map((category) => {
          return(
            <option
              key= {category.categoryid}
              value = {category.categoryid}>
              {category.name}
            </option>
          )
        })
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
  return (
    <div className="Add-Store">
        <p>Add a New Store</p>
        <section>
        <form id="record-store"  onSubmit={e => this.handleSubmit(e)}>
            <div class="form-section">
            <label for="storename">Store Name</label>
            <input type="text" name="storename"id="storename" placeholder="Store Name" value={this.storename} onChange={e => this.validateEntry(e)} required/>
            <label for="website">Website</label>
            <textarea name="website" rows="1" id="website" value={this.website} onChange={e => this.validateEntry(e)} required></textarea>
            <br/>
            <label for="comments">Sustainable Business Practices</label>
            <br/>
            <textarea name="comments" rows="12" id="comments" value={this.comments} onChange={e => this.validateEntry(e)} required></textarea>
            </div>
            <br/>
            <div>
                <label for="packaging">Sustainable Packaging</label>
                <label htmlFor="packaging"><br/>Categories:{" "}<br/></label>
            <select
            type='text'
            className='field'
            name='packaging'
            id='packaging'
            ref={this.context.packaging }
            onChange={e => this.validateEntry(e)}>
                <option value={ null }>Sustainable Packaging?</option>
                { packingList}
            </select>
            </div>
            <br/>
            <div class="form-section">
            <label htmlFor="categories"><br/>Categories:{" "}<br/></label>
            <select
            type='text'
            className='field'
            name='categories'
            id='categories'
            ref={this.context.categories }
            onChange={e => this.validateEntry(e)}>
                <option value={ null }>Select Categories</option>
                { categoryList}
            </select>

            </div>
            <br/>
            <div class="form-section">
            <p>Select Rating </p>
            <p> Rate the level of sustainable business practices from 1 somewhat sustainable, 2 significant sustainability efforts, 3 excellent sustainability, 4 totally waste free.</p>

          <label htmlFor="store-rating"><br/>Rating:{" "}<br/></label>
            <select
            type='text'
            className='field'
            name='storeRating'
            id='storeRating'
            ref={this.context.options }
            onChange={e => this.validateEntry(e)}>
                <option value={ null }>Select Rating</option>
                { options }
            </select>
            </div>
          <button type="submit"  disabled={!this.state.formValid}>Submit</button>
          <button type="reset"onClick={e => this.handleCancelAdd()}>Cancel</button>
        </form>
      </section>
    </div>
  );
  }
}

