export default function questionImageReducer(state = null, action)
{
    switch(action.type)
    {
        case "QUESTION_IMAGE_UPLOADED":
            return action.payload;
        default:
            return state;
    }
}