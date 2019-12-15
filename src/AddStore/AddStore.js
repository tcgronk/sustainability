import React, {Component} from 'react'



export default class AddStore extends Component {
  render(){
  return (
    <div className="Add-Store">
        <p>Add a New Store</p>
        <section>
        <form id="record-store">
            <div class="form-section">
            <label for="store-title">Store Name</label>
            <input type="text" name="store-name" placeholder="Store Name" required/>
            <label for="store-info">Website</label>
            <textarea name="store-info" rows="1"   required></textarea>
            <br/>
            <label for="sustainability-comments">Sustainable Business Practices</label>
            <br/>
            <textarea name="sustainability-comments" rows="12"   required></textarea>
            </div>
            <br/>
            <div>
                <label for="sustainability-packaging">Sustainable Packaging</label>
                <input type="radio" name="sustainability-packaging" value="Yes" class="packaging-radio" checked/><span>Yes</span>
                <input type="radio" name="sustainability-packaging" value="Somewhat" class="dream-type-radio" /><span>Somewhat</span>
                <input type="radio" name="sustainability-packaging" value="No" class="packaging-radio" /><p>No</p>
            </div>
            <br/>
            <div class="form-section">
                <p>Select category </p>
                <input type="radio" name="store-category" value="0" class="store-category-radio" checked/>
                <label for="store-category"><span>Food & Coffee</span></label>
                <input type="radio" name="store-category" value="1" class="store-category-radio"/>
                <label for="store-category"><span>Clothing</span></label>
                <input type="radio" name="store-category" value="2" class="store-category-radio"/>
                <label for="store-category"><span>Luxury Goods</span></label>
                <input type="radio" name="store-category" value="3" class="store-category-radio"/>
                <label for="store-category"><span>Homewares</span></label>
                <input type="radio" name="store-category" value="4" class="store-category-radio"/>
                <label for="store-category">
                    <span>Beauty</span>

                </label>
            </div>
            <br/>
            <div class="form-section">
            <p>Select Rating </p>
            <p> Rate the level of sustainable business practices from 1 somewhat sustainable, 2 significant sustainability efforts, 3 excellent sustainability, 4 totally waste free.</p>
                <input type="radio" name="dream-type" value="0" class="dream-type-radio" checked/>
                <label for="dream-type"><span>1</span></label>
                <input type="radio" name="dream-type" value="1" class="dream-type-radio"/>
                <label for="dream-type">
                    <span>2</span>
                </label>

            <input type="radio" name="dream-type" value="2" class="dream-type-radio"/>
            <label for="dream-type">
              <span>3</span>

            </label>

            <input type="radio" name="dream-type" value="3" class="dream-type-radio"/>
            <label for="dream-type">
              <span>4</span>

            </label>
          </div>

          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </form>
      </section>
    </div>
  );
  }
}
