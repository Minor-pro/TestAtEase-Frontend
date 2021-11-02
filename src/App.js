import EditQuestion from "components/EditQuestion/EditQuestion";
import ListCard from "components/ListCard/ListCard";
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
            <Route path = "/letscheck" componen={ListCard} />
        </Switch>
    </div>
}

export default App;

