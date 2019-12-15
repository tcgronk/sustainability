import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Nav from './Nav/Nav.js';
import AddStore from './AddStore/AddStore';
import dummystore from'./dummystore.js';
import CategoryStoreList from './CategoryStoreList/CategoryStoreList.js';
import CategoryList from './CategoryStoreList/CategoryList.js';


export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      stores: dummystore.stores,
      categories: dummystore.categories,
    }
  }


  renderMainRoutes(){
    
    return(
      <span>
      <Route exact path='/' component={()=><CategoryList categories={this.state.categories} stores={this.state.stores}/>}/>
      <Route exact path='/addstore' component={AddStore}/>
      <Route exact path='/category/:id' component={()=><CategoryStoreList stores={this.state.stores}/>}/>
      </span>
    )
  }
  render(){
  const categories = this.state.categories
 console.log(this.state.categories)
 
  return (
    <div className="App">
      <header className="App-header">
        <Nav />

      </header>
      <main>
      <span>{this.renderMainRoutes()}</span>
      </main>
    </div>
  );
}
}
