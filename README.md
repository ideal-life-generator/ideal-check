# Simple and flexible validation for incoming data

### Installation

```
npm install --save ideal-validation
```

### Example

```
import check, { createValidation } from 'ideal-validation'
import isEmail from 'validator/lib/isEmail'

const required = value => !value && 'This field is required'
const minLength = min => value => value.length < min && `Must be ${min} characters or more`
const maxLength = max => value => value.length > max && `Must be not more ${max} characters`
const validEmail = value => !isEmail(value) && 'This email is invalid'
const sameValue = (value, secondValue) => value !== secondValue && 'Is a different password'

// Values validation

const firstName = check(required, minLength(2), maxLength(265))
const lastName = check(required, minLength(2), maxLength(265))
const email = check(required, validEmail, maxLength(265))
const password = check(required, minLength(8), maxLength(265))
const confirmPassword = check(required, minLength(8), maxLength(265), sameValue)

email('ideal.life.generator@gmail.com') // Returning undefined
email('ideal.life.generator') // Returning "This email is invalid"

// Data validation

const signupValidation = createValidation(values => ({
  firstName: firstName(values.firstName),
  lastName: lastName(values.lastName),
  email: email(values.email),
  password: password(values.password),
  confirmPassword: confirmPassword(values.password, values.confirmPassword),
}))

signupValidation({
  firstName: 'Tkachenko',
  lastName: 'Vladislav',
  email: 'ideal.life.generator@gmail.com',
  password: '12345678',
  confirmPassword: '12345678',
})

// Returning {}

signupValidation({
  firstName: '',
  lastName: 'V',
  email: 'ideal.life.generator',
  password: '1234567',
  confirmPassword: '123456789',
})

/*
  Returning {
    firstName: 'This field is required',
    lastName: 'Must be 2 characters or more',
    email: 'This email is invalid',
    password: 'Must be 8 characters or more',
    confirmPassword: 'Is a different password',
  }
*/
```
