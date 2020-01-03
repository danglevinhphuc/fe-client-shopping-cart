import React, { Component } from "react";
import _ from "lodash";
import Item from "./item";
import Drag from "../../Demo/Drag/Index";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { connect } from "react-redux";
import {actUpdatePostionIconHeaderRequest} from '../../../store/commonAction'
class IconHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldListIcon: []
    };
  }
  responseDragDrop = _.debounce(async val => {
    const _this = this;
    let data = _.map(val, (o, i) => {
      return { id: o.id, position: i + 1 };
    });
    const { oldListIcon } = this.state;
    if (!_.isEqual(oldListIcon, data)) {
      // update
      await _this.props.updateListIconHeader({list: data});
      try {
      } catch (error) {
        console.log(error);
      }
    }
  }, 500);
  render() {
    const { common } = this.props;
    let listIcon = []
    if(common.configIconHeaderData){
      listIcon = _.map(common.configIconHeaderData, (o, i) => {
        return {
          id: o._id,
          position: i + 1,
          text: <Item data={o.name} key={i} />,
          name: o.name
        };
      });
    }
    if (listIcon.length) {
      this.state.oldListIcon = _.map(listIcon, o => {
        return { id: o.id, position: o.position };
      });
      return (
        <ul className="nav navbar-nav navbar-right right_nav pull-right">
          <DndProvider backend={HTML5Backend}>
            <Drag
              dataDragDrop={listIcon}
              className="nav-item"
              responseDragDrop={this.responseDragDrop}
            />
          </DndProvider>
        </ul>
      );
    } else {
      return <div></div>;
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
    updateListIconHeader : async (data) =>{
      await dispatch(actUpdatePostionIconHeaderRequest(data));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(IconHeader);
