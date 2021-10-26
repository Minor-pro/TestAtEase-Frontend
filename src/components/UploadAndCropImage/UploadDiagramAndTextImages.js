import React, { useEffect, useState } from "react";
import {Button, Col} from "reactstrap";
import ImageUpload from "./UploadImage";
import axios from "axios";
import { useHistory } from "react-router";

const ImagesUpload=()=>{
    const history = useHistory();
    const [textUrl,setTextUrl]=useState();
    const [diagramUrl,setDiagramUrl]=useState();

    const submitImages = async (req,res) => {
        // try {
        //     await axios({
        //         method: "post",
        //         url: `${process.env.REACT_APP_API}/api/questionImages`,
        //         data: { textUrl, diagramUrl},
        //         headers: { "Content-Type": "application/json" },
        //     });
        //     history.push('/edit')
        // } catch (e) {
        //     console.log(e);
        // }
    }

    useEffect(()=>{
        console.log(textUrl);
        console.log(diagramUrl);
    },[textUrl,diagramUrl])
    return (
        <div className="content">
            <div className="row">
                <Col md={8}>

                </Col>
                <Col md={4} sm={12}>
                    <Button type="submit" className="btn btn-block" color="primary" onSubmit={submitImages}>Continue to Edit</Button>
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
export default ImagesUpload;

