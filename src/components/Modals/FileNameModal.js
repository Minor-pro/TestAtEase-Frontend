import react from "react";
import {Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import NoImageAvailable from "../../assets/img/NoImageAvailable.jpg";
import { Carousel } from 'react-responsive-carousel';

const FileNameModal=({modal, toggle,finishTest, handleFileNameChange, fileName, setFileName, toggleModal})=>{
    const  downloadFile=()=>{
        finishTest();
        toggleModal();
    }
    return(
        <Modal isOpen={modal} toggle={toggle} scrollable>
            <ModalHeader toggle={toggle} >
                Enter File Name:
            </ModalHeader>
            <ModalBody>
                <Input type="text" name="fileNmae" placeholder="" onChange={handleFileNameChange} />
                <Button className="btn btn-block" color="success" onClick={downloadFile}>Download</Button>
            </ModalBody>
        </Modal>
    )
}
export default FileNameModal;