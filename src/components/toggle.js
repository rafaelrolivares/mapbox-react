import React from 'react'
import { connect } from 'react-redux'

export class Toggle extends React.Component {

  render() {
    const { options, active } = this.props;

    console.log(`Active field: ${active.name}`)

    const renderOptions = (option, i) => {
      return (
        <label key={i} className="toggle-container">
          <input onChange={() => this.props.onChange(option)} checked={option.property === active.property} name="toggle" type="radio" />
          <div className="toggle txt-s py3 toggle--active-white">{option.name}</div>
        </label>
      );
    }

    return (
      <div className="toggle-group absolute top left ml12 mt12 border border--2 border--white bg-white shadow-darken10 z1">
        {options.map(renderOptions)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    options: state.options,
    active: state.active
  };
}

export default connect(mapStateToProps)(Toggle);
