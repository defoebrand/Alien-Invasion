import Phaser from 'phaser';
import Background from '../Assets/loadingScreen.png';

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
