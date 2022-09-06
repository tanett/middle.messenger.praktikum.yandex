import './style.css'
import Block from '../../utils/Block'
import InputTextValidate from '../../components/InputTextValidate'
import ProfileEditPasswordTmpl from './ProfileEditPasswordTmpl.hbs'
import { inputRules } from '../../utils/validationRules'


interface IProfileEditPasswordComponent {
  password: string;
  editMode: 'data' | 'password' | 'main';
  onGoBackToProfile: (e: Event) => void
}

//----------------------------------------------------------------------------------------------------------------------
export class ProfileEditPasswordComponent extends Block<IProfileEditPasswordComponent> {

  private newPasswordInputValue: string = ''
  private oldPasswordValue: string = ''
  private passwordSubmitInputValue: string = ''

  constructor(props: IProfileEditPasswordComponent) {
    super('ProfileEditPasswordComponent', props)

  }

//----------------------------------------------------------------------------------------------------------------------
  onGoBackToProfileClick(e: Event) {
    this.props.onGoBackToProfile(e)
  }

//----------------------------------------------------------------------------------------------------------------------
  onSaveDataClick(e: Event) {
    e.preventDefault()
    const inputs: Record<string, string> = {}
    Object.values(this.children).forEach(child => {
      if (child.componentName === 'InputTextValidate') {
        // @ts-ignore
        inputs[child.meta.props.id] = ( child as InputTextValidate ).getValue()
      }
    })
    console.log('input data', inputs)
  }

//----------------------------------------------------------------------------------------------------------------------
  render(): any {

    return this.compile(ProfileEditPasswordTmpl, {
      oldPasswordValue: this.oldPasswordValue,
      errorOldPasswordMessage: 'Пароль не совпадает',
      oldPasswordPattern: this.props.password,
      newPasswordValue: this.newPasswordInputValue,
      errorNewPasswordMessage: 'Пароль должен содержать хотя бы одну цифру и заглавную букву. Длина 8-40 символов',
      newPasswordPattern: inputRules.password,
      errorSubmitPasswordMessage: 'Пароль должен содержать хотя бы одну цифру и заглавную букву. Длина 8-40 символов',
      submitPasswordPattern: inputRules.password,
      submitPasswordValue: this.passwordSubmitInputValue,
      children: this.children,
      onGoBackClick: (e: Event) => this.onGoBackToProfileClick(e),
      onSaveDataClick: ( (e: Event) => this.onSaveDataClick(e) ).bind(this),

    })
  }
}
