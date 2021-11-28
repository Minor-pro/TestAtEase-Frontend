/* eslint-disable jsx-a11y/alt-text */
import React, {useEffect} from 'react';
import "./ListCard.css"
import NoImageAvailble from "../../assets/img/NoImageAvailable.jpg";
import { Button, Card, CardBody } from 'reactstrap';

const QuestionListCard=({question, setQuestionToEdit, edit, questionToEdit})=>{
  const {text,images,id,topicTags}=question
  console.log(typeof(topicTags), topicTags)
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
          <img src={displayImage?displayImage:NoImageAvailble} className="card-img-top QuestionListCardImage" alt="Question Diagram"/>
          <div className="card-body d-flex flex-column">
            <h4>{topicTags.join(', ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())}</h4>
            <p className="card-text mb-4">{displayText ? (displayText.length <= 60 ? displayText: displayText.slice(0,55) + "....."): "No Associated Text"}</p>
            <Button className="btn btn-primary mt-auto align-self-start" color="info" onClick={editQuestion}>Edit</Button>
          </div>
      </CardBody>
    </Card>
  )
}

export default QuestionListCard;
