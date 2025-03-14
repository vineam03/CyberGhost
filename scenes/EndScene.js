export default class EndScene extends Phaser.Scene {
    constructor() {
        super("EndScene");
    }

    create() {
        let count = parseInt(localStorage.getItem("gameCount") || 0) + 1;
        localStorage.setItem("gameCount", count);

        this.add.text(200, 250, "Congratulations! You finished the game!", {
            fontFamily: "AMFont",
            fontSize: "24px",
            fill: "#fff"
        });

        this.add.text(250, 300, `Game Completions: ${count}`, {
            fontFamily: "AMFont",
            fontSize: "24px",
            fill: "#fff"
        });

        let restartButton = this.add.text(300, 400, "Play Again", {
            fontFamily: "AMFont",
            fontSize: "24px",
            fill: "#0f0"
        })
        .setInteractive()
        .on("pointerdown", () => {
            this.scene.start("HomeScene");
        });
    }
}
