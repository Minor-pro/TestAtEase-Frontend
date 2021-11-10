import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import QuestionListCard from "./QuestionListCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { uploadQuestionImage } from "redux/actions/questionImageAction";


const QuestionList=(props)=>{
    
    const history = useHistory();
    const dispatch = props.dispatch;

    const { user} = useSelector((state) => ({ ...state }));
    const [allQuestions, setAllQuestions]=useState([]);
    const [questionToEdit, setQuestionToEdit]=useState();

    const ContinueToEdit=()=>{
        console.log(questionToEdit)
        const imagesUrl={
            "textUrl":'',
            "diagramUrl":questionToEdit ? questionToEdit.images : '',
            "words":questionToEdit ? questionToEdit.recognizedWords : '',
            "questionText": questionToEdit ? questionToEdit.text : ''
        }
        console.log(imagesUrl)
        dispatch(uploadQuestionImage(imagesUrl))
        history.push('/admin/edit');
    }
    const loadAllQuestion=async()=>{
        console.log( `${process.env.REACT_APP_API}/list/${user.email}`)
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_API}/list/${user.email}`,
            headers: { "Content-Type": "application/json" },
        })
        .then(res=>{
          setAllQuestions(res['data'])
        })
        .catch(err=>{
          console.log(err);
        })
    }
    
    useEffect(()=>{
        console.log(questionToEdit)
        if(questionToEdit)ContinueToEdit()
    },[questionToEdit])
    useEffect(()=>{
        loadAllQuestion()
    },[])
    return (
        <div className="content">
            
            <div class="row row-cols-1 row-cols-md-3 g-4">
            {allQuestions.length>0 && allQuestions.map((question)=>(
                <div class="col">
                    <QuestionListCard question={question} setQuestionToEdit={setQuestionToEdit} edit={ContinueToEdit} questionToEdit={questionToEdit}/>
                </div>
            ))}            
            </div>
            
        </div>
    );
}
export default connect()(QuestionList);

