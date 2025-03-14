export default class StoryScene extends Phaser.Scene {
    constructor() {
        super("StoryScene");
    }

    create() {
        let storyText = this.add.text(100, 200, "Momiji: Let's begin your training!", {
            fontFamily: "AMFont",
            fontSize: "24px",
            fill: "#fff",
            wordWrap: { width: 600 }
        });

        let nextButton = this.add.text(350, 400, "Next", {
            fontFamily: "AMFont",
            fontSize: "24px",
            fill: "#0f0"
        })
        .setInteractive()
        .on("pointerdown", () => {
            this.scene.start("LevelScene");
        });
    }
}
