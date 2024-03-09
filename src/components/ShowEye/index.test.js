import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import ShowEye from './index'

describe('ShowEye', () => {
  test('renders correctly', () => {
    const { container } = render(<ShowEye />)
    const svgElement = container.querySelector('svg')

    expect(svgElement).toBeInTheDocument()
    expect(svgElement).toHaveClass('eye')
  })
})
