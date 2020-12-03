import Background from '/src/Assets/loadingScreen.png';
import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', Background);
  }

  create() {
    this.scene.start('Preloader');
  }
}
