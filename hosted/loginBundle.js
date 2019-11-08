"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var handleLogin = function handleLogin(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '') {
    handleError("RAWR! Username or password is empty");
    return false;
  }

  console.log($("input[name=_csrf]").val());
  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  return false;
};

var handleSignup = function handleSignup(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("RAWR! Passwords do not match");
    return false;
  }

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  return false;
};

var LoginWindow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LoginWindow, _React$Component);

  function LoginWindow(props) {
    var _this;

    _classCallCheck(this, LoginWindow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LoginWindow).call(this, props));
    _this.state = {
      inputValue: '',
      passValue: '',
      csrf: props.csrf
    };
    _this.onInputChange = _this.onInputChange.bind(_assertThisInitialized(_this));
    _this.onInputChange2 = _this.onInputChange2.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(LoginWindow, [{
    key: "onInputChange",
    value: function onInputChange(e) {
      var value = e.target.value;
      this.setState({
        inputValue: value
      });
    }
  }, {
    key: "onInputChange2",
    value: function onInputChange2(e) {
      var value = e.target.value;
      this.setState({
        passValue: value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var inputValue = this.state.inputValue;
      var passValue = this.state.passValue;
      return React.createElement("form", {
        id: "loginForm",
        name: "loginForm",
        onSubmit: handleLogin,
        action: "/login",
        method: "POST",
        className: "mainForm"
      }, React.createElement("div", {
        className: "input-wrapper"
      }, React.createElement("label", {
        className: "loginLabels",
        htmlFor: "username"
      }, "Username "), React.createElement("input", {
        onChange: this.onInputChange,
        id: "user",
        type: "text",
        name: "username",
        placeholder: "username",
        value: inputValue
      }), React.createElement("span", {
        className: "input-highlight"
      }, inputValue.replace(/ /g, "\xA0"))), React.createElement("div", {
        className: "input-wrapper"
      }, React.createElement("label", {
        className: "loginLabels",
        htmlFor: "pass"
      }, "Password "), React.createElement("input", {
        onChange: this.onInputChange2,
        id: "pass",
        type: "text",
        name: "pass",
        placeholder: "password",
        value: passValue
      }), React.createElement("span", {
        className: "input-highlight"
      }, passValue.replace(/ /g, "\xA0")), React.createElement("input", {
        type: "hidden",
        name: "_csrf",
        value: this.state.csrf
      })), React.createElement("input", {
        className: "formSubmit",
        type: "submit",
        value: "Login"
      }), React.createElement("br", null), React.createElement("p", null, "New User? ", React.createElement("a", {
        id: "signupLink",
        href: "/signup"
      }, React.createElement("span", {
        className: "signup_link"
      }, " Signup "))));
    }
  }]);

  return LoginWindow;
}(React.Component);

var SignupWindow =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(SignupWindow, _React$Component2);

  function SignupWindow(props) {
    var _this2;

    _classCallCheck(this, SignupWindow);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(SignupWindow).call(this, props));
    _this2.state = {
      inputValue: '',
      passValue: '',
      passTwoValue: '',
      csrf: props.csrf
    };
    _this2.onInputChange = _this2.onInputChange.bind(_assertThisInitialized(_this2));
    _this2.onInputChange2 = _this2.onInputChange2.bind(_assertThisInitialized(_this2));
    _this2.onInputChange3 = _this2.onInputChange3.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(SignupWindow, [{
    key: "onInputChange",
    value: function onInputChange(e) {
      var value = e.target.value;
      this.setState({
        inputValue: value
      });
    }
  }, {
    key: "onInputChange2",
    value: function onInputChange2(e) {
      var value = e.target.value;
      this.setState({
        passValue: value
      });
    }
  }, {
    key: "onInputChange3",
    value: function onInputChange3(e) {
      var value = e.target.value;
      this.setState({
        passTwoValue: value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var inputValue = this.state.inputValue;
      var passValue = this.state.passValue;
      var passTwoValue = this.state.passTwoValue;
      return React.createElement("form", {
        id: "signupForm",
        name: "signupForm",
        onSubmit: handleSignup,
        action: "/signup",
        method: "POST",
        className: "mainForm"
      }, React.createElement("div", {
        className: "input-wrapper"
      }, React.createElement("label", {
        htmlFor: "username"
      }, "Username "), React.createElement("input", {
        onChange: this.onInputChange,
        id: "user",
        type: "text",
        name: "username",
        placeholder: "username",
        value: inputValue
      }), React.createElement("span", {
        className: "input-highlight"
      }, inputValue.replace(/ /g, "\xA0"))), React.createElement("div", {
        className: "input-wrapper"
      }, React.createElement("label", {
        htmlFor: "pass"
      }, "Password "), React.createElement("input", {
        onChange: this.onInputChange2,
        id: "pass",
        type: "text",
        name: "pass",
        placeholder: "password",
        value: passValue
      }), React.createElement("span", {
        className: "input-highlight"
      }, passValue.replace(/ /g, "\xA0"))), React.createElement("div", {
        className: "input-wrapper"
      }, React.createElement("label", {
        htmlFor: "pass2"
      }, "Password "), React.createElement("input", {
        onChange: this.onInputChange3,
        id: "pass2",
        type: "text",
        name: "pass2",
        placeholder: "retype password",
        value: passTwoValue
      }), React.createElement("span", {
        className: "input-highlight"
      }, passTwoValue.replace(/ /g, "\xA0"))), React.createElement("input", {
        type: "hidden",
        name: "_csrf",
        value: this.state.csrf
      }), React.createElement("input", {
        className: "formSubmit",
        type: "submit",
        value: "Sign Up"
      }), React.createElement("br", null), React.createElement("p", null, "Already have an account? ", React.createElement("span", {
        className: "signup_link"
      }, " Login ")));
    }
  }]);

  return SignupWindow;
}(React.Component);

;

var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render(React.createElement(LoginWindow, {
    csrf: csrf
  }), document.querySelector('#content'));
};

var createSignupWindow = function createSignupWindow(csrf) {
  ReactDOM.render(React.createElement(SignupWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

var setup = function setup(csrf) {
  var loginButton = document.querySelector("#loginButton");
  var signupButton = document.querySelector("#signupButton");
  var signupLink = document.querySelector('#signupLink');
  signupButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });
  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
  createLoginWindow(csrf); // default view
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};