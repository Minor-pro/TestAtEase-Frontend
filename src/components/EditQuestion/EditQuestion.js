import React, { useState } from "react";

import ImageMapper from 'react-img-mapper';

import {Button, Card, CardBody, CardTitle, CardImg, CardText, FormGroup, Input, Row, Col, CardFooter, ButtonGroup} from "reactstrap";

import "./EditQuestion.css"
import { useSelector } from "react-redux";

import mergeImages from 'merge-images';
import { addQuestion } from "functions/Question";


import { connect } from "react-redux";
import { useHistory } from "react-router";
import { uploadQuestionImage } from "redux/actions/questionImageAction";
import { addTestQuestion } from "redux/actions/testAction";

const EditQuestion = (props) =>{

    const history = useHistory();
    const dispatch = props.dispatch;

    const { user, questionImage } = useSelector((state) => ({ ...state }));
    const [recognizedWords,setRecognizedWords] =useState(questionImage.words)
    const [QuestionText, setQuestionText]=useState(questionImage.questionText)
    const [diagramImage, setDiagramImage]=useState(questionImage.diagramUrl);
    const [edits,setEdits] = useState([]);
    const [topicTags, setTopicTags] = useState('');
    let wordMappings=[];

    if(recognizedWords && recognizedWords.length>0){
            wordMappings=recognizedWords.map(wordObj=>{
            let mappedWordObj={};
            mappedWordObj['name']=wordObj['WordText'];
            mappedWordObj['shape']="poly";
            let l=wordObj['Left'];
            let t=wordObj['Top']
            let w=wordObj['Width'];
            let h=wordObj['Height'];
            mappedWordObj['coords']=[l, t, l, t+h, l+w, t+h, l+w, t];
            mappedWordObj['strokeColor']='blue'
            return mappedWordObj;
        });
    }
    const AREAS_MAP = {
        name: "diagram",
        areas: wordMappings
    };

    const addEdit=(area)=>{
        setEdits((prev) => {
            return [...(new Set([...prev, area]))];
        })
    }
    const removeEdit=(coord)=>{
        //console.log(edits)
        setEdits(prev=>prev.filter((o)=>o.coords!==coord))
    }
    const handleEditChange = (e) => {
        const values = [...edits];
        values[e.target.name]['replacement']=e.target.value;
        setEdits(values);
    };
    const clickedZone=(area)=>{
        addEdit(area);
    }
    const handleTextChange=(e)=>{
        setQuestionText(e.target.value);
    }
    const replacementTextAsImage=(coords, replacement)=>{
        var canvas = document.getElementById("textImage");
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width=coords[4]-coords[0];
        canvas.height=coords[3]-coords[1];
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        context.fillStyle = "#FFFFFF";
        context.fillRect(0,0,canvas.width,canvas.height);
        context.fillStyle = "#000000";
        context.font = "bold 20px Arial";
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(replacement, x, y, coords[4]-coords[0]);
        return canvas.toDataURL()
    }

    const applyEdits=async ()=>{
        const textImages = [];
        textImages.push({
            src:diagramImage,
            x:0,
            y:0
        })
        edits.forEach(({coords, replacement})=>{
            textImages.push({
                src: replacementTextAsImage(coords,replacement),
                x:coords[0],
                y:coords[1]
            });
           
        })  
        mergeImages(textImages)
            .then(editedImage => {
                //console.log(editedImage);
                setDiagramImage(editedImage);
                let questionImageWordCopy=questionImage.words;
                edits.forEach(edit=>{
                    questionImageWordCopy.forEach(word=>{
                        if(word['Left']===edit.coords[0] && word['Top']===edit.coords[1]) {
                            //console.log(word)
                            word['WordText']=edit['replacement'];                 
                            //console.log(word)      
                        }
                    })
                })
                setRecognizedWords(questionImageWordCopy);
                setEdits([])
            });      
    };
    const handleTopicTagChange=(e)=>{
        setTopicTags(e.target.value.split(", "))
    }

    const handleQuesionSubmit=(e)=>{
        e.preventDefault();
        addQuestion(user, QuestionText, diagramImage, topicTags, recognizedWords)
        .then(res=>{
            console.log(res)
            dispatch(uploadQuestionImage({}))
            history.push("/admin/upload-crop")
        })
        .catch(err=>{
            console.log(err);
        })    
    }
    const handleQuesionSubmitAndAdd=(e)=>{
        e.preventDefault();
        addQuestion(user, QuestionText, diagramImage, topicTags, recognizedWords)
        .then(res=>{
            console.log(res)
            dispatch(addTestQuestion(res['data']['question']))
            dispatch(uploadQuestionImage({}))
            history.push("/admin/upload-crop")
        })
        .catch(err=>{
            console.log(err);
        })    
    }
    const handleCancel=(e)=>{
        dispatch(uploadQuestionImage({}))
        history.push("/admin/upload-crop")
    }

    return( 
        <div className="content">
            <div className="row">
                <Col md="9" sm="0">
                </Col>
                <Col md="3" sm="12">
                    <Button className="FinishTestButton btn-block" size="lg" color="info">Finish Test</Button>{' '}
                </Col>
            </div>
            {questionImage.questionText && <div className="row">
                {questionImage.textUrl!=='' && <Col md="8" sm="12">
                    <Card>
                        <CardBody>
                            <CardTitle>Question Text Image</CardTitle>
                        </CardBody>
                        <CardImg bottom src={questionImage.textUrl} alt="..."></CardImg>
                    </Card>
                </Col>}
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle>Edit Question Text</CardTitle>
                            <FormGroup>
                                <Input
                                type="textarea"
                                defaultValue={questionImage.questionText}
                                onChange={handleTextChange}
                                />
                            </FormGroup>
                            <Button className="btn-block" color="primary">Apply Edits</Button>
                        </CardBody>
                        {questionImage.diagramUrl==='' && <CardFooter className="QuestionEndFooter">
                            <ButtonGroup>
                                <Button onClick={handleQuesionSubmit} >Save</Button>{' '}
                                <Button onClick={handleQuesionSubmitAndAdd} color="success" round>Save & Add</Button>{' '}
                                <Button onClick={handleCancel} color="danger" round>Cancel</Button>{' '}
                            </ButtonGroup>
                        </CardFooter>}
                    </Card>
                </Col>
            </div>}
            {questionImage.diagramUrl && <div className="row">
                <Col md="8" sm="12">
                    <Card style={{overflow:"scroll"}}>
                        <CardBody >
                            <CardTitle>Question Diagram Image</CardTitle>
                        </CardBody>
                        <ImageMapper src={diagramImage} map={AREAS_MAP} onClick={(area)=>clickedZone(area)}  />
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <CardBody  >
                            <CardTitle>Edit Question Diagram Image</CardTitle>                            
                            <CardText><small className="text-muted">Hover over the diagram and Click over the word to replace it.</small></CardText>
                            {edits.map(({name,coords},index) => (
                                <Row key={coords} >
                                    <Col>
                                        <Input type="text" key={[index,"original"]} disabled defaultValue={name} />
                                    </Col>
                                    <Col>
                                        <Input type="text" key={[index,"replacement"]} name={index} placeholder="Replace with" onChange={handleEditChange}/>
                                    </Col>
                                    <Col>
                                        <Button color="warning" id="removeEdit" onClick={() => removeEdit(coords)}><i class="fas fa-minus-circle"></i></Button>
                                    </Col>
                                </Row>
                            ))}
                            {edits.length>0 && 
                                <Button className="btn-block" color="primary" onClick={applyEdits}>Apply Edits</Button>
                            }
                            <Input type="text" placeholder="Comma Seperated Topic Tags" onChange={handleTopicTagChange}/>
                            
                        </CardBody>
                        <CardFooter className="QuestionEndFooter">
                            <ButtonGroup>
                                <Button onClick={handleQuesionSubmit} >Save</Button>{' '}
                                <Button onClick={handleQuesionSubmitAndAdd} color="success" round>Save & Add</Button>{' '}
                                <Button onClick={handleCancel} color="danger" round>Cancel</Button>{' '}
                            </ButtonGroup>
                            <canvas hidden id="textImage" width="200" height="200"></canvas>
                        </CardFooter>
                    </Card>
                </Col>
            </div>}
        </div>
    )
}
export default connect()(EditQuestion);