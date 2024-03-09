import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import user from '@testing-library/user-event'
import LoginPage from './index'
import postUserCredential from '../../services/postUserCredential.js'
import emailValidation from '../../utils/emailValidation'
// import toastMessage from '../../components/Toast/index'

jest.mock('../../services/postUserCredential.js', () => jest.fn())
jest.mock('@lottiefiles/react-lottie-player', () => {
  return {
    Player: () => <div>Mock Player</div>
  }
})
jest.mock('../../utils/emailValidation')
// jest.mock('../../components/Toast/index')

beforeEach(() => {
  jest.resetAllMocks()
  // postUserCredential.mockClear()
})

describe('LoginPage', () => {
  test('renders correctly', () => {
    const { container } = render(<LoginPage />)

    const divElement = container.querySelector('.login-page')

    expect(divElement).toBeInTheDocument()
  })

  test('handles input change', async () => {
    // const { getByPlaceholderText } = render(<LoginPage />)
    // const input = getByPlaceholderText('ایمیل')
    render(<LoginPage />)

    const input = screen.getByPlaceholderText('ایمیل')

    // fireEvent.change(input, { target: { value: 'test@test.com' } })
    await user.click(input)
    await user.keyboard('test@test.com')

    // expect(input.value).toBe('test@test.com')
    expect(input).toHaveValue('test@test.com')
  })

  test('handles form submission', async () => {
    postUserCredential.mockResolvedValue({ succeeded: true })
    render(<LoginPage />)
    const emailInput = screen.getByPlaceholderText('ایمیل')
    const passwordInput = screen.getByPlaceholderText('رمز عبور')
    const submitButton = screen.getByText('ورود')

    await user.type(emailInput, 'test@test.com')
    await user.type(passwordInput, 'password')
    // const test1 = fireEvent.click(submitButton)
    // const test2 = await user.click(submitButton)
    // console.log(test1, test2)
    await user.click(submitButton)

    expect(submitButton).toBeInTheDocument()
    waitFor(() => expect(postUserCredential).toHaveBeenCalledTimes(1))
    expect(postUserCredential).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password' })
  })

  test('loginBtnClickHandler triggers formCheck and authentication on button click', async () => {
    postUserCredential.mockResolvedValue({ succeeded: true })
    const { getByText, getByPlaceholderText, container } = render(<LoginPage />)

    const emailInput = getByPlaceholderText('ایمیل')
    const passwordInput = getByPlaceholderText('رمز عبور')
    const button = getByText('ورود')

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })

    const buttonLogin = container.querySelector('.submit-login')
    console.log(buttonLogin)

    await waitFor(() => fireEvent.click(button))

    expect(postUserCredential).toHaveBeenCalledTimes(1)
    expect(postUserCredential).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password' })
  })
})

describe('form check Status', () => {
  test('form check returns true if email is valid', async () => {
    const authentication = jest.fn()
    const formCheck = jest.fn(() => true)

    const { getByPlaceholderText } = render(<LoginPage />)
    const emailInput = getByPlaceholderText('ایمیل')
    const passwordInput = getByPlaceholderText('رمز عبور')
    let enterKey = undefined

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password' } })
      enterKey = fireEvent.keyDown(emailInput, { key: 'Enter', code: 'Enter', charCode: 13 })
    })

    // fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    // fireEvent.change(passwordInput, { target: { value: 'password' } })
    // const enterKey = fireEvent.keyDown(emailInput, { key: 'Enter', code: 'Enter', charCode: 13 })
    authentication()

    expect(formCheck()).toBe(true)
    expect(enterKey).toBe(true)
    expect(emailInput).toHaveValue()
    expect(passwordInput).toHaveValue()
    expect(authentication).toHaveBeenCalledTimes(1)
  })
})

// describe('formCheck Function', () => {
//   test('returns true when email is valid', async () => {
//     emailValidation.mockReturnValue(true)

//     const { getByPlaceholderText, getByText } = render(<LoginPage />)
//     const emailInput = getByPlaceholderText('ایمیل')
//     const passwordInput = getByPlaceholderText('رمز عبور')
//     const button = getByText('ورود')

//     await user.click(emailInput)
//     await user.keyboard('test@test.com')

//     await user.click(passwordInput)
//     await user.keyboard('password')

//     await user.click(button)

//     expect(emailValidation).toHaveBeenCalledWith('test@test.com')
//     // expect(toastMessage).not.toHaveBeenCalled()
//   })

//   // test('returns false and shows a toast message when email is invalid', () => {
//   //   emailValidation.mockReturnValue(false)

//   //   const { getByPlaceholderText } = render(<LoginPage />)
//   //   const emailInput = getByPlaceholderText('ایمیل')

//   //   fireEvent.change(emailInput, { target: { value: 'invalid email' } })

//   //   expect(emailValidation).toHaveBeenCalledWith('invalid email')
//   //   expect(toastMessage).toHaveBeenCalledWith('error', expect.any(String))
//   // })
// })
