import AltContainer from 'alt-container';
import React from 'react';

import Accordion from './Accordion';
import ModifierAccordions from './ModifierAccordions';

import CommandActions from '../actions/CommandActions';
import CommandStore from '../stores/CommandStore';

import WandActions from '../actions/WandActions';

import config from '../config';
import constants from '../constants';

import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';

import ViewPort from './AnimationCloth/index';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import ContentSend from 'material-ui/lib/svg-icons/content/send';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';

import Paper from 'material-ui/lib/paper';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';


var xTest = [1,2,3,4,5];

const navWidth = 200;
const btnWidth = navWidth - 5 + "px";
const width = window.innerWidth - (navWidth*2);

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

export default class App extends React.Component {

  constructor(props) {
    
    super(props);

    this.state = {
      'commandGroup': constants.GROUP,
      // 'modifierGroup': constants.QUANTITY,
      'modifierGroup': null,
      'group': constants.group.DEFAULT,
      'move': constants.move.DEFAULT,
      'perform': constants.perform.DEFAULT,
      'modify': constants.modify.DEFAULT,
      'modifyQuantity': constants.quantity.DEFAULT,
      'modifyDuration': constants.duration.DEFAULT,
      'periodic': constants.periodic.DEFAULT,
      'periodicDuration': constants.duration.DEFAULT,
    };

    CommandStore.listen((state) => {
      this.setState(state);
    });
  }

  handleGroupClick(option){
    console.log(option);
    CommandActions.update({
      group: option
    });
  }

  handleMoveClick(option){
    CommandActions.update({
      move: option
    });
  }

  handlePerformClick(option){
    CommandActions.update({
      perform: option
    });
  }

  handleModifyClick(option){
    CommandActions.update({
      modify: option
    });
  }

  handleModifyQuantityClick(option){
    CommandActions.update({
      modifyQuantity: option
    });
  }

  handleModifyDurationClick(option){
    CommandActions.update({
      modifyDuration: option
    });
  }

    handlePeriodicDurationClick(option){
    CommandActions.update({
      periodicDuration: option
    });
  }

  handlePeriodicClick(option){
    CommandActions.update({
      periodic: option
    });
  }

  handleCommandGroupSelect(name, value){
    if(this.state.commandGroup === name){
      this.setState({commandGroup:null});
    } else {
      this.setState({commandGroup:name});
    }
    CommandActions.post(value);
  }

  handleModifierGroupSelect(name){
    this.setState({
      'modifierGroup': name
    });
  }

  handleExecuteClick(event){
    WandActions.execute();
  }


  handleTouchTap(event){
    console.log("touched");
  };


  render() {

    const commandStyle = {
      fontFamily:'monospace', 
      marginLeft:"10px", 
      fontWeight:'bold'
    };

    return (
      <div id="main">
      
        <LeftNav open={true} width={navWidth}>
          <RaisedButton label="Listen" 
                        primary={true} 
                        style={{width:btnWidth, margin:'2px'}}
                        onClick={WandActions.listen} />
          <RaisedButton label="**Drone_1" 
                        secondary={true} 
                        style={{width:btnWidth, margin:'2px'}}
                        onClick={WandActions.select.bind(this, ["drone_1"])} />
          <RaisedButton label="**Drone_123" 
                        secondary={true} 
                        style={{width:btnWidth, margin:'2px'}}
                        onClick={WandActions.select.bind(this, ["drone_1", "drone_2", "drone_3"])} />
          <RaisedButton label="**Location_1" 
                        primary={true} 
                        style={{width:btnWidth, margin:'2px'}}
                        onClick={WandActions.selectLocation.bind(this, "Placeholder")}/>

          <RaisedButton label="Quantity" 
                        secondary={true} 
                        style={{width:btnWidth, margin:'2px', display: this.state.commandGroup === constants.MODIFY ? 'inherit' : 'none'}} 
                        onClick={this.handleModifierGroupSelect.bind(this, constants.QUANTITY)}/>
          <List style={{display: this.state.commandGroup === constants.MODIFY && this.state.modifierGroup === constants.QUANTITY ? 'inherit' : 'none'}}>
            <ListItem key={1} 
                      primaryText="Little"
                      onClick={this.handleModifyQuantityClick.bind(this, constants.quantity.LITTLE)} />
            <ListItem key={2} 
                      primaryText="Some"
                      onClick={this.handleModifyQuantityClick.bind(this, constants.quantity.SOME)} />
            <ListItem key={3} 
                      primaryText="Much"
                      onClick={this.handleModifyQuantityClick.bind(this, constants.quantity.MUCH)} />
            <ListItem key={4} 
                      primaryText="All"
                      onClick={this.handleModifyQuantityClick.bind(this, constants.quantity.ALL)} />
          </List>

          <RaisedButton label="Duration" 
                        secondary={true} 
                        style={{width:btnWidth, margin:'2px', display: this.state.commandGroup === constants.MODIFY ? 'inherit' : 'none'}}
                        onClick={this.handleModifierGroupSelect.bind(this, constants.DURATION)} />
          <List style={{display: this.state.commandGroup === constants.MODIFY  && this.state.modifierGroup === constants.DURATION ? 'inherit' : 'none'}}>
            <ListItem key={1} 
                          primaryText="Now"
                          onClick={this.handleModifyDurationClick.bind(this, constants.duration.NOW)} />
                <ListItem key={2} 
                          primaryText="10 sec"
                          onClick={this.handleModifyDurationClick.bind(this, constants.duration.SEC10)} />
                <ListItem key={3} 
                          primaryText="1 min"
                          onClick={this.handleModifyDurationClick.bind(this, constants.duration.MIN1)} />
                <ListItem key={4} 
                          primaryText="5 min"
                          onClick={this.handleModifyDurationClick.bind(this, constants.duration.MIN5)} />
          </List>

          <RaisedButton label="Duration" 
                        secondary={true} 
                        style={{width:btnWidth, margin:'2px', display: this.state.commandGroup === constants.PERIODIC ? 'inherit' : 'none'}}/>
          <List style={{display: this.state.commandGroup === constants.PERIODIC ? 'inherit' : 'none'}}>
            <ListItem key={1} 
                          primaryText="Now"
                          onClick={this.handlePeriodicDurationClick.bind(this, constants.duration.NOW)} />
                <ListItem key={2} 
                          primaryText="10 sec"
                          onClick={this.handlePeriodicDurationClick.bind(this, constants.duration.SEC10)} />
                <ListItem key={3} 
                          primaryText="1 min"
                          onClick={this.handlePeriodicDurationClick.bind(this, constants.duration.MIN1)} />
                <ListItem key={4} 
                          primaryText="5 min"
                          onClick={this.handlePeriodicDurationClick.bind(this, constants.duration.MIN5)} />
          </List>

          <RaisedButton label="Duration" 
                        secondary={true} 
                        style={{width:'100%', margin:'2px', display: this.state.commandGroup === constants.PERIODIC ? 'inherit' : 'none'}}/>
          <List style={{display: this.state.commandGroup === constants.PERIODIC ? 'inherit' : 'none'}}>
            <ListItem key={1} 
                          primaryText="Now"
                          onClick={this.handlePeriodicDurationClick.bind(this, constants.duration.NOW)} />
                <ListItem key={2} 
                          primaryText="10 sec"
                          onClick={this.handlePeriodicDurationClick.bind(this, constants.duration.SEC10)} />
                <ListItem key={3} 
                          primaryText="1 min"
                          onClick={this.handlePeriodicDurationClick.bind(this, constants.duration.MIN1)} />
                <ListItem key={4} 
                          primaryText="5 min"
                          onClick={this.handlePeriodicDurationClick.bind(this, constants.duration.MIN5)} />
          </List>

          {Object.keys(config.gestures).map(function(key){
            var gesture = config.gestures[key];
            if(gesture.modifiers){
              return (
              <ModifierAccordions modifiers={gesture.modifiers}
                     key={key}
                     secondary={true}
                     visible={this.state.commandGroup === gesture.label }
                     onButtonClick={this.handleCommandGroupSelect.bind(this, gesture.label)} 
                     onOptionClick={CommandActions.update}/>
            )
            }
          }.bind(this))}

          <div style={{position:'fixed',bottom:0}}>
            <RaisedButton label="Execute" 
                        secondary={true} 
                        style={{width:btnWidth, margin:'2px'}}
                        onClick={this.handleExecuteClick.bind(this)} />
            <RaisedButton label="Panic" 
                          primary={true} 
                          style={{width:'49%', margin:'1px'}} />
            <RaisedButton label="Halt" 
                          primary={true} 
                          style={{width:'49%', margin:'1px'}}/>
            <RaisedButton label="Cancel" 
                          primary={true} 
                          style={{width:btnWidth, margin:'2px'}}/>
          </div>
        </LeftNav>


        {/* RIGHT: Gesture Menu */}
        <LeftNav open={true} openRight={true} width={navWidth}>

          {Object.keys(config.gestures).map(function(key){
            var gesture = config.gestures[key];
            return (
              <Accordion label={gesture.label} 
                     primary={true}
                     groupId={key}
                     commandType={gesture.value}
                     options={gesture.options}
                     collapsed={this.state.commandGroup !== 
                                gesture.label }
                     onButtonClick={this.handleCommandGroupSelect.bind(this, gesture.label, gesture.value)} 
                     onOptionClick={CommandActions.post}/>
            )
          }.bind(this))}

        </LeftNav>



        <div id="viewPort" style={{marginLeft:navWidth, width:width}}>
          
          <ViewPort width={width} height={500}></ViewPort>

          <GridList cols={2} padding={1} style={{width:width, height:"1000px"}} >
            <GridTile width={width/2} style={{height:"1000px"}}>
              <List subheader="Command Queue" style={{height:"1000px"}}>
                <ListItem>
                  Group: <span style={commandStyle}>[{this.state.group.value}]{this.state.group.label}</span>
                </ListItem>
                <ListItem>
                  <span>Move:</span> <span style={commandStyle}>[{this.state.move.value}]{this.state.move.label}</span>
                </ListItem>
                <ListItem>
                  Perform: <span style={commandStyle}>[{this.state.perform.value}]{this.state.perform.label}</span>
                </ListItem>
                <ListItem>
                  Modify: <span style={commandStyle}>
                  [{this.state.modify.value}]{this.state.modify.label} > 
                  [{this.state.modifyQuantity.value}]{this.state.modifyQuantity.label} > 
                  [{this.state.modifyDuration.value}]{this.state.modifyDuration.label}</span>
                </ListItem>
                <ListItem>
                  Periodic: <span style={commandStyle}>
                  [{this.state.periodic.value}]{this.state.periodic.label} > 
                  [{this.state.periodicDuration.value}]{this.state.periodicDuration.label}</span>
                </ListItem>
              </List>
            </GridTile>
            <GridTile width={width/2}>
              Status
              <div onTouchTap={this.handleTouchTap.bind(this)}>Touch Me</div>
            </GridTile>
          </GridList>
        </div>
      </div>
    );
  }

}
