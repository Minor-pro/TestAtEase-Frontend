/* eslint-disable jsx-a11y/alt-text */
import React, {useEffect} from 'react';
import "./ListCard.css"
import NoImageAvailble from "../../assets/img/NoImageAvailable.jpg";
import { Button, Card, CardBody } from 'reactstrap';

const TestQuestionListCard=({question, setQuestionToRemove, remove, questionToRemove})=>{
  const {text,images,id,topicTags}=question

  const removeQuestion=()=>{
    setQuestionToRemove(question);
  }
  const displayImage=images.find(image => image !== '')
  const displayText=text.find(t=>t!=='');

  useEffect(()=>{
  },[questionToRemove])

  return (
    <Card  key ={id} className="TestQuestionListCard">
      <CardBody className="card-body d-flex flex-column">
        <img src={displayImage?displayImage:NoImageAvailble} className="card-img-top QuestionListCardImage" alt="Question Diagram"/>
          <div className="card-body d-flex flex-column">
            <h4>{topicTags.join(', ')}</h4>
            <p className="card-text mb-4">{displayText ? (displayText.length <= 60 ? displayText: displayText.slice(0,55) + "....."): "No Associated Text"}</p>
            <Button className="btn btn-primary mt-auto align-self-start" color="warning" onClick={removeQuestion}>Remove</Button>
          </div>
      </CardBody>
    </Card>
  )
}

export default TestQuestionListCard;
