import Phaser from 'phaser';
import GameText from '../Objects/GameText';
import SoundTrack from '../Assets/Dafunk[WeBelieveInGoa]Remix.m4a';
import SelectArrow from '../Assets/buttonArrow.png';
import SelectEmpty from '../Assets/buttonEmpty.png';
import BoxChecked from '../Assets/boxChecked.png';
import BoxUnchecked from '../Assets/boxUnchecked.png';
import Alien from '../Assets/charAlien.png';
import Citizen from '../Assets/charCitizen.png';
import Soldier from '../Assets/charSoldier.png';
import SelectAlien from '../Assets/selectAlien.png';
import SelectCitizen from '../Assets/selectCitizen.png';
import SelectSoldier from '../Assets/selectSoldier.png';
import SoldierBullet from '../Assets/soldierBullet.png';
import SoldierBulletExplosion from '../Assets/soldierBulletExplosion.png';
import SoldierCharLeft from '../Assets/soldierCharLeft.png';
import SoldierCharRight from '../Assets/soldierCharRight.png';
import SoldierShootLeft from '../Assets/soldierShootLeft.png';
import SoldierShootRight from '../Assets/soldierShootRight.png';
import SoldierJumpLeft from '../Assets/soldierJumpLeft.png';
import SoldierJumpRight from '../Assets/soldierJumpRight.png';
import CitizenCharLeft from '../Assets/citizenCharLeft.png';
import CitizenCharRight from '../Assets/citizenCharRight.png';
import CitizenJumpLeft from '../Assets/citizenJumpLeft.png';
import CitizenJumpRight from '../Assets/citizenJumpRight.png';
import AlienBullet from '../Assets/alienBullet.png';
import AlienBulletExplosion from '../Assets/alienBulletExplosion.png';
import AlienCharLeft from '../Assets/alienCharLeft.png';
import AlienCharRight from '../Assets/alienCharRight.png';
import AlienShootLeft from '../Assets/alienShootLeft.png';
import AlienShootRight from '../Assets/alienShootRight.png';
import AlienJumpLeft from '../Assets/alienJumpLeft.png';
import AlienJumpRight from '../Assets/alienJumpRight.png';
import Sky from '../Assets/sky.png';
import Ground from '../Assets/ground.png';
import Platform from '../Assets/platform.png';
import Bomb from '../Assets/bomb.png';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    this.add.image(400, 300, 'logo');

    this.progressBar = this.add.graphics();
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(240, 270, 320, 50);

    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    this.zone = this.add.zone(this.width / 2, this.height / 2);

    this.loadingText = new GameText(this, 0, -65, 'Loading...', this.zone, '22px', '#fff');

    this.percentText = new GameText(this, 0, -5, '0%', this.zone, '18px', '#fff');

    this.assetText = new GameText(this, -125, 50, '', this.zone, '18px', '#fff');

    this.load.on('progress', (value) => {
      this.percentText.text.setText(`${parseInt((value * 100), 10)}%`);
      this.progressBar.clear();
      this.progressBar.fillStyle(0xffffff, 1);
      this.progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      this.assetText.text.setText(`Loading asset: ${file.key}`);
    });
    this.load.on('complete', () => {
      this.progressBar.destroy();
      this.progressBox.destroy();
      this.loadingText.destroy();
      this.percentText.destroy();
      this.assetText.destroy();
      this.ready();
      this.time.delayedCall(750, this.ready, [], this);
    });

    this.load.image('buttonArrow', SelectArrow);
    this.load.image('buttonEmpty', SelectEmpty);
    this.load.image('boxUnchecked', BoxUnchecked);
    this.load.image('boxChecked', BoxChecked);
    this.load.image('citizenChar', Citizen);
    this.load.image('soldierChar', Soldier);
    this.load.image('alienChar', Alien);
    this.load.image('selectAlien', SelectAlien);
    this.load.image('selectCitizen', SelectCitizen);
    this.load.image('selectSoldier', SelectSoldier);
    this.load.audio('bgMusic', SoundTrack);
    this.load.image('sky', Sky);
    this.load.image('ground', Ground);
    this.load.image('platform', Platform);
    this.load.image('bomb', Bomb);
    this.load.spritesheet('soldierBullet', SoldierBullet, {
      frameWidth: 10,
      frameHeight: 15,
    });
    this.load.spritesheet('soldierBulletExplosion', SoldierBulletExplosion, {
      frameWidth: 31,
      frameHeight: 40,
    });
    this.load.spritesheet('soldier', SoldierCharRight, {
      frameWidth: 39,
      frameHeight: 50,
    });
    this.load.spritesheet('soldierLeft', SoldierCharLeft, {
      frameWidth: 39,
      frameHeight: 50,
    });
    this.load.spritesheet('soldierShoot', SoldierShootRight, {
      frameWidth: 56,
      frameHeight: 50,
    });
    this.load.spritesheet('soldierShootLeft', SoldierShootLeft, {
      frameWidth: 56,
      frameHeight: 50,
    });
    this.load.spritesheet('soldierJump', SoldierJumpRight, {
      frameWidth: 32,
      frameHeight: 50,
    });
    this.load.spritesheet('soldierJumpLeft', SoldierJumpLeft, {
      frameWidth: 32,
      frameHeight: 50,
    });
    this.load.spritesheet('alienBullet', AlienBullet, {
      frameWidth: 10,
      frameHeight: 15,
    });
    this.load.spritesheet('alienBulletExplosion', AlienBulletExplosion, {
      frameWidth: 31,
      frameHeight: 40,
    });
    this.load.spritesheet('alien', AlienCharRight, {
      frameWidth: 31,
      frameHeight: 50,
    });
    this.load.spritesheet('alienLeft', AlienCharLeft, {
      frameWidth: 31,
      frameHeight: 50,
    });
    this.load.spritesheet('alienShoot', AlienShootRight, {
      frameWidth: 38,
      frameHeight: 50,
    });
    this.load.spritesheet('alienShootLeft', AlienShootLeft, {
      frameWidth: 38,
      frameHeight: 50,
    });
    this.load.spritesheet('alienJump', AlienJumpRight, {
      frameWidth: 32,
      frameHeight: 50,
    });
    this.load.spritesheet('alienJumpLeft', AlienJumpLeft, {
      frameWidth: 32,
      frameHeight: 50,
    });
    this.load.spritesheet('citizenBullet', SoldierBullet, {
      frameWidth: 10,
      frameHeight: 15,
    });
    this.load.spritesheet('citizenBulletExplosion', SoldierBulletExplosion, {
      frameWidth: 31,
      frameHeight: 40,
    });
    this.load.spritesheet('citizen', CitizenCharRight, {
      frameWidth: 40,
      frameHeight: 50,
    });
    this.load.spritesheet('citizenLeft', CitizenCharLeft, {
      frameWidth: 40,
      frameHeight: 50,
    });
    this.load.spritesheet('citizenShoot', CitizenCharRight, {
      frameWidth: 40,
      frameHeight: 50,
    });
    this.load.spritesheet('citizenShootLeft', CitizenCharLeft, {
      frameWidth: 40,
      frameHeight: 50,
    });
    this.load.spritesheet('citizenJump', CitizenJumpRight, {
      frameWidth: 33,
      frameHeight: 50,
    });
    this.load.spritesheet('citizenJumpLeft', CitizenJumpLeft, {
      frameWidth: 33,
      frameHeight: 50,
    });
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}
