import './style.scss';
import 'phaser';
import config from './Conf/config';
import BootScene from './Scenes/BootScene';

const body = document.querySelector('body')

const form = document.createElement('form')

const cityInput = document.createElement('input')
cityInput.type = 'text'
cityInput.placeholder = 'Enter Text...'
form.appendChild(cityInput)

const submitBtn = document.createElement('input')
submitBtn.type = 'submit'
submitBtn.value = "Enter Text"
submitBtn.onclick = (e) => {
  e.preventDefault()
  alert(cityInput.value)
}
form.appendChild(submitBtn)

body.appendChild(form)


class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Boot', BootScene);

    this.scene.start('Boot');
  }
}

window.game = new Game();
