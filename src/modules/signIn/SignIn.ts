import './style.css'
import SignInTmpl from './SignIn.hbs'
import Block from '../../utils/Block'
import { inputRules } from '../../utils/validationRules'
import InputTextValidate from '../../components/InputTextValidate'
import AuthController from '../../controllers/AuthController'
import { SigninData } from '../../api/AuthAPI'
import { ROUTES } from '../../index'



export class SignIn extends Block<{}> {
  private loginInputValue: string = ''
  private passwordInputValue: string = ''
  static componentName: string='SignIn'

  constructor(props={}) {
    super('SignIn', props)
  }

  onSubmitClick(e: Event) {
    e.preventDefault()

    const inputs:SigninData = {
      login:'',
      password: ''
    }
    Object.values(this.children).forEach(child => {
      if (child.className === 'InputTextValidate') {
        // @ts-ignore
        inputs[ child.meta.props.id]= ( child as InputTextValidate ).getValue()
      }
    })
    AuthController.signin(inputs)
  }

//----------------------------------------------------------------------------------------------------------------------
  onSignUpClick(e: Event) {

    e.preventDefault()
    window.location.pathname = ROUTES.Signup
  }

//----------------------------------------------------------------------------------------------------------------------
  render(): any {
    return this.compile(SignInTmpl, {
      onSubmitClick: ( (e: Event) => this.onSubmitClick(e) ).bind(this),
      onSignUpClick: (e: Event) =>this.onSignUpClick(e),

      loginValue: '',
      loginPattern: inputRules.login,
      errorLoginMessage: 'Логин может содержать только буквы и \'-\' ',
      passwordPattern: inputRules.password,
      errorPasswordMessage: 'Пароль должен содержать хотя бы одну цифру и заглавную букву. Длина 8-40 символов',
      passwordValue: '',
      children: this.children,
    })
  }
}
