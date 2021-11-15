const question={
    "textUrl":[],
    "diagramUrl":[],
    "words":[],
    "questionText": []
}

export default function questionImageReducer(state = question, action)
{
    switch(action.type)
    {
        case "QUESTION_IMAGE_UPLOADED":
            return action.payload;
        default:
            return state;
    }
}