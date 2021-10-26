import React, { useEffect, useState } from "react";
import {Col} from "reactstrap";

const TeacherDashboard=()=>{
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
export default TeacherDashboard;
