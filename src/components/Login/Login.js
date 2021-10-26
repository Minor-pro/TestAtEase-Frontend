import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import { loginUser } from "redux/actions/userAction";
import axios from 'axios'; 

import { useHistory } from "react-router-dom";

const Login=(props)=>{
    const history = useHistory();
    const dispatch = props.dispatch;
    const login = async (res) => {
        var user = res.profileObj;
        console.log(`${process.env.REACT_APP_API}/api/login`);
        console.log(res)
        try {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API}/api/login`,
                data: { name: user.name, email: user.email },
                headers: { "Content-Type": "application/json" },
            });
            //history.push('/')
        } catch (e) {
            console.log(e);
        }
        dispatch(loginUser(user));
    }
    return ( 
        <div className="content">
            <div className="row">
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={login}
                isSignedIn={true}
                cookiePolicy={"single_host_origin"}
            />
            </div>
        </div>
    );
}
export default connect()(Login);