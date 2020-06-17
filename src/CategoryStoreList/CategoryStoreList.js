import React, { Component } from "react";
import ApiContext from "../ApiContext";
import StoreCard from "../Stores/StoreCard";
import "./CategoryStoreList.css";
import onlineshopping from "../onlineshopping.png";

export default class CategoryStoreList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      rating: 0
    };
  }
  static contextType = ApiContext;

  filterEntryPackaging = e => {
    const packing = parseInt(e.target.value, 10);
    this.setState({ value: packing });
  };
  filterEntryRating = e => {
    const rating = parseInt(e.target.value, 10);
    this.setState({ rating: rating });
  };

  render() {
    const categoryId = parseInt(this.props.match.params.id);
    let category = "";
    let categories = this.context.categories;
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].categoriesid === categoryId) {
        category = categories[i].categoriesdescription;
      }
    }
    const packagings = this.context.packagings;
    const packingList = packagings.map(packaging => {
      return (
        <option key={packaging.packagingsid} value={packaging.packagingsid}>
          {packaging.packagingsdescription}
        </option>
      );
    });
    const ratings = this.context.ratings;
    const options = ratings.map(rating => {
      return (
        <option key={rating.ratingsid} value={rating.ratingsid}>
          {rating.ratingsdescription}
        </option>
      );
    });

    return (
      <div className="CategoryStoreList">
        <p className="categoryTitle">{category}</p>
        <div className="filter-section">
          <label className="gridItem" htmlFor="packaging">
            Sustainable <br /> Packaging?{" "}
          </label>
          <select
            type="text"
            className="field"
            name="packaging"
            id="packaging"
            onChange={e => this.filterEntryPackaging(e)}
            required
          >
            <option value={null}>All</option>
            {packingList}
          </select>
          <label className="gridItem" htmlFor="store-rating">
            <br />
            Rating? {"  "}
          </label>
          <select
            type="text"
            className="field"
            name="storeRating"
            id="storeRating"
            onChange={e => this.filterEntryRating(e)}
            required
          >
            <option value={null}>All</option>
            {options}
          </select>
          <br /> <br />
        </div>
        <StoreCard
          value={this.state.value}
          rating={this.state.rating}
          id={categoryId}
        />
      </div>
    );
  }
}
