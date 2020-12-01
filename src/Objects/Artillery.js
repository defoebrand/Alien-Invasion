export default class Artillery extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.scene.physics.world.enableBody(this, 0);
    this.body.setAllowGravity(false);
    this.scene.add.existing(this);
  }
}