import ProfileTmpl from './ProfileMainTmpl.hbs'
import './style.css'
import Block from '../../utils/Block'
import { ProfileEditDataContent } from '../ProfileEditContent/ProfileEditDataContent'
import { ProfileMainContent } from '../ProfileMainContent/ProfileMainContent'
import { ProfileEditPasswordComponent } from '../ProfileEditPasswordComponent/ProfileEditPasswordComponent'


interface IProfile {
  login: string;
  email: string;
  name: string;
  secondName: string;
  displayName: string;
  phone: string;
  password: string;
  editMode: 'data' | 'password' | 'main';
  errorDisplayNameMessage: string;
  errorPhoneMessage: string;
  errorSecondNameMessage: string;
  errorFirstNameMessage: string;
  errorEmailMessage: string;
  errorLoginMessage: string;
  errorOldPasswordMessage: string;
  errorNewPasswordMessage: string;
  errorSubmitPasswordMessage: string;
}

//----------------------------------------------------------------------------------------------------------------------
export class Profile extends Block<IProfile> {

  constructor(props: IProfile) {
    super('Profile', props)

  }

//----------------------------------------------------------------------------------------------------------------------
  onChangeDataClick(e: Event) {
    this.setProps({ editMode: 'data' })
    console.log('click edit', this.props.editMode)
  }

//----------------------------------------------------------------------------------------------------------------------
  onEditPasswordClick(e: Event) {
    this.setProps({ editMode: 'password' })
    console.log('click passw', this.props.editMode)
  }

//----------------------------------------------------------------------------------------------------------------------
  onGoBackToProfileClick(e: Event) {
    this.setProps({ editMode: 'main' })
  }

// //----------------------------------------------------------------------------------------------------------------------
//   onInputLoginHandler(e: Event): any {
//     this.loginInputValue = ( e.target as HTMLInputElement ).value
//
//   }
//
//   onChangeLoginHandler(e: Event): any {
//     this.loginInputValue = ( e.target as HTMLInputElement ).value
//     this.validationObject.validLogin = !!this.loginInputValue.match(inputRules.login)
//     if (!this.validationObject.validLogin) {
//       this.setProps({
//                       errorLoginMessage:
//                         this.loginInputValue.trim() === ''
//                           ? 'Обязательное поле'
//                           : 'Логин может содержать только буквы и \'-\' ',
//                     })
//     } else {
//       this.setProps({ errorLoginMessage: '' })
//     }
//   }
//
// //----------------------------------------------------------------------------------------------------------------------
//   onInputDisplayNameHandler(e: Event): void {
//     this.displayNameInputValue = ( e.target as HTMLInputElement ).value
//   }
//
//   onChangeDisplayNameHandler(e: Event): void {
//     this.displayNameInputValue = ( e.target as HTMLInputElement ).value
//     this.validationObject.validDisplayName = true
//   }
//
// //----------------------------------------------------------------------------------------------------------------------
//
//   onInputOldPasswordHandler(e: Event) {
//     this.oldPasswordValue = ( e.target as HTMLInputElement ).value
//   }
//
//   onChangeOldPasswordHandler(e: Event): void {
//
//     this.oldPasswordValue = ( e.target as HTMLInputElement ).value
//     this.validationObject.validOldPassword =
//       this.oldPasswordValue === this.props.password
//     if (!this.validationObject.validOldPassword) {
//       this.setProps({ errorOldPasswordMessage: 'Пароль не подходит' })
//     } else {
//       this.setProps({ errorOldPasswordMessage: '' })
//     }
//   }
//
// //----------------------------------------------------------------------------------------------------------------------
//   onInputNewPasswordHandler(e: Event) {
//     this.newPasswordInputValue = ( e.target as HTMLInputElement ).value
//   }
//
//   onChangeNewPasswordHandler(e: Event): any {
//
//     this.newPasswordInputValue = ( e.target as HTMLInputElement ).value
//     this.validationObject.validPassword = !!this.newPasswordInputValue.match(
//       inputRules.password,
//     )
//     if (!this.validationObject.validPassword) {
//       this.setProps({
//                       errorNewPasswordMessage:
//                         'Пароль должен содержать хотя бы одну цифру и заглавную букву. Длина 8-40 символов',
//                     })
//     } else {
//       this.setProps({ errorNewPasswordMessage: '' })
//     }
//   }
//
// //----------------------------------------------------------------------------------------------------------------------
//   onInputSubmitPasswordHandler(e: Event) {
//     this.passwordSubmitInputValue = ( e.target as HTMLInputElement ).value
//   }
//
//   onChangeSubmitPasswordHandler(e: Event): any {
//     this.passwordSubmitInputValue = ( e.target as HTMLInputElement ).value
//     this.validationObject.validSubmitPassword =
//       this.passwordSubmitInputValue.trim() ===
//       this.newPasswordInputValue.trim()
//     if (!this.validationObject.validSubmitPassword) {
//       this.setProps({ errorSubmitPasswordMessage: 'Пароль не совпадает' })
//     } else {
//       this.setProps({ errorSubmitPasswordMessage: '' })
//     }
//   }
//
// //----------------------------------------------------------------------------------------------------------------------
//   onInputEmailHandler(e: Event) {
//     this.emailInputValue = ( e.target as HTMLInputElement ).value
//   }
//
//   onChangeEmailHandler(e: Event): any {
//     this.emailInputValue = ( e.target as HTMLInputElement ).value
//     this.validationObject.validEmail = !!this.emailInputValue.match(inputRules.email)
//     if (!this.validationObject.validEmail) {
//       this.setProps({ errorEmailMessage: ( e.target as HTMLInputElement ).validationMessage })
//     } else {
//       this.setProps({ errorEmailMessage: '' })
//     }
//   }
//
// //----------------------------------------------------------------------------------------------------------------------
//   onInputFirstNameHandler(e: Event) {
//     this.firstNameInputValue = ( e.target as HTMLInputElement ).value
//   }
//
//   onChangeFirstNameHandler(e: Event) {
//     this.firstNameInputValue = ( e.target as HTMLInputElement ).value
//     this.validationObject.validFirstName = !!this.firstNameInputValue.match(inputRules.firstName)
//     if (!this.validationObject.validFirstName) {
//       this.setProps({
//                       errorFirstNameMessage: 'Только буквы и "-". Первая буква - заглавная',
//                     })
//     } else {
//       this.setProps({ errorFirstNameMessage: '' })
//     }
//   }
//
// //----------------------------------------------------------------------------------------------------------------------
//   onInputSecondNameHandler(e: Event) {
//     this.secondNameInputValue = ( e.target as HTMLInputElement ).value
//   }
//
//   onChangeSecondNameHandler(e: Event) {
//     this.secondNameInputValue = ( e.target as HTMLInputElement ).value
//     this.validationObject.validSecondName = !!this.secondNameInputValue.match(inputRules.secondName)
//     if (!this.validationObject.validSecondName) {
//       this.setProps({
//                       errorSecondNameMessage: 'Только буквы и "-".  Первая буква - заглавная',
//                     })
//     } else {
//       this.setProps({ errorSecondNameMessage: '' })
//     }
//   }
//
// //----------------------------------------------------------------------------------------------------------------------
//   onInputPhoneHandler(e: Event) {
//     this.phoneInputValue = ( e.target as HTMLInputElement ).value
//   }
//
//   onChangePhoneHandler(e: Event) {
//     this.phoneInputValue = ( e.target as HTMLInputElement ).value
//     this.validationObject.validPhone = !!this.phoneInputValue.match(inputRules.phone)
//     if (!this.validationObject.validPhone) {
//       this.setProps({
//                       errorPhoneMessage:
//                         'Длина 9-15 символов, только цмфры, может начинаться с +',
//                     })
//     } else {
//       this.setProps({ errorPhoneMessage: '' })
//     }
//   }
//
// //----------------------------------------------------------------------------------------------------------------------
//   onSaveDataClick(e: Event) {
//     e.preventDefault()
//     const inputs:Record<string, string>= {}
//     Object.values(this.children).forEach(child => {
//       if (child.componentName === 'InputTextValidate') {
//         // @ts-ignore
//         inputs[ child.meta.props.id]= ( child as InputTextValidate ).getValue()
//       }
//     })
//     console.log('input data', inputs)
//   }
//
// //----------------------------------------------------------------------------------------------------------------------
//   onSaveNewPasswordClick(e: Event) {
//     e.preventDefault()
//     const inputs:Record<string, string>= {}
//     Object.values(this.children).forEach(child => {
//       if (child.componentName === 'InputTextValidate') {
//         // @ts-ignore
//         inputs[ child.meta.props.id]= ( child as InputTextValidate ).getValue()
//       }
//     })
//     console.log('input data', inputs)
//   }

//----------------------------------------------------------------------------------------------------------------------
  onOutClick() {
    window.location.pathname = ''
    console.log('onOutClick')
  }

  private chooseContent(editMode: string) {
    switch (editMode) {
      case 'data':
        return new ProfileEditDataContent({
                                            login: this.props.login,
                                            email: this.props.email,
                                            name: this.props.name,
                                            secondName: this.props.secondName,
                                            displayName: this.props.displayName,
                                            phone: this.props.phone,
                                            editMode: 'data',
                                            onGoBackToProfile: (e: Event) => this.onGoBackToProfileClick(e),
                                          })
      case 'password':
        return new ProfileEditPasswordComponent({
                                                  password: this.props.password,
                                                  editMode: 'password',
                                                  onGoBackToProfile: (e: Event) => this.onGoBackToProfileClick(e),
                                                })
      default:
        return new ProfileMainContent({
                                        login: this.props.login,
                                        email: this.props.email,
                                        name: this.props.name,
                                        secondName: this.props.secondName,
                                        displayName: this.props.displayName,
                                        phone: this.props.phone,
                                        editMode: 'main',
                                        onEditDataClick: ( (e: Event) => this.onChangeDataClick(e) ).bind(this),
                                        onEditPasswordClick: ( (e: Event) => this.onEditPasswordClick(e) ).bind(this),
                                      })
    }
  }


//----------------------------------------------------------------------------------------------------------------------
  render(): any {
    const { name, secondName, login, displayName, phone, email } = this.props
    const content = this.chooseContent(this.props.editMode)

    // @ts-ignore
    this.children.content = content

    return this.compile(ProfileTmpl, {
      name: name,
      firstNameValue: name,
      secondNameValue: secondName,
      phoneValue: phone,
      emailValue: email,
      loginValue: login,
      displayNameValue: displayName,
      children: this.children,
      onChangeClick: ( (e: Event) => this.onChangeDataClick(e) ),
      onChangePasswClick: ( (e: Event) => this.onEditPasswordClick(e) ).bind(this),
      onOutClick: () => this.onOutClick(),

    })
  }
}
