// eslint-disable-next-line no-unused-vars
declare namespace Express {
  export interface Request {
    file: {
      filename: string,
      name: string
    }
  }
}
