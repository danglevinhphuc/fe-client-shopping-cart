import React, { Component } from "react";
import _ from "lodash";
class NewsProducts extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    const { data } = this.props;
    let productItem = _.map(data.data, (o, i) => {
      return (
        <div className={`col col${i+1}`} key={i}>
          <div className="f_p_item">
            <div className="f_p_img">
              <img
                className="img-fluid"
                src={o.images[0]}
                alt={o.name}
              />
              <div className="p_icon">
                <a>
                  <i className="lnr lnr-heart" />
                </a>
                <a>
                  <i className="lnr lnr-cart" />
                </a>
              </div>
            </div>
            <a>
              <h4>{o.name}</h4>
            </a>
            <h5>${o.price}</h5>
          </div>
        </div>
      );
    });
    return (
      <section className="feature_product_area section_gap">
        <div className="main_box">
          <div className="container-fluid">
            <div className="row">
              <div className="main_title">
                <h2>{data._id.name}</h2>
                <p>Who are in extremely love with eco friendly system.</p>
              </div>
            </div>
            <div className="row">
              {productItem}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default NewsProducts;
