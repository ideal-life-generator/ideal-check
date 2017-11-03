import check, { createValidation } from '../src/index'
import {
  required,
  minLength,
  maxLength,
  validEmail,
  sameValue,
} from './helpers/validations'

describe('value validation', () => {
  it('required valid', () => expect(check(required)('test')).toBeUndefined())

  it('required invalid', () => expect(check(required)()).toEqual('This field is required'))

  it('minLength valid', () => expect(check(minLength(4))('test')).toBeUndefined())

  it('minLength invalid', () => expect(check(minLength(5))('test')).toEqual('Must be 5 characters or more'))

  it('sameValue valid', () => expect(check(sameValue)('test', 'test')).toBeUndefined())

  it('sameValue invalid', () => expect(check(sameValue)('test', '')).toEqual('Is a different password'))
})

describe('form validation', () => {
  const firstName = check(required, minLength(2), maxLength(265))
  const lastName = check(required, minLength(2), maxLength(265))
  const email = check(required, validEmail, maxLength(265))
  const password = check(required, minLength(8), maxLength(265))
  const confirmPassword = check(required, minLength(8), maxLength(265), sameValue)

  it('valid form', () => {
    const signupValidation = createValidation(values => ({
      firstName: firstName(values.firstName),
      lastName: lastName(values.lastName),
      email: email(values.email),
      password: password(values.password),
      confirmPassword: confirmPassword(values.password, values.confirmPassword),
    }))

    expect(signupValidation({
      firstName: 'Tkachenko',
      lastName: 'Vladislav',
      email: 'ideal.life.generator@gmail.com',
      password: '12345678',
      confirmPassword: '12345678',
    })).toEqual({});
  })

  it('invalid form', () => {
    const signupValidation = createValidation(values => ({
      firstName: firstName(values.firstName),
      lastName: lastName(values.lastName),
      email: email(values.email),
      password: password(values.password),
      confirmPassword: confirmPassword(values.confirmPassword, values.password),
    }))

    expect(signupValidation({
      firstName: '',
      lastName: 'V',
      email: 'ideal.life.generator',
      password: '1234567',
      confirmPassword: '123456789',
    })).toEqual({
      firstName: 'This field is required',
      lastName: 'Must be 2 characters or more',
      email: 'This email is invalid',
      password: 'Must be 8 characters or more',
      confirmPassword: 'Is a different password',
    });
  })
})
