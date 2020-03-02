import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import CompletedListTools from './CompletedListTools'

describe(`Completed List Tools component`, () => {
  it('renders a .CompletedListTools by default', () => {
    const wrapper = shallow(<CompletedListTools />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})