const initialState={
    test:false,
    questions:[]
};

export default function testReducer(state = initialState, action)
{
    switch(action.type)
    {
        case "TEST_QUESTION_ADDED":
            return { 
                ...state,
                questions: [...state.questions, action.payload]
            };
        case "TEST_QUESTION_REMOVED":
            return { 
                ...state,
                questions: action.payload
            };
        case "CREATE_TEST":
            return{
                ...state,
                test: action.payload,
            }
        default:
            return state;
    }
}