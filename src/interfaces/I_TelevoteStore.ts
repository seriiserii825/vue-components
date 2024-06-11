export interface I_TelevoteStore {
    id: number,
    session_content_id: number,
    question: string,
    start_time: string,
    running: boolean,
    answer_received: number,
    number_of_participant: number,
    options: [],
    countdown: number,
    right_answer: number,
    remaining_time: number,
    mutually_exclusive: boolean,
}