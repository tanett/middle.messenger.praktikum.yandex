import ProfileTmpl from './ProfileMainTmpl.hbs'
import './style.css'
import Block from '../../utils/Block'
import { ProfileEditDataContent } from '../ProfileEditContent/ProfileEditDataContent'
import { ProfileMainContent } from '../ProfileMainContent/ProfileMainContent'
import { ProfileEditPasswordComponent } from '../ProfileEditPasswordComponent/ProfileEditPasswordComponent'
import { ROUTES } from '../../index'


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
export class Profile extends Block {
  static componentName: string='Profile'
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


//----------------------------------------------------------------------------------------------------------------------
  onOutClick() {
    window.location.pathname = ROUTES.Home
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
