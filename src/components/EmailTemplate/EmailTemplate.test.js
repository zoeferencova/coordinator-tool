import React from 'react'
import ReactDOM from 'react-dom'
import EmailTemplate from './EmailTemplate'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
        <EmailTemplate />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})