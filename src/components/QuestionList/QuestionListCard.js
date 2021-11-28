/* eslint-disable jsx-a11y/alt-text */
import React, {useEffect} from 'react';
import "./ListCard.css"
import NoImageAvailble from "../../assets/img/NoImageAvailable.jpg";
import { Button, Card, CardBody } from 'reactstrap';

const QuestionListCard=({question, setQuestionToEdit, edit, questionToEdit})=>{
  const {text,images,id,topicTags}=question
  const editQuestion=()=>{
    setQuestionToEdit(question);
  }
  const displayImage=images.find(image => image !== '')
  const displayText=text.find(t=>t!=='');
  useEffect(()=>{
  },[questionToEdit])
  return (
    <Card  key ={id} className="QuestionListCard">
      <CardBody>
          <img src={displayImage?displayImage:NoImageAvailble} class="card-img-top QuestionListCardImage" alt="Question Diagram"/>
          <div class="card-body d-flex flex-column">
            <h4>{topicTags.join(', ')}</h4>
            <p class="card-text mb-4">{displayText ? (displayText.length <= 60 ? displayText: displayText.slice(0,55) + "....."): "No Associated Text"}</p>
            <Button class="btn btn-primary mt-auto align-self-start" color="info" onClick={editQuestion}>Edit</Button>
          </div>
      </CardBody>
    </Card>
  )
}

export default QuestionListCard;
