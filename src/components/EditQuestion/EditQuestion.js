import React, { useState } from "react";
import ImageMapper from 'react-img-mapper';

import {Button, Card, CardHeader, CardBody, CardTitle, CardImg, CardText, CardSubtitle, Container, FormGroup, Form, Input, Row, Col, InputGroupAddon, InputGroupText, InputGroup, CardFooter, ButtonGroup} from "reactstrap";

import BioQues from "../../assets/img/FakeData/BioQues.png";
import BioDiagram from "../../assets/img/FakeData/BioNew.png";

import "./EditQuestion.css"

const EditQuestion = () =>{
    const [QuestionText, setQuestionText]=useState("")
    const [edits,setEdits] = useState([]);

    const addEdit=(area)=>{
        setEdits((prev) => {
            return [... (new Set([...prev, area]))];
        })
    }
    const removeEdit=(coord)=>{
        console.log(edits)
        setEdits(prev=>prev.filter((o)=>o.coords!=coord))
    }
    const handleEditChange = (coord, e) => {
        const values = [...edits];
        setEdits(values)
      };
    const AREAS_MAP = {
        name: "diagram",
        areas: [
          { name: "cowpat", shape: "poly", coords: [546,12,546,28,600,28,600,12], strokeColor: "blue"  },
          { name: "Approximate", shape: "poly", coords: [18,48,18,64,113,64,113,48], strokeColor: "blue"  },
        ]
    };
    const clickedZone=(area)=>{
        addEdit(area);
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
            <div className="row">
                <Col md="7" sm="12">
                    <Card>
                        <CardBody>
                            <CardTitle>Question Text Image</CardTitle>
                        </CardBody>
                        <CardImg bottom src={BioQues} alt="..."></CardImg>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle>Edit Question Text Image</CardTitle>
                            <FormGroup>
                                <Input
                                type="textarea"
                                defaultValue="Label the tunnels on the diagram using."
                                />
                            </FormGroup>
                            <Button className="btn-block" color="primary">Apply Edits</Button>
                        </CardBody>
                    </Card>
                </Col>
            </div>
            <div className="row">
                <Col md="7" sm="12">
                    <Card style={{overflow:"scroll"}}>
                        <CardBody >
                            <CardTitle>Question Text Image</CardTitle>
                        </CardBody>
                        <ImageMapper src={BioDiagram} map={AREAS_MAP} onClick={(area)=>clickedZone(area)}  />
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <CardBody  >
                            <CardTitle>Edit Question Text Image</CardTitle>                            
                            <CardText><small className="text-muted">Hover over the diagram and Click over the word to replace it.</small></CardText>
                            {edits.map(({name,coords }) => (
                                <Row key={coords} >
                                    <Col>
                                        <Input type="text" key={[coords,"original"]} disabled defaultValue={name} />
                                    </Col>
                                    <Col>
                                        <Input type="text" key={[coords,"replacement"]} placeholder="Replace with" onChange={e=>handleEditChange(coords,e)}/>
                                    </Col>
                                    <Col>
                                        <Button color="warning" id="removeEdit" onClick={() => removeEdit(coords)}><i class="fas fa-minus-circle"></i></Button>
                                    </Col>
                                </Row>
                            ))}
                            {edits.length>0 && 
                                <Button className="btn-block" color="primary">Apply Edits</Button>
                            }
                            <Input type="text" placeholder="Comma Seperated Topic Tags" />
                            
                        </CardBody>
                        {edits.length>0 && <CardFooter className="QuestionEndFooter">
                            <ButtonGroup>
                                <Button >Save</Button>{' '}
                                <Button color="success" round>Save & Add</Button>{' '}
                                <Button color="danger" round>Cancel</Button>{' '}
                            </ButtonGroup>
                        </CardFooter>}
                    </Card>
                </Col>
            </div>
        </div>
    )
}
export default EditQuestion;