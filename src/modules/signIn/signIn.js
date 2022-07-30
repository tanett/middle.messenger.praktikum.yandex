
import './style.css'
import SignInTmpl from './signIn.hbs'
import Button from '../../components/Button/Button';
import Fieldset from '../../components/Fieldset/Fieldset';
import ButtonLink from '../../components/ButtonLink/ButtonLink';



export default function SignIn() {


//inputs in component
const inputList = [
    {id:'login', name:'login', label:'Логин', type:'text', placeholder:'Логин', errorMessage:'error', disabled: false},
    {id:'password', name:'password', label:'Пароль', type:'password', placeholder:'Пароль', errorMessage:'', disabled: false},
]


    const content = SignInTmpl({

        btnPr: Button("Войти", "button_primary", "submit", "signInSubmit"),
        btnLink: ButtonLink("linkToSignUp", "Нет аккаунта?", 'buttonLink_center'),
        fieldset: Fieldset(inputList, "signIn_fieldset")
    })



    return content
}


