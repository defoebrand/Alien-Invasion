import CharButton from '../Objects/CharacterButton'

export default class CharacterSelectScene extends Phaser.Scene {
  constructor() {
    super('CharacterSelect');
  }
  preload() {}

  create() {
    this.model = this.sys.game.globals.model;
    this.model.charSelect = 'soldier';
    // this.buttons = this.physics.add.staticGroup();

    this.citizenSelect = new CharButton(this, 800 / 2, 600 / 2 - 200, 'buttonEmpty', 'citizenChar', 'Citizen', 'Game', this.model.charSelect);
    // this.buttons.add(this.citizenSelect)

    this.soldierSelect = new CharButton(this, 800 / 2, 600 / 2, 'buttonEmpty', 'soldierChar', 'Soldier', 'Game', this.model.charSelect);
    // this.buttons.add(this.soldierSelect)

    this.alienSelect = new CharButton(this, 800 / 2, 600 / 2 + 200, 'buttonEmpty', 'alienChar', 'Alien', 'Game', this.model.charSelect);
    // this.buttons.add(this.alienSelect)
  }

}