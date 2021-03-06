import { SET_ACTIVE_OPTION } from '../constants'
import data from '../data_polygon.json'
import point_data from '../data_point.json'

const options = [{
  name: 'Population',
  description: 'Estimated total population',
  property: 'pop_est',
  stops: [
    [0, '#f8d5cc'],
    [1000000, '#f4bfb6'],
    [5000000, '#f1a8a5'],
    [10000000, '#ee8f9a'],
    [50000000, '#ec739b'],
    [100000000, '#dd5ca8'],
    [250000000, '#c44cc0'],
    [500000000, '#9f43d7'],
    [1000000000, '#6e40e6']
  ]
}, {
  name: 'GDP',
  description: 'Estimate total GDP in millions of dollars',
  property: 'gdp_md_est',
  stops: [
    [0, '#f8d5cc'],
    [1000, '#f4bfb6'],
    [5000, '#f1a8a5'],
    [10000, '#ee8f9a'],
    [50000, '#ec739b'],
    [100000, '#dd5ca8'],
    [250000, '#c44cc0'],
    [5000000, '#9f43d7'],
    [10000000, '#6e40e6']
  ]
}]

const pointDataFill = {
  name: 'Inhabitants',
  property: 'pop_other',
  stops: [
    [0, '#98FB98'],
    [10000, '#7CFC00'],
    [50000, '#32CD32'],
    [100000, '#228B22'],
    [500000, '#006400']
  ]
}

const initialState = {
  data,
  point_data,
  options,
  pointDataFill,
  active: options[0]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_OPTION:
      return Object.assign({}, state, {
        active: action.option
      });
    default:
      return state;
  }
}

export { reducer, initialState };
