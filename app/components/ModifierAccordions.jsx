import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import ListItem from 'material-ui/lib/lists/list-item';

import Accordion from './Accordion';
import CommandActions from '../actions/CommandActions';

export default class ModifierAccordions extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      modifierGroup: null
    }
  }

  handleOptionClick(label){
    if(this.state.modifierGroup === label){
      this.setState({modifierGroup:null});
    } else {
      this.setState({modifierGroup:label});
    }
  }

  render() {
    return (
      <div style={{display: this.props.visible === false ? 'none' : 'inherit'}}>
        {Object.keys(this.props.modifiers).map(function(key){
          var modifier = this.props.modifiers[key];
          return (
            <Accordion label={modifier.label} 
                     groupId={key}
                     options={modifier.options}
                     primary={this.props.primary}
                     secondary={this.props.secondary}
                     collapsed={this.state.modifierGroup !== modifier.label }
                     onButtonClick={this.handleOptionClick.bind(this, modifier.label)} 
                     onOptionClick={CommandActions.update}/>
          )
        }.bind(this))}
      </div>
    );  
  }
}
