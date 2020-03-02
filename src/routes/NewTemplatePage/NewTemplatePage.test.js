import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NewTemplatePage from './NewTemplatePage'

describe(`NewTemplatePage component`, () => {
  it('renders a .NewTemplatePage by default', () => {
    const wrapper = shallow(<NewTemplatePage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})