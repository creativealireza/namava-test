import axios from 'axios'

const BASE_URL = 'https://www.namava.ir'

export default async function postUserCredential({ email, password }) {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1.0/accounts/login/by-email`,
      {
        UserName: email,
        password
      })

    return response?.data
  } catch (error) {
    return error
  }
}

