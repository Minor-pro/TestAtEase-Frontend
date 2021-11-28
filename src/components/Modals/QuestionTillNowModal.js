import {Modal, ModalBody, ModalHeader } from "reactstrap";
//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import NoImageAvailable from "../../assets/img/NoImageAvailable.jpg";
//import { Carousel } from 'react-responsive-carousel';

const QuestionTillNowModal=({modal, toggle, questionImage})=>{
    // const genrateThumbs=()=>{
    //     const thumbs=questionImage.diagramUrl.map(questionPart=>(
    //         <img src={questionPart!=='' ? questionPart : NoImageAvailable}/>
            
    //     ))
    //     return thumbs;
    // }
    return(
        <Modal isOpen={modal} toggle={toggle} scrollable>
            <ModalHeader toggle={toggle} >
            </ModalHeader>
            <ModalBody>
                {questionImage.diagramUrl.map((questionPart, index)=>(
                        <div>
                            {questionPart!=='' && <img src={questionPart} alt="Question Diagram"/>}
                            <br/>
                            <p>{questionImage.questionText[index]}</p>
                        </div>
                ))}
                {/* <Carousel renderThumbs={genrateThumbs}>
                    {questionImage.diagramUrl.map((questionPart, index)=>(
                        <div>
                            <img src={questionPart}/>
                            <br/>
                            <p>{questionImage.questionText[index]}</p>
                        </div>
                    ))}
                </Carousel> */}
            </ModalBody>
        </Modal>
    )
}
export default QuestionTillNowModal;