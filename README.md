# Simple and flexible check for incoming data

### Installation

```shell
npm install --save ideal-check
```

### Usage

```js
import check, { checkObject } from 'ideal-check'
import isEmail from 'validator/lib/isEmail'

const required = value => !value && 'This field is required'
const minLength = min => value => value.length < min && `Must be ${min} characters or more`
const maxLength = max => value => value.length > max && `Must be not more ${max} characters`
const validEmail = email => !isEmail(email) && 'This email is invalid'
const samePassword = (confirmPassword, password) => confirmPassword !== password && 'This password is different'

// Check values

const checkFirstName = check(required, minLength(2), maxLength(265))
const checkLastName = check(required, minLength(2), maxLength(265))
const checkEmail = check(required, validEmail, maxLength(265))
const checkPassword = check(required, minLength(8), maxLength(265))
const checkConfirmPassword = check(required, minLength(8), maxLength(265), samePassword)

checkEmail('ideal.life.generator@gmail.com') // Returning null
checkEmail('ideal.life.generator') // Returning "This email is invalid"

// Check object

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

signupValidation({
  firstName: 'Tkachenko',
  lastName: 'Vladislav',
  email: 'ideal.life.generator@gmail.com',
  password: '12345678',
  confirmPassword: '12345678',
}) // Returning null

signupValidation({
  firstName: '',
  lastName: 'V',
  email: 'ideal.life.generator',
  password: '12345678',
  confirmPassword: '123456789',
})

/*
  Returning {
    firstName: 'This field is required',
    lastName: 'Must be 2 characters or more',
    email: 'This email is invalid',
    password: 'Must be 8 characters or more',
    confirmPassword: 'This password is different',
  }
*/
```
