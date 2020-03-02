import React from 'react'
import ReactDOM from 'react-dom'
import UnauthenticatedApp from './UnauthenticatedApp'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
        <UnauthenticatedApp />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})