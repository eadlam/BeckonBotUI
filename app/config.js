var config = {

  ROS:{
    host: '128.237.181.138',
    // host:'128.237.198.137',
    port: '9090'
  },

  GROUP: 'group',
  MOVE: 'move',
  PERFORM: 'perform',
  MODIFY: 'modify',
  PERIODIC: 'periodic',
  QUANTITY: 'quantity',
  DURATION: 'duration',

  modifiers:{
    quantity:{
      label: "Quantity",
      options: {
        little: {
          label: "Little",
          value: 1
        },
        some:{
          label: "Some",
          value: 2
        },
        much:{
          label: "Much",
          value: 3
        },
        all: {
          label: "All",
          value: 4
        }
      }
    },
    duration: {
      label: "Duration",
      options: {
        now: {
          label: "Now",
          value: 1
        },
        SEC10: {
          label: "10 Seconds",
          value: 2
        },
        MIN1: {
          label: "1 minute",
          value: 3
        },
        MIN5: {
          label: "5 minutes",
          value: 4
        }
      }
    }
  },

  targets:[0,1,2,3,4],

  drones:[0,1,2,3]
};

config.wand = {
  LISTEN: {
    label: 'Listen',
    value: 1
  },
  SELECT: {
    value: 4,
    label: "Select"
  },
  EXECUTE:{
    value: 2,
    label: "Execute"
  },
  objects:{
    NONE: {
      value: 0,
      label: ""
    },
    DRONE:{
      value: 1,
      label:'Drone'
    },
    LOCATION: {
      value: 2,
      label: 'Location'
    }
  }
};

config.gestures = {
    group:{
      label:"Group",
      value: 12,
      options: {
        family: {
          label: "Family",
          value: 2
        },
        line: {
          label: "Line",
          value: 1
        },        
        wedge: {
          label: 'Wedge',
          value: 4
        },
        flock: {
          label: "Flock",
          value: 5
        },
        army: {
          label: "Army",
          value: 12
        }
      }
    },
    speed: {
      label:"Speed",
      value: 2,
      options: {
        slow: {
          label: "Slow",
          value: 1
        },
        normal: {
          label: "Normal",
          value: 2
        },
        fast: {
          label: "Fast",
          value: 3
        }
      }
    },
    move: {
      label: "Move",
      value: 1,
      options: {
        slow: {
          label: "Slow",
          value: 21
        },
        normal: {
          label: "Normal",
          value: 4
        },
        fast: {
          label: "Fast",
          value: 2
        },
        drunkenly: {
          label: "Drunkenly",
          value: 25
        },
        nervously: {
          label: "Nervously",
          value: 23
        }
      }
    },
    perform: {
      label: "Perform",
      value: 4,
      options: {
        camera: {
          label: "Camera",
          value: 1
        },
        light: {
          label: "Light",
          value: 2
        },
        sound:{
          label: "Sound",
          value: 3
        }
      }
    },
    modify: {
      label: "Modify",
      value: 5,
      options: {
        more:{
          label: "More",
          value: 1
        },
        less:{
          label: "Less",
          value: 2
        },
        hover: {
          label: "Hover",
          value: 3
        },
        land: {
          label: "Land",
          value: 4
        },
        takeoff: {
          label: "Take Off",
          value: 5
        }
      },
      modifiers: {
        quantity: config.modifiers.quantity,
        duration: config.modifiers.duration
      }
    },
    periodic: {
      label: "Periodic",
      value: 6,
      options: {
        elliptical: {
          label: "Elliptical",
          value: 1
        },
        updown: {
          label: "Up & Down",
          value: 2
        },
        sideside: {
          label: "Side to Side",
          value: 3
        },
        rotate: {
          label: "Rotate",
          value: 4
        },
        forrev: {
          label: "For Rev",
          value: 5
        }
      },
      modifiers: {
        duration: config.modifiers.duration
      }
    }
  };

export default config;