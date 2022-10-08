import ProfileTmpl from './ProfileMainTmpl.hbs'
import './style.css'
import Block from '../../utils/Block'
import { ProfileEditDataContent } from '../ProfileEditContent/ProfileEditDataContent'
import { ProfileMainContent } from '../ProfileMainContent/ProfileMainContent'
import { ProfileEditPasswordComponent } from '../ProfileEditPasswordComponent/ProfileEditPasswordComponent'
import { ROUTES } from '../../index'
import store from '../../utils/Store'
import { User } from '../../api/AuthAPI'
import AuthController from '../../controllers/AuthController'


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
  static componentName: string = 'Profile'
  private userData: User

  constructor(props: IProfile) {
    super('Profile', props)
    this.userData = store.getState()
    console.log(store)
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

    AuthController.logout()
    console.log('onOutClick')
  }

  private chooseContent(editMode: string) {
    const userData: User = store.getState().user
    switch (editMode) {
      case 'data':
        return new ProfileEditDataContent({

                                            login: userData.login,
                                            email: userData.email,
                                            name: userData.first_name,
                                            secondName: userData.second_name,
                                            displayName: userData.display_name,
                                            phone: userData.phone,
                                            editMode: 'data',
                                            onGoBackToProfile: (e: Event) => this.onGoBackToProfileClick(e),
                                          })
      case 'password':
        return new ProfileEditPasswordComponent({

                                                  password: this.userData.password,
                                                  editMode: 'password',
                                                  onGoBackToProfile: (e: Event) => this.onGoBackToProfileClick(e),
                                                })
      default:
        return new ProfileMainContent({
          avatar: userData.avatar,
                                        login: userData.login,
                                        email: userData.email,
                                        name: userData.first_name,
                                        secondName: userData.second_name,
                                        displayName: userData.display_name,
                                        phone: userData.phone,
                                        editMode: 'main',
                                        onEditDataClick: ( (e: Event) => this.onChangeDataClick(e) ).bind(this),
                                        onEditPasswordClick: ( (e: Event) => this.onEditPasswordClick(e) ).bind(this),
                                        onOutClick: () => this.onOutClick(),
                                      })
    }
  }


//----------------------------------------------------------------------------------------------------------------------
  render(): any {

    const content = this.chooseContent(this.props.editMode)
    const userData = store.getState().user
    // @ts-ignore
    this.children.content = content

    return this.compile(ProfileTmpl, {
      name: userData.first_name,
      firstNameValue: userData.first_name,
      secondNameValue: userData.second_name,
      phoneValue: userData.phone,
      emailValue: userData.email,
      loginValue: userData.login,
      displayNameValue: userData.display_name,
      children: this.children,
      onChangeClick: ( (e: Event) => this.onChangeDataClick(e) ),
      onChangePasswClick: ( (e: Event) => this.onEditPasswordClick(e) ).bind(this),
      onOutClick: () => this.onOutClick(),

    })
  }
}
