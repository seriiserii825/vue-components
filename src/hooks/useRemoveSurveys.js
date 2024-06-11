const useRemoveSurveysLocalStorage = () => {
    localStorage.removeItem("survey_questions");
    localStorage.removeItem("student_surveys");
}
export default useRemoveSurveysLocalStorage;
