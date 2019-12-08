import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import BrowserHistory from 'react';


class Login extends Component {
    // constructor(props) {
    //     super(props)
    // }

    responseGoogle(res) {
        console.log(res.profileObj.email)
        console.log(res)
        // send a request to get JWT

        if (sessionStorage.getItem("authToken") !== null) {
            axios.post('https://localhost:5000/author/validate', { email: res.profileObj.email, token: res.tokenObj.id_token })
                .then(response => {
                    sessionStorage.setItem("authToken", res.authToken)
                })
                .catch(err => {
                    console.log("error ", e)
                })
        } else {
            // redirect to admin homepage since we have the token alr
        }
    }

    render() {
        return (
            <div>
                <GoogleLogin
                    clientId="841597979703-ujo0ol992t85ug1ngfu5p6c5j017l00l.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
            </div>
        );
    }
}

const emailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
const alphanumericOnly = new RegExp("^[a-zA-Z0-9]*$")

function passwordLongEnough(password) {
    return password.length >= 8
}

function passwordHasSpecialChars(password) {
    return !alphanumericOnly.test(password)
}

function emailValid(email) {
    return emailRegex.test(email)
}

function checkSignedIn() {
    return true;
}

function checkSignInProvider() {
    return "google";
}

function availableSignInOptions() {
    return ["Google", "Guest"]
}

function checkEmailExists(email, listOfEmails) {
    return listOfEmails.includes(email);
}

function conversion(password) {
    return '*'.repeat(password.length)
}

function passwordEntered(password) {
    return !(password.length === 0)
}

export default Login

export { passwordEntered, conversion, checkEmailExists, checkSignedIn, checkSignInProvider, availableSignInOptions, emailValid, emailRegex, passwordHasSpecialChars, passwordLongEnough }