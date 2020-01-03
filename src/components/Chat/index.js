import React, { Component } from "react";
import _ from "lodash";
import "./chat.css";
import { sendChat } from "../../store/commonAction";
import { connect } from "react-redux";
import socket from "../../configuration/socket";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      email: "",
      messages: "",
      to: "",
      from: "customer",
      listChat: [],
      showChat: false
    };
  }
  componentWillMount() {
    let user = localStorage.getItem("USER");
    let userInfo = JSON.parse(user);
    if (userInfo) {
      this.setState({
        to: userInfo.username
      });
    }
    this.loadSocket();
  }
  sendChatAndLoginEmail = async event => {
    event.preventDefault();
    let { isLogin, messages, listChat, from, to, email } = this.state;
    if (isLogin) {
      if (messages && messages != "") {
        let formData = {
          message: messages,
          from,
          to,
          email
        };
        await this.props.sendChat(formData);
        listChat.push(formData);
        this.setState({ messages: "" });
      }
    } else {
      if (email && email != "") {
        this.setState({
          isLogin: true,
        });
      }
    }
  };
  onHandleChangeInput = e => {
    var target = e.target;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  };
  toggleChat = (status) => {
    const {email} = this.state
    this.setState({
      showChat: status,
      isLogin: email ? true : false
    });
  };
  loadSocket() {
    socket.on("new-message", data => {
      const dataReceive = data.data;
      let { email, to, listChat } = this.state;
      if (dataReceive.to == email && dataReceive.email == to) {
        let formData = {
          message: dataReceive.message
        };
        listChat.push(formData);
        this.setState({
          listChat: listChat
        });
      }
    });
  }
  render() {
    let { email, messages, isLogin, showChat, listChat } = this.state;
    let renderListChat = _.map(listChat, (o, k) => {
      return (
        <div key={k}>
          {o.from ? <b>You</b> : "Admin"}: {o.message}
        </div>
      );
    });
    return (
      <div>
        <div
          className="icon-chat"
          onClick={() => {
            this.toggleChat(true);
          }}
        >
          <i className="fa fa-comments"></i>
        </div>
        {showChat ? (
          <div className="card border-none chat-box">
            <div className="card-body background-title-chat">
              <p className="card-title ">
                <span>{isLogin ? "Chat" : "Login"}</span>
                <i
                  className="fa fa-close pointer pull-right"
                  onClick={() => {
                    this.toggleChat(false);
                  }}
                ></i>
              </p>
            </div>
            <div className="card-body">
              <form
                onSubmit={e => {
                  this.sendChatAndLoginEmail(e);
                }}
              >
                <div className="card-text mb-3">
                  <input
                    type="email"
                    className="form-control"
                    onChange={this.onHandleChangeInput}
                    name="email"
                    required
                    placeholder="Ex : email@gmail.com"
                    value= {email ?email : ''}
                    disabled={isLogin}
                  />
                  {isLogin ? (
                    <div>
                      <div className="chat-content mt-2">{renderListChat}</div>
                      <input
                        type="text"
                        className="form-control mt-2"
                        onChange={this.onHandleChangeInput}
                        value={messages ? messages : ""}
                        name="messages"
                        placeholder="Press messages..."
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <button type="submit" className="btn btn-primary pull-right">
                  {isLogin ? "Send" : " Begin chat"}
                </button>
                <button onClick={() => { this.toggleChat(false); }} type="button" className="btn btn-default">
                  Close
                </button>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    sendChat: async data => {
      await dispatch(sendChat(data));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
