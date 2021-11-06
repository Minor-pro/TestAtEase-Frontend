const initialState={
    questions:[]
};

export default function testReducer(state = initialState, action)
{
    switch(action.type)
    {
        case "TEST_QUESTION_ADDED":
            return { 
                ...initialState,
                questions: [...state.questions, action.payload]
            };
        default:
            return state;
    }
}