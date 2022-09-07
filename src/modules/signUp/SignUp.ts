import './style.css'
import signUpTmpl from './signUpTmpl.hbs'
import Block from '../../utils/Block'
import { inputRules } from '../../utils/validationRules'
import InputTextValidate from '../../components/InputTextValidate'

interface ISignUp {

}

export class SignUp extends Block<ISignUp> {
  private loginInputValue: string = ''
  private passwordInputValue: string = ''
  private emailInputValue: string = ''
  private firstNameInputValue: string = ''
  private secondNameInputValue: string = ''
  private phoneInputValue: string = ''
  private passwordSubmitInputValue: string = ''


  constructor(props: ISignUp) {
    super('SignUp', props)
  }

  onSubmitClick(e: Event) {
    e.preventDefault()
    const inputs:Record<string, string>= {}
    Object.values(this.children).forEach(child => {
      if (child.componentName === 'InputTextValidate') {
        // @ts-ignore
        inputs[ child.meta.props.id]= ( child as InputTextValidate ).getValue()
      }
    })
    console.log('input data', inputs)
  }

//----------------------------------------------------------------------------------------------------------------------

  onSignInClick() {
    window.location.pathname = '/signIn.html'
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

      firstNameValue: this.firstNameInputValue,
      secondNameValue: this.secondNameInputValue,
      phoneValue: this.phoneInputValue,
      emailValue: this.emailInputValue,
      loginValue: this.loginInputValue,
      passwordValue: this.passwordInputValue,
      submitPasswordValue: this.passwordSubmitInputValue,

      onSubmitClick: ( (e: Event) => this.onSubmitClick(e) ).bind(this),
      onSignInClick: this.onSignInClick,
      children: this.children,
    })
  }
}
