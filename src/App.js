import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Nav from './Nav/Nav.js';
import AddStore from './AddStore/AddStore';
import dummystore from'./dummystore.js';
import CategoryStoreList from './CategoryStoreList/CategoryStoreList.js';
import CategoryList from './CategoryStoreList/CategoryList.js';
import ApiContext from './ApiContext'


export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      stores: dummystore.stores,
      categories: dummystore.categories,
      ratings: dummystore.ratings,
      packaging: dummystore.packaging,
      id: ''
    }
  }
  static contextType = ApiContext    

  handleId=(id)=>{
    console.log('hi')
    this.setState({
      id: id
    })
  }

  handleAddStore=(store)=>{
    this.setState({
      stores: [ ...this.state.stores,
      store]
    })
    console.log(this.state.stores)
  }



  renderMainRoutes(){
    const id=this.state.id
    return(
      <span>
      <Route exact path='/' component={()=><CategoryList handleId={()=>this.handleId} categories={this.state.categories} stores={this.state.stores}/>}/>
      <Route exact path='/addstore' component={AddStore}/>
      {/* <Route exact path={`/category/:id`} component={()=><CategoryStoreList id={id} stores={this.state.stores}/>}/> */}
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
  const categories = this.state.categories
 console.log(this.state.stores)
  
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
      <span>{this.renderMainRoutes()}</span>
      </main>
    </div>
    </ApiContext.Provider>
  );
}
}
