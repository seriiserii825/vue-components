const useResetLocalStorage = () => {
    localStorage.removeItem("preview");
    localStorage.removeItem("event");
    localStorage.removeItem("background");
    localStorage.removeItem("session_content_id");
    localStorage.removeItem("session_content");
    localStorage.removeItem("session_content_object");
    localStorage.removeItem("televote_id");
    localStorage.removeItem("survey_questions");
    localStorage.removeItem("student_surveys");
}
export default useResetLocalStorage;