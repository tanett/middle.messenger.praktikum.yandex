import ProfileTmpl from './ProfileMainTmpl.hbs'
import './style.css'
import Block from '../../utils/Block'
import UserController from '../../controllers/UserController'


interface IProfileMainContent {
  avatar: string;
  login: string;
  email: string;
  name: string;
  secondName: string;
  displayName: string;
  phone: string;
  editMode: 'main';
  onEditDataClick: (e: Event) => void
  onEditPasswordClick: (e: Event) => void
  onOutClick: () => void
}


//----------------------------------------------------------------------------------------------------------------------
export class ProfileMainContent extends Block<IProfileMainContent> {
  static componentName: string = 'ProfileMainContent'
  private newAvatar: boolean = false

  constructor(props: IProfileMainContent) {
    super('ProfileMainContent', props)

  }

//----------------------------------------------------------------------------------------------------------------------
  onChangeDataClick(e: Event) {
    this.props.onEditDataClick(e)
  }

//----------------------------------------------------------------------------------------------------------------------
  onEditPasswordClick(e: Event) {
    console.log('pasww click')
    this.props.onEditPasswordClick(e)
  }

//----------------------------------------------------------------------------------------------------------------------
  onOutClick() {
    this.props.onOutClick()
    console.log('onOutClick')
  }

//----------------------------------------------------------------------------------------------------------------------
  onUploadAvatarClick(e: Event, file: File) {
    console.log('upload', file)

           UserController.changeUserAvatar(file)

        this.dispatchComponentDidUpdate()

  }


//----------------------------------------------------------------------------------------------------------------------
  render(): any {
    const { name, secondName, login, displayName, phone, email, avatar } = this.props


    return this.compile(ProfileTmpl, {
      newAvatar: this.newAvatar,
      pathAvatar: avatar,
      name: name,
      firstNameValue: name,
      secondNameValue: secondName,
      phoneValue: phone,
      emailValue: email,
      loginValue: login,
      displayNameValue: displayName,
      children: this.children,
      onChangeClick: ( (e: Event) => this.props.onEditDataClick(e) ),
      onChangePasswClick: (e: Event) => this.onEditPasswordClick(e),
      onOutClick: () => this.onOutClick(),
      onUploadAvatar: (e: Event, file: File) => this.onUploadAvatarClick(e,file) ,

    })
  }
}
