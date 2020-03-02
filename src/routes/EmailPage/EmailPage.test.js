import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EmailPage from './EmailPage'
import AppContext from '../../contexts/contexts'

describe(`EmailPage component`, () => {
  it('renders a .EmailPage by default', () => {
    const context = { templates: [{
        id: 24,
        template_content: "hi",
        template_name: "hi",
        template_subject: "hi",
        user_id: 8}] }
    const wrapper = shallow(<EmailPage />, { context })
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})