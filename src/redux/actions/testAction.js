export const addTestQuestion = (payload = {}) => {
    return { type: "TEST_QUESTION_ADDED", payload };
};
export const removeQuestionFromTest = (payload = {}) => {
    return { type: "TEST_QUESTION_REMOVED", payload };
};
export const createTest = (payload = {}) => {
    return { type: "CREATE_TEST", payload };
};
