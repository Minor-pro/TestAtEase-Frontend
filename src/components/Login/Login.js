import React from "react";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import { loginUser } from "redux/actions/userAction";
import axios from 'axios'; 
import web from "./landingimage.svg"; 
import "./Login.css"
//import { useHistory } from "react-router-dom";

const Login=(props)=>{
    //const history = useHistory();
    const dispatch = props.dispatch;
    const login = async (res) => {
        var user = res.profileObj;
        console.log(res)
        try {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API}/login`,
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
                                 isSignedIn={true}
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