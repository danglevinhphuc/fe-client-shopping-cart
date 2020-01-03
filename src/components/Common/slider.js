import React, { Component } from "react";
import _ from "lodash";
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toogleEdit:{
        name:"",
        show: false
      },
      mainContent: "",
      subContent:"",
      btnContent: ""
    };
  }
  changeCheckAll = val => {};
  editData = (val) =>{
    this.setState({
      toogleEdit:{
        name : val,
        show: true
      }
    })
  }
  onHandleChangeInput = e => {
    var target = e.target;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  };
  render() {
    const {toogleEdit, mainContent,subContent,btnContent} = this.state;
    return (
      <div>
        <section className="home_banner_area">
          <div className="overlay" />
          <div className="banner_inner d-flex align-items-center">
            <div className="container toggle-icon-edit">
              <div className="banner_content row">
                <div className="offset-lg-2 col-lg-8">
                  <h3>
                    {(<span>{mainContent ? mainContent : 'Where are you now ?'}</span>) }
                    <i className="fa fa-edit icon-edit-absobute pointer" title="Edit main content" onClick={() =>{this.editData("mainContent")}} style={{fontSize:'15px'}}></i>
                    {toogleEdit.name=='mainContent' && toogleEdit.show ? ( <textarea value={mainContent ? mainContent : ""} onBlur={()=>{this.editData('null')}} onChange={this.onHandleChangeInput} type="text" className="layout-input form-control" name="mainContent" ></textarea>)  : ''}
                  </h3>
                  <p>
                    {(<span>{subContent ? subContent : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'}</span>) }
                    <i className="fa fa-edit pointer icon-edit-absobute" title="Edit sub content " style={{fontSize:"15px",top:"85px"}} onClick={() =>{this.editData("subContent")}} ></i>
                    {toogleEdit.name=='subContent' && toogleEdit.show ? ( <textarea value={subContent ? subContent : ""} onBlur={()=>{this.editData('null')}} onChange={this.onHandleChangeInput} type="text" className="layout-input form-control" name="subContent" ></textarea>)  : ''}
                  </p>
                  <button className="white_bg_btn" onClick={() =>{this.editData("btnContent")}}>
                    { (<span>{btnContent ? btnContent : 'Click here edit'}</span>) }
                  </button>
                  <div className="offset-lg-2 col-lg-8 mt-2">
                    {toogleEdit.name=='btnContent' && toogleEdit.show ? ( <input value={btnContent ? btnContent : ""} onChange={this.onHandleChangeInput} onBlur={()=>{this.editData('null')}} type="input" className="layout-input form-control" name="btnContent" />)  : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Slider;
