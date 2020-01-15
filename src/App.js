import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Nav from "./Nav/Nav.js";
import AddStore from "./AddStore/AddStore";
import CategoryStoreList from "./CategoryStoreList/CategoryStoreList.js";
import CategoryList from "./CategoryStoreList/CategoryList.js";
import ApiContext from "./ApiContext";
import AllStores from "./AllStores/AllStores";
import Stores from "./Stores/Stores";
import config from "./config";
import ErrorBoundary from "./ErrorBoundary";
import monstrera from "./monstrera.png";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      categories: [],
      ratings: [],
      packagings: [],
      saved: ""
    };
  }
  static contextType = ApiContext;

  handleAddStore = store => {
    fetch(`${config.API_ENDPOINT}/api/stores`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));

        return res.json();
      })
      .then(stores => {
        let category = "All";
        for (let i = 0; i < this.state.categories.length; i++) {
          if (store.categoriesid === this.state.categories[i].categoriesid) {
            category = this.state.categories[i].categoriesdescription;
          }
        }
        this.setState({
          stores: stores,
          saved: `${store.storename} is saved to ${category}`
        });
      })
      .catch(error => {
        console.error({ error });
      });
  };

  componentDidUpdate() {
    setTimeout(() => this.setState({ saved: "" }), 10000);
  }

  renderBackButton() {
    if (this.state.back === false) {
      this.setState({ back: true });
    } else this.setState({ back: false });
  }
  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/stores`),
      fetch(`${config.API_ENDPOINT}/api/categories`),
      fetch(`${config.API_ENDPOINT}/api/packagings`),
      fetch(`${config.API_ENDPOINT}/api/ratings`)
    ])
      .then(([storesRes, categoriesRes, packagingsRes, ratingsRes]) => {
        if (!storesRes.ok) return storesRes.json().then(e => Promise.reject(e));
        if (!categoriesRes.ok)
          return categoriesRes.json().then(e => Promise.reject(e));
        if (!packagingsRes.ok)
          return packagingsRes.json().then(e => Promise.reject(e));
        if (!ratingsRes.ok)
          return ratingsRes.json().then(e => Promise.reject(e));

        return Promise.all([
          storesRes.json(),
          categoriesRes.json(),
          packagingsRes.json(),
          ratingsRes.json()
        ]);
      })
      .then(([stores, categories, packagings, ratings]) => {
        this.setState({ stores, categories, packagings, ratings });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  handleDeleteStore = storeid => {
    this.setState({
      stores: this.state.stores.filter(store => store.storeid !== storeid)
    });
  };

  renderMainRoutes() {
    return (
      <span>
        <Route exact path="/" component={CategoryList} />
        <Route exact path="/addstore" component={AddStore} />
        <ErrorBoundary>
          <Route exact path="/all-stores" component={AllStores}></Route>
          {["/store/:id"].map(path => (
            <Route key={path} exact path={path} component={Stores} />
          ))}
          {["/category/:id"].map(path => (
            <Route exact key={path} path={path} component={CategoryStoreList} />
          ))}
        </ErrorBoundary>
      </span>
    );
  }
  render() {
    if (this.state.categories.length > 0) {
    }
    return (
      <ApiContext.Provider
        value={{
          stores: this.state.stores,
          categories: this.state.categories,
          ratings: this.state.ratings,
          packagings: this.state.packagings,
          handleAddStore: this.handleAddStore,
          handleDeleteStore: this.handleDeleteStore
        }}
      >
        <div className="App">
          <header className="App-header">
            <Nav />
          </header>

          <main>
            <br />
            <h3>{this.state.saved}</h3>
            <span>{this.renderMainRoutes()}</span>
          </main>
        </div>
      </ApiContext.Provider>
    );
    return (
      <>
        <header className="App-header">
          <Nav />
        </header>
        <div className="Loader">
          <p>Finding sustainable resources...</p>
          <img className="LoaderImg" src={monstrera} />
        </div>
      </>
    );
  }
}
