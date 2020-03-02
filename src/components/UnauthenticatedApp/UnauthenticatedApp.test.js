import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import UnauthenticatedApp from './UnauthenticatedApp'

describe(`UnauthenticatedApp component`, () => {
  it('renders a .UnauthenticatedApp by default', () => {
    const wrapper = shallow(<UnauthenticatedApp />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})