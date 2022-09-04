export const nameRg=/^[A-ZА-ЯЁ]([a-zа-яё-])+$/
export const emailRg=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
export const loginRg=/^[A-Za-z][A-Za-z0-9_-]{2,19}$/
export const passwordRg =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
export const phoneRg=/^([+])?\d{9,15}$/

export const inputRules={
    firstName: nameRg,
    secondName: nameRg,
    login: loginRg,
    email: emailRg,
    phone: phoneRg,
    password: passwordRg
}
