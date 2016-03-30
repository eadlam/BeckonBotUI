import alt from '../libs/alt';
import Config from '../config';
import WandActions from './WandActions';

// var ROSLIB = require('../libs/roslibjs/src/core');
var ROSLIB = require('roslib');

var host = Config.ROS.host;
var port = Config.ROS.port;

var ros = new ROSLIB.Ros({
  url : 'ws://'+host+':'+port
});

// var behaviors = new ROSLIB.Topic({
//     ros : ros,
//     name : 'behavior',
//     messageType : 'beckonbot_msgs/Behavior'
// });

var behaviors = new ROSLIB.Topic({
    ros : ros,
    name : 'beckon_bot/behavior',
    messageType : 'beckonbot_msgs/Behavior'
});

behaviors.subscribe(function(message){
  window.message = message;
  console.log("BEHAVIOR (sub): ", message);
  return message;
});


var gestures = new ROSLIB.Topic({
    ros : ros,
    name : 'beckon_bot/gesture',
    messageType : 'beckonbot_msgs/Gesture'
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

class CommandActions {

  post(command){

    // TODO: Modify performs should be converted into perform messages
    // var message = new ROSLIB.Message({
    //   header:{
    //     seq: 0,
    //     stamp: {secs: 0, nsecs: 0},
    //     frame_id: ''
    //   },
    //   behavior_type: 4,
    //   relationship: data.group.value,
    //   choreography: data.group.move,
    //   action: 0,
    //   motion: 0,
    //   how_to_modify: 0,
    //   duration:0,
    //   quantity: 0,
    //   drones: [1,2,3],
    //   target: {x:2, y:2, z:2},
    //   spot: {x:20, y:20, z:20}
    // });

    // behaviors.publish(message);

    var message = new ROSLIB.Message({
      header:{
        seq: 0,
        stamp: {secs: 0, nsecs: 0},
        frame_id: ''
      },
      gesture: command
    });

    gestures.publish(message);
    console.log("GESTURE (pub): ", message);

  }
}

export default alt.createActions(CommandActions);
