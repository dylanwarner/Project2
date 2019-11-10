const handleLogin = (e) => {
    e.preventDefault();

    $("#errorAlert").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == '') {
        handleError("Username or password is empty.");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

const handleSignup = (e) => {
    e.preventDefault();

    $("#errorAlertSign").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleErrorSign("All fields are required.");
        return false;
    }

    if($("#pass").val() !== $("#pass2").val()) {
        handleErrorSign("Passwords do not match.");
        return false;
    }

    sendAjaxSignUp('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirectSign);
    
    return false;
};

class LoginWindow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            passValue: '',
            csrf: props.csrf,
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onInputChange2 = this.onInputChange2.bind(this);
    };

    onInputChange(e) {
        const { value } = e.target;
        this.setState({
            inputValue: value
        });
    };

    onInputChange2(e) {
        const { value } = e.target;
        this.setState({
            passValue: value
        });
    };

    render() {
    const { inputValue } = this.state;
    const { passValue } = this.state;
    return (
        <form id="loginForm" name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
        <div className="input-wrapper">
        <label className="loginLabels" htmlFor="username">Username </label>
        <input onChange={this.onInputChange} id="user" type="text" name="username" placeholder="Username" value={inputValue}/>
        <span className='input-highlight'>
        { inputValue.replace(/ /g, "\u00a0") }
        </span>
        </div>
        <div className="input-wrapper">
        <label className="loginLabels" htmlFor="pass">Password </label>
        <input onChange={this.onInputChange2} id="pass" type="text" name="pass" placeholder="Password" value={passValue}/>
        <span className='input-highlight'>
        { passValue.replace(/ /g, "\u00a0") }
        </span>
        <input type="hidden" name="_csrf" value={this.state.csrf}/>
        </div>
        <input className="formSubmit" type="submit" value="Login" />
        </form>
    );
    }
}

class SignupWindow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            passValue: '',
            passTwoValue: '',
            csrf: props.csrf,
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onInputChange2 = this.onInputChange2.bind(this);
        this.onInputChange3 = this.onInputChange3.bind(this);
    };

    onInputChange(e) {
        const { value } = e.target;
        this.setState({
            inputValue: value
        });
    };

    onInputChange2(e) {
        const { value } = e.target;
        this.setState({
            passValue: value
        });
    };

    onInputChange3(e) {
        const { value } = e.target;
        this.setState({
            passTwoValue: value
        });
    };

    render() {
    const { inputValue } = this.state;
    const { passValue } = this.state;
    const { passTwoValue } = this.state;
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
        
        <div className="input-wrapper">
        <label htmlFor="username">Username </label>
        <input onChange={this.onInputChange} id="user" type="text" name='username' placeholder="Username" value={inputValue}/>
        <span className='input-highlight'>
        { inputValue.replace(/ /g, "\u00a0") }
        </span>
        </div>
        <div className="input-wrapper">
        <label htmlFor="pass">Password </label>
        <input onChange={this.onInputChange2} id="pass" type="text" name="pass" placeholder="Password" value={passValue}/>
        <span className='input-highlight'>
        { passValue.replace(/ /g, "\u00a0") }
        </span>
        </div>
        <div className="input-wrapper">
        <label htmlFor="pass2">Password </label>
        <input onChange={this.onInputChange3} id="pass2" type="text" name="pass2" placeholder="Confirm Password" value={passTwoValue}/>
        <span className='input-highlight'>
        { passTwoValue.replace(/ /g, "\u00a0") }
        </span>
        </div>
        <input type="hidden" name="_csrf" value={this.state.csrf} />
        <input className="formSubmit" type="submit" value="Sign Up" />
        </form>
    );
    }
};

const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector('#content')
    );
};

const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")     
    );
};

const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");
    const errorAlert = document.querySelector("#errorAlert");
    const errorAlertSign = document.querySelector("#errorAlertSign");

    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        errorAlert.style.display = "none";
        return false;
    });

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        errorAlertSign.style.display = "none";
        return false;
    });

    createLoginWindow(csrf); // default view
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});