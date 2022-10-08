import './style.css'
import Block from '../../utils/Block'
import InputTextValidate from '../../components/InputTextValidate'
import ProfileEditPasswordTmpl from './ProfileEditPasswordTmpl.hbs'
import { inputRules } from '../../utils/validationRules'
import UserController from '../../controllers/UserController'


interface IProfileEditPasswordComponent {

  password: string;
  editMode: 'data' | 'password' | 'main';
  onGoBackToProfile: (e: Event) => void
}

//----------------------------------------------------------------------------------------------------------------------
export class ProfileEditPasswordComponent extends Block<IProfileEditPasswordComponent> {
  static componentName: string = 'ProfileEditPasswordComponent'
  private newPasswordInputValue: string = ''
  private oldPasswordValue: string = ''
  private passwordSubmitInputValue: string = ''
  private errorSubmitPasswordMessage: string = 'Пароли не совпадают'

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
    let isValid = true

    const inputs = { oldPassword: null, newPassword: null, retryPassword: null }
    Object.values(this.children).forEach(child => {
      if (child.className === 'InputTextValidate') {
        // @ts-ignore
        inputs[child.meta.props.id] = ( child as InputTextValidate ).getValue()
        isValid = ( child as unknown as InputTextValidate ).isValid() ? isValid : false
      }
    })

    isValid = inputs.newPassword === inputs.retryPassword ? isValid : false
    if(inputs.newPassword === inputs.retryPassword) {
      this.errorSubmitPasswordMessage = ''
    } else {
      this.errorSubmitPasswordMessage = "Пароли не совпадают"
    }
    this.dispatchComponentDidUpdate()
    console.log('input data', inputs, isValid)
    if (isValid) {
      // @ts-ignore
      UserController.changeUserPassword({ oldPassword: inputs.oldPassword, newPassword: inputs.newPassword })
        .catch(error => console.log(error))
      this.onGoBackToProfileClick(e)
    }
  }

//----------------------------------------------------------------------------------------------------------------------
  render(): any {

    return this.compile(ProfileEditPasswordTmpl, {
      oldPasswordValue: '',
      errorOldPasswordMessage: '',
      oldPasswordPattern: inputRules.password,
      newPasswordValue: this.newPasswordInputValue,
      errorNewPasswordMessage: 'Пароль должен содержать хотя бы одну цифру и заглавную букву. Длина 8-40 символов',
      newPasswordPattern: inputRules.password,
      errorSubmitPasswordMessage: this.errorSubmitPasswordMessage,
      submitPasswordPattern: this.passwordSubmitInputValue,
      submitPasswordValue: this.passwordSubmitInputValue,
      children: this.children,
      onGoBackClick: (e: Event) => this.onGoBackToProfileClick(e),
      onSaveDataClick: ( (e: Event) => this.onSaveDataClick(e) ).bind(this),

    })
  }
}
