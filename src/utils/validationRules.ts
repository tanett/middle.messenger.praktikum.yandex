export const NAME_RG = /^[A-ZА-ЯЁ]([a-zа-яё-])+$/
export const EMAIL_RG = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
export const LOGIN_RG = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/
export const PASSWORD_RG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
export const PHONE_RG = /^([+])?\d{9,15}$/

export const inputRules = {
  firstName: NAME_RG,
  secondName: NAME_RG,
  login: LOGIN_RG,
  email: EMAIL_RG,
  phone: PHONE_RG,
  password: PASSWORD_RG,
}
