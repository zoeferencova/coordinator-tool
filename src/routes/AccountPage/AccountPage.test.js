import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AccountPage from './AccountPage'

describe(`AccountPage component`, () => {
  it('renders a .AccountPage by default', () => {
    const wrapper = shallow(<AccountPage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})