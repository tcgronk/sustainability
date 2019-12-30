import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Nav from './Nav/Nav.js';
import AddStore from './AddStore/AddStore';
// import EditStore from './AddStore/EditStore';
import dummystore from'./dummystore.js';
import CategoryStoreList from './CategoryStoreList/CategoryStoreList.js';
import CategoryList from './CategoryStoreList/CategoryList.js';
import ApiContext from './ApiContext'
import AllStores from './AllStores/AllStores'
import Stores from './Stores/Stores'
import config from './config'


export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      id: {},
      stores: [],
      categories: [],
      ratings: [],
      packagings: [],
      saved: '', 
      

    }
  }
  static contextType = ApiContext    

  handleEditStore=(store)=>{
    this.setState({stores: 'hi'})
  }

  handleAddStore=(store)=>{
     fetch(`${config.API_BASE_URL}/api/stores`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e));
      
        return res.json()
    })
    .then(stores => {
      let category='All'
      for(let i=0; i<this.state.categories.length; i++){
        if(store.categoriesid===this.state.categories[i].categoriesid){
          category=this.state.categories[i].categoriesdescription
        }
      }
      this.setState({stores: stores,
      saved: `${store.storename} is saved to ${category}`});

    })
    .catch(error => {
      console.error({ error });
    })
  }
    
    
  
  componentDidUpdate(){
    setTimeout(() => this.setState({saved:''}), 9000);
  }

  handleStoreId=(store)=>{
    this.setState({id: store})
    
  }
  renderBackButton(){
    if(this.state.back===false){
    this.setState({back: true})
    }
    else this.setState({back: false})
  }
  componentDidMount() {
    Promise.all([
        fetch(`${config.API_BASE_URL}/api/stores`),
        fetch(`${config.API_BASE_URL}/api/categories`),
        fetch(`${config.API_BASE_URL}/api/packagings`),
        fetch(`${config.API_BASE_URL}/api/ratings`)
    ])
        .then(([storesRes, categoriesRes, packagingsRes, ratingsRes]) => {
            if (!storesRes.ok)
                return storesRes.json().then(e => Promise.reject(e));
            if (!categoriesRes.ok)
                return categoriesRes.json().then(e => Promise.reject(e));
            if (!packagingsRes.ok)
                return packagingsRes.json().then(e => Promise.reject(e));
            if (!ratingsRes.ok)
                return ratingsRes.json().then(e => Promise.reject(e));

            return Promise.all([storesRes.json(), categoriesRes.json(), packagingsRes.json(),ratingsRes.json()]);
        })
        .then(([stores, categories, packagings, ratings]) => {
            this.setState({stores, categories, packagings, ratings});

        })
        .catch(error => {
            console.error({error});
        });
       
}

  handleDeleteStore=(storeid)=>{
    this.setState({
      stores: this.state.stores.filter(store => store.storeid !== storeid )
    })
  
  
  }


  renderMainRoutes(){
    return(
      <span>
      
      <Route exact path='/all-stores' component={AllStores}></Route>
      <Route exact path='/' component={CategoryList}/>
      <Route exact path='/addstore' component={AddStore}/>
      {/* <Route exact path='/edit-store' component={()=><EditStore id={this.state.id} />}/> */}
      {['/store/:id'].map(path =>(
        <Route  
        exact
        key={path} 
        path={path} component={Stores}/> 
        ))}      
      {['/category/:id'].map(path =>(
        <Route  
        exact
        path={path} component={CategoryStoreList}/> 
        ))}
      
      </span>
    )
  }
  render(){
    // const backButton = this.state.back
    // ? <div className="back"><Link to='/'><button>Back to All Categories</button></Link></div>
    // : "";
  return (
    <ApiContext.Provider value={{
      stores: this.state.stores,
      categories: this.state.categories,
      ratings: this.state.ratings,
      packagings: this.state.packagings,
      handleAddStore: this.handleAddStore,
      handleStoreId: this.handleStoreId,
      handleDeleteStore: this.handleDeleteStore
  }}>
    <div className="App">
      <header className="App-header">
        <Nav />
        <Link to='/all-stores'><button>All stores</button></Link>
      
      <p>Find sustainable stores by selecting a category below or <Link to='/addstore'>add new stores here </Link>to the list!</p>
      </header>

      <main>
        <br/>
      <h3>{this.state.saved}</h3>
      <span>{this.renderMainRoutes()}</span>
      </main>
    </div>
    </ApiContext.Provider>
  );
}
}
