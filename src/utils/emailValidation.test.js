import emailValidation from './emailValidation'

describe('emailValidation', () => {
  test('validates correct email', () => {
    const result = emailValidation('test@test.com')
    expect(result).toEqual(expect.arrayContaining(['test@test.com']))
  })

  test('validates incorrect email', () => {
    const result = emailValidation('test@test')
    expect(result).toBeNull()
  })

  test('validates case insensitive email', () => {
    const result = emailValidation('TEST@TEST.COM')
    expect(result).toEqual(expect.arrayContaining(['test@test.com']))
  })

  test('validates email with special characters', () => {
    const result = emailValidation('test.test@test.com')
    expect(result).toEqual(expect.arrayContaining(['test.test@test.com']))
  })
})
