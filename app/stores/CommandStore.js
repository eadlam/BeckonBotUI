import uuid from 'node-uuid';
import alt from '../libs/alt';
import CommandActions from '../actions/CommandActions';
import constants from '../constants';

class CommandStore {

  constructor() {
    this.bindActions(CommandActions);

    this.state = {
      'group': constants.group.DEFAULT,
      'move': constants.move.DEFAULT,
      'perform': constants.perform.DEFAULT,
      'modify': constants.modify.DEFAULT,
      'modifyQuantity': constants.quantity.DEFAULT,
      'modifyDuration': constants.duration.DEFAULT,
      'periodic': constants.periodic.DEFAULT,
      'periodicDuration': constants.duration.DEFAULT,
    };
  }

  // subscribe(command){
  //   this.setState()
  // }

  update(command) {
    console.log('updating', command);
    this.setState(command);
    console.log('new state', this.state);
  }
  
}

export default alt.createStore(CommandStore, 'CommandStore');
