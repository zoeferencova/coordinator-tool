import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MainListItem from './MainListItem'

describe(`MainListItem component`, () => {
  it('renders a .MainListItem by default', () => {
    const wrapper = shallow(<MainListItem />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})