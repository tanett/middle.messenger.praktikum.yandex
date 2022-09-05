import './style.css'
import SignInTmpl from './SignIn.hbs'
import Block from '../../utils/Block'
import { inputRules } from '../../utils/validationRules'

interface ISignIn {
  errorPasswordMessage: string;
  errorLoginMessage: string;
}

export class SignIn extends Block<ISignIn> {
  private loginInputValue: string = ''
  private passwordInputValue: string = ''
  private validationObject = {
    validLogin: true,
    validPassword: true,
  }

  constructor(props: ISignIn) {
    super('SignIn', props)
  }

//----------------------------------------------------------------------------------------------------------------------
  onSubmitClick(e: Event) {
    e.preventDefault()

    const data = {
      login: this.loginInputValue,
      password: this.passwordInputValue,
      validation: this.validationObject,
    }
    console.log('input data', data)
  }

//----------------------------------------------------------------------------------------------------------------------
  onSignUpClick() {
    window.location.pathname = '/signUp.html'
  }

  //----------------------------------------------------------------------------------------------------------------------
  onInputLoginHandler(e: Event): any {
    this.loginInputValue = ( e.target as HTMLInputElement ).value
  }

  onChangeLoginHandler(e: Event): any {

    this.loginInputValue = ( e.target as HTMLInputElement ).value
    this.validationObject.validLogin = !!this.loginInputValue.match(inputRules.login)
    if (!this.validationObject.validLogin) {
      this.setProps({
                      errorLoginMessage:
                        this.loginInputValue.trim() === ''
                          ? 'Обязательное поле'
                          : 'Логин может содержать только буквы и \'-\' ',
                    })
    } else {
      this.setProps({ errorLoginMessage: '' })
    }
  }

//----------------------------------------------------------------------------------------------------------------------

  onInputPasswordHandler(e: Event) {
    this.passwordInputValue = ( e.target as HTMLInputElement ).value
  }

  onChangePasswordHandler(e: Event): any {

    this.passwordInputValue = ( e.target as HTMLInputElement ).value
    this.validationObject.validPassword = this.passwordInputValue.trim() !== ''
    if (!this.validationObject.validPassword) {
      this.setProps({ errorPasswordMessage: 'Обязательное поле' })
    } else {
      this.setProps({ errorPasswordMessage: '' })
    }
  }

//----------------------------------------------------------------------------------------------------------------------
  render(): any {
    return this.compile(SignInTmpl, {
      onSubmitClick: ( (e: Event) => this.onSubmitClick(e) ).bind(this),
      onSignUpClick: this.onSignUpClick,
      onChangeLogin: ( (e: Event) => this.onChangeLoginHandler(e) ).bind(this),
      onChangePassword: ( (e: Event) => this.onChangePasswordHandler(e) ).bind(
        this,
      ),
      onInputLogin: ( (e: Event) => this.onInputLoginHandler(e) ).bind(this),
      onInputPassword: ( (e: Event) => this.onInputPasswordHandler(e) ).bind(
        this,
      ),
      loginValue: this.loginInputValue,
      errorLoginMessage: this.props.errorLoginMessage,
      errorPasswordMessage: this.props.errorPasswordMessage,
      passwordValue: this.passwordInputValue,
      children: this.children,
    })
  }
}
