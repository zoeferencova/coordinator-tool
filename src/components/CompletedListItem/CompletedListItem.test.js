import React from 'react'
import ReactDOM from 'react-dom'
import CompletedListItem from './CompletedListItem'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
        <CompletedListItem />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})