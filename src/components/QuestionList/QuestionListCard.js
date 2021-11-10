/* eslint-disable jsx-a11y/alt-text */
import React, {useEffect} from 'react';
import "./ListCard.css"
import NoImage from "../../assets/img/NoImageAvailable.jpg";
import { Button, Card, CardBody, CardImg, CardText, Col, Row } from 'reactstrap';

const QuestionListCard=({question, setQuestionToEdit, edit, questionToEdit})=>{
  const {text,images,id,topicTags}=question
  console.log(id,topicTags)
  const editQuestion=()=>{
    setQuestionToEdit(question);
  }
    
  useEffect(()=>{
    console.log("CALLED",questionToEdit)
  },[questionToEdit])
  return (
    <Card  className="QuestionListCard">
      <CardBody>
          <img src={images!='' ? images : NoImage} class="card-img-top QuestionListCardImage" alt="Card Image"/>
          <div class="card-body d-flex flex-column">
            <p class="card-text mb-4">{text.size=='' ? "No Associated Text": (text.size <= 60 ? text: text.slice(0,55) + ".....")}</p>
            <Button class="btn btn-primary mt-auto align-self-start" color="info" onClick={editQuestion}>Edit</Button>
          </div>
      </CardBody>
    </Card>
  )
}

export default QuestionListCard;
