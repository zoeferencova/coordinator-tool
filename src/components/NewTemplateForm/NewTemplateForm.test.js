import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NewTemplateForm from './NewTemplateForm'

describe(`NewTemplateForm component`, () => {
  it('renders a .NewTemplateForm by default', () => {
    const wrapper = shallow(<NewTemplateForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})