import React, { Component } from "react";
import _ from "lodash";


class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {data} = this.props;
    return (
        <li className="nav-item">
          <a className="icons">
            <i className={data} aria-hidden="true" />
          </a>
        </li>
    );
  }
}

export default Item;
