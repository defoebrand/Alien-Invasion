import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', './src/Assets/loadingScreen.png');

  }

  create() {
    this.add.image(400, 300, 'logo');

  }
};
