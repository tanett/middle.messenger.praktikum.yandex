import './style.css'
import signUpTmpl from './signUpTmpl.hbs'
import Block from '../../utils/Block'
import { inputRules } from '../../utils/validationRules'
import InputTextValidate from '../../components/InputTextValidate'

import { ROUTES } from '../../index'
import AuthController from '../../controllers/AuthController'
import { SignupData } from '../../api/AuthAPI'


export class SignUp extends Block<{}> {
  static componentName: string = 'SignUp'
  private isValidForm: boolean = true

  constructor(props = {}) {
    super('SignUp', props)
    this.isValidForm = true
  }

  onSubmitClick(e: Event) {
    e.preventDefault()
    const inputs: SignupData = {
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      password: '',
      phone: '',
    }
    Object.values(this.children).forEach(child => {
      if (child.className === 'InputTextValidate') {

        // @ts-ignore
        inputs[child.meta.props.id as keyof SignupData] = ( child as InputTextValidate ).getValue()
        this.isValidForm = !( child as InputTextValidate ).isValid ? false : this.isValidForm

      }
    })

    if (this.isValidForm) {
      AuthController.signup(inputs)
    }
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
      emailValue: '',
      loginValue: '',
      passwordValue: '',
      submitPasswordValue: '',

      onSubmitClick: ( (e: Event) => this.onSubmitClick(e) ).bind(this),
      onSignInClick: this.onSignInClick,
      children: this.children,
    })
  }
}
