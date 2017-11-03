export default (...checks) => (value, ...options) => {
  const { length } = checks

  for (let index = 0; index < length; index += 1) {
    const check = checks[index]
    const validatonResult = check(value, ...options)

    if (validatonResult) {
      return validatonResult
    }
  }

  return null
}

export const checkObject = check => (fields) => {
  const checksResult = check(fields)

  if (Object.keys(checksResult).some(field => checksResult[field] !== null)) {
    return checksResult;
  }

  return null;
}
