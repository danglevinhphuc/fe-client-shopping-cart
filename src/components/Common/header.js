import React, { Component } from "react";
import _ from "lodash";
import Menu from '../Menu/Menu'
import IconHeader from './IconHeader'
class Headers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckAll: false
    };
  }
  changeCheckAll = val => {};
  render() {
    return (
      <div>
        <div>
          <header className="header_area">
            <div className="top_menu row m0">
              <div className="container-fluid">
                <div className="float-left">
                  <p>Call Us: 012 44 5698 7456 896</p>
                </div>
                <div className="float-right">
                  <ul className="right_side">
                    <li>
                      <a href="login.html">Login/Register</a>
                    </li>
                    <li>
                      <a >My Account</a>
                    </li>
                    <li>
                      <a href="contact.html">Contact Us</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="main_menu">
              <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                  <a className="navbar-brand logo_h" href="index.html">
                    <img src="img/logo.png" alt="" />
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                  <div
                    className="collapse navbar-collapse offset"
                    id="navbarSupportedContent"
                  >
                    <div className="row w-100">
                      <div className="col-lg-7 pr-0">
                        <Menu />
                      </div>
                      <div className="col-lg-5">
                        <IconHeader />
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default Headers;
