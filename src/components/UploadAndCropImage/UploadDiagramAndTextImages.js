import React, { useEffect, useState } from "react";
import {Button, Col} from "reactstrap";
import ImageUpload from "./UploadImage";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { uploadQuestionImage } from "redux/actions/questionImageAction";

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
        var bodyFormData = new FormData();
        // bodyFormData.set('url', 'http://i.imgur.com/fwxooMv.png');
        bodyFormData.set('base64Image', diagramUrl);
        bodyFormData.set('apikey', process.env.REACT_APP_OCRKEY); 
        bodyFormData.set('isOverlayRequired', true);
        axios({
            method: 'post',
            url: 'https://api.ocr.space/Parse/Image',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' ,}}
        })
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

