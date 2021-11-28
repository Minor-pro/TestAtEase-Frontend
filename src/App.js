import EditExistingQuestion from "components/EditQuestion/EditExistingQuestion";
import EditQuestion from "components/EditQuestion/EditQuestion";
import Login from "components/Login/Login";
import QuestionList from "components/QuestionList/QuestionList";
import ImagesUpload from "components/UploadAndCropImage/UploadDiagramAndTextImages";
import Dashboard from "pages/Dashboard/Dashboard";
import React from "react";
import { useSelector } from "react-redux";
import {Switch, Route, Redirect} from "react-router-dom";



const App = (props) => {
    let routes=null;
    const { user} = useSelector((state) => ({ ...state }));
    if(user===null || Object.keys(user).length===0){
        routes=<Switch>
            <Route path="/login" component={Login}/>
            <Redirect to="/login"/>
        </Switch>
    }
    else{
        routes=<Switch>
            <Route path="/admin" render={(props)=> <Dashboard {...props}/>}/>
            <Redirect to="/admin/teacherdashboard"/>
        </Switch>
    }
    return <div>
        {routes}
    </div>
}

export default App;

