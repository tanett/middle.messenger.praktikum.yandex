import './style.css'
import SignInTmpl from './SignIn.hbs'
import Block from '../../utils/Block'
import { inputRules } from '../../utils/validationRules'
import InputTextValidate from '../../components/InputTextValidate'

interface ISignIn {}

export class SignIn extends Block<ISignIn> {
  private loginInputValue: string = ''
  private passwordInputValue: string = ''


  constructor(props: ISignIn) {
    super('SignIn', props)
  }

//----------------------------------------------------------------------------------------------------------------------
  onSubmitClick(e: Event) {
    e.preventDefault()

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
  onSignUpClick() {
    window.location.pathname = '/signUp.html'
  }

//----------------------------------------------------------------------------------------------------------------------
  render(): any {
    return this.compile(SignInTmpl, {
      onSubmitClick: ( (e: Event) => this.onSubmitClick(e) ).bind(this),
      onSignUpClick: this.onSignUpClick,

      loginValue: this.loginInputValue,
      loginPattern: inputRules.login,
      errorLoginMessage: 'Логин может содержать только буквы и \'-\' ',
      passwordPattern: inputRules.password,
      errorPasswordMessage: 'Пароль должен содержать хотя бы одну цифру и заглавную букву. Длина 8-40 символов',
      passwordValue: this.passwordInputValue,
      children: this.children,
    })
  }
}
