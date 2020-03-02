import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MainListBody from './MainListBody'

describe(`MainListBody component`, () => {
  it('renders a .MainListBody by default', () => {
    const wrapper = shallow(<MainListBody />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})