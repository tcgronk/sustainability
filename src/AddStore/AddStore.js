import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import './AddStore.css'
import config from '../config'



export default class AddStore extends Component {
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
            errorMsg: 'Please fill out all fields'
        }
    }
    static contextType = ApiContext

    validateEntry=(e)=>{
        e.preventDefault();
        const value=e.target.value.trim()
        const name=e.target.name
        if(value.length<1){
          this.setState({
            [`${name}Valid`]: false
          })
          }
        else
        this.setState({
          [`${name}Valid`]: true, 
          
        })

       this.validateForm()

    }

    validateForm(){
      if(this.state.storenameValid===false || this.state.websiteValid===false || this.state.commentsValid===false  ){
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
  handleSubmit(e) {
      e.preventDefault();

      const store = {
       storename: e.target['storename'].value,
       website: e.target['website'].value,
       comments: e.target['comments'].value,
       packagingsid: parseInt(e.target['packaging'].value,10),
       categoriesid: parseInt(e.target['categories'].value,10),
       ratingsid: 3
    
      }
      
      const url =`${config.API_ENDPOINT}/api/stores`
      const options = {
        method: 'POST',
        body: JSON.stringify(store),
        headers: {
          "Content-Type": "application/json",
        }
      };
      
      if(this.state.formValid===true){
      fetch(url, options)
        .then(res => {
          if(!res.ok) {
            return res.json().then(e => Promise.reject(e))
          }
          return res.json()
        })
        .then(() => {
            this.context.handleAddStore(store)
            this.props.history.push(`/`)
            this.setState({
              errorMsg: 'Saved!'
            });
          })
        .catch(err => {
          this.setState({
            errorMsg: 'Unable to save store, please try again'
          });
        });
    }
    else (this.setState({
      errorMsg: `${" "}Please ensure you have entered all fields.`
    }))
  }

    handleCancelAdd = () => {
        this.props.history.push(`/`)
      }

  render(){
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
      const categories = this.context.categories
      const categoryList = categories.map((category) => {
          return(
            <option
              key= {category.categoriesid}
              value = {category.categoriesid}>
              {category.categoriesdescription}
            </option>
          )
        })
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
  return (
    <div className="Add-Store">
        <p className='top'>Do you know of a store that is helping the world be more sustainable? Add it to the list, so more shoppers can check it out! <br/> {this.state.errorMsg}</p>
        <section>
        <form id="record-store"  onSubmit={e => this.handleSubmit(e)}>
            <div className="form-section">
            <label htmlFor="storename">Store Name</label>
            <input type="text" name="storename"id="storename" placeholder="Store Name" value={this.storename} onChange={e => this.validateEntry(e)} required/>
            <label htmlFor="website">Website</label>
            <textarea name="website" rows="1" id="website" value={this.website} placeholder="Website" onChange={e => this.validateEntry(e)} required></textarea>
            <br/>
            <label htmlFor="comments">Sustainable Business Practices</label>
            <br/>
            <textarea name="comments" rows="12" id="comments" placeholder="Comments" value={this.comments} onChange={e => this.validateEntry(e)} required></textarea>
            </div>
            <br/>
            <div>
                <label htmlFor="packaging">Based on your experience, do you think this store has sustainable packaging?</label>
                <label htmlFor="packaging"><br/>Packaging:{" "}<br/></label>
            <select
            type='text'
            className='field'
            name='packaging'
            id='packaging'
            // ref={this.context.packagings }
            onChange={e => this.validateEntry(e)} required>
                <option value={ null }>Sustainable Packaging?</option>
                { packingList}
            </select>
            </div>
            <br/>
            <div className="form-section">
            <label htmlFor="categories"><br/>Categories:{" "}<br/></label>
            <select
            type='text'
            className='field'
            name='categories'
            id='categories'
            // ref={this.context.categories }
            onChange={e => this.validateEntry(e)} required>
                <option value={ null }>Select Category</option>
                { categoryList}
            </select>

            </div>
            <br/>
            <div className="form-section">
            <p>Select Rating </p>
            <p> Based on your experience, rate the level of sustainable business practices from 1 somewhat sustainable, 2 significant sustainability efforts, 3 excellent sustainability, 4 totally waste free.</p>

          <label htmlFor="store-rating"><br/>Rating:{" "}<br/></label>
            <select
            type='text'
            className='field'
            name='storeRating'
            id='storeRating'
            // ref={this.options }
            required>
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

