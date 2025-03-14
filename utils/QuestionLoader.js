// utils/QuestionLoader.js
export default class QuestionLoader {
    static _questions = null;  // cache

    static async loadQuestions() {
        // If we already loaded questions, just return them
        if (this._questions) {
            return this._questions;
        }

        // Otherwise fetch CSV once
        let response = await fetch("../data/questions.csv");
        let text = await response.text();
        let lines = text.split("\n").filter(line => line.trim().length > 0);

        this._questions = lines.map(line => {
            let parts = line.split(",");
            return {
                question: parts[0],
                answers: parts.slice(1, -1),
                correctAnswer: parts[parts.length - 1].trim()
            };
        });

        return this._questions;
    }
}
