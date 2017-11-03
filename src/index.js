export default (...checks) => (value, ...options) => {
  for (let index = 0; index < checks.length; index += 1) {
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
  const checksResultKeys = Object.keys(checksResult)

  for (let index = 0; index < checksResultKeys.length; index += 1) {
    const { [index]: checkResultKey } = checksResultKeys
    const { [checkResultKey]: checkResult } = checksResult

    if (!checkResult) {
      delete checksResult[checkResultKey]
    }
  }

  if (Object.keys(checksResult).some(field => checksResult[field])) {
    return checksResult
  }

  return null
}
