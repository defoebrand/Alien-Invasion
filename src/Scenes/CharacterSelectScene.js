import CharButton from '../Objects/CharacterButton'

export default class CharacterSelectScene extends Phaser.Scene {
  constructor() {
    super('CharacterSelect');
  }
  preload() {

  }

  create() {
    this.citizenSelect = new CharButton(this, 800 / 2, 600 / 2 - 200, 'buttonEmpty', 'citizenChar', 'Citizen', 'Game');

    this.soldierSelect = new CharButton(this, 800 / 2, 600 / 2, 'buttonEmpty', 'soldierChar', 'Soldier', 'Game');

    this.alienSelect = new CharButton(this, 800 / 2, 600 / 2 + 200, 'buttonEmpty', 'alienChar', 'Alien', 'Game');

  }

}