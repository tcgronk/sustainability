import React, { Component } from "react";
import ApiContext from "../ApiContext";
import { Link } from "react-router-dom";
import "./StoreCard.css";

export default class StoreCard extends Component {
  static contextType = ApiContext;

  render() {
    let storeArr = [];

    const stores = this.context.stores;
    let result = [];
    const id = this.props.id;

    storeArr = [];
    if (
      this.props.value === 1 ||
      this.props.value === 2 ||
      this.props.value === 3 ||
      this.props.value === 4
    ) {
      for (let i = 0; i < stores.length; i++) {
        if (
          stores[i].packagingsid === this.props.value &&
          stores[i].categoriesid === id
        ) {
          storeArr.push(stores[i]);
        }

        result = storeArr;
      }
    } else
      for (let i = 0; i < stores.length; i++) {
        if (stores[i].categoriesid === id) {
          storeArr.push(stores[i]);
        }
        result = storeArr;
      }
    if (
      this.props.rating === 1 ||
      this.props.rating === 2 ||
      this.props.rating === 3 ||
      this.props.rating === 4
    ) {
      result = result.filter(store => store.ratingsid === this.props.rating);
    }
    const ratings = this.context.ratings;
    const packagings = this.context.packagings;

    return (
      <div className="card-container">
        <div className="cards">
          {result.length === 0 ? <li>No stores yet!</li> : null}
          {result.map(store => (
            <ul key={store.storeid} className="card">
              <div>
                <>
                  <br />
                  <br />
                  <br />
                  <Link to={`/store/:${store.storeid}`}>
                    <li>{store.storename}</li>
                  </Link>

                  <br />
                  <li>{store.website}</li>
                  <br />
                  <br />
                  {packagings.map(packaging =>
                    packaging.packagingsid === store.packagingsid ? (
                      <li key={packaging.packagingsid}>
                        Sustainable Packaging?:{" "}
                        {packaging.packagingsdescription}
                      </li>
                    ) : null
                  )}
                  <br />
                  {ratings.map(rating =>
                    rating.ratingsid === store.ratingsid ? (
                      <li key={rating.ratingsid}>
                        Rating: {rating.ratingsdescription}
                      </li>
                    ) : null
                  )}
                  <br />

                  <br />
                  <li>Date Added: {store.lastdatemodified.slice(0, 10)}</li>

                  <br />
                </>
              </div>
            </ul>
          ))}
        </div>
      </div>
    );
  }
}
