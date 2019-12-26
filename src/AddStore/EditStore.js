import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom';




export default class EditStore extends Component {
    constructor(props){
        super(props);
        this.state={
            formValid:false,
            storenameValid:false,
            websiteValid:false,
            commentsValid:false,
            packagingValid:false,
            categoryValid:false,
            categoriesValid:false,
            storeRatingValid:false,
            errorMsg: 'Please fill out all fields'
        }
    }
    static contextType = ApiContext

    validateEntry=(e)=>{
        // e.preventDefault();
        const value=e.target.value.trim()
        const name=e.target.name
        if(value===null || value==='' || value==='Sustainable Packaging?' || value==='Select Category'|| value==='Select Rating'){
          this.setState({
            [`${name}Valid`]: false
          })
          }
        else
        this.setState({
          [`${name}Valid`]: true
        })

       this.validateForm()

    }

    validateForm(){
      if(this.state.storenameValid===false || this.state.websiteValid===false || this.state.commentsValid===false ||this.state.packagingValid===false || this.state.categoriesValid===false || this.state.storeRatingValid===false){
        this.setState({
          errorMsg: 'Please fill out all fields',
          formValid: false
        })
      }
      else this.setState({
        errorMsg: 'Ready to submit!',
        formValid: true
      })
    }

    handleSubmit(e){
        e.preventDefault();

        let stores=this.context.stores

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
        else if(categoryid==="Beauty/Skincare"){
            categoryid =5
        }
        else if(categoryid==="Other"){
          categoryid =6
      }
        else categoryid='Null'
        let date=new Date();
        let today=(date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear()
        const store = {
            id: parseInt(stores.length+1,10),
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

    // handleCancelEdit = () => {
    //     console.log(this.props)
    //     this.props.history.push(`/store/${this.props.id}`)
    //   }

  render(){
    const stores=this.context.stores
    const id=this.props.id
    const store=stores[(id-1)]
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
    <div className="Edit-Store">
        <p>Do you know of a store that is helping the world be more sustainable? Add it to the list, so more shoppers can check it out! <br/> {this.state.errorMsg}</p>
        <section>
        <form id="record-store"  onSubmit={e => this.handleSubmit(e)}>
            <div class="form-section">
            <label for="storename">Store Name</label>
            <input type="text" name="storename"id="storename"  value={this.context.stores[id-1].storename} defaultValue={this.context.stores[id-1].storename} onChange={this.handleAddStore} required/>
            <label for="website">Website</label>
            <textarea name="website" rows="1" id="website" value={this.context.stores[id-1].website} placeholder="Website" onChange={e => this.validateEntry(e)} required></textarea>
            <br/>
            <label for="comments">Sustainable Business Practices</label>
            <br/>
            <textarea name="comments" rows="12" id="comments" placeholder="Comments" value={this.context.stores[id-1].comments} onChange={e => this.validateEntry(e)} required></textarea>
            </div>
            <br/>
            <div>
                <label for="packaging">Based on your experience, do you think this store has sustainable packaging?</label>
                <label htmlFor="packaging"><br/>Packaging:{" "}<br/></label>
            <select
            type='text'
            className='field'
            name='packaging'
            id='packaging'
            ref={this.context.packaging }
            onChange={e => this.validateEntry(e)} required>
                <option value={null} >Sustainable Packaging?</option>
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
            onChange={e => this.validateEntry(e)} required>
                <option value={ null }>Select Category</option>
                { categoryList}
            </select>

            </div>
            <br/>
            <div class="form-section">
            <p>Select Rating </p>
            <p> Based on your experience, rate the level of sustainable business practices from 1 somewhat sustainable, 2 significant sustainability efforts, 3 excellent sustainability, 4 totally waste free.</p>

          <label htmlFor="store-rating"><br/>Rating:{" "}<br/></label>
            <select
            type='text'
            className='field'
            name='storeRating'
            id='storeRating'
            ref={this.context.options }
            onChange={e => this.validateEntry(e)} required>
                <option value={ null }>Select Rating</option>
                { options }
            </select>
            </div>
          <button type="submit"  disabled={!this.state.formValid}>Submit</button>
          <Link to={`/store/:${id}`}><button type="reset">Cancel</button></Link>
        </form>
      </section>
    </div>
  );
  }
}

