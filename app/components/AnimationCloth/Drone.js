import React from 'react';

import THREE from 'three';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

// import MouseInput from './MouseInput';

const { PropTypes } = React;

const ballSize = 60; // 40

class Drone extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    position: PropTypes.instanceOf(THREE.Vector3).isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      color: '0xaaaaaa',
    };
  }

  handleClick(event){
    console.log("Drone clicked", event);
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  render() {
    const {
      visible,
      position,
      } = this.props;

    return (<mesh
      castShadow
      receiveShadow
      visible={visible}
      position={position}
    >
      <cylinderGeometry
        radiusTop={50}
        radiusBottom={50}
        height={10}
      />
      <meshPhongMaterial
        color={Number.parseInt(this.state.color, 16)}
      />
    </mesh>);
  }
}

export default Drone;
