import React, { useEffect, useState } from "react";
import {Button, Col} from "reactstrap";
import ImageUpload from "./UploadImage";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { uploadQuestionImage } from "redux/actions/questionImageAction";
import { getCoordinates } from "functions/QuestionIamge";

const {createWorker} = require('tesseract.js')
const worker = createWorker({
    logger: m => console.log(m)
});

const ImagesUpload=(props)=>{
    
    const history = useHistory();
    const dispatch = props.dispatch;

    const [textUrl,setTextUrl]=useState();
    const [diagramUrl,setDiagramUrl]=useState();
    const [questionText,setQuestionText]=useState();
    const words=[];
    const questionImageToText=async (textUrl)=>{

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        console.log("Recognizing...");
        const { data: { text } } = await worker.recognize(textUrl);
        setQuestionText(text);
        console.log("Recognized text:", text);
        await worker.terminate();
    }
    const getTextCoordinatesInDiagram=async()=>{
        var QuestionDiagramImageForm = new FormData();
        // QuestionDiagramImageForm.set('url', 'http://i.imgur.com/fwxooMv.png');
        QuestionDiagramImageForm.set('base64Image', diagramUrl);
        QuestionDiagramImageForm.set('apikey', process.env.REACT_APP_OCRKEY); 
        QuestionDiagramImageForm.set('isOverlayRequired', true);
        getCoordinates(QuestionDiagramImageForm)
        .then(function (response) {
            console.log(response)
            response && response['data']['ParsedResults'][0]['TextOverlay']['Lines'].forEach(line => {
                line['Words'].forEach(word=>{
                    words.push(word);
                })
            });
            const imagesUrl={
                "textUrl":textUrl,
                "diagramUrl":diagramUrl,
                "words":words,
                "questionText": questionText
            }
    
            dispatch(uploadQuestionImage(imagesUrl))

            history.push('/admin/edit');
        })
        .catch(function (response) {
            console.log(response);
        });
    }

    const submitImages =async() => {

        await questionImageToText(textUrl)
        await getTextCoordinatesInDiagram();        
    }

    return (
        <div className="content">
            <div className="row">
                <Col md={8}>

                </Col>
                <Col md={4} sm={12}>
                    <Button className="btn btn-block" color="primary" onClick={submitImages}>Continue to Edit</Button>
                </Col>
            </div>
            <div className="row">
                <Col md={6} >
                    <ImageUpload cardTitle="Text" fileSelector="myFileSelector1" setUrl={setTextUrl}/>
                </Col>
                <Col md={6}>
                    <ImageUpload cardTitle="Diagram" fileSelector="myFileSelector2" setUrl={setDiagramUrl}/>
                </Col>
            </div>
        </div>
    );
}
export default connect()(ImagesUpload);

