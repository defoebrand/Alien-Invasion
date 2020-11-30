import 'phaser';
import SelectArrow from '/src/Assets/buttonArrow.png'
import SelectEmpty from '/src/Assets/buttonEmpty.png'
import BoxChecked from '/src/Assets/boxChecked.png'
import BoxUnchecked from '/src/Assets/boxUnchecked.png'
import Citizen from '/src/Assets/charCitizen.png'
import Soldier from '/src/Assets/charSoldier.png'
import Alien from '/src/Assets/charAlien.png'
import SoundTrack from '/src/Assets/Dafunk[WeBelieveInGoa]Remix.m4a'
import SoldierBullet from '/src/Assets/soldierBullet.png'
import SoldierBulletExplosion from '/src/Assets/soldierBulletExplosion.png'
import SoldierCharLeft from '/src/Assets/soldierCharLeft.png'
import SoldierCharRight from '/src/Assets/soldierCharRight.png'
import SoldierShootLeft from '/src/Assets/soldierShootLeft.png'
import SoldierShootRight from '/src/Assets/soldierShootRight.png'
import SoldierJumpLeft from '/src/Assets/soldierJumpLeft.png'
import SoldierJumpRight from '/src/Assets/soldierJumpRight.png'
import CitizenCharLeft from '/src/Assets/citizenCharLeft.png'
import CitizenCharRight from '/src/Assets/citizenCharRight.png'
import CitizenShootLeft from '/src/Assets/citizenCharLeft.png'
import CitizenShootRight from '/src/Assets/citizenCharRight.png'
import CitizenJumpLeft from '/src/Assets/citizenJumpLeft.png'
import CitizenJumpRight from '/src/Assets/citizenJumpRight.png'
import AlienBullet from '/src/Assets/alienBullet.png'
import AlienBulletExplosion from '/src/Assets/alienBulletExplosion.png'
import AlienCharLeft from '/src/Assets/alienCharLeft.png'
import AlienCharRight from '/src/Assets/alienCharRight.png'
import AlienShootLeft from '/src/Assets/alienShootLeft.png'
import AlienShootRight from '/src/Assets/alienShootRight.png'
import AlienJumpLeft from '/src/Assets/alienJumpLeft.png'
import AlienJumpRight from '/src/Assets/alienJumpRight.png'
import Sky from '/src/Assets/sky.png'
import Ground from '/src/Assets/ground.png'
import Platform from '/src/Assets/platform.png'
import Bomb from '/src/Assets/bomb.png'

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }
  preload() {
    this.add.image(400, 300, 'logo');

    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 65,
      text: 'Loading...',
      style: {
        font: '22px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5)

    let percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        file: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function(value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function(file) {
      assetText.setText('Loading asset: ' + file.key);
    });
    this.load.on('complete', function() {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(500, this.ready, [], this);

    this.load.image('buttonArrow', SelectArrow);
    this.load.image('buttonEmpty', SelectEmpty);
    this.load.image('boxUnchecked', BoxUnchecked);
    this.load.image('boxChecked', BoxChecked);
    this.load.image('citizenChar', Citizen);
    this.load.image('soldierChar', Soldier);
    this.load.image('alienChar', Alien);
    this.load.audio('bgMusic', SoundTrack);
    this.load.image('sky', Sky);
    this.load.image('ground', Ground);
    this.load.image('platform', Platform);
    this.load.image('bomb', Bomb);
    this.load.spritesheet('soldierBullet', SoldierBullet, {
      frameWidth: 10,
      frameHeight: 15
    });
    this.load.spritesheet('soldierBulletExplosion', SoldierBulletExplosion, {
      frameWidth: 31,
      frameHeight: 40
    });
    this.load.spritesheet('soldier', SoldierCharRight, {
      frameWidth: 39,
      frameHeight: 50
    });
    this.load.spritesheet('soldierLeft', SoldierCharLeft, {
      frameWidth: 39,
      frameHeight: 50
    });
    this.load.spritesheet('soldierShoot', SoldierShootRight, {
      frameWidth: 56,
      frameHeight: 50
    });
    this.load.spritesheet('soldierShootLeft', SoldierShootLeft, {
      frameWidth: 56,
      frameHeight: 50
    });
    this.load.spritesheet('soldierJump', SoldierJumpRight, {
      frameWidth: 32,
      frameHeight: 50
    });
    this.load.spritesheet('soldierJumpLeft', SoldierJumpLeft, {
      frameWidth: 32,
      frameHeight: 50
    });


    this.load.spritesheet('alienBullet', AlienBullet, {
      frameWidth: 10,
      frameHeight: 15
    });
    this.load.spritesheet('alienBulletExplosion', AlienBulletExplosion, {
      frameWidth: 31,
      frameHeight: 40
    });
    this.load.spritesheet('alien', AlienCharRight, {
      frameWidth: 31,
      frameHeight: 50
    });
    this.load.spritesheet('alienLeft', AlienCharLeft, {
      frameWidth: 31,
      frameHeight: 50
    });
    this.load.spritesheet('alienShoot', AlienShootRight, {
      frameWidth: 38,
      frameHeight: 50
    });
    this.load.spritesheet('alienShootLeft', AlienShootLeft, {
      frameWidth: 38,
      frameHeight: 50
    });
    this.load.spritesheet('alienJump', AlienJumpRight, {
      frameWidth: 32,
      frameHeight: 50
    });
    this.load.spritesheet('alienJumpLeft', AlienJumpLeft, {
      frameWidth: 32,
      frameHeight: 50
    });
    this.load.spritesheet('citizenBullet', SoldierBullet, {
      frameWidth: 10,
      frameHeight: 15
    });
    this.load.spritesheet('citizenBulletExplosion', SoldierBulletExplosion, {
      frameWidth: 31,
      frameHeight: 40
    });
    this.load.spritesheet('citizen', CitizenCharRight, {
      frameWidth: 40,
      frameHeight: 50
    });
    this.load.spritesheet('citizenLeft', CitizenCharLeft, {
      frameWidth: 40,
      frameHeight: 50
    });
    this.load.spritesheet('citizenShoot', CitizenShootRight, {
      frameWidth: 40,
      frameHeight: 50
    });
    this.load.spritesheet('citizenShootLeft', CitizenShootLeft, {
      frameWidth: 40,
      frameHeight: 50
    });
    this.load.spritesheet('citizenJump', CitizenJumpRight, {
      frameWidth: 33,
      frameHeight: 50
    });
    this.load.spritesheet('citizenJumpLeft', CitizenJumpLeft, {
      frameWidth: 33,
      frameHeight: 50
    });
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }



};