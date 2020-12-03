import Phaser from 'phaser';

export default class TextBorder extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text, zone, size, color) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.borderTL = this.scene.add.text(x - 1, y - 1, text, {
      fontSize: size,
      fill: color,
    });
    this.borderTR = this.scene.add.text(x + 1, y - 1, text, {
      fontSize: size,
      fill: color,
    });
    this.borderBL = this.scene.add.text(x - 1, y + 1, text, {
      fontSize: size,
      fill: color,
    });
    this.borderBR = this.scene.add.text(x + 1, y + 1, text, {
      fontSize: size,
      fill: color,
    });

    Phaser.Display.Align.In.Center(this.borderTL, zone);
    Phaser.Display.Align.In.Center(this.borderTR, zone);
    Phaser.Display.Align.In.Center(this.borderBL, zone);
    Phaser.Display.Align.In.Center(this.borderBR, zone);

    this.add(this.borderTL);
    this.add(this.borderTR);
    this.add(this.borderBL);
    this.add(this.borderBR);

    this.scene.add.existing(this);
  }
}
