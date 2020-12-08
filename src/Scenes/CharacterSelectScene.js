import Phaser from 'phaser';
import Button from '../Objects/Button';

export default class CharacterSelectScene extends Phaser.Scene {
  constructor() {
    super('CharacterSelect');
  }

  create() {
    const { model } = this.sys.game.globals;
    this.menuButton = new Button(this, 400, 600 / 2 + 200, 'buttonEmpty', 'buttonArrow', 'Main Menu', 'Title');
    this.citizenSelect = new Button(this, 800 / 2, 600 / 2 - 100, 'buttonEmpty', 'selectCitizen', 'Citizen', 'Game', model);
    this.soldierSelect = new Button(this, 800 / 2, 600 / 2 - 25, 'buttonEmpty', 'selectSoldier', 'Soldier', 'Game', model);
    this.alienSelect = new Button(this, 800 / 2, 600 / 2 + 50, 'buttonEmpty', 'selectAlien', 'Alien', 'Game', model);
  }
}
