//
//
// import render from '../../utils/render';
// import { Profile } from '../../modules/Profile/Profile';
// import { InputTextProfile } from '../../components/InputTextProfile/InputTextProfile';
// import { ButtonLink } from '../../components/ButtonLink/ButtonLink';
//
//
//
//
// //profile data in component
//
// const inputsList = [
//     {
//         id: 'email',
//         name: 'email',
//         type: 'text',
//         label: 'Почта',
//         placeholder: 'pochta@yandex.ru',
//         errorMessage: '',
//         disabled: true
//     },
//     {
//         id: 'login',
//         name: 'login',
//         type: 'text',
//         label: 'Логин',
//         placeholder: 'Ivan',
//         errorMessage: ''
//     },
//     {
//         id: 'first_name',
//         name: 'first_name',
//         type: 'text',
//         label: 'Имя',
//         placeholder: 'Ivan',
//         errorMessage: '',
//         disabled: true
//     },
//     {
//         id: 'second_name',
//         name: 'second_name',
//         type: 'text',
//         label: 'Фамилия',
//         placeholder: 'Ivanov',
//         errorMessage: '',
//         disabled: true
//     },
//     {
//         id: 'display_name',
//         name: 'display_name',
//         type: 'text',
//         label: 'Имя в чате',
//         placeholder: 'vanya',
//         errorMessage: '',
//         disabled: true
//     },
//     {
//         id: 'phone',
//         name: 'phone',
//         label: 'Почта',
//         type: 'text',
//         placeholder: '+79659959598',
//         errorMessage: '',
//         disabled: true
//     },
// ]
//
// const inputsListPassword = [
//     {
//         id: 'password',
//         name: 'password',
//         type: 'password',
//         label: 'Пароль',
//         placeholder: 'Пароль',
//         errorMessage: '',
//         disabled: false
//     },
//     {
//         id: 'password',
//         name: 'password',
//         type: 'password',
//         label: 'Пароль',
//         placeholder: 'Пароль',
//         errorMessage: '',
//         disabled: false
//     },
// ]
//
// let editMode: boolean = false
// let editPassw: boolean = false
//
// const inputName = new InputTextProfile(
//     {
//         id: 'first_name',
//         name: 'first_name',
//         type: 'text',
//         label: 'Имя',
//         placeholder: 'Ivan',
//         errorMessage: '',
//         disabled: !editMode,
//         settings: {withInternalID: false}
//     }
// )
// const inputSecondName = new InputTextProfile(
//     {
//         id: 'second_name',
//         name: 'second_name',
//         type: 'text',
//         label: 'Фамилия',
//         placeholder: 'Ivanov',
//         errorMessage: '',
//         disabled: !editMode,
//         settings: {withInternalID: true}
//     }
// )
//
// const inputDisplayName = new InputTextProfile(
//     {
//         id: 'display_name',
//         name: 'display_name',
//         type: 'text',
//         label: 'Имя в чате',
//         placeholder: 'vanya',
//         errorMessage: '',
//         disabled: !editMode,
//         settings: {withInternalID: true}
//     }
// )
//
// const inputEmail= new InputTextProfile(
//     {
//         id: 'email',
//         name: 'email',
//         type: 'text',
//         label: 'Почта',
//         placeholder: 'pochta@yandex.ru',
//         errorMessage: '',
//         disabled: !editMode,
//         settings: {withInternalID: true}
//     }
// )
// const inputLogin= new InputTextProfile(
//     {
//         id: 'login',
//         name: 'login',
//         type: 'text',
//         label: 'Логин',
//         placeholder: 'Ivan',
//         errorMessage: '',
//         disabled: !editMode,
//         settings: {withInternalID: true}
//     }
// )
//
// const inputPhone= new InputTextProfile(
//     {
//         id: 'phone',
//         name: 'phone',
//         label: 'Тел',
//         type: 'text',
//         placeholder: '+79659959598',
//         errorMessage: '',
//         disabled: !editMode,
//         settings: {withInternalID: true}
//     }
// )
//
// const inputPassw= new InputTextProfile(
//     {
//         id: 'password',
//         name: 'password',
//         type: 'password',
//         label: 'Пароль',
//         placeholder: 'Пароль',
//         errorMessage: '',
//         disabled: !editMode,
//         settings: {withInternalID: true}
//     }
// )
// const inputRepeatPassw= new InputTextProfile(
//     {
//         id: 'password2',
//         name: 'password2',
//         type: 'password',
//         label: 'Пароль еще раз',
//         placeholder: 'Пароль еще раз',
//         errorMessage: '',
//         disabled: !editMode,
//         settings: {withInternalID: true}
//     }
// )
//
// const onChangeDataClick = (e: Event)=>{
//     console.log('click change data')
//
//
//    const inputs =  document.querySelectorAll('.inputBlockProfile__input ')
//
//     editMode = true
//     inputs.forEach(item => item.removeAttribute('disabled'))
// //profile.setProps({ editMode: true })
// }
//
// const onChangePasswClick = (e: Event)=>{
//     console.log('click change passw')
//     editPassw=true
// }
//
// const onOutClick = (e: Event)=>{
//     console.log('click out')
//     window.location.pathname = '/'
// }
//
// const onSaveClick = (e: Event)=>{
//     console.log('click save')
//     editPassw=false
//     const form = document.forms[0]
//     const inputs = form.querySelectorAll('input')
//     inputs.forEach(input=> console.log(input.name, input.value ))
//
// }
// //
// // const btnSave = new Button({
// //                                   text: 'Сохранить',
// //                                   type: 'submit',
// //                                   id: 'saveBtn',
// //                                   classNames: 'button_primary',
// //                                   // @ts-ignore
// //                                   events: { onClick: [ (e: Event) => onSaveClick(e) ] }
// //                               })
//
// const btnChangeData = new ButtonLink({
//                                          id: 'changeProfileData',
//                                          text: 'Изменить данные',
//                                          classNames: 'buttonLink',
//                                          events: { click: (e: Event) => onChangeDataClick(e)},
//                                          settings: { withInternalID: true }
//                                      })
// const btnChangePassw = new ButtonLink({
//                                           id: 'changePassw',
//                                           text: 'Изменить пароль',
//                                           classNames: 'buttonLink',
//                                           events: { click: (e: Event) => onChangePasswClick(e) },
//                                           settings: { withInternalID: true }
//                                       })
// const btnOut = new ButtonLink({
//                                   id: 'out',
//                                   text: 'Выйти',
//                                   classNames: 'buttonLink buttonLink_red',
//                                   events: { click: (e: Event) => onOutClick(e) },
//                                   settings: { withInternalID: true }
//                               })
//
//
//
//
// // const profile= new Profile({
// //                                inputLogin,inputEmail,inputName,inputSecondName,inputDisplayName,inputPhone,
// //                                inputPassw, inputRepeatPassw, btnChangeData, btnChangePassw, btnOut, btnSave, editMode, editPassw
// //
// //                            }  )
//
// //
// // render('#root', profile)

import { Profile } from '../../modules/Profile/Profile';

// @ts-ignore
import components from '../../components/**/index.ts';
// @ts-ignore
import modules from '../../modules/**/index.ts';


import { helperRegisterComponent } from '../../utils/helperRegisterComponent';



window.addEventListener('DOMContentLoaded', () => {
    // @ts-ignore
    Object.values(components).forEach(component => helperRegisterComponent(component.default));

    // @ts-ignore
    Object.values(modules).forEach(module => helperRegisterComponent(module.default));
    const root = document.querySelector('#root')!;

    const ProfilePage= new Profile({name: "Иван", secondName: "Ivanov", displayName: "vanya", email: "pochta@yandex.ru", login: "Ivan", phone: "+79659959598", password: '1111', editMode: 'main'});

    root.append(ProfilePage.getContent()!);

    ProfilePage.dispatchComponentDidMount();
});
