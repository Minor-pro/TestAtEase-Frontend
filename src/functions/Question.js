import axios from "axios";

export const addQuestion=async(user,QuestionText,diagramImage,topicTags,recognizedWords)=>{  
    return await axios({
        method: "post",
        url: `${process.env.REACT_APP_API}/question`,
        data: { teacher: user, questionText: QuestionText, questionImage: diagramImage, questionTopicTags: topicTags, recognizedWords: recognizedWords},
        headers: { "Content-Type": "application/json" },
    })
}
export const updateQuestion=async(qid,QuestionText,diagramImage,topicTags,recognizedWords)=>{  
    return await axios({
        method: "post",
        url: `${process.env.REACT_APP_API}/question/${qid}`,
        data: {qid:qid, questionText: QuestionText, questionImage: diagramImage, questionTopicTags: topicTags, recognizedWords: recognizedWords},
        headers: { "Content-Type": "application/json" },
    })
}
export const listAllQuestions=async(user)=>{  
    return await axios({
        method: "get",
        url: `${process.env.REACT_APP_API}/list/${user.email}`,
        headers: { "Content-Type": "application/json" },
    })
}