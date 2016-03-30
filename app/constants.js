var constants = {

  GROUP: 'group',
  MOVE: 'move',
  PERFORM: 'perform',
  MODIFY: 'modify',
  PERIODIC: 'periodic',
  QUANTITY: 'quantity',
  DURATION: 'duration',

    // group: {
  //   FAMILY: {
  //     label: 'family',
  //     value: 1
  //   },
  //   LINE: {
  //     label: 'line',
  //     value: 2
  //   },
  //   WEDGE: {
  //     label: 'wedge',
  //     value: 3
  //   },
  //   FLOCK: {
  //     label: 'flock',
  //     value: 4
  //   },
    // ARMY: {
    //   label: 'army',
    //   value: 5 
    // }
  // },

  speed: {
    SLOW: {
      label: 'Slow',
      value: 1 
    },
    NORMAL: {
      label: 'Normal',
      value: 2 
    },
    FAST: {
      label: 'Fast',
      value: 3 
    }
  },

  group: {
    CIRCLE: '0',
    LINE: '1',
    WEDGE: '2',
    FLOCK: '3',
    ARMY: '4'
  },
  
  move: {
    SLOW: 'slow',
    NORMAL: 'normal',
    FAST: 'fast',
    DRUNKENLY: 'drunkenly',
    NERVOUSLY: 'nervously'
  },

  perform: {
    CAMERA: 'camera',
    LIGHT: 'light',
    SOUND: 'sound'
  },

  quantity: {
    LITTLE: 'little',
    SOME: 'some',
    MUCH: 'much',
    ALL: 'all'
  },

  duration:{
    NOW: 'now',
    SEC10: '10 secons',
    MIN1: '1 minute',
    MIN5: '5 minutes'
  },

  modify: {
    MORE: 'more',
    LESS: 'less',
    HOVER: 'hover',
    LAND: 'land',
    TAKEOFF: 'takeoff'
  },

  periodic: {
    ELLIPTICAL: 'elliptical',
    UPDOWN: 'updown',
    SIDESIDE: 'sideside',
    ROTATE: 'rotate',
    FORREV: 'forrev'
  },

  targets:[0,1,2,3,4],

  drones:[0,1,2,3]
};

constants.group.DEFAULT = constants.group.LINE;
constants.move.DEFAULT = constants.move.NORMAL;
constants.perform.DEFAULT = constants.perform.CAMERA;
constants.modify.DEFAULT = constants.modify.HOVER;
constants.quantity.DEFAULT = constants.quantity.ALL;
constants.duration.DEFAULT = constants.duration.NOW;
constants.periodic.DEFAULT = constants.periodic.FORREV;


export default constants;