import './style.css'
import signUpTmpl from './signUpTmpl.hbs'
import Block from '../../utils/Block'
import { inputRules } from '../../utils/validationRules'

interface ISignUp {
  errorPasswordMessage: string;
  errorSubmitPasswordMessage: string;
  errorPhoneMessage: string;
  errorSecondNameMessage: string;
  errorFirstNameMessage: string;
  errorEmailMessage: string;
  errorLoginMessage: string;
}

export class SignUp extends Block<ISignUp> {
  private loginInputValue: string = ''
  private passwordInputValue: string = ''
  private emailInputValue: string = ''
  private firstNameInputValue: string = ''
  private secondNameInputValue: string = ''
  private phoneInputValue: string = ''
  private passwordSubmitInputValue: string = ''
  private validationObject = {
    validLogin: true,
    validPassword: true,
    validEmail: true,
    validFirstName: true,
    validSecondName: true,
    validPhone: true,
    validSubmitPassword: true,
  }

  constructor(props: ISignUp) {
    super('SignUp', props)
  }

  onSubmitClick(e: Event) {
    e.preventDefault()
    const data = {
      email: this.emailInputValue,
      login: this.loginInputValue,
      firstName: this.firstNameInputValue,
      secondName: this.secondNameInputValue,
      phone: this.phoneInputValue,
      password: this.passwordInputValue,
      submitPassword: this.passwordSubmitInputValue,
    }

    console.log('input data', data)
  }

//----------------------------------------------------------------------------------------------------------------------

  onSignInClick() {
    window.location.pathname = '/signIn.html'
  }

//----------------------------------------------------------------------------------------------------------------------
  onInputLoginHandler(e: Event): any {
    this.loginInputValue = ( e.target as HTMLInputElement ).value
  }

  onChangeLoginHandler(e: Event): any {
    // @ts-ignore
    this.loginInputValue = e.target?.value
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
    this.validationObject.validPassword = !!this.passwordInputValue.match(inputRules.password)
    if (!this.validationObject.validPassword) {
      this.setProps({
                      errorPasswordMessage:
                        'Пароль должен содержать хотя бы одну цифру и заглавную букву. Длина 8-40 символов',
                    })
    } else {
      this.setProps({ errorPasswordMessage: '' })
    }
  }

//----------------------------------------------------------------------------------------------------------------------

  onInputSubmitPasswordHandler(e: Event) {
    this.passwordSubmitInputValue = ( e.target as HTMLInputElement ).value
  }

  onChangeSubmitPasswordHandler(e: Event): any {
    this.passwordSubmitInputValue = ( e.target as HTMLInputElement ).value
    this.validationObject.validSubmitPassword =
      this.passwordSubmitInputValue.trim() === this.passwordInputValue.trim()
    if (!this.validationObject.validSubmitPassword) {
      this.setProps({ errorSubmitPasswordMessage: 'Пароль не совпадает' })
    } else {
      this.setProps({ errorSubmitPasswordMessage: '' })
    }
  }

//----------------------------------------------------------------------------------------------------------------------
  onInputEmailHandler(e: Event) {
    this.emailInputValue = ( e.target as HTMLInputElement ).value
  }

  onChangeEmailHandler(e: Event): any {
    this.emailInputValue = ( e.target as HTMLInputElement ).value
    this.validationObject.validEmail = !!this.emailInputValue.match(
      inputRules.email,
    )
    if (!this.validationObject.validEmail) {

      this.setProps({ errorEmailMessage: ( e.target as HTMLInputElement ).validationMessage })
    } else {
      this.setProps({ errorEmailMessage: '' })
    }
  }

//----------------------------------------------------------------------------------------------------------------------
  onInputFirstNameHandler(e: Event) {
    this.firstNameInputValue = ( e.target as HTMLInputElement ).value
  }

  onChangeFirstNameHandler(e: Event) {

    this.firstNameInputValue = ( e.target as HTMLInputElement ).value
    this.validationObject.validFirstName = !!this.firstNameInputValue.match(
      inputRules.firstName,
    )
    if (!this.validationObject.validFirstName) {
      this.setProps({
                      errorFirstNameMessage: 'Только буквы и "-". Первая буква - заглавная',
                    })
    } else {
      this.setProps({ errorFirstNameMessage: '' })
    }
  }

//----------------------------------------------------------------------------------------------------------------------
  onInputSecondNameHandler(e: Event) {
    this.secondNameInputValue = ( e.target as HTMLInputElement ).value
  }

  onChangeSecondNameHandler(e: Event) {

    this.secondNameInputValue = ( e.target as HTMLInputElement ).value
    this.validationObject.validSecondName = !!this.secondNameInputValue.match(
      inputRules.secondName,
    )
    if (!this.validationObject.validSecondName) {
      this.setProps({
                      errorSecondNameMessage: 'Только буквы и "-".  Первая буква - заглавная',
                    })
    } else {
      this.setProps({ errorSecondNameMessage: '' })
    }
  }

//----------------------------------------------------------------------------------------------------------------------
  onInputPhoneHandler(e: Event) {
    this.phoneInputValue = ( e.target as HTMLInputElement ).value
  }

  onChangePhoneHandler(e: Event) {
    this.phoneInputValue = ( e.target as HTMLInputElement ).value
    this.validationObject.validPhone = !!this.phoneInputValue.match(
      inputRules.phone,
    )
    if (!this.validationObject.validPhone) {
      this.setProps({
                      errorPhoneMessage:
                        'Длина 9-15 символов, только цмфры, может начинаться с +',
                    })
    } else {
      this.setProps({ errorPhoneMessage: '' })
    }
  }

//----------------------------------------------------------------------------------------------------------------------
  render(): any {
    return this.compile(signUpTmpl, {
      onInputLogin: ( (e: Event) => this.onInputLoginHandler(e) ).bind(this),
      onChangeLogin: ( (e: Event) => this.onChangeLoginHandler(e) ).bind(this),
      onInputPassword: ( (e: Event) => this.onInputPasswordHandler(e) ).bind(this),
      onChangePassword: ( (e: Event) => this.onChangePasswordHandler(e) ).bind(this),
      onInputEmail: ( (e: Event) => this.onInputEmailHandler(e) ).bind(this),
      onChangeEmail: ( (e: Event) => this.onChangeEmailHandler(e) ).bind(this),
      onInputFirstName: ( (e: Event) => this.onInputFirstNameHandler(e) ).bind(this),
      onChangeFirstName: ( (e: Event) => this.onChangeFirstNameHandler(e) ).bind(this),
      onInputSecondName: ( (e: Event) => this.onInputSecondNameHandler(e) ).bind(this),
      onChangeSecondName: ( (e: Event) => this.onChangeSecondNameHandler(e) ).bind(this),
      onInputPhone: ( (e: Event) => this.onInputPhoneHandler(e) ).bind(this),
      onChangePhone: ( (e: Event) => this.onChangePhoneHandler(e) ).bind(this),
      onInputSubmitPassword: ( (e: Event) => this.onInputSubmitPasswordHandler(e) ).bind(this),
      onChangeSubmitPassword: ( (e: Event) => this.onChangeSubmitPasswordHandler(e) ).bind(this),
      firstNameValue: this.firstNameInputValue,
      secondNameValue: this.secondNameInputValue,
      phoneValue: this.phoneInputValue,
      emailValue: this.emailInputValue,
      loginValue: this.loginInputValue,
      passwordValue: this.passwordInputValue,
      submitPasswordValue: this.passwordSubmitInputValue,
      errorLoginMessage: this.props.errorLoginMessage,
      errorEmailMessage: this.props.errorEmailMessage,
      errorFirstNameMessage: this.props.errorFirstNameMessage,
      errorSecondNameMessage: this.props.errorSecondNameMessage,
      errorPhoneMessage: this.props.errorPhoneMessage,
      errorSubmitPasswordMessage: this.props.errorSubmitPasswordMessage,
      errorPasswordMessage: this.props.errorPasswordMessage,

      onSubmitClick: ( (e: Event) => this.onSubmitClick(e) ).bind(this),
      onSignInClick: this.onSignInClick,
      children: this.children,
    })
  }
}
