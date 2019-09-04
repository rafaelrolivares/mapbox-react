import React from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { connect } from 'react-redux'
import { config } from './config.js'

mapboxgl.accessToken = config.mapbox_key



export class Map extends React.Component {
  
  componentDidUpdate() {
    console.log('componentDidUpdate')
    this.setFill();
  }

  componentDidMount() {
    console.log("componentDidMount")

    // Limit the map to be seen only in the Netherlands
    // const boundBox = [
    //   [3.294817, 50.697401],
    //   [7.382357, 53.704082] 
    // ]

    // Load mapbox map:
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      // zoom to the NL:
      // center: [5.25, 52.23],
      // zoom: 7,
      // maxBounds: boundBox
      center: [5, 34],
      zoom: 1.5
    });

    // Disable rotation and other funny behaviours not really useful here.
    this.map.dragRotate.disable()

    // Add navigation control buttons
    const navBar = new mapboxgl.NavigationControl({
      showCompass: false,
      showZoom: true
    })
    this.map.addControl(navBar, 'top-right')
    console.log(navBar)
    
    // Add drawing tool buttons
    const Draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
      point: true, 
      line_string: true,
      polygon: true,
      trash: true
      }
      });

    this.map.addControl(Draw, 'top-right')

    // Add full screen button
    this.map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('body')}));
    
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
      }, 'country-label-lg');

     this.setFill();
    });

  
  }



  // establish how to colour the polygons based on the classification, which is described on the reducer.
  setFill() {
    const { property, stops } = this.props.active;
    console.log(this.props)
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
