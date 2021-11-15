import React, { useState } from "react";
import {Button, Col, Progress} from "reactstrap";
import ImageUpload from "./UploadImage";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { uploadQuestionImage } from "redux/actions/questionImageAction";
import { getCoordinates } from "functions/QuestionIamge";

import { createWorker, PSM } from "tesseract.js";

const ImagesUpload=(props)=>{
    
    const history = useHistory();
    const dispatch = props.dispatch;

    const { user, questionImage } = useSelector((state) => ({ ...state }));
    const [textUrl,setTextUrl]=useState('');
    const [diagramUrl,setDiagramUrl]=useState('');
    const [recognizedQuestionText,setRecognizedQuestionText]=useState('');
    const [recognizedWords, setRecognizedWords]=useState([])
    const [loadingStage, setLoadingStage]=useState('')
    const words=[];

    const questionImageToText= async(textUrl)=>{
        try{
            // const result=await Tesseract.recognize(
            //     textUrl,'eng',
            //     { 
            //         logger: m => {setLoadingStage({progress:m['progress'],status:(m['status']).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())})}
                    
            //     }
            //   )
            // console.log(result['data']['text'])
            // setLoadingStage({progress:1, status:"Text Recognized"})
            // setRecognizedQuestionText((_)=>result['data']['text'])
            const worker = createWorker({
                logger: m => {console.log(m);setLoadingStage({progress:m['progress'],status:(m['status']).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())})}
              });
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            await worker.setParameters({
                tessedit_pageseg_mode: PSM.AUTO_OSD,
            });
            const { data: { text } } = await worker.recognize(textUrl);
            console.log(text);
            setLoadingStage({progress:1, status:"Text Recognized"})
            setRecognizedQuestionText((_)=>text)
            await worker.terminate();
        }
        catch(err){
            console.log(err);
        }
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
            console.log(words)
            setRecognizedWords(words)
            console.log(recognizedWords)
        })
        .catch(function (response) {
            console.log(response);
        });
    }
    const submitImages =async() => {
        textUrl!=='' && await questionImageToText(textUrl)
        diagramUrl!=='' && await getTextCoordinatesInDiagram();        
    }
    const ContinueToEdit=()=>{
        console.log(words)
        console.log(recognizedWords)
        // console.log(questionImage.recognizedWords)
        // console.log([...questionImage.textUrl,"textUrl"])
        // console.log([...questionImage.diagramUrl,"diagramUrl"])
        //console.log(questionImage.Words)
        // const a=[...questionImage.recognizedWords]
        // a.push("recognizedWords")
        // console.log(a)
        //console.log([...questionImage.recognizedQuestionText,"recognizedQuestionText"])
        const imagesUrl={
            "textUrl":[...questionImage.textUrl,textUrl],
            "diagramUrl":[...questionImage.diagramUrl,diagramUrl],
            "words":[...questionImage.words,recognizedWords],
            "questionText": [...questionImage.questionText,recognizedQuestionText]
        }
        console.log(imagesUrl)
        dispatch(uploadQuestionImage(imagesUrl))
        history.push('/admin/edit');
    }

    return (
        <div className="content">
            <div className="row">
                <Col md={8}>

                </Col>
                <Col md={4} sm={12}>
                    <Button className="btn btn-block" color="primary" onClick={ContinueToEdit} disabled={recognizedQuestionText==='' && recognizedWords==='' } >Continue to Edit</Button>
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
            {(textUrl!=='' || diagramUrl!=='') && <div className="row">
                <Col>
                    <Button className="btn btn-block" color="primary" onClick={submitImages}>Upload Cropped Images</Button>
                    <Progress animated color="sucess" value={loadingStage['progress']*100} >{loadingStage['status']}</Progress>
                </Col>
            </div>}
        </div>
    );
}
export default connect()(ImagesUpload);

