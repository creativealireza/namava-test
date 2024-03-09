import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Toast from './index'

describe('Toast', () => {
  test('renders correctly with title and success status', () => {
    const { container, getByText } = render(<Toast title="Success message" status="success" />)
    const toastElement = container.querySelector('.toast')

    expect(toastElement).toBeInTheDocument()
    expect(toastElement).toHaveClass('active')
    expect(toastElement).toHaveClass('success')
    expect(getByText('Success message')).toBeInTheDocument()
  })

  test('renders correctly with title and error status', () => {
    const { container, getByText } = render(<Toast title="Error message" status="error" />)
    const toastElement = container.querySelector('.toast')
    const warningImage = container.querySelector('.toast-warning')

    expect(toastElement).toBeInTheDocument()
    expect(toastElement).toHaveClass('active')
    expect(warningImage).toBeInTheDocument()
    expect(getByText('Error message')).toBeInTheDocument()
  })

  test('renders correctly without title', () => {
    const { container } = render(<Toast status="success" />)
    const toastElement = container.querySelector('.toast')

    expect(toastElement).toBeInTheDocument()
    expect(toastElement).not.toHaveClass('active')
  })
})
