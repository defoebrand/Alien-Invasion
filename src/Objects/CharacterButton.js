import {
  lowerFirst
} from '/src/Helpers/stringMan.js'

export default class CharButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, text, targetScene, charSelect) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;


    this.button = this.scene.add.sprite(0, 0, key1).setInteractive();
    this.text = this.scene.add.text(0, 0, text, {
      fontSize: '32px',
      fill: '#fff'
    });
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', function() {
      charSelect = lowerFirst(text);
      console.log(charSelect)
      this.scene.scene.start(targetScene);
    }.bind(this));

    this.button.on('pointerover', function() {
      this.button.setTexture(key2);
    }.bind(this));

    this.button.on('pointerout', function() {
      this.button.setTexture(key1);
    }.bind(this));

    this.scene.add.existing(this);
  }
}