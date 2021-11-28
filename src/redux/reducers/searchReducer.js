export default function searchReducer (state={text:""}, action)
{
    switch (action.type) {
      case "SEARCH_QUESTION":
        return { ...state, ...action.payload };
      default:
        return state;
    }
};
