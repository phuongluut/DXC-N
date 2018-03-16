export interface Result {
    surveyUid?: string;
    answers: Answers[];
}

export interface Answers {
    answerUid?: string;
    answer: string;
    count?: number;
}