import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MainListTools from './MainListTools'

describe(`MainListTools component`, () => {
  it('renders a .MainListTools by default', () => {
    const wrapper = shallow(<MainListTools />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})