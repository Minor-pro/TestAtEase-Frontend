import React from "react";
import {Button, Card, CardTitle, CardImg, Col, CardBody} from "reactstrap";
import searchImg from "../../assets/img/search.png";
import testImg from "../../assets/img/test.png";
import quesImg from "../../assets/img/question.png";
import "./TeacherDashboard.css"
import { useHistory } from "react-router";

const TeacherDashboard=()=>{
    const history=useHistory();

    const search=()=>{
        history.push("/admin/list")
    }
    const add=()=>{
        history.push("/admin/upload-crop")
    }
    const makeTest=()=>{
        history.push("/admin/testdashboard")
    }
    return (
        <div className="content">
            <div className="row">
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <CardTitle className="ChioceCardTitle" tag="h3">Search a Question</CardTitle>
                            <CardImg className="ChioceCardImage" src={searchImg}></CardImg>
                            <Button className="btn btn-block" color="primary" onClick={search}>Search a Question</Button>   
                        </CardBody>                                    
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <CardTitle className="ChioceCardTitle" tag="h3">Add a Question</CardTitle>
                            <CardImg className="ChioceCardImage" src={quesImg}></CardImg>
                            <Button className="btn btn-block" color="primary" onClick={add}>Add a Question</Button>      
                        </CardBody>                                    
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody>
                        <CardTitle className="ChioceCardTitle" tag="h3">Make a Test</CardTitle>
                        <CardImg className="ChioceCardImage" src={testImg}></CardImg>
                        <Button className="btn btn-block" color="primary" onClick={makeTest}>Make a Test</Button>         
                        </CardBody>                                    
                    </Card>
                </Col>
            </div>
        </div>
    );
}
export default TeacherDashboard;
