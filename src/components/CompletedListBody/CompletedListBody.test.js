import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import CompletedListBody from './CompletedListBody'

describe(`Completed List Body component`, () => {
  const props = {
    renderCompletedItems: () => {}
  }

  it('renders a .CompletedListbody by default', () => {
    const wrapper = shallow(<CompletedListBody {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})