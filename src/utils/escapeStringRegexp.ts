export const escapeStringRegexp = (string: String) =>
  string && string
    .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

export default escapeStringRegexp
