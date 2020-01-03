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
            storeRatingValid:false,
            errorMsg: 'Please fill out all fields'
        }
    }
    static contextType = ApiContext

    validateEntry=(e)=>{
        e.preventDefault();
        const value=e.target.value.trim()
        console.log(value)
        const name=e.target.name
        if(value.length<1){
          this.setState({
            [`${name}Valid`]: false
          },()=>{this.validateForm()})}
          else if(value==='Sustainable Packaging?'){

          this.setState({
            [`${name}Valid`]: false
          },()=>{this.validateForm()})}
          else if(value==='Select Category'){

            this.setState({
              [`${name}Valid`]: false
            },()=>{this.validateForm()})}
          else if(value==='Select Rating'){

              this.setState({
                [`${name}Valid`]: false
              },()=>{this.validateForm()})}
        else
        this.setState({
          [`${name}Valid`]: true, 
          
        },()=>{this.validateForm()})
      
        console.log(this.state)
       

    }

    validateForm=()=>{

      if(this.state.storenameValid===false  || this.state.websiteValid===false || this.state.commentsValid===false || this.state.storeRatingValid===false ||this.state.packagingValid===false  || this.state.categoriesValid===false ){
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
       ratingsid: parseInt(e.target['storeRating'].value,10)
    
      }
      console.log(store)
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
  <label htmlFor="storename">Store Name:{' '}</label>
            <input type="text" name="storename"id="storename" placeholder="Store Name" value={this.storename} onChange={e => this.validateEntry(e)} required/>
            <br/>
            <br/>
            <label htmlFor="website">Website:{' '}</label>
            <input name="website" rows="1" id="website" value={this.website} placeholder="Website" onChange={e => this.validateEntry(e)} required></input>
            <br/>
            <br/>
            <label htmlFor="comments">What makes this store a sustainable choice?</label>
            <br/>
            <br/>
            <textarea name="comments" rows="12" cols='40' id="comments" placeholder="Comments" value={this.comments} onChange={e => this.validateEntry(e)} required></textarea>
            </div>
            <br/>
            <div>
                <label htmlFor="packaging">Based on your experience, do you think this store has sustainable packaging?</label>
                <br/>
                <label htmlFor="packaging"><br/>Packaging:{" "}<br/></label>
                <br/>
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
            <label htmlFor="categories"><br/>Which category best fits this store? {" "}<br/></label>
            <br/>
            <select
            type='text'
            className='field'
            name='categories'
            id='categories'
            onChange={e => this.validateEntry(e)} required>
                <option value={ null }>Select Category</option>
                { categoryList}
            </select>

            
            <br/>
            
            <p>Select Rating </p>
            <p> Based on your experience, rate the level of sustainable business practices from somewhat sustainable, significant sustainability efforts, excellent sustainability, totally waste free.</p>

          <label htmlFor="store-rating"><br/>Rating:{" "}<br/></label>
            <select
            type='text'
            className='field'
            name='storeRating'
            id='storeRating'
            onChange={e => this.validateEntry(e)} required>

                <option value={ null }>Select Rating</option>
                { options }
            </select>
            </div>
            <br/>
            <div className="Buttons">
          <button className='navButton' type="submit"  disabled={!this.state.formValid}>Submit</button>
          <button className='navButton' type="reset"onClick={e => this.handleCancelAdd()}>Cancel</button>
          </div>
        </form>
      </section>
    </div>
  );
  }
}

