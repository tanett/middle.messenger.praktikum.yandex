import ProfileEditDataTmpl from './ProfileEditDataTmpl.hbs'
import './style.css'
import Block from '../../utils/Block'
import { inputRules } from '../../utils/validationRules'
import InputTextValidate from '../../components/InputTextValidate'


interface IProfileEditDataContent {
  login: string;
  email: string;
  name: string;
  secondName: string;
  displayName: string;
  phone: string;
  editMode: 'data' | 'password' | 'main';
  onGoBackToProfile: (e: Event)=>void
}

//----------------------------------------------------------------------------------------------------------------------
export class ProfileEditDataContent extends Block<IProfileEditDataContent> {
   constructor(props: IProfileEditDataContent) {
    super('ProfileEditDataContent', props)
  }


//----------------------------------------------------------------------------------------------------------------------
  onGoBackToProfileClick(e: Event) {
    this.props.onGoBackToProfile(e)
  }

//----------------------------------------------------------------------------------------------------------------------
  onSaveDataClick(e: Event) {
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
        })

  }
}
