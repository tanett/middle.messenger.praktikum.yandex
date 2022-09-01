
import './style.css'
import signUpTmpl from './signUpTmpl.hbs'
import Block from '../../utils/Block';


interface ISignUp {

}


export class SignUp extends Block{

    constructor(props: ISignUp) {
        super('SignUp', props);
        this.props = props
    }
//
//  onSubmit =()=>{
//     window.location.pathname='/chatList'
// }
// //inputs in component
//     const inputList = [
//         {id:'email', name:'email', label:'Почта', type:'email', placeholder:'Почта', errorMessage:'', disabled: false},
//         {id:'login', name:'login', label:'Логин', type:'text', placeholder:'Логин', errorMessage:'', disabled: false},
//         {id:'first_name', name:'first_name', label:'Имя', type:'text', placeholder:'Имя', errorMessage:'', disabled: false},
//         {id:'second_name', name:'second_name', label:'Фамилия', type:'text', placeholder:'Фамилия', errorMessage:'', disabled: false},
//         {id:'phone', name:'phone', label:'Телефон', type:'text', placeholder:'Телефон', errorMessage:'', disabled: false},
//         {id:'password', name:'password', label:'Пароль', type:'password', placeholder:'Пароль', errorMessage:'', disabled: false},
//         {id:'passwordSubmit', name:'passwordSubmit', label:'Пароль(еще раз)', type:'password', placeholder:'Пароль', errorMessage:'error', disabled: false},
//     ]
//
//
//     const content = SignUpTmpl({ func: onSubmit ,
//         btnPr: Button("Зарегестироваться", "button_primary"),
//         btnLink: ButtonLink("linkToSignUp", "Войти", 'buttonLink_center'),
//         fieldset: Fieldset(inputList, "signUp_fieldset")
//     })
//
//     return content

    onSubmitClick(e: SubmitEvent) {
e.preventDefault()
        console.log('onSubmit click')
        const inputs = Array.from(document.querySelectorAll('input'))
        console.log('login',document.querySelector('#login'))
        const data = inputs.map((input) => [ input.name, input.value ])
        console.log('input data', data)

    }

    onSignInClick() {
        window.location.pathname = '/signIn.html'
        console.log('onSignIn  click')
    }


    render(): any {

        return this.compile(signUpTmpl, {
            onSubmitClick: this.onSubmitClick,
            onSignInClick: this.onSignInClick,
            children: this.children,
        })
    }
}

