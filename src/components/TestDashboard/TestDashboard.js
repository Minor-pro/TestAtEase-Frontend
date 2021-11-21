import React, { useEffect, useState } from "react";
import {Button, Card, CardTitle, CardImg, Col, CardBody} from "reactstrap";
import searchImg from "../../assets/img/search.png";
import quesImg from "../../assets/img/question.png";
import { useDispatch, useSelector } from "react-redux";
import TestQuestionListCard from "components/QuestionList/TestQuestionListCard";
import { useHistory } from "react-router";
import { addTestQuestion } from "redux/actions/testAction";
import { removeQuestionFromTest } from "redux/actions/testAction";
import { generateDoc } from "functions/genrateWordDoc";
import FileNameModal from "components/Modals/FileNameModal";

const TestDashboard=()=>{

    const history=useHistory();
    const dispatch=useDispatch();

    const { test} = useSelector((state) => ({ ...state }));
    const {questions}=test;
    const [fileName, setFileName]=useState("Document")
    const [modal, setModal] = useState(false);
    const toggleModal= () => setModal(!modal);

    const search=()=>{
        history.push("/admin/list")
    }
    const add=()=>{
        history.push("/admin/upload-crop")
    }
    const [questionToRemove, setQuestionToRemove]=useState();

    const removeTestQuestion=()=>{
        console.log(questionToRemove)
        const testQuestionsArrayCopy=questions;
        var newTestQuestions = testQuestionsArrayCopy.filter(question=> question!=questionToRemove); 
        dispatch(removeQuestionFromTest(newTestQuestions));
        history.go(0);
    }
    const handleFileNameChange=(e)=>{
        setFileName(e.target.value)
        console.log(fileName)
    }
    const finishTest=()=>{
        generateDoc(test.questions,fileName);
        //push.go(0);
    }

    useEffect(()=>{
        console.log(questionToRemove)
        if(questionToRemove)removeTestQuestion()
    },[questionToRemove]) // eslint-disable-line react-hooks/exhaustive-deps
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
                    <Button className="btn btn-block" size="lg" color="info" onClick={toggleModal}>Finish Test</Button>    
                    <FileNameModal modal={modal} toggle={toggleModal} handleFileNameChange={handleFileNameChange} setFileName={setFileName} fileName={fileName} finishTest={finishTest} toggleModal={toggleModal}/>
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
                    <TestQuestionListCard question={question} setQuestionToRemove={setQuestionToRemove} remove={removeTestQuestion} questionToRemove={questionToRemove}/>
                </div>
            ))}            
            </div>
        </div>
    );
}
export default TestDashboard;
