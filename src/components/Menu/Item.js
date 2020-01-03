import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";

class Item extends Component {
  constructor(props) {
    super(props);
  }
  childMenu = data => {
    let child = _.map(data, (o, i) => {
      return (
        <li className="nav-item" key={`child-${i}`}>
          <span className="nav-link" title={o.link}>
            {o.name}
          </span>
        </li>
      );
    });
    return child;
  };
  render() {
    const { data } = this.props;
    if (data.child.length) {
      return (
        <li className="nav-item submenu dropdown" >
          <a
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {data.parent}
            <ul className="dropdown-menu">{this.childMenu(data.child)}</ul>
          </a>
        </li>
      );
    } else {
      return (
        <li className="nav-item" >
          <a className="nav-link">{data.parent}</a>
        </li>
      );
    }
  }
}
export default Item;
