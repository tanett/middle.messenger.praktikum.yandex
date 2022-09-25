import './style.css'
import SignInTmpl from './SignIn.hbs'
import Block from '../../utils/Block'
import { inputRules } from '../../utils/validationRules'
import InputTextValidate from '../../components/InputTextValidate'
import ButtonLink from '../../components/ButtonLink'
import Button from '../../components/Button'
import { ROUTES } from '../../index'



export class SignIn extends Block {
  private loginInputValue: string = ''
  private passwordInputValue: string = ''
  static componentName: string='SignIn'

  constructor(props={}) {
    super('SignIn', props)
  }
  //
  // protected init() {
  //   this.children.btnLink = new ButtonLink({
  //                                            text: "Нет аккаунта?",
  //                                            classNames: "buttonLink_center",
  //                                            id: "onSignUp",
  //                                            onClick: this.onSignUpClick
  //                                          })
  //
  //   this.children.onSubmitBtn = new Button({
  //                                            text: 'Войти',
  //                                            classNames:'button_primary',
  //                                            type: 'submit',
  //                                            id:'signInSubmitBtn',
  //                                            onClick:( (e: Event) => this.onSubmitClick(e) ).bind(this)
  //                                          })
  // }
//----------------------------------------------------------------------------------------------------------------------
  onSubmitClick(e: Event) {
    e.preventDefault()

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
  onSignUpClick() {
    window.location.pathname = ROUTES.Signup
  }

//----------------------------------------------------------------------------------------------------------------------
  render(): any {
    return this.compile(SignInTmpl, {
      onSubmitClick: ( (e: Event) => this.onSubmitClick(e) ).bind(this),
      onSignUpClick: this.onSignUpClick,

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
