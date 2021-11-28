import {Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";

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