import React from 'react'
import ReactDOM from 'react-dom'
import CompletedListTools from './CompletedListTools'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
        <CompletedListTools />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})