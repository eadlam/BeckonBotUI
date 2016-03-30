import _ from 'lodash';
import alt from '../libs/alt';
import Config from '../config';

// var ROSLIB = require('../libs/roslibjs/src/core');
var ROSLIB = require('roslib');

var host = Config.ROS.host;
var port = Config.ROS.port;

var ros = new ROSLIB.Ros({
  url : 'ws://'+host+':'+port
});

var wand = new ROSLIB.Topic({
    ros : ros,
    name : 'beckon_bot/wand',
    messageType : 'beckonbot_msgs/Wand'
});


// "{"motion":0,"choreography":1,"target":{"data":"1"},"relationship":1,"duration":0,"spot":{"data":""},"behavior_type":3,"header":{"stamp":{"secs":0,"nsecs":0},"frame_id":"","seq":2},"delay":0,"how_to_modify":0,"drones":[{"data":"1"}],"action":0,"speed":0,"quantity":0}"

// group
// ungroup
// move
// perform
// periodic

// Steps to create a behavior:

// 1. listen (wand)
// 2. select drone (wand)
// 3. gesture [Group, UnGroup, Move, Perform, Period]
// 4. * Group > 'group' Option (gesture)
//    * Ungroup
//    * Move > Target (wand) > 'move' Option (gesture)
//    Perform > Spot (wand) > 'perform' Option (gesture)
//    Periodic > 'periodic' Option (gesture) > duration (wand)
//

class WandActions {

  update(data) {
    return data;
  }

  selectLocation(name){
    this.post({
      command: Config.wand.SELECT.value,
      object_type: Config.wand.objects.LOCATION.value,
      object_name: {
        data:name
      }
    });
  }

  listen(event){
    this.post({
      command: Config.wand.LISTEN.value,
      object_type: 0,
      object_name: {
        data:""
      }
    });
  }

  select(drones){
    _.forEach(drones, function(drone){
      // Mocking drone clicks
      this.post({
        command: Config.wand.SELECT.value,
        object_type: Config.wand.objects.DRONE.value,
        object_name: {
          data: drone
        }
      });
    }.bind(this));
  }

  execute(event){
    this.post({
      command: Config.wand.EXECUTE.value,
      object_type: 0,
      object_name: {
        data: ""
      }
    });
  }



  post(data){


    var message = _.assign({header:{
        seq: 0,
        stamp: {secs: 0, nsecs: 0},
        frame_id: ''
      }}, data);

    wand.publish(new ROSLIB.Message(message));
    console.log("WAND (pub): ", message);

  }
}

export default alt.createActions(WandActions);
