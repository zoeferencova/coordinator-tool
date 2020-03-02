import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import DashboardPage from './DashboardPage'

describe(`DashboardPage component`, () => {
  it('renders a .DashboardPage by default', () => {
    const wrapper = shallow(<DashboardPage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})