import Handlebars from 'handlebars'
import './style.css'
import SignUpTmpl from './signUp.hbs'
import Button from '../../components/Button/Button';

import Fieldset from '../../components/Fieldset/Fieldset';
import ButtonLink from '../../components/ButtonLink/ButtonLink';


Handlebars.registerPartial('SignUp', SignUpTmpl)

export default function SignUp() {

const onSubmit =()=>{
    window.location.pathname='/chatList'
}
//inputs in component
    const inputList = [
        {id:'email', name:'email', label:'Почта', type:'email', placeholder:'Почта', errorMessage:'', disabled: false},
        {id:'login', name:'login', label:'Логин', type:'text', placeholder:'Логин', errorMessage:'', disabled: false},
        {id:'first_name', name:'first_name', label:'Имя', type:'text', placeholder:'Имя', errorMessage:'', disabled: false},
        {id:'second_name', name:'second_name', label:'Фамилия', type:'text', placeholder:'Фамилия', errorMessage:'', disabled: false},
        {id:'phone', name:'phone', label:'Телефон', type:'text', placeholder:'Телефон', errorMessage:'', disabled: false},
        {id:'password', name:'password', label:'Пароль', type:'password', placeholder:'Пароль', errorMessage:'', disabled: false},
        {id:'passwordSubmit', name:'passwordSubmit', label:'Пароль(еще раз)', type:'password', placeholder:'Пароль', errorMessage:'error', disabled: false},
    ]


    const content = SignUpTmpl({ func: onSubmit ,
        btnPr: Button("Зарегестироваться", "button_primary"),
        btnLink: ButtonLink("linkToSignUp", "Войти", 'buttonLink_center'),
        fieldset: Fieldset(inputList, "signUp_fieldset")
    })

    return content
}


