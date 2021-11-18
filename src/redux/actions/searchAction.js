export const searchQuestions = (payload = {}) => {
    console.log(payload)
    return { type: "SEARCH_QUESTION", payload };
};