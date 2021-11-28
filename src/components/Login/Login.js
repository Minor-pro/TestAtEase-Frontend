import React from "react";
import GoogleLogin from "react-google-login";
import { connect, useDispatch } from "react-redux";
import { loginUser } from "redux/actions/userAction";
import web from "./landingimage.svg"; 
import "./Login.css"
import { useHistory } from "react-router";
import { loginAndAddUser } from "functions/auth";
//import { useHistory } from "react-router-dom";

const Login=()=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const login = async (res) => {
        var user = res.profileObj;
        loginAndAddUser(user)
        try {
            dispatch(loginUser(user));
            history.push("/admin/teacherdashboard")
        } catch (e) {
            console.log(e);
        }
    }
    return ( 
        
            <div className="content">
                <section id="header" className="d-flex align-items-center">

                <div className="container-fluid nav_bg">
                <div className="row">
                    <div className="col-10 mx-auto">
                        <div className="row">
                        <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                            <h1> Make Test easily with <strong className="brand-name">Test At Ease</strong></h1>
                            <h2 className="my-3"> Now make test by just clicking pictures</h2>
                            <div className="mt-3">
                             <GoogleLogin
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                buttonText="Login with Google"
                                onSuccess={login}
                                cookiePolicy={"single_host_origin"}
                                className="btn-get-started"
                            />
                            </div> 
                        </div>
                        
                        <div className="col-lg-6 order-1 order-lg-2 header-img">
                            <img src={web}
                            className="img-fluid animated"
                            alt="home img"/>
                        </div>
                        </div>
                    </div>
                 
                </div>
                </div>
            
            </section>
            </div>
       
       
    );
}
export default connect()(Login);