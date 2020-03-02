import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EmailTemplate from './EmailTemplate'

describe(`EmailTemplate component`, () => {
  it('renders a .EmailTemplate by default', () => {
    const wrapper = shallow(<EmailTemplate />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})