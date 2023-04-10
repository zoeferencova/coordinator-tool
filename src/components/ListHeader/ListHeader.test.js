import React from 'react'
import ReactDOM from 'react-dom'
import MainListBody from './ListHeader'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    renderListItems: () => { }
  }

  ReactDOM.render(
    <BrowserRouter>
      <MainListBody {...props} />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})