import axios from "axios"

export const getCoordinates=async(QuestionDiagramImageForm)=>{  //send authtoken in headers as it is a protected route
    return await axios({
        method: 'post',
        url: 'https://api.ocr.space/Parse/Image',
        data: QuestionDiagramImageForm,
        config: { headers: {'Content-Type': 'multipart/form-data' ,}}
    })
}
