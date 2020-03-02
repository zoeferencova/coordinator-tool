// import React from 'react';
// import { shallow } from 'enzyme'
// import toJson from 'enzyme-to-json'
// import AuthenticatedApp from './AuthenticatedApp'

// describe(`Authenticated App component`, () => {
//   it('renders a .AuthenticatedApp by default', () => {
//     const wrapper = shallow(<AuthenticatedApp />)
//     expect(toJson(wrapper)).toMatchSnapshot()
//   })
// })

import React from 'react'
import ReactDOM from 'react-dom'
import AuthenticatedApp from './AuthenticatedApp'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
        <AuthenticatedApp />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})