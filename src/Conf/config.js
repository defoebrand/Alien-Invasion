import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  resolution: 1,
  zoom: 1,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 350,
      },
    },
  },
};
