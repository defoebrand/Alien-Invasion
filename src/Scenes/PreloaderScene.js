import 'phaser';
import SelectArrow from '/src/Assets/buttonArrow.png'
import SelectEmpty from '/src/Assets/buttonEmpty.png'
import BoxUnchecked from '/src/Assets/boxChecked.png'
import BoxChecked from '/src/Assets/boxUnchecked.png'
import Citizen from '/src/Assets/charCitizen.png'
import Soldier from '/src/Assets/charSoldier.png'
import Alien from '/src/Assets/charAlien.png'
import SoundTrack from '/src/Assets/Dafunk[WeBelieveInGoa]Remix.m4a'


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
    this.load.image('buttonEmpty', SelectEmpty);
    this.load.image('buttonEmpty', SelectEmpty);
    this.load.image('citizenChar', Citizen);
    this.load.image('soldierChar', Soldier);
    this.load.image('alienChar', Alien);
    this.load.audio('bgMusic', SoundTrack);

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