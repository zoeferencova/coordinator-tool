import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditItemPage from './EditItemPage'

describe(`EditItemPage component`, () => {
  it('renders a .EditItemPage by default', () => {
    const wrapper = shallow(<EditItemPage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})