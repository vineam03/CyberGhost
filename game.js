import PreloadScene from "./scenes/PreloadScene.js";
import HomeScene from "./scenes/HomeScene.js";
import StoryScene from "./scenes/StoryScene.js";
import LevelScene from "./scenes/LevelScene.js";
import EndScene from "./scenes/EndScene.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "gameContainer",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  // Put PreloadScene first
  scene: [PreloadScene, HomeScene, StoryScene, LevelScene, EndScene]
};

const game = new Phaser.Game(config);
