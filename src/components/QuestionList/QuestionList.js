import React, { useEffect, useState } from "react";
import QuestionListCard from "./QuestionListCard";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { uploadQuestionImage } from "redux/actions/questionImageAction";
import { listAllQuestions } from "functions/Question";


const QuestionList=(props)=>{
    
    const history = useHistory();
    const dispatch = props.dispatch;

    const { user} = useSelector((state) => ({ ...state }));
    const [allQuestions, setAllQuestions]=useState([]);
    const [questionToEdit, setQuestionToEdit]=useState();

    const ContinueToEdit=()=>{
        console.log(questionToEdit)
        const imagesUrl={
            "textUrl":questionToEdit ? questionToEdit.text.map(()=>''):[],
            "diagramUrl":questionToEdit ? questionToEdit.images : [],
            "words":questionToEdit ? questionToEdit.recognizedWords : [],
            "questionText": questionToEdit ? questionToEdit.text : [],
            "index":0
        }
        console.log(imagesUrl)
        dispatch(uploadQuestionImage(imagesUrl))
        history.push(`/admin/editexisting/${questionToEdit.id}`)
    }
    const loadAllQuestion=async()=>{
        listAllQuestions(user)
        .then(res=>{
          setAllQuestions(res['data'])
        })
        .catch(err=>{
          console.log(err);
        })
    }
    //eslint-disable-next-line
    useEffect(()=>{
        console.log(questionToEdit)
        if(questionToEdit)ContinueToEdit()
    },[questionToEdit]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(()=>{
        loadAllQuestion()
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className="content">
            
            <div class="row row-cols-1 row-cols-md-3 g-4">
            {allQuestions.length>0 && allQuestions.map((question)=>(
                <div key= {question.id}class="col">
                    <QuestionListCard question={question} setQuestionToEdit={setQuestionToEdit} edit={ContinueToEdit} questionToEdit={questionToEdit}/>
                </div>
            ))}            
            </div>
            
        </div>
    );
}
export default connect()(QuestionList);

