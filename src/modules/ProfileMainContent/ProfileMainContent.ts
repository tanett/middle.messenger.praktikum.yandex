import ProfileTmpl from './ProfileMainTmpl.hbs'
import './style.css'
import Block from '../../utils/Block'




interface IProfileMainContent  {
  login: string;
  email: string;
  name: string;
  secondName: string;
  displayName: string;
  phone: string;
  editMode: 'main';
  onEditDataClick: (e: Event)=>void
  onEditPasswordClick:(e: Event)=>void
}

//----------------------------------------------------------------------------------------------------------------------
export class ProfileMainContent extends Block<IProfileMainContent > {


  constructor(props: IProfileMainContent ) {
    super('ProfileMainContent', props)

  }

//----------------------------------------------------------------------------------------------------------------------
  onChangeDataClick(e: Event) {
 this.props.onEditDataClick(e)
  }

//----------------------------------------------------------------------------------------------------------------------
  onEditPasswordClick(e: Event) {
    console.log('pasww click')
 this.props.onEditPasswordClick( e )
  }

//----------------------------------------------------------------------------------------------------------------------
  onOutClick() {
    window.location.pathname = ''
    console.log('onOutClick')
  }


//----------------------------------------------------------------------------------------------------------------------
  render(): any {
    const { name, secondName, login, displayName, phone, email } = this.props


    return this.compile(ProfileTmpl, {
      name: name,
      firstNameValue: name,
      secondNameValue: secondName,
      phoneValue: phone,
      emailValue: email,
      loginValue: login,
      displayNameValue: displayName,
      children: this.children,
      onChangeClick: ( (e: Event) => this.props.onEditDataClick(e) ),
      onChangePasswClick: (e: Event) => this.onEditPasswordClick(e) ,
      onOutClick: () => this.onOutClick(),

    })
  }
}
