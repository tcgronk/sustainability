import React, { Component } from "react";
import ApiContext from "../ApiContext";
import { Link } from "react-router-dom";
// import "./AllStores.css";

export default class AllStores extends Component {
  static contextType = ApiContext;

  render() {
    const stores = this.context.stores;
    const ratings = this.context.ratings;
    const categories = this.context.categories;
    return (
      <div className="AllStores">
        <h2>
          {stores.length} Stores have been added to Shop Sustainably so far!
        </h2>
        <div className="storegrid">
          {stores.map(store => (
            <ul className="allStoreList" key={store.storeid}>
              <>
                <br />

                <Link to={`/store/:${store.storeid}`}>
                  <li>{store.storename}</li>
                </Link>
                <br />
                {categories.map(category =>
                  category.categoriesid === store.categoriesid ? (
                    <li key={category.categoriesid}>
                      Category: {category.categoriesdescription}{" "}
                    </li>
                  ) : null
                )}
                <br />
                <li>{store.website}</li>
                <br />
                {ratings.map(rating =>
                  rating.ratingsid === store.ratingsid ? (
                    <li key={rating.ratingsid}>
                      Rating: {rating.ratingsdescription}
                    </li>
                  ) : null
                )}
                <br />
                <li>Date Added: {store.lastdatemodified.slice(0, 10)}</li>

                <br />
              </>
            </ul>
          ))}
        </div>
      </div>
    );
  }
}
