import Button from '../Objects/Button'

export default class CharacterSelectScene extends Phaser.Scene {
  constructor() {
    super('CharacterSelect');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.menuButton = new Button(this, 400, 600 / 2 + 200, 'buttonEmpty', 'buttonArrow', 'Main Menu', 'Title');

    this.citizenSelect = new Button(this, 800 / 2, 600 / 2 - 100, 'buttonEmpty', 'selectCitizen', 'Citizen', 'Game', this.model);

    this.soldierSelect = new Button(this, 800 / 2, 600 / 2 - 25, 'buttonEmpty', 'selectSoldier', 'Soldier', 'Game', this.model);

    this.alienSelect = new Button(this, 800 / 2, 600 / 2 + 50, 'buttonEmpty', 'selectAlien', 'Alien', 'Game', this.model);
  }

}