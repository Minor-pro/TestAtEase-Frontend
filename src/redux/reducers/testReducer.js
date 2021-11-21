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
                ...initialState,
                test:state.test,
                questions: [...state.questions, action.payload]
            };
        case "TEST_QUESTION_REMOVED":
            return { 
                ...initialState,
                test:state.test,
                questions: action.payload
            };
        case "CREATE_TEST":
            return{
                ...initialState,
                test: action.payload,
                questions: [...state.questions]
            }
        default:
            return state;
    }
}