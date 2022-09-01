import './style.css'
import SignInTmpl from './SignIn.hbs'
import Block from '../../utils/Block';


interface ISignIn {

}


export class SignIn extends Block {
    constructor(props: ISignIn) {
        super('SignIn', props);
        this.props = props
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

    onSubmitClick(e: Event) {

        console.log('tho',this)
        console.log('onSubmit click')
        const inputs = Array.from(document.querySelectorAll('input'))
        console.log('login',document.querySelector('#login'))
        const data = inputs.map((input) => [ input.name, input.value ])
        console.log('input data', data)

    }

    onSignUpClick() {
        window.location.pathname = '/signUp.html'
        console.log('onSignUp  click')
    }


    render(): any {

        return this.compile(SignInTmpl, {
            onSubmitClick: this.onSubmitClick,
            onSignUpClick: this.onSignUpClick,
            children: this.children,
        })
    }
}


