import React, { Component } from "react";
import _ from "lodash";
import ProductsPage from "./ProductsPage";
class ProductTypePages extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    const { data } = this.props;
    let productList  = _.map(data,(o,i)=>{
        return (
            <div key={i}>
                <ProductsPage data= {o} />
            </div>
        )
    })
    return (
      <div>
        {productList}
      </div>
    );
  }
}

export default ProductTypePages;
