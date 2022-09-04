import  ProfileTmpl  from './ProfileMainTmpl.hbs'
import  ProfileEditDataTmpl  from './ProfileEditDataTmpl.hbs'
import  ProfileEditPasswordTmpl  from './ProfileEditPasswordTmpl.hbs'
import './style.css'
import Block from '../../utils/Block';
import { inputRules } from '../../utils/validationRules';

// type typeProfile = {
//     inputsList: {
//         id: string,
//         name: string,
//         type: 'text' | 'email',
//         label: string,
//         placeholder: string,
//         errorMessage: string,
//         disabled: boolean
//         events: { onFocus: (e: Event) => void, onBlur: (e: Event) => void, }
//     }[],
//     inputsListPassword: {
//         id: string,
//         name: string,
//         type: 'password',
//         label: string,
//         placeholder: string,
//         errorMessage: string,
//         disabled: boolean,
//         events: { onFocus: (e: Event) => void, onBlur: (e: Event) => void, }
//     }[],
//     btnList: {
//         id: 'changePassw',
//         text: 'Изменить пароль',
//         classNames: 'buttonLink',
//         events: { onClick: (e: Event) => void }
//     }[],
//     inputName: HTMLElement
//
// }

interface IProfile {
    login: string,
    email: string,
    name: string,
    secondName: string,
    displayName: string,
    phone: string,
    password: string,
   editMode: 'data' | 'password' | 'main'
}
//----------------------------------------------------------------------------------------------------------------------
export class Profile extends Block {

    private loginInputValue: string = '';
    private newPasswordInputValue: string =''
    private oldPasswordValue: string = '';
    private emailInputValue: string = '';
    private firstNameInputValue: string = '';
    private secondNameInputValue: string = '';
    private phoneInputValue: string = '';
    private passwordSubmitInputValue: string = '';
    private displayNameInputValue: string = '';
    private validationObject = {
        validLogin: true,
        validPassword: true,
        validEmail: true,
        validFirstName: true,
        validSecondName: true,
        validPhone: true,
        validSubmitPassword: true,
        validDisplayName: true,
        validOldPassword: true
    }


    constructor(props: IProfile) {
        super('Profile', props);
     this.loginInputValue= props.login;
     this.emailInputValue=props.email;
     this.firstNameInputValue=props.name;
     this.secondNameInputValue=props.secondName;
     this.phoneInputValue=props.phone;
     this.displayNameInputValue=props.displayName;

        }
//----------------------------------------------------------------------------------------------------------------------
    onChangeDataClick(e: Event){
        this.setProps({ editMode: 'data'})
}
//----------------------------------------------------------------------------------------------------------------------
    onEditPasswordClick(e: Event){
        this.setProps({ editMode: 'password'})
    }
    //----------------------------------------------------------------------------------------------------------------------
    onGoBackToProfileClick(e: Event){
        this.setProps({ editMode: 'main'})

    }
//----------------------------------------------------------------------------------------------------------------------
    onInputLoginHandler(e: Event): any {
// @ts-ignore
        this.loginInputValue = e.target?.value
        // this.setProps({errorLoginMessage: ""})

    }

    onChangeLoginHandler(e: Event): any {

        // @ts-ignore
        this.loginInputValue = e.target?.value
        this.validationObject.validLogin = !!this.loginInputValue.match(inputRules.login);
        if (!this.validationObject.validLogin) {
            this.setProps({ errorLoginMessage: this.loginInputValue.trim() === '' ? 'Обязательное поле' : 'Логин может содержать только буквы и \'-\' ' })
        } else { this.setProps({ errorLoginMessage: '' })}

    }
//----------------------------------------------------------------------------------------------------------------------
    onInputDisplayNameHandler(e: Event): any {
// @ts-ignore
        this.displayNameInputValue = e.target?.value
        // this.setProps({errorLoginMessage: ""})

    }

    onChangeDisplayNameHandler(e: Event): any {

        // @ts-ignore
        this.displayNameInputValue = e.target?.value
        this.validationObject.validDisplayName = true
        // if (!this.validationObject.validLogin) {
        //     this.setProps({ errorLoginMessage: this.loginInputValue.trim() === '' ? 'Обязательное поле' : 'Логин может содержать только буквы и \'-\' ' })
        // } else { this.setProps({ errorLoginMessage: '' })}

    }
    //----------------------------------------------------------------------------------------------------------------------

    onInputOldPasswordHandler(e: Event) {
// @ts-ignore
        this.oldPasswordValue = e.target?.value

    }

    onChangeOldPasswordHandler(e: Event): any {

        // @ts-ignore
        this.oldPasswordValue = e.target?.value
        this.validationObject.validOldPassword = (this.oldPasswordValue === this.props.password)
        if (!this.validationObject.validOldPassword) {
            this.setProps({ errorOldPasswordMessage: 'Пароль не подходит' })
        } else { this.setProps({ errorOldPasswordMessage: '' })}

    }
//----------------------------------------------------------------------------------------------------------------------

    onInputNewPasswordHandler(e: Event) {
// @ts-ignore
        this.passwordInputValue = e.target?.value

    }

    onChangeNewPasswordHandler(e: Event): any {

        // @ts-ignore
        this.passwordInputValue = e.target?.value
        this.validationObject.validPassword = !!this.newPasswordInputValue.match(inputRules.password)
        if (!this.validationObject.validPassword) {
            this.setProps({ errorNewPasswordMessage: 'Пароль должен содержать хотя бы одну цифру и заглавную букву. Длина 8-40 символов' })
        } else { this.setProps({ errorNewPasswordMessage: '' })}

    }
//----------------------------------------------------------------------------------------------------------------------

    onInputSubmitPasswordHandler(e: Event) {
// @ts-ignore
        this.passwordSubmitInputValue = e.target?.value

    }

    onChangeSubmitPasswordHandler(e: Event): any {

        // @ts-ignore
        this.passwordSubmitInputValue = e.target?.value
        this.validationObject.validSubmitPassword =( this.passwordSubmitInputValue.trim()===this.newPasswordInputValue.trim())
        if (!this.validationObject.validSubmitPassword) {
            this.setProps({ errorSubmitPasswordMessage: 'Пароль не совпадает' })
        } else { this.setProps({ errorSubmitPasswordMessage: '' })}

    }

//----------------------------------------------------------------------------------------------------------------------
    onInputEmailHandler(e: Event) {
// @ts-ignore
        this.emailInputValue = e.target?.value

    }

    onChangeEmailHandler(e: Event): any {

        // @ts-ignore
        this.emailInputValue = e.target?.value
        this.validationObject.validEmail = !!this.emailInputValue.match(inputRules.email)
        if (!this.validationObject.validEmail) {

            // @ts-ignore
            this.setProps({ errorEmailMessage: e.target?.validationMessage })
        } else { this.setProps({ errorEmailMessage: '' })}

    }

//----------------------------------------------------------------------------------------------------------------------
    onInputFirstNameHandler(e: Event) {
// @ts-ignore
        this.firstNameInputValue = e.target?.value
    }
    onChangeFirstNameHandler(e: Event) {
// @ts-ignore
        this.firstNameInputValue = e.target?.value
        this.validationObject.validFirstName = !!this.firstNameInputValue.match(inputRules.firstName)
        if (!this.validationObject.validFirstName) {
            this.setProps({ errorFirstNameMessage: 'Только буквы и "-". Первая буква - заглавная' })
        } else { this.setProps({ errorFirstNameMessage: '' })}
    }
//----------------------------------------------------------------------------------------------------------------------
    onInputSecondNameHandler(e: Event) {
// @ts-ignore
        this.secondNameInputValue = e.target?.value
    }

    onChangeSecondNameHandler(e: Event) {
// @ts-ignore
        this.secondNameInputValue = e.target?.value
        this.validationObject.validSecondName = !!this.secondNameInputValue.match(inputRules.secondName)
        if (!this.validationObject.validSecondName) {
            this.setProps({ errorSecondNameMessage: 'Только буквы и "-".  Первая буква - заглавная' })
        } else { this.setProps({ errorSecondNameMessage: '' })}
    }
//----------------------------------------------------------------------------------------------------------------------
    onInputPhoneHandler(e: Event) {
// @ts-ignore
        this.phoneInputValue = e.target?.value
    }
    onChangePhoneHandler(e: Event) {
// @ts-ignore
        this.phoneInputValue = e.target?.value
        this.validationObject.validPhone = !!this.phoneInputValue.match(inputRules.phone)
        if (!this.validationObject.validPhone) {
            this.setProps({ errorPhoneMessage: 'Длина 9-15 символов, только цмфры, может начинаться с +' })
        } else { this.setProps({ errorPhoneMessage: '' })}
    }
//----------------------------------------------------------------------------------------------------------------------
onSaveDataClick(e: Event){
        e.preventDefault()
    const data = {
        email: this.emailInputValue,
        login: this.loginInputValue,
        firstName: this.firstNameInputValue,
        secondName: this.secondNameInputValue,
        phone: this.phoneInputValue,
      displayName: this.displayNameInputValue
    }
    this.setProps({editMode: 'main'})
    console.log('input data', data)
}
//----------------------------------------------------------------------------------------------------------------------
    onSaveNewPasswordClick(e: Event){
        e.preventDefault()
        const data = {
            oldPassword: this.oldPasswordValue,
            newPassword: this.newPasswordInputValue,
            submitPassword: this.passwordSubmitInputValue,
        }
        this.setProps({editMode: 'main'})
        console.log('input data', data)
    }
//----------------------------------------------------------------------------------------------------------------------
   onOutClick(){
        window.location.pathname=''
       console.log('onOutClick')
   }
//----------------------------------------------------------------------------------------------------------------------
    render(): any {
const {name, secondName, login, displayName, phone, email,}=this.props
switch (this.props.editMode){
    case 'data':
        return this.compile(ProfileEditDataTmpl, {
            onInputLogin: ((e: Event)=>this.onInputLoginHandler(e)).bind(this),
            onChangeLogin: ( (e: Event) => this.onChangeLoginHandler(e) ).bind(this),

            onInputEmail: ( (e: Event) => this.onInputEmailHandler(e) ).bind(this),
            onChangeEmail: ( (e: Event) => this.onChangeEmailHandler(e) ).bind(this),
            onInputFirstName: ( (e: Event) => this.onInputFirstNameHandler(e) ).bind(this),
            onChangeFirstName: ( (e: Event) => this.onChangeFirstNameHandler(e) ).bind(this),
            onInputSecondName: ( (e: Event) => this.onInputSecondNameHandler(e) ).bind(this),
            onChangeSecondName: ( (e: Event) => this.onChangeSecondNameHandler(e) ).bind(this),
            onInputPhone: ( (e: Event) => this.onInputPhoneHandler(e) ).bind(this),
            onChangePhone: ( (e: Event) => this.onChangePhoneHandler(e) ).bind(this),

            firstNameValue: this.firstNameInputValue,
            secondNameValue: this.secondNameInputValue,
            phoneValue: this.phoneInputValue,
            emailValue: this.emailInputValue,
            loginValue: this.loginInputValue,
displayNameValue: this.displayNameInputValue,
            errorLoginMessage: this.props.errorLoginMessage,
            errorEmailMessage: this.props.errorEmailMessage,
            errorFirstNameMessage: this.props.errorFirstNameMessage,
            errorSecondNameMessage: this.props.errorSecondNameMessage,
            errorPhoneMessage: this.props.errorPhoneMessage,
errorDisplayNameMessage: this.props.errorDisplayNameMessage,
            children: this.children,
            onGoBackClick: (e: Event)=>this.onGoBackToProfileClick(e),
            onSaveDataClick:((e: Event)=> this.onSaveDataClick(e)).bind(this),

        })
    case 'password':
        return this.compile(ProfileEditPasswordTmpl, {
            newPasswordValue: this.newPasswordInputValue,
            oldPasswordValue: this.oldPasswordValue,
            submitPasswordValue: this.passwordSubmitInputValue,
            onInputPassword: ( (e: Event) => this.onInputNewPasswordHandler(e) ).bind(this),
            onChangePassword: ( (e: Event) => this.onChangeNewPasswordHandler(e) ).bind(this),
            onInputOldPassword: ( (e: Event) => this.onInputOldPasswordHandler(e) ).bind(this),
            onChangeOldPassword: ( (e: Event) => this.onChangeOldPasswordHandler(e) ).bind(this),
            onInputSubmitPassword: ( (e: Event) => this.onInputSubmitPasswordHandler(e) ).bind(this),
            onChangeSubmitPassword: ( (e: Event) => this.onChangeSubmitPasswordHandler(e) ).bind(this),
            children: this.children,
            errorSubmitPasswordMessage: this.props.errorSubmitPasswordMessage,
            errorNewPasswordMessage: this.props.errorNewPasswordMessage,
            errorOldPasswordMessage: this.props.errorOldPasswordMessage,
            onSaveClick:(e:Event)=> this.onSaveNewPasswordClick(e),
            onGoBackClick: (e: Event)=>this.onGoBackToProfileClick(e),

        })
    default:
        return this.compile(ProfileTmpl, {
            firstNameValue: name,
            secondNameValue: secondName,
            phoneValue: phone,
            emailValue: email,
            loginValue: login,
            displayNameValue: displayName,
            children: this.children,
            onChangeClick:((e:Event)=> this.onChangeDataClick(e)).bind(this),
            onChangePasswClick:((e:Event)=> this.onEditPasswordClick(e)).bind(this),
            onOutClick:()=> this.onOutClick(),
        })
}


    }

}
