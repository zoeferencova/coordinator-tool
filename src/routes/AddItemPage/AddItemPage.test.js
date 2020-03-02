import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddItemPage from './AddItemPage'

describe(`AddItemPage component`, () => {
  it('renders a .AddItemPage by default', () => {
    const wrapper = shallow(<AddItemPage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})