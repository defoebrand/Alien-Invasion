export class Character extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.body.setBounce(0.1);
    this.body.setCollideWorldBounds(true);
  }
}