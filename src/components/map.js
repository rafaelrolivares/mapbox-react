import React from 'react'
import mapboxgl from 'mapbox-gl'
import { connect } from 'react-redux'

mapboxgl.accessToken = 'pk.eyJ1IjoicmFmYWVscm9saXZhcmVzIiwiYSI6Ik0zODVHd28ifQ.t2icfHsPjHjyUyAV5CiGew';

export class Map extends React.Component {
  
  componentDidUpdate() {
    console.log('componentDidUpdate')
    this.setFill();
  }

  componentDidMount() {
    console.log("componentDidMount")

    // Load mapbox map:
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      // zoom to the NL:
      // center: [5.25, 52.23],
      // zoom: 7
      center: [5, 34],
      zoom: 1.5
    });

    // load data from countries source (from props)
    this.map.on('load', () => {
      this.map.addSource('countries', {
        type: 'geojson',
        data: this.props.data
      });

      // add this as a layer to the map
      this.map.addLayer({
        id: 'countries',
        type: 'fill',
        source: 'countries'
      }, 'country-label-lg'); // ID matches `mapbox/streets-v9`

      this.setFill();
    });
  }

  // establish how to colour the polygons based on the classification, which is described on the reducer.
  setFill() {
    const { property, stops } = this.props.active;
    this.map.setPaintProperty('countries', 'fill-color', {
      property,
      stops
    });    
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data,
    active: state.active
  };
}

export default connect(mapStateToProps)(Map);
