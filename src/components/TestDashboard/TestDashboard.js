import React from "react";
import {Button, Card, CardTitle, CardImg, Col, CardBody} from "reactstrap";
import searchImg from "../../assets/img/search.png";
import quesImg from "../../assets/img/question.png";
import { useSelector } from "react-redux";
import QuestionListCard from "components/QuestionList/QuestionListCard";
import TestQuestionListCard from "components/QuestionList/TestQuestionListCard";
import { useHistory } from "react-router";

const TestDashboard=()=>{

    const history=useHistory();

    const { test} = useSelector((state) => ({ ...state }));
    const {questions}=test;

    const search=()=>{
        history.push("/admin/list")
    }
    const add=()=>{
        history.push("/admin/upload-crop")
    }
    return (
        <div className="content">
            <div className="row">
                <Col md={3}>
                    <Button className="btn btn-block" size="lg" color="primary" onClick={search}>Search a Question</Button>   
                    {/* <Card>
                        <CardBody>
                            <CardTitle className="ChioceCardTitle" tag="h3">Search a Question</CardTitle>
                            <CardImg className="ChioceCardImage" src={searchImg}></CardImg>
                            <Button className="btn btn-block" color="primary" onClick={search}>Search a Question</Button>   
                        </CardBody>                                    
                    </Card> */}
                </Col>
                <Col md={3}>
                    <Button className="btn btn-block" size="lg" color="primary" onClick={add}>Add a Question</Button>      
                    {/* <Card>
                        <CardBody>
                            <CardTitle className="ChioceCardTitle" tag="h3">Add a Question</CardTitle>
                            <CardImg className="ChioceCardImage" src={quesImg}></CardImg>
                            <Button className="btn btn-block" color="primary" onClick={add}>Add a Question</Button>      
                        </CardBody>                                    
                    </Card> */}
                </Col>                
                <Col md={2}></Col>
                <Col md={4}>
                    <Button className="btn btn-block" size="lg" color="info" onClick={add}>Finish Test</Button>      
                    {/* <Card>
                        <CardBody>
                            <CardTitle className="ChioceCardTitle" tag="h3">Add a Question</CardTitle>
                            <CardImg className="ChioceCardImage" src={quesImg}></CardImg>
                            <Button className="btn btn-block" color="info" onClick={add}>Finish Test</Button>      
                        </CardBody>                                    
                    </Card> */}
                </Col>
            </div>
            <hr/>
            <h3>Questions in Test</h3>
            <div class="row row-cols-1 row-cols-md-3 g-4">
            {questions.length>0 && questions.map((question)=>(
                <div key= {question.id}class="col">
                    <TestQuestionListCard question={question}/>
                </div>
            ))}            
            </div>
        </div>
    );
}
export default TestDashboard;
