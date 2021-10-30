import EditQuestion from "components/EditQuestion/EditQuestion";
import Login from "components/Login/Login";
import ImagesUpload from "components/UploadAndCropImage/UploadDiagramAndTextImages";
import Dashboard from "pages/Dashboard/Dashboard";
import React from "react";
import {Switch, Redirect, Route} from "react-router-dom";



const App = (props) => {
    return <div>
        <Switch>
            <Route path="/" render={(props)=> <Dashboard {...props}/>}/>
            <Route path="/login" componrnt={Login}/>
            <Route path="/upload-crop" component={ImagesUpload}/>
            <Route path="/edit" component={EditQuestion}/>
        </Switch>
    </div>
}

export default App;

