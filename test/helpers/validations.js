import isEmail from 'validator/lib/isEmail'

export const required = value => !value && 'This field is required'
export const minLength = min => value => value.length < min && `Must be ${min} characters or more`
export const maxLength = max => value => value.length > max && `Must be not more ${max} characters`
export const validEmail = value => !isEmail(value) && 'This email is invalid'
export const sameValue = (value, secondValue) => value !== secondValue && 'This password is different'
