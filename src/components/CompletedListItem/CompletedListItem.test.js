import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import CompletedListItem from './CompletedListItem'

describe(`Completed List Item component`, () => {
  it('renders a .CompletedListItem by default', () => {
    const wrapper = shallow(<CompletedListItem />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})