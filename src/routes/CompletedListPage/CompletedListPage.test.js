import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import CompletedListPage from './CompletedListPage'

describe(`CompletedListPage component`, () => {
  it('renders a .CompletedListPage by default', () => {
    const wrapper = shallow(<CompletedListPage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})