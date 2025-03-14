export default class PreloadScene extends Phaser.Scene {
    constructor() {
      super("PreloadScene");
    }
  
    preload() {
      // 1) Background color for the loading screen
      this.cameras.main.setBackgroundColor("#1a0008"); // your pinkish theme
  
      const centerX = this.cameras.main.centerX;
      const centerY = this.cameras.main.centerY;
  
      // 2) "Loading..." text
      this.add.text(centerX, centerY - 50, "Loading...", {
        fontFamily: "MiniConvenie",
        fontSize: "32px",
        color: "#ffccff"
      }).setOrigin(0.5);
  
      // 3) A simple spinning wheel graphic
      //    We'll create a circle + lines rotating to simulate a spinner
      this.spinner = this.add.graphics({ x: centerX, y: centerY + 30 });
      this.spinner.fillStyle(0xffffff, 1);
      this.spinner.fillCircle(0, 0, 20); // a central circle, optional
  
      // Let's store a tween that rotates the spinner
      // We'll draw or rotate lines in update() for a manual spinner or use a rotating container. 
      // For simplicity, let’s just rotate a container with a “spoke”.
      const spinContainer = this.add.container(centerX, centerY + 30);
  
      // A simple "spoke" line
      const spoke = this.add.graphics();
      spoke.lineStyle(4, 0xff66cc, 1);
      spoke.beginPath();
      spoke.moveTo(0, 0);
      spoke.lineTo(0, -30);
      spoke.strokePath();
  
      spinContainer.add(spoke);
  
      // Rotate the container continuously
      this.tweens.add({
        targets: spinContainer,
        angle: 360,
        duration: 1000,
        repeat: -1,
        ease: "Linear"
      });
  
      // 4) Load your assets (but we won't show progress in this simplified approach)
      this.load.image("bg", "assets/backgrounds/momijibackground.jpg");
      this.load.audio("homemusic", "assets/sounds/homemusic.mp3");
  
      // 5) Once the loader has completed
      this.load.on("complete", () => {
        // We also do a forced 10-second delay to simulate "long load" or wait for fonts
        this.time.delayedCall(10000, () => {
          this.scene.start("HomeScene");
        });
      });
    }
  }
  