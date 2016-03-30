import React from 'react';

const {PropTypes} = React;

class ExampleBase extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    geometry: PropTypes.object.isOptional
  };
}

export default ExampleBase;
