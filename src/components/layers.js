// This must become a list of available layers

import React from 'react'
import { connect } from 'react-redux'

export class Layers extends React.Component {

  render() {
    const availableLayers = "ahhgjrgjhr";
    const abc = this.props
    console.log("this", abc)

    const renderLayerList = () => {
      return (
        <div className='txt-s'>
          <span>{availableLayers}</span>
        </div>
      );
    }

    return (
      <div className="bg-white absolute bottom left ml12 mb36 py12 px12 shadow-darken10 round z1 wmax180">
        <div className='mb6'>
          <h2 className="txt-bold txt-s block">Layers</h2>
          <p className='txt-s color-gray'></p>
        </div>
        {renderLayerList()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    active: state.active,
    availableLayers: state.availableLayers
  };
}

export default connect(mapStateToProps)(Layers);

