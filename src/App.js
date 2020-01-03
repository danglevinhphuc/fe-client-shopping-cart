import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Header from '../src/components/Common/header'
import Slider from '../src/components/Common/slider'
import Products from '../src/components/Products'
import Footer from '../src/components/Common/footer'
import {actFetchConfigMenuRequest,setUsername,actFetchConfigIconHeaderRequest} from './store/commonAction'
import history from './utils/history'
import { NotificationManager,NotificationContainer} from 'react-notifications';
import Chat from './components/Chat'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentWillMount() {
    var _this = this;
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams && urlParams.get('token') && urlParams.get('user')){
      localStorage.setItem("TOKEN", urlParams.get('token'));
      localStorage.setItem("USER", urlParams.get('user'));
      history.push(`/`);
    }
    await _this.props.setUsername();
    await _this.props.loadMenu();
    await _this.props.loadIconHeader();
    
  };
  componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.common && nextProps.common.errors){
      NotificationManager.error(nextProps.common.errors,null,3000);
    }
  }
  
  render() {
    return (
      <div>
        {/* <DndProvider backend={HTML5Backend}>
					<Example />
        </DndProvider> */}
        <NotificationContainer />
        <Header />
        <Slider />
        <Products />
        <Footer />
        <Chat />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    common : state.common
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadMenu : () =>{
      dispatch(actFetchConfigMenuRequest());
    },
    setUsername: () =>{
      dispatch(setUsername());
    },
    loadIconHeader: () =>{
      dispatch(actFetchConfigIconHeaderRequest());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

