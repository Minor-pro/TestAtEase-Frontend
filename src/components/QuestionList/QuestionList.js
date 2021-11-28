import React, { useEffect, useState } from "react";
import QuestionListCard from "./QuestionListCard";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { uploadQuestionImage } from "redux/actions/questionImageAction";
import { listAllQuestions } from "functions/Question";
import Search from "components/Search/search";
import axios from "axios";
import { searchQuestions } from "redux/actions/searchAction";


const QuestionList=(props)=>{
    
    const history = useHistory();
    const dispatch = props.dispatch;

    const { user, search} = useSelector((state) => ({ ...state }));
    const { text } = search;
    const [searchedQuestions, setSearchedQuestions]=useState([])
    const [allQuestions, setAllQuestions]=useState([]);
    const [questionToEdit, setQuestionToEdit]=useState();

    const ContinueToEdit=()=>{
        const imagesUrl={
            "textUrl":questionToEdit ? questionToEdit.text.map(()=>''):[],
            "diagramUrl":questionToEdit ? questionToEdit.images : [],
            "words":questionToEdit ? questionToEdit.recognizedWords : [],
            "questionText": questionToEdit ? questionToEdit.text : [],
            "topicTags" : questionToEdit ? questionToEdit.topicTags.join(", ") : '',
            "index":0
        }
        dispatch(uploadQuestionImage(imagesUrl))
        dispatch(searchQuestions({text:""}));
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
    const searchQuestionsByText = (argtext) => {
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API}/list/search`,
            data: {teacher:user, query:argtext},
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            setSearchedQuestions(res.data);
        })
        .catch(err=>{
            console.log(err)
        })
    };
    useEffect(() => {
        const delayed = setTimeout(() => {
            searchQuestionsByText(text);
        }, 300);
        return () => clearTimeout(delayed);
      }, [text]);
    
      
    //eslint-disable-next-line
    useEffect(()=>{
        if(questionToEdit)ContinueToEdit()
    },[questionToEdit]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(()=>{
        loadAllQuestion()
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className="content">
            <div clas="row">
                <Search/>
            </div>
            <div class="row row-cols-1 row-cols-md-3 g-4">
            {allQuestions.length>0 && text.length<1 && allQuestions.map((question)=>(
                <div key= {question.id}class="col">
                    <QuestionListCard question={question} setQuestionToEdit={setQuestionToEdit} edit={ContinueToEdit} questionToEdit={questionToEdit}/>
                </div>
            ))}   
            {searchedQuestions.length>0 && searchedQuestions.map((question)=>(
                <div key= {question.id}class="col">
                    <QuestionListCard question={question} setQuestionToEdit={setQuestionToEdit} edit={ContinueToEdit} questionToEdit={questionToEdit}/>
                </div>
            ))}           
            </div>
            
        </div>
    );
}
export default connect()(QuestionList);

