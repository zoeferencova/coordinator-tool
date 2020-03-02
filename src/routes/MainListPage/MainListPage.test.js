import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MainListPage from './MainListPage'

describe(`MainListPage component`, () => {
  it('renders a .MainListPage by default', () => {
    const wrapper = shallow(<MainListPage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})