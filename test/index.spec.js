import check, { checkObject } from '../src/index'
import {
  required,
  minLength,
  maxLength,
  validEmail,
  samePassword,
} from './helpers/validations'

describe('value validation', () => {
  it('required valid', () => expect(check(required)('test')).toBeNull())

  it('required invalid', () => expect(check(required)()).toEqual('This field is required'))

  it('minLength valid', () => expect(check(minLength(4))('test')).toBeNull())

  it('minLength invalid', () => expect(check(minLength(5))('test')).toEqual('Must be 5 characters or more'))

  it('samePassword valid', () => expect(check(samePassword)('test', 'test')).toBeNull())

  it('samePassword invalid', () => expect(check(samePassword)('test', '')).toEqual('This password is different'))
})

describe('form validation', () => {
  const checkFirstName = check(required, minLength(2), maxLength(265))
  const checkLastName = check(required, minLength(2), maxLength(265))
  const checkEmail = check(required, validEmail, maxLength(265))
  const checkPassword = check(required, minLength(8), maxLength(265))
  const checkConfirmPassword = check(required, minLength(8), maxLength(265), samePassword)

  const signupValidation = checkObject(({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }) => ({
    firstName: checkFirstName(firstName),
    lastName: checkLastName(lastName),
    email: checkEmail(email),
    password: checkPassword(password),
    confirmPassword: checkConfirmPassword(confirmPassword, password),
  }))

  it('valid', () => {
    expect(signupValidation({
      firstName: 'Tkachenko',
      lastName: 'Vladislav',
      email: 'ideal.life.generator@gmail.com',
      password: '12345678',
      confirmPassword: '12345678',
    })).toBeNull();
  })

  it('invalid', () => {
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
      confirmPassword: 'This password is different',
    });
  })

  it('optinal invalid', () => {
    expect(signupValidation({
      firstName: 'Tkachenko',
      lastName: 'Vladislav',
      email: 'ideal.life.generator@gmail.com',
      password: '1234567',
      confirmPassword: '123456789',
    })).toEqual({
      password: 'Must be 8 characters or more',
      confirmPassword: 'This password is different',
    });
  })
})
