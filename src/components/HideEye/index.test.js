import React from 'react'
import { render } from '@testing-library/react'
import HideEye from './index'
import '@testing-library/jest-dom'

describe('HideEye', () => {
  test('renders correctly', () => {
    const { container } = render(<HideEye />)
    const svgElement = container.querySelector('svg')

    expect(svgElement).toBeInTheDocument()
    expect(svgElement).toHaveClass('eye')
  })
})
