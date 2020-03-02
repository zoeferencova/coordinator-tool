import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AuthenticatedApp from './AuthenticatedApp'

describe(`Authenticated App component`, () => {
  it('renders a .AuthenticatedApp by default', () => {
    const wrapper = shallow(<AuthenticatedApp />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})