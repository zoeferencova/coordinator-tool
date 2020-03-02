import React from 'react'
import ReactDOM from 'react-dom'
import CompletedListPage from './CompletedListPage'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
        <CompletedListPage />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})