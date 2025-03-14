import QuestionLoader from "../utils/QuestionLoader.js";

export default class LevelScene extends Phaser.Scene {
    constructor() {
        super("LevelScene");
        this.timeLeft = 10;
        this.timerEvent = null;
    }

    async create() {
        this.timeLeft = 10; // Reset timer

        // Prompt at top
        this.add.text(50, 50, "Answer the question correctly!", {
            fontFamily: "AMFont",
            fontSize: "24px",
            fill: "#fff"
        });

        // Load questions
        const questions = await QuestionLoader.loadQuestions();
        if (!questions || questions.length === 0) {
            console.error("No questions found!");
            this.scene.start("HomeScene");
            return;
        }

        // Pick random question
        const questionData = Phaser.Utils.Array.GetRandom(questions);

        // Show question text
        this.add.text(50, 150, questionData.question, {
            fontFamily: "AMFont",
            fontSize: "20px",
            fill: "#fff"
        });

        // Shuffle and show answers
        const shuffledAnswers = Phaser.Utils.Array.Shuffle([...questionData.answers]);
        shuffledAnswers.forEach((answer, index) => {
            this.add.text(50, 250 + index * 40, answer, {
                fontFamily: "AMFont",
                fontSize: "18px",
                fill: "#0f0"
            })
            .setInteractive()
            .on("pointerdown", () => this.checkAnswer(answer, questionData.correctAnswer));
        });

        // Timer display
        this.timerText = this.add.text(600, 50, `Time Left: ${this.timeLeft}`, {
            fontFamily: "AMFont",
            fontSize: "24px",
            fill: "#ff0000"
        });

        // Clear any old timer
        if (this.timerEvent) {
            this.timerEvent.remove();
        }

        // Start countdown
        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    updateTimer() {
        if (this.timeLeft > 0) {
            this.timeLeft--;
            this.timerText.setText(`Time Left: ${this.timeLeft}`);
        } else {
            this.timerEvent.remove();
            this.scene.start("HomeScene");
        }
    }

    checkAnswer(selected, correct) {
        // Disable input
        this.input.enabled = false;

        // Stop timer
        this.timerEvent.remove();

        if (selected === correct) {
            this.scene.start("EndScene");
        } else {
            this.scene.start("HomeScene");
        }
    }
}
