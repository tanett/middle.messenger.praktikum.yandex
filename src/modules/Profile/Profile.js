import ProfileTmpl from './Profile.tmpl.hbs'

import './style.css'

import InputTextProfile from '../../components/InputTextProfile/InputTextProfile';
import Button from '../../components/Button/Button';

export default function Profile() {

    let editData = false
    let editPasw = true
    let viewData = false

    //profile data in component

    const inputsList = [
        {
            id: 'email',
            name: 'email',
            type: 'text',
            label: 'Почта',
            placeholder: 'pochta@yandex.ru',
            errorMessage: '',
            disabled: true
        },
        {
            id: 'login',
            name: 'login',
            type: 'text',
            label: 'Логин',
            placeholder: 'Ivan',
            errorMessage: ''
        },
        {
            id: 'first_name',
            name: 'first_name',
            type: 'text',
            label: 'Имя',
            placeholder: 'Ivan',
            errorMessage: '',
            disabled: true
        },
        {
            id: 'second_name',
            name: 'second_name',
            type: 'text',
            label: 'Фамилия',
            placeholder: 'Ivanov',
            errorMessage: '',
            disabled: true
        },
        {
            id: 'display_name',
            name: 'display_name',
            type: 'text',
            label: 'Имя в чате',
            placeholder: 'vanya',
            errorMessage: '',
            disabled: true
        },
        {
            id: 'phone',
            name: 'phone',
            label: 'Почта',
            type: 'text',
            placeholder: '+79659959598',
            errorMessage: '',
            disabled: true
        },
    ]

    const inputsListPassword = [
        {
            id: 'password',
            name: 'password',
            type: 'password',
            label: 'Пароль',
            placeholder: 'Пароль',
            errorMessage: '',
            disabled: false
        },
        {
            id: 'password',
            name: 'password',
            type: 'password',
            label: 'Пароль',
            placeholder: 'Пароль',
            errorMessage: '',
            disabled: false
        },
    ]

//btn in profile
    const btnList = [
        {
            id: 'changePassw',
            text: 'Изменить пароль',
            classNames: 'buttonLink',
            onClick: onChangePasswClick
        },
        {
            id: 'changeData',
            text: 'Изменить данные',
            classNames: 'buttonLink',
            onClick: onChangeDataClick
        },
        {
            id: 'out',
            text: 'Выйти',
            classNames: 'buttonLink buttonLink_red',

        },
    ]


    function onChangeDataClick(e) {
        editData = true
        viewData=false
        inputsList.forEach(item => item.disabled = false)
    }

    function onChangePasswClick(e) {
        editPasw = true
viewData=false

    }


    const inputs = inputsList.map(item => {
        return InputTextProfile(item.id, item.name, item.label, item.type, item.placeholder, item.errorMessage, item.disabled)
    })

    const inputsPassw = inputsListPassword.map(item => {
        return InputTextProfile(item.id, item.name, item.label, item.type, item.placeholder, item.errorMessage, item.disabled)
    })

    let content = ProfileTmpl({
        editPasw,
        editData,
        viewData,
        inputs,
        inputsPassw,
        btnList,
        btnSave: Button('Сохранить', 'button_primary'),
        name: 'Иван'

    })


    return content
}
