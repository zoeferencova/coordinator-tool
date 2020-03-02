import React from 'react'
import ReactDOM from 'react-dom'
import ChartWrapper from './ChartWrapper'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
        <ChartWrapper />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})