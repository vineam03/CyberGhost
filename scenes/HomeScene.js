export default class HomeScene extends Phaser.Scene {
    constructor() {
      super("HomeScene");
    }
  
    preload() {
      // Nothing here, assets are loaded in PreloadScene
    }
  
    create() {
      const { width, height } = this.sys.game.config;
  
      // === MUSIC ===
      this.music = this.sound.add("homemusic", { loop: true, volume: 0.7 });
      this.music.play(); 
      // If browser blocks autoplay, it will start once user interacts (click/touch).
  
      // === BACKGROUND IMAGE (COVER STYLE) ===
      const bg = this.add.image(width / 2, height / 2, "bg").setOrigin(0.5);
      const tex = this.textures.get("bg").getSourceImage();
      const scaleX = width / tex.width;
      const scaleY = height / tex.height;
      bg.setScale(Math.max(scaleX, scaleY));
      bg.y += 50; // Shift down if needed
  
      // === COMPLETIONS IN TOP-RIGHT ===
      let count = localStorage.getItem("gameCount") || 0;
      this.add.text(width - 10, 10, `Completions: ${count}`, {
        fontFamily: "AMFont",
        fontSize: "14px",
        fill: "#fff"
      }).setOrigin(1, 0);
  
      // ----------------------------------------------------
      //  1) CYBER GHOST TITLE: RoundedRect + Animations
      // ----------------------------------------------------
      const titleContainer = this.add.container(width / 2, 260);
  
      // Pink BG behind the title
      const titleBg = this.add.graphics();
      titleBg.fillStyle(0xff99cc, 1);
      titleBg.fillRoundedRect(-180, -50, 360, 100, 20);
  
      // Title text
      const titleText = this.add.text(0, 0, "Cyber Ghost", {
        fontFamily: "MiniConvenie",
        fontSize: "42px",
        color: "#fff"
      }).setOrigin(0.5);
  
      // Add to container
      titleContainer.add([titleBg, titleText]);
  
      // Start the container hidden and scaled down
      titleContainer.setScale(0.5);
      titleContainer.setAlpha(0);
  
      // Tween it in: fade + grow effect
      this.tweens.add({
        targets: titleContainer,
        alpha: { from: 0, to: 1 },
        scale: { from: 0.5, to: 1 },
        duration: 1500,
        ease: "Sine.easeInOut"
      });
  
      // ----------------------------------------------------
      //  2) START BUTTON: Magenta BG + Animations
      // ----------------------------------------------------
      const startContainer = this.add.container(width / 2, 520);
  
      const startBg = this.add.graphics();
      startBg.fillStyle(0xdd00aa, 1);
      startBg.fillRoundedRect(-100, -40, 200, 80, 20);
  
      const startText = this.add.text(0, 0, "Start", {
        fontFamily: "AMFont",
        fontSize: "32px",
        color: "#fff"
      }).setOrigin(0.5);
  
      startContainer.add([startBg, startText]);
  
      // Entire button interactive
      startBg.setInteractive(
        new Phaser.Geom.Rectangle(-100, -40, 200, 80),
        Phaser.Geom.Rectangle.Contains
      );
  
      // On click → stop music, move to next scene
      startBg.on("pointerdown", () => {
        if (this.music && this.music.isPlaying) {
          this.music.stop();
        }
        this.scene.start("StoryScene");
      });
  
      // Animate the button's entrance, too (fade + slide up from below)
      startContainer.setY(600);    // Start it offscreen
      startContainer.setAlpha(0);  // Invisible initially
      this.tweens.add({
        targets: startContainer,
        y: 520,
        alpha: { from: 0, to: 1 },
        duration: 1500,
        ease: "Sine.easeOut",
        delay: 800 // starts slightly after the title animation
      });
  
      // Gentle "heartbeat" pulsing after it arrives
      this.tweens.add({
        targets: startContainer,
        scale: { from: 1, to: 1.05 },
        duration: 1200,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
        delay: 2300 // wait until the entrance tween finishes
      });
  
      // Also stop music on scene shutdown (safety net)
      this.events.on("shutdown", () => {
        if (this.music && this.music.isPlaying) {
          this.music.stop();
        }
      });
    }
  }
  