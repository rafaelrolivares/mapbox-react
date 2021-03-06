import React from 'react'
import { connect } from 'react-redux'

export class Legend extends React.Component {

  render() {
    const { name, description, stops } = this.props.active;

    const renderLegendKeys = (stop, i) => {
      return (
        <div key={i} className='txt-s'>
          <span className='mr6 round-full w12 h12 inline-block align-middle' style={{ backgroundColor: stop[1] }} />
          <span>{`${stop[0].toLocaleString()}`}</span>
        </div>
      );
    }

    return (
      <div className="bg-white absolute bottom right mr12 mb24 py12 px12 shadow-darken10 round z1 wmax180">
        <div className='mb6'>
          <h2 className="txt-bold txt-s block">{name}</h2>
          <p className='txt-s color-gray'>{description}</p>
        </div>
        {stops.map(renderLegendKeys)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    active: state.active
  };
}

export default connect(mapStateToProps)(Legend);

