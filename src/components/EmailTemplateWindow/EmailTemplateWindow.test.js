import React from 'react'
import ReactDOM from 'react-dom'
import EmailTemplateWindow from './EmailTemplateWindow'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
        <EmailTemplateWindow />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})