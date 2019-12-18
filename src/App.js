import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Nav from './Nav/Nav.js';
import AddStore from './AddStore/AddStore';
import dummystore from'./dummystore.js';
import CategoryStoreList from './CategoryStoreList/CategoryStoreList.js';
import CategoryList from './CategoryStoreList/CategoryList.js';
import ApiContext from './ApiContext'
import AllStores from './AllStores/AllStores'


export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      stores: dummystore.stores,
      categories: dummystore.categories,
      ratings: dummystore.ratings,
      packaging: dummystore.packaging,
      saved: ''

    }
  }
  static contextType = ApiContext    


  handleAddStore=(store)=>{

    
    this.setState({
      stores: [ ...this.state.stores,
      store],
      saved: `Store saved to the ${store.categoryname} section!`

      
    })
    
    
  }
  componentDidUpdate(){
    setTimeout(() => this.setState({saved:''}), 2000);
  }


  renderMainRoutes(){
    const id=this.state.id
    return(
      <span>
      <Route exact path='/all-stores' component={()=><AllStores stores={this.state.stores} />}></Route>
      <Route exact path='/' component={()=><CategoryList handleId={()=>this.handleId} categories={this.state.categories} stores={this.state.stores}/>}/>
      <Route exact path='/addstore' component={AddStore}/>
      {['/category/:id'].map(path =>(
        <Route  
        exact
        key={path}
        exact
        path={path} component={CategoryStoreList}/> 
        ))}
      
      </span>
    )
  }
  render(){

  return (
    <ApiContext.Provider value={{
      stores: this.state.stores,
      categories: this.state.categories,
      ratings: this.state.ratings,
      packaging: this.state.packaging,
      handleAddStore: this.handleAddStore
  }}>
    <div className="App">
      <header className="App-header">
        <Nav />

      </header>

      <main>
        <br/>
      <h3>{this.state.saved}</h3>
      <Link to='/all-stores'><button>All stores</button></Link>
      <Link to='/'><button>Back to Home</button></Link>
      <span>{this.renderMainRoutes()}</span>
      </main>
    </div>
    </ApiContext.Provider>
  );
}
}
