import EditExistingQuestion from "components/EditQuestion/EditExistingQuestion";
import EditQuestion from "components/EditQuestion/EditQuestion";
import Login from "components/Login/Login";
import QuestionList from "components/QuestionList/QuestionList";
import ImagesUpload from "components/UploadAndCropImage/UploadDiagramAndTextImages";
import Dashboard from "pages/Dashboard/Dashboard";
import React from "react";
import {Switch, Route} from "react-router-dom";



const App = (props) => {
    return <div>
        <Switch>
            <Route path="/" render={(props)=> <Dashboard {...props}/>}/>
            <Route path="/login" componrnt={Login}/>
            <Route path="/upload-crop" component={ImagesUpload}/>
            <Route path="/edit" component={EditQuestion}/>
            <Route path = "/list" componen={QuestionList} />            
            <Route path="/editexisting/:qid" component={EditExistingQuestion}/>
        </Switch>
    </div>
}

export default App;

