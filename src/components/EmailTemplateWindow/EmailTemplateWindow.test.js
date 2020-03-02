import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EmailTemplateWindow from './EmailTemplateWindow'

describe(`EmailTemplate component`, () => {
  it('renders a .EmailTemplateWindow by default', () => {
    const wrapper = shallow(<EmailTemplateWindow />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})