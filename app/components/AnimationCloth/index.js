import _ from 'lodash';

import React from 'react';
import ReactDOM from 'react-dom';

import THREE from 'three';
import Stats from 'stats.js';

import React3 from 'react-three-renderer';

import ExampleBase from '../ExampleBase';

import TrackballControls from '../ref/trackball_og';

import Cloth from './Cloth';

import StaticWorld from './StaticWorld';

import Drone from './Drone';



// var collada = require('three-loaders-collada')(THREE);


const ballSize = 60; // 40

const GRAVITY = 981 * 1.4; //
const gravity = new THREE.Vector3(0, -GRAVITY, 0).multiplyScalar(Cloth.MASS);

const TIMESTEP = 18 / 1000;
const TIMESTEP_SQ = TIMESTEP * TIMESTEP;

const diff = new THREE.Vector3();



function satisfyConstrains(p1, p2, distance) {
  diff.subVectors(p2.position, p1.position);
  const currentDist = diff.length();
  if (currentDist === 0) return; // prevents division by 0
  const correction = diff.multiplyScalar(1 - distance / currentDist);
  const correctionHalf = correction.multiplyScalar(0.5);
  p1.position.add(correctionHalf);
  p2.position.sub(correctionHalf);
}

const tmpForce = new THREE.Vector3();

class AnimationCloth extends ExampleBase {
  constructor(props, context) {
    super(props, context);

    this.state = {
      ...this.state,
      minTimePerFrame: 0,
      rotate: false,
      wind: false,
      drone: true
    };

    const xSegs = 10; //
    const ySegs = 13; //


    this.cloth = new Cloth(xSegs, ySegs);

    const pinsFormation = [];
    let pins = [6];

    pinsFormation.push(pins);

    pins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    pinsFormation.push(pins);

    pins = [0];
    pinsFormation.push(pins);

    pins = []; // cut the rope ;)
    pinsFormation.push(pins);

    pins = [0, this.cloth.w]; // classic 2 pins
    pinsFormation.push(pins);

    pins = pinsFormation[1];

    this.pins = pins;
    this.pinsFormation = pinsFormation;

    this.fog = new THREE.Fog(0xcce0ff, 500, 10000);

    this.windForce = new THREE.Vector3(0, 0, 0);

    this.state = {
      ...this.state,
      ballPosition: new THREE.Vector3(0, -45, 0),
      drones:[
        {position:new THREE.Vector3(0, -100, 0)},
        {position:new THREE.Vector3(20, -150, 60)},
        {position:new THREE.Vector3(-200, -50, 80)},
        {position:new THREE.Vector3(100, 60, 300)},
        {position:new THREE.Vector3(200, 0, -120)}
      ],
      cameraPosition: new THREE.Vector3(1500, -50, 1500),
    };

    this.scenePosition = new THREE.Vector3(0, 0, 0);
  }

  componentDidMount() {
    const controls = new TrackballControls(this.refs.mainCamera, ReactDOM.findDOMNode(this.refs.react3));
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    controls.addEventListener('change', () => {
      this.setState({
        cameraPosition: this.refs.mainCamera.position,
      });
    });

    this.controls = controls;

    this.stats = new Stats();

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';

    this.refs.container.appendChild(this.stats.domElement);

  }

  componentWillUnmount() {
    delete this.stats;
    this.controls.dispose();
    delete this.controls;
  }

  _toggleRotate = () => {
    this.setState({rotate: !this.state.rotate});
  };

  _toggleWind = () => {
    this.setState({wind: !this.state.wind});
  };

   _toggleSphere = () => {
    this.setState({sphere: !this.state.sphere});
  };

  _toggleDrone = () => {
    this.setState({drone: !this.state.drone});
  };

  _togglePins = () => {
    this.pins = this.pinsFormation[~~( Math.random() * this.pinsFormation.length )];
  };

  _simulate(time) {
    if (!this.lastTime) {
      this.lastTime = time;
      return;
    }

    let i;
    let il;
    let particles;
    let particle;
    let constrains;
    let constrain;

    const clothGeometry = React3.findTHREEObject(this._clothGeometry);

    // Aerodynamics forces
    if (this.state.wind) {
      let face;
      const faces = clothGeometry.faces;
      let normal;

      particles = this.cloth.particles;

      for (i = 0, il = faces.length; i < il; i++) {
        face = faces[i];
        normal = face.normal;

        tmpForce.copy(normal).normalize().multiplyScalar(normal.dot(this.windForce));
        particles[face.a].addForce(tmpForce);
        particles[face.b].addForce(tmpForce);
        particles[face.c].addForce(tmpForce);
      }
    }

    for (particles = this.cloth.particles, i = 0, il = particles.length; i < il; i++) {
      particle = particles[i];
      particle.addForce(gravity);

      particle.integrate(TIMESTEP_SQ);
    }

    // Start Constrains


    constrains = this.cloth.constrains;
    il = constrains.length;

    for (i = 0; i < il; i++) {
      constrain = constrains[i];
      satisfyConstrains(constrain[0], constrain[1], constrain[2]);
    }



    // Floor Constraints
    for (particles = this.cloth.particles, i = 0, il = particles.length
      ; i < il; i++) {
      particle = particles[i];
      const pos = particle.position;
      if (pos.y < -250) {
        pos.y = -250;
      }
    }

    // Pin Constrains
    for (i = 0, il = this.pins.length; i < il; i++) {
      const xy = this.pins[i];
      const p = particles[xy];
      p.position.copy(p.original);
      p.previous.copy(p.original);
    }

    const drone = React3.findTHREEObject(this.refs.drone);

    const p0 = this.state.drones[0].position.clone();
    const p1 = this.state.drones[1].position.clone();
    const p2 = this.state.drones[2].position.clone();
    const p3 = this.state.drones[3].position.clone();
    const p4 = this.state.drones[4].position.clone();

    function move(p, offset){
      p.z += -Math.sin((Date.now() + (offset*1000)) / 600) * .1; // + 40;
      p.y += -Math.sin((Date.now() + (offset*1000)) / 600) * .1; // + 40;
      p.x += Math.cos((Date.now() + (offset*1000)) / 400) * .1;
      return p;
    }


    this.setState({
      drones:[
        {position:move(p0, 1)},
        {position:move(p1, 2)},
        {position:move(p2, 3)},
        {position:move(p3, 4)},
        {position:move(p4, 5)}
      ]
    });
  }

  _onAnimate = () => {
    this.controls.update();

    const {
      minTimePerFrame,
      } = this.state;

    let time;

    if (minTimePerFrame > 0) {
      time = Math.round(Date.now() / minTimePerFrame) * minTimePerFrame;
    } else {
      time = Date.now();
    }

    if (time === this.state.time) {
      return;
    }

    const windStrength = Math.cos(time / 7000) * 20 + 40;
    this.windForce.set(Math.sin(time / 2000), Math.cos(time / 3000), Math.sin(time / 1000)).normalize().multiplyScalar(windStrength);

    this._simulate(time);

    const clothGeometry = React3.findTHREEObject(this._clothGeometry);

    // render

    const timer = time * 0.0002;

    const p = this.cloth.particles;

    let il;
    let i;
    for (i = 0, il = p.length; i < il; ++i) {
      clothGeometry.vertices[i].copy(p[i].position);
    }

    clothGeometry.computeFaceNormals();
    clothGeometry.computeVertexNormals();

    clothGeometry.normalsNeedUpdate = true;
    clothGeometry.verticesNeedUpdate = true;

    const newState = {
      time: time,
      dronePosition: this.ballPosition,
    };

    this.setState(newState);
    this.stats.update();
  };

  _clothRef = (ref) => {
    this._clothGeometry = ref;
  };

  render() {
    const {
      width,
      height,
      } = this.props;

    const {
      minTimePerFrame,
      } = this.state;

    return (<div ref="container">

      <React3
        ref="react3"
        width={width}
        height={height}
        antialias
        pixelRatio={window.devicePixelRatio}
        clearColor={this.fog.color}
        gammaInput
        gammaOutput
        shadowMapEnabled
        shadowMapDebug
        mainCamera="mainCamera"
        onAnimate={this._onAnimate}
      >
        <scene fog={this.fog}>
          <perspectiveCamera
            name="mainCamera"
            fov={20}
            aspect={width / height}
            ref="mainCamera"
            position={this.state.cameraPosition}
            near={1}
            far={10000}
            lookAt={this.state.rotate ? this.scenePosition : null}
          />
          <StaticWorld
            clothRef={this._clothRef}
            cloth={this.cloth}
          />

          <mesh castShadow
                receiveShadow
                position={[20,20]}
              >
            <sphereGeometry
              radius={60}
              widthSegments={20}
              heightSegments={20}
            />
            <meshPhongMaterial
              color={Number.parseInt(this.state.color, 16)}
            />
          </mesh>

          <Drone
            ref="drone"
            visible={this.state.drone}
            position={this.state.drones[0].position} />

          <Drone
            ref="drone"
            visible={this.state.drone}
            position={this.state.drones[1].position} />

          <Drone
            ref="drone"
            visible={this.state.drone}
            position={this.state.drones[2].position} />

          <Drone
            ref="drone"
            visible={this.state.drone}
            position={this.state.drones[3].position} />

          <Drone
            ref="drone"
            visible={this.state.drone}
            position={this.state.drones[4].position} />
        </scene>
      </React3>
    </div>);
  }
}

export default AnimationCloth;
