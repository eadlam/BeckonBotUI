import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import ListItem from 'material-ui/lib/lists/list-item';

export default class Accordion extends React.Component {
  
  constructor(props) {
    super(props);
  }

  onOptionClick(command){
    this.props.onOptionClick(command);
  }

  onTouch(event){
    console.log("Touched", event);
  }

  render() {
    return (
      <div>
        <RaisedButton label={this.props.label} 
                      primary={this.props.primary}
                      secondary={this.props.secondary} 
                      style={{width:'195px', margin:'2px'}} 
                      onClick={this.props.onButtonClick}/>
        <div style={{ display:this.props.collapsed ? 'none' : 'inherit' }}>
          {Object.keys(this.props.options).map(function(key){
            var option = this.props.options[key];
            var command = {};
            command[this.props.groupId] = option;

            return ( <ListItem  key={option.value}
                                primaryText={option.label}  
                                onClick={this.onOptionClick.bind(this, option.value)}
                                onTap={this.onTouch.bind(this, 'test')}
                                onTouchEnd={this.onOptionClick.bind(this, command )}/>
            )
          }.bind(this))}
        </div>
      </div>
    );  
  }
}
