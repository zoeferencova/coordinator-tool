import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ChartWrapper from './ChartWrapper'

describe(`Chart Wrapper component`, () => {
  it('renders a .ChartWrapper by default', () => {
    const wrapper = shallow(<ChartWrapper />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})