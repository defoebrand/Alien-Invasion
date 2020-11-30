export default class GameText extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text, zone, size, color) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.text = this.scene.add.text(x, y, text, {
      fontSize: size,
      fill: color
    });


    Phaser.Display.Align.In.Center(this.text, zone);

    this.add(zone);
    this.add(this.text);


    this.scene.add.existing(this);
  }
}