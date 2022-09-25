import './style.css'
import signUpTmpl from './signUpTmpl.hbs'
import Block from '../../utils/Block'
import { inputRules } from '../../utils/validationRules'
import InputTextValidate from '../../components/InputTextValidate'

import { ROUTES } from '../../index'



export class SignUp extends Block {
  static componentName: string='SignUp'

  constructor(props={}) {
    super('SignUp', props)
  }

  onSubmitClick(e: Event) {
    e.preventDefault()
    const inputs:Record<string, string>= {}
    Object.values(this.children).forEach(child => {
      if (child.className === 'InputTextValidate') {
        // @ts-ignore
        inputs[ child.meta.props.id]= ( child as InputTextValidate ).getValue()
      }
    })
    console.log('input data', inputs)
  }

//----------------------------------------------------------------------------------------------------------------------

  onSignInClick() {
    window.location.pathname = ROUTES.Home
  }

//----------------------------------------------------------------------------------------------------------------------
  render(): any {
    return this.compile(signUpTmpl, {
       phonePattern: inputRules.phone,
      emailPattern: inputRules.email,
      secondNamePattern: inputRules.secondName,
      loginPattern: inputRules.login,
      firstNamePattern: inputRules.firstName,
      passwordPattern: inputRules.password,
      submitPasswordPattern: inputRules.password,

      errorLoginMessage: 'Логин может содержать только буквы и \'-\' ',
      errorEmailMessage: 'Некорректный емайл',
      errorFirstNameMessage: 'Только буквы и "-".  Первая буква - заглавная',
      errorSecondNameMessage: 'Только буквы и "-".  Первая буква - заглавная',
      errorPhoneMessage: 'Длина 9-15 символов, только цмфры, может начинаться с +',
      errorNewPasswordMessage: 'Пароль должен содержать хотя бы одну цифру и заглавную букву. Длина 8-40 символов',
      errorSubmitPasswordMessage: 'Пароль должен содержать хотя бы одну цифру и заглавную букву. Длина 8-40 символов',

      firstNameValue: '',
      secondNameValue: '',
      phoneValue: '',
      emailValue:'',
      loginValue: '',
      passwordValue: '',
      submitPasswordValue: '',

      onSubmitClick: ( (e: Event) => this.onSubmitClick(e) ).bind(this),
      onSignInClick: this.onSignInClick,
      children: this.children,
    })
  }
}
