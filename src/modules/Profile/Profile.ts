import  ProfileTmpl  from './ProfileTmpl.hbs'
import './style.css'
import Block from '../../utils/Block';

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
    editMode: boolean
}

export class Profile extends Block {

loginErrorMessage: string | false;

    constructor(props: IProfile) {
        super('Profile', props);
        this.props = props
        this.loginErrorMessage = false

    }
    onChangeClick(e: Event){

        this.componentDidUpdate(this.props, {...this.props, editMode: true})

        console.log('this', this, this.props.editMode)
}

    componentDidUpdate(oldProps:IProfile, newProps:IProfile) {
        if (oldProps.editMode !== newProps.editMode) {
            this.setProps({ editMode: newProps.editMode });
            return true;
        }

        return false;
    }


    render(): any {

        const {
            login, email, name, secondName, displayName, phone, editMode
        } = this.props
        return this.compile(ProfileTmpl, {
            login, email, name, secondName, displayName, phone, editMode,
            errorMessage: this.loginErrorMessage,
            children: this.children,
            // onClick:()=> {console.log('Click')},
            onSaveClick:()=> {console.log('Save Click')},
            onChangeClick: this.onChangeClick.bind(this),
            onChangePasswClick:()=> {console.log('Change Password Click')},
            onOutClick:()=> {console.log('Out Click')},
        })
    }


}
