// import React from 'react'
// import { MapboxDraw, updateArea } from 'mapbox-gl'
// import { connect } from 'react-redux'

// export class DrawingTool extends React.Component {

//     render() {

//     const { map } = this.props;

//     const draw = new MapboxDraw({
//         displayControlsDefault: false,
//         controls: {
//         point: true, 
//         line_string: true,
//         polygon: true,
//         trash: true
//         }
//         });

//     map.addControl(draw);

//     return(<div>{draw}</div>)

//     }
// }

// const mapStateToProps = state => {
//     return {
//       active: state.active
//     };
//   }
  
//   export default connect(mapStateToProps)(DrawingTool);