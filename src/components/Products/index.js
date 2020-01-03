import React, { Component } from "react";
import _ from "lodash";
import ProductTypePages from "./ProductTypePages";
import { connect } from "react-redux";
import {
  actFetchProductTypeRequest,
  actFetchProductGroupRequest
} from "../../store/commonAction";
class Products extends Component {
  constructor(props) {
    super(props);
  }
  async componentWillMount() {
    await this.loadListProductType();
    await this.loadProductGroup();
  };
  
  async loadListProductType() {
    let query = {
      from: 0,
      size: 2,
      query: {},
      sort: { createdAt: -1 }
    };
    await this.props.loadProductType({ query });
  }
  async loadProductGroup() {
    let { common } = this.props;
    if (common && common.productType) {
      let idsProductType = _.flatMap(common.productType, "_id");
      if (idsProductType.length) {
        let query = {
          ids: idsProductType,
          limit: 10,
          sort: { createdAt: 1 }
        };
        await this.props.loadProductGroup({ query });
      }
    }
  }
  render() {
    const { common } = this.props;
    return (
      <div>
          <ProductTypePages data={common.productGroupWithType} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    common: state.common
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadProductType: async query => {
      await dispatch(actFetchProductTypeRequest(query));
    },
    loadProductGroup: async query => {
      await dispatch(actFetchProductGroupRequest(query));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
