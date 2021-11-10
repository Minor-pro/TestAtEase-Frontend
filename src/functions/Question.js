import axios from "axios";

export const addQuestion=async(user,QuestionText,diagramImage,topicTags,recognizedWords)=>{  
    console.log(user,QuestionText,diagramImage,topicTags)
    return await axios({
        method: "post",
        url: `${process.env.REACT_APP_API}/question`,
        data: { teacher: user, questionText: QuestionText, questionImage: diagramImage, questionTopicTags: topicTags, recognizedWords: recognizedWords},
        headers: { "Content-Type": "application/json" },
    })
}