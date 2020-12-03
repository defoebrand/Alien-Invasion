import './style.scss';
import Phaser from 'phaser';
import config from './Conf/config';
import Model from './Conf/Model';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import CreditsScene from './Scenes/CreditsScene';
import OptionsScene from './Scenes/OptionsScene';
import CharacterSelectScene from './Scenes/CharacterSelectScene';
import GamePlayScene from './Scenes/GamePlayScene';
import GameOverScene from './Scenes/GameOverScene';
import LeaderBoardScene from './Scenes/LeaderBoardScene';

document.title = 'Alien-Invasion';

const body = document.querySelector('body');

const playerForm = document.createElement('form');
playerForm.classList.add('playerForm');

const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.placeholder = 'Please Enter Your Name to Save Your Score...';

playerForm.appendChild(nameInput);

const submitBtn = document.createElement('input');
submitBtn.type = 'submit';
submitBtn.value = 'Save Name';
submitBtn.classList.add('submitBtn');
submitBtn.onclick = (e) => {
  e.preventDefault();
  localStorage.setItem('name', nameInput.value);
  body.removeChild(playerForm);
  body.removeChild(submitBtn);
};
playerForm.appendChild(submitBtn);

if (!localStorage.name) {
  body.appendChild(playerForm);
}

class Game extends Phaser.Game {
  constructor() {
    super(config);
    window.model = new Model();
    this.globals = {
      model,
      bgMusic: null,
    };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('CharacterSelect', CharacterSelectScene);
    this.scene.add('Game', GamePlayScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('LeaderBoard', LeaderBoardScene);

    this.scene.start('Boot');
  }
}

window.game = new Game();
