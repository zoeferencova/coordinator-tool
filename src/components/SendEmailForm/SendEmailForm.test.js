import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SendEmailForm from './SendEmailForm'
import AppContext from '../../contexts/contexts'



describe(`SendEmailForm component`, () => {
  it('renders a .SendEmailForm by default', () => {
    
    const wrapper = shallow(<SendEmailForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})