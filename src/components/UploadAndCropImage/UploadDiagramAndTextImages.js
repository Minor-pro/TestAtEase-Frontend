import React, { useEffect, useState } from "react";
import {Col} from "reactstrap";
import ImageUpload from "./UploadImage";

const ImagesUpload=()=>{
    const [textUrl,setTextUrl]=useState();
    const [diagramUrl,setDiagramUrl]=useState();
    useEffect(()=>{
        console.log(textUrl);
        console.log(diagramUrl);
    },[textUrl,diagramUrl])
    return (
        <div className="content">
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
export default ImagesUpload;

