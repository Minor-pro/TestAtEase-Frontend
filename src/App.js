import EditQuestion from "components/EditQuestion/EditQuestion";
import ImagesUpload from "components/UploadAndCropImage/UploadDiagramAndTextImages";
import Dashboard from "pages/Dashboard/Dashboard";
import React from "react";
import {Switch, Redirect, Route} from "react-router-dom";



const App = (props) => {
    return <div>
        <Switch>
            <Route path="/" render={(props)=> <Dashboard {...props}/>}/>
            <Route path="/edit" component={EditQuestion}/>
            <Route path="/upload-crop" component={ImagesUpload}/>
        </Switch>
    </div>
}

export default App;

