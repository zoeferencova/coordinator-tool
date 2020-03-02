import React from 'react'
import ReactDOM from 'react-dom'
import CompletedListBody from './CompletedListBody'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    renderCompletedItems: () => {}
  }
  ReactDOM.render(
    <BrowserRouter>
        <CompletedListBody {...props} />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})