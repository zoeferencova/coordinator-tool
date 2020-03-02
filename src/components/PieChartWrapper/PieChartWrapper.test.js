import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PieChartWrapper from './PieChartWrapper'

describe(`PieChartWrapper component`, () => {
  it('renders a .PieChartWrapper by default', () => {
    const wrapper = shallow(<PieChartWrapper />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})