import ProfileEditDataTmpl from './ProfileEditDataTmpl.hbs'
import './style.css'
import Block from '../../utils/Block'
import { inputRules } from '../../utils/validationRules'
import InputTextValidate from '../../components/InputTextValidate'
import UserController from '../../controllers/UserController'


interface IProfileEditDataContent {
  errorMessage: string
  login: string;
  email: string;
  name: string;
  secondName: string;
  displayName: string;
  phone: string;
  editMode: 'data' | 'password' | 'main';
  onGoBackToProfile: (e: Event) => void
}

//----------------------------------------------------------------------------------------------------------------------
export class ProfileEditDataContent extends Block<IProfileEditDataContent> {
  static componentName: string = 'ProfileEditDataContent'

  constructor(props: { onGoBackToProfile: (e: Event) => void; phone: string; displayName: string; editMode: string; name: string; login: string; email: string; secondName: string }) {
    super('ProfileEditDataContent', props)
    this.setProps({ errorMessage: '' })
  }


//----------------------------------------------------------------------------------------------------------------------
  onGoBackToProfileClick(e: Event) {
    this.props.onGoBackToProfile(e)
  }

//----------------------------------------------------------------------------------------------------------------------
  onSaveDataClick(e: Event) {
    e.preventDefault()
    let isValid = true
    const inputs = {}
    Object.values(this.children).forEach(child => {
      if (child.className === 'InputTextValidate') {
        // @ts-ignore
        inputs[child.meta.props.id] = ( child as unknown as InputTextValidate ).getValue()
        isValid = ( child as unknown as InputTextValidate ).isValid() ? isValid : false
      }
    })

    if (isValid) {
      // @ts-ignore
      UserController.changeUserProfile(inputs)
        .then(res => {
          if (res.reason) {
            this.setProps({ errorMessage: res.reason })
          } else {
            this.setProps({ errorMessage: '' })
            this.onGoBackToProfileClick(e)
          }
        })
        .catch(error => console.log(error))

    }

  }

//----------------------------------------------------------------------------------------------------------------------
  render(): any {
    return this.compile(ProfileEditDataTmpl, {
      phonePattern: inputRules.phone,
      emailPattern: inputRules.email,
      displayNamePattern: inputRules.login,
      secondNamePattern: inputRules.secondName,
      loginPattern: inputRules.login,
      firstNamePattern: inputRules.firstName,

      firstNameValue: this.props.name,
      secondNameValue: this.props.secondName,
      phoneValue: this.props.phone,
      emailValue: this.props.email,
      loginValue: this.props.login,
      displayNameValue: this.props.displayName,
      errorLoginMessage: 'Логин может содержать только буквы и \'-\' ',
      errorEmailMessage: 'Некорректный емайл',
      errorFirstNameMessage: 'Только буквы и "-".  Первая буква - заглавная',
      errorSecondNameMessage: 'Только буквы и "-".  Первая буква - заглавная',
      errorPhoneMessage: 'Длина 9-15 символов, только цмфры, может начинаться с +',
      errorDisplayNameMessage: 'Только буквы и "-".  Первая буква - заглавная',
      children: this.children,
      onGoBackClick: (e: Event) => this.onGoBackToProfileClick(e),
      onSaveDataClick: ( (e: Event) => this.onSaveDataClick(e) ).bind(this),
      errorMessage: this.props.errorMessage,
    })

  }
}
