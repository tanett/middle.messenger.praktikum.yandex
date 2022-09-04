import './style.css'
import SignInTmpl from './SignIn.hbs'
import Block from '../../utils/Block';
import { inputRules } from '../../utils/validationRules';


interface ISignIn {

}


export class SignIn extends Block {
    private loginInputValue: string = '';
    private passwordInputValue: string = '';
    private validationObject = {
        validLogin: true,
        validPassword: true
    }

    constructor(props: ISignIn) {
        super('SignIn', props);
    }


// //inputs in component
// const inputList = [
//     {id:'login', name:'login', label:'Логин', type:'text', placeholder:'Логин', errorMessage:'error', disabled: false},
//     {id:'password', name:'password', label:'Пароль', type:'password', placeholder:'Пароль', errorMessage:'', disabled: false},
// ]
//
//
//     const content = SignInTmpl({
//
//         btnPr: Button("Войти", "button_primary", "submit", "signInSubmit"),
//         btnLink: ButtonLink("linkToSignUp", "Нет аккаунта?", 'buttonLink_center'),
//         fieldset: Fieldset(inputList, "signIn_fieldset")
//     })

//----------------------------------------------------------------------------------------------------------------------
    onSubmitClick(e: Event) {
        e.preventDefault()


        const data = {
            login: this.loginInputValue,
            password: this.passwordInputValue,
            validation: this.validationObject
        }
        console.log('input data', data)
    }
//----------------------------------------------------------------------------------------------------------------------
    onSignUpClick() {
        window.location.pathname = '/signUp.html'
    }
//----------------------------------------------------------------------------------------------------------------------
    onInputLoginHandler(e: Event): any {
// @ts-ignore
      this.loginInputValue=e.target?.value
       // this.setProps({errorLoginMessage: ""})
    }

    onChangeLoginHandler(e: Event): any {

        // @ts-ignore
        this.loginInputValue=e.target?.value
        this.validationObject.validLogin = !!this.loginInputValue.match(inputRules.login) ;
     if(!this.validationObject.validLogin) {
         this.setProps({errorLoginMessage: this.loginInputValue.trim()===''?"Обязательное поле" :"Логин может содержать только буквы и '-' "})
     } else { this.setProps({errorLoginMessage: ""})}

    }
//----------------------------------------------------------------------------------------------------------------------

    onInputPasswordHandler(e: Event) {
// @ts-ignore
        this.passwordInputValue = e.target?.value

    }

    onChangePasswordHandler(e: Event): any {

        // @ts-ignore
        this.passwordInputValue=e.target?.value
        this.validationObject.validPassword = this.passwordInputValue.trim() !== ''
        if(!this.validationObject.validPassword) {
            this.setProps({errorPasswordMessage: "Обязательное поле"})
        } else { this.setProps({errorPasswordMessage: ""})}

    }
//----------------------------------------------------------------------------------------------------------------------
    render(): any {

        return this.compile(SignInTmpl, {
            onSubmitClick: ( (e: Event) => this.onSubmitClick(e) ).bind(this),
            onSignUpClick: this.onSignUpClick,
            onChangeLogin:( (e: Event) => this.onChangeLoginHandler(e) ).bind(this),
            onChangePassword:( (e: Event) => this.onChangePasswordHandler(e) ).bind(this),
            onInputLogin: ( (e: Event) => this.onInputLoginHandler(e) ).bind(this),
            onInputPassword: ( (e: Event) => this.onInputPasswordHandler(e) ).bind(this),
            loginValue: this.loginInputValue,
            errorLoginMessage: this.props.errorLoginMessage,
            errorPasswordMessage: this.props.errorPasswordMessage,
            passwordValue: this.passwordInputValue,
            children: this.children,
        })
    }
}


