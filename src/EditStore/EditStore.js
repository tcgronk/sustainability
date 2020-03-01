import React, { Component } from "react";
import ApiContext from "../ApiContext";
import config from "../config";

export default class EditStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: true,
      storenameValid: true,
      websiteValid: true,
      commentsValid: true,
      packagingValid: true,
      categoryValid: true,
      categoriesValid: true,
      storeRatingValid: true,
      errorMsg: "Please fill out all fields",
      store: {},
      storeid: 0
    };
  }
  static contextType = ApiContext;

  validateEntry = e => {
    e.preventDefault();
    this.setState({ store: e.target.value });
    const value = e.target.value.trim();
    const name = e.target.name;
    if (value.length < 1) {
      this.setState(
        {
          [`${name}Valid`]: false
        },
        () => {
          this.validateForm();
        }
      );
    } else if (value === "Sustainable Packaging?") {
      this.setState(
        {
          [`${name}Valid`]: false
        },
        () => {
          this.validateForm();
        }
      );
    } else if (value === "Select Category") {
      this.setState(
        {
          [`${name}Valid`]: false
        },
        () => {
          this.validateForm();
        }
      );
    } else if (value === "Select Rating") {
      this.setState(
        {
          [`${name}Valid`]: false
        },
        () => {
          this.validateForm();
        }
      );
    } else
      this.setState(
        {
          [`${name}Valid`]: true
        },
        () => {
          this.validateForm();
        }
      );
  };

  validateForm = () => {
    if (
      this.state.storenameValid === false ||
      this.state.websiteValid === false ||
      this.state.commentsValid === false ||
      this.state.storeRatingValid === false ||
      this.state.packagingValid === false ||
      this.state.categoriesValid === false
    ) {
      this.setState({
        errorMsg: "Please fill out all fields",
        formValid: false
      });
    } else
      this.setState({
        errorMsg: "Ready to submit!",
        formValid: true
      });
  };
  handleSubmit(e) {
    e.preventDefault();

    const store = {
      storeid: this.state.storeid,
      storename: e.target["storename"].value,
      website: e.target["website"].value,
      comments: e.target["comments"].value,
      packagingsid: parseInt(e.target["packaging"].value, 10),
      categoriesid: parseInt(e.target["categories"].value, 10),
      ratingsid: parseInt(e.target["storeRating"].value, 10)
    };
    const url = `${config.API_ENDPOINT}/api/stores/${store.storeid}`;
    const options = {
      method: "PUT",
      body: JSON.stringify(store)
    };

    if (this.state.formValid === true) {
      fetch(url, options)
        .then(res => {
          if (!res.ok) {
            return res.json().then(e => Promise.reject(e));
          }
          // return res.json();
        })
        .then(() => {
          this.context.handleEditStore(store);
          this.props.history.push(`/`);
          this.setState({
            errorMsg: "Saved!"
          });
        })
        .catch(err => {
          this.setState({
            errorMsg: "Unable to save store, please try again"
          });
        });
    } else
      this.setState({
        errorMsg: `${" "}Please ensure you have entered all fields.`
      });
  }

  handleCancelEdit = () => {
    this.props.history.push(`/`);
  };
  componentDidMount = () => {
    const storeid = parseInt(this.props.match.params.id.slice(1), 10);
    const stores = this.context.stores;
    const store = stores.filter(function(store) {
      return store.storeid === storeid;
    });
    this.setState({ store: store[0], storeid: storeid });
  };

  render() {
    const ratings = this.context.ratings;
    const options = ratings.map(rating => {
      return (
        <option key={rating.ratingsid} value={rating.ratingsid}>
          {rating.ratingsdescription}
        </option>
      );
    });
    const categories = this.context.categories;
    const categoryList = categories.map(category => {
      return (
        <option key={category.categoriesid} value={category.categoriesid}>
          {category.categoriesdescription}
        </option>
      );
    });
    const packagings = this.context.packagings;
    const packingList = packagings.map(packaging => {
      return (
        <option key={packaging.packagingsid} value={packaging.packagingsid}>
          {packaging.packagingsdescription}
        </option>
      );
    });
    return (
      <div className="EditStore">
        <p className="top">
          Do you know of a store that is helping the world be more sustainable?
          Add it to the list, so more shoppers can check it out! <br />{" "}
          {this.state.errorMsg}
        </p>
        <section>
          <form id="record-store" onSubmit={e => this.handleSubmit(e)}>
            <div className="form-section">
              <label htmlFor="storename">Store Name: </label>
              <input
                type="text"
                name="storename"
                id="storename"
                placeholder="Store Name"
                value={this.state.store.storename}
                onChange={e => this.validateEntry(e)}
                required
              />
              <br />
              <br />
              <label htmlFor="website">Website: </label>
              <input
                name="website"
                rows="1"
                id="website"
                value={this.state.store.website}
                placeholder="Website"
                onChange={e => this.validateEntry(e)}
                required
              ></input>
              <br />
              <br />
              <label htmlFor="comments">
                What makes this store a sustainable choice?
              </label>
              <br />
              <br />
              <textarea
                name="comments"
                rows="12"
                cols="40"
                id="comments"
                placeholder="Comments"
                value={this.state.store.comments}
                onChange={e => this.validateEntry(e)}
                required
              ></textarea>
            </div>
            <br />
            <label htmlFor="categories">
              <br />
              Category: <br />
            </label>
            <br />
            <label htmlFor="categories">
              <br />
              Which category best fits this store? <br />
            </label>
            <br />
            <select
              className="field"
              name="categories"
              id="categories"
              onChange={e => this.validateEntry(e)}
              value={this.state.store.categoriesid}
              required
            >
              <option value={null}>Select Category</option>
              {categoryList}
            </select>
            <br /> <br />
            <div>
              <label htmlFor="packaging">
                <br />
                Packaging: <br />
              </label>
              <br />
              <br />
              <label htmlFor="packaging">
                Based on your experience, do you think this store has
                sustainable packaging?
              </label>
              <br />
              <br />
              <ul id="sustainabilityOptions">
                <br />
                <li>
                  <b>Yes:</b> Packaging is made from reusable or recyclable
                  materials.
                </li>
                <br />
                <li>
                  <b>No:</b> Packaging uses traditionally wasteful materials
                  like single use plastic.
                </li>
                <br />
                <li>
                  <b>N/A:</b> Packaging does not apply to this company
                </li>
                <br />
                <li>
                  <b>Somewhat:</b> The company offers some sustainable options,
                  but still uses some traditionally wasteful materials like
                  single use plastic.
                </li>
              </ul>
              <br />
              <select
                type="text"
                className="field"
                name="packaging"
                id="packaging"
                value={this.state.store.packagingsid}
                onChange={e => this.validateEntry(e)}
                required
              >
                <option value={null}>Sustainable Packaging?</option>
                {packingList}
              </select>
            </div>
            <br />
            <br />
            <div className="form-section">
              <label htmlFor="store-rating">Rating: </label>
              <br />
              <br />
              <ul id="sustainabilityOptions">
                {" "}
                Based on your experience, rate the level of sustainable business
                practices from:
                <br /> <br /> <br />
                <li>
                  <b>Somewhat Sustainable:</b> Uses some sustainable business
                  practices or materials
                </li>
                <br />
                <li>
                  <b>Significant Sustainability:</b> Sustainability is built
                  into the mission of the company
                </li>
                <br />
                <li>
                  <b>Excellent Sustainability:</b> Nearly all facets of the
                  business focus on sustainability
                </li>
                <br />
                <li>
                  <b>Waste Free:</b> The company fully re-purposes all waste and
                  has a plan to offset their carbon footprint
                </li>
              </ul>

              <br />
              <select
                type="text"
                className="field"
                name="storeRating"
                id="storeRating"
                value={this.state.store.ratingsid}
                onChange={e => this.validateEntry(e)}
                required
              >
                <option value={null}>Select Rating</option>
                {options}
              </select>
            </div>
            <br />
            <br />
            <div className="Buttons">
              <button
                className="navButton"
                type="submit"
                disabled={!this.state.formValid}
              >
                Submit
              </button>
              <button
                className="navButton"
                type="reset"
                onClick={e => this.handleCancelEdit()}
              >
                Cancel
              </button>
            </div>
            <br />
            <br />
          </form>
        </section>
      </div>
    );
  }
}
