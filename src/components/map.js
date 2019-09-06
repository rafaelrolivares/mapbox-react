import React from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { connect } from 'react-redux'
import { config } from './config.js'

mapboxgl.accessToken = config.mapbox_key

export class Map extends React.Component {
  
  componentDidUpdate() {
    this.setFill();
  }

  componentDidMount() {

    // Limit the map to be seen only in the Netherlands
    // const boundBox = [
    //   [3.294817, 50.697401],
    //   [7.382357, 53.704082] 
    // ]

    // Load mapbox map:
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9', // use a later version that takes more time to complaint about zoom.
      // zoom to the NL:
      // center: [5.25, 52.23],
      // zoom: 7,
      // maxBounds: boundBox
      center: [5, 34],
      zoom: 1.5
    });

    // Disable rotation and other funny behaviours not really useful here.
    this.map.dragRotate.disable()

    // Create search box, filter results to NL.
    const geocoder = new MapboxGeocoder({ 
      accessToken: mapboxgl.accessToken, 
      mapboxgl: mapboxgl,
      countries: "NL" });
    this.map.addControl(geocoder, 'top-right');

    // Add navigation control buttons, hide compass and show only zoom.
    const navBar = new mapboxgl.NavigationControl({
      showCompass: false,
      showZoom: true
    })
    this.map.addControl(navBar, 'top-right')
        
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
    
    // load data from sources in props
    this.map.on('load', () => {
      // Add country polygons
      this.map.addSource('countries', {
        type: 'geojson',
        data: this.props.data
      });

      this.map.addLayer({
        id: 'countries',
        type: 'fill',
        source: 'countries'
      }, 'country-label-lg');

      // Add city points
      this.map.addSource('cities', {
        type: 'geojson',
        data: this.props.point_data
      });

      this.map.addLayer({
        id: 'cities',
        type: 'circle',
        source: 'cities'
      })

     this.setFill();
     this.setPointColor()
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

  setPointColor() {
    const { property, stops } = this.props.pointDataFill
    this.map.setPaintProperty('cities', 'circle-color', {
      property, stops
    })
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
    point_data: state.point_data,
    pointDataFill: state.pointDataFill,
    active: state.active
  };
}

export default connect(mapStateToProps)(Map);
