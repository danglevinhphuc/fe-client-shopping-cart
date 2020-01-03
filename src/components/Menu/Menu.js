import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import Item from "./Item";
import Drag from "../Demo/Drag/Index";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import {actUpdatePostionMenuRequest} from '../../store/commonAction'
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldListMenu: []
    }
  }
  responseDragDrop = _.debounce(async (val)=>{
    const _this = this;
    let data = _.map(val,(o,i) =>{return {id: o.id,position:i+1}});
    const {oldListMenu} = this.state;
    if(!_.isEqual(oldListMenu,data)){
      // update
      try {
        await _this.props.updateListMenu({list: data});
      } catch (error) {
        console.log(error);
      }
    }
  },500);
  render() {
    const { common } = this.props;
    let listMenu = [];
    if (common.configMenuData) {
      listMenu = _.map(common.configMenuData, (o, i) => {
        return {
          id: o._id,
          position: i+1,
          text: <Item data={o} key={i} />,
          name: o.parent
        };
      });
    }
    if(listMenu.length){
      this.state.oldListMenu = _.map(listMenu,(o) =>{return {id: o.id,position:o.position}});
      return (
        <ul className="nav navbar-nav center_nav pull-right">
          <DndProvider backend={HTML5Backend}>
            <Drag dataDragDrop={listMenu} className="nav-item" responseDragDrop={this.responseDragDrop} />
          </DndProvider>
        </ul>
      );
    }else{
      return <div></div>
    }
  }
}
const mapStateToProps = state => {
  return {
    common: state.common
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateListMenu : async (data) =>{
      await dispatch(actUpdatePostionMenuRequest(data));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
