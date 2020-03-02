import React from 'react'
import ReactDOM from 'react-dom'
import MainListPage from './MainListPage'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
        <MainListPage />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})