export type Errors = Error[]

export interface Error {
  type: string
  value: string
  msg: Msg
  path: string
  location: string
}

export interface Msg {
  message: string
  errorCode: number
}
