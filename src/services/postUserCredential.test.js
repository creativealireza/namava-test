import axios from 'axios'
import postUserCredential from './postUserCredential'

jest.mock('axios')

describe('postUserCredential', () => {
  test('calls axios and returns response', async () => {
    const mockResponse = { data: { succeeded: true } }
    axios.post.mockResolvedValue(mockResponse)

    const result = await postUserCredential({ email: 'test@test.com', password: 'password' })

    expect(axios.post).toHaveBeenCalledWith(
      'https://www.namava.ir/api/v1.0/accounts/login/by-email',
      {
        UserName: 'test@test.com',
        password: 'password'
      }
    )
    expect(result).toEqual(mockResponse.data)
  })

  test('handles error', async () => {
    const mockError = new Error('Network error')
    axios.post.mockRejectedValue(mockError)

    const result = await postUserCredential({ email: 'test@test.com', password: 'password' })

    expect(axios.post).toHaveBeenCalledWith(
      'https://www.namava.ir/api/v1.0/accounts/login/by-email',
      {
        UserName: 'test@test.com',
        password: 'password'
      }
    )
    expect(result).toEqual(mockError)
  })
})
