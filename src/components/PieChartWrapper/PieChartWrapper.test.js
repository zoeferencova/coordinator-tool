import React from 'react'
import ReactDOM from 'react-dom'
import PieChartWrapper from './PieChartWrapper'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
        <PieChartWrapper />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})