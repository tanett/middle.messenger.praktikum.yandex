import InputTextProfileTmpl from './InputTextProfileTmpl.hbs'
import './style.css'
import Block from '../../utils/Block';


interface IInputTextProfile {
    id: string,
    name: string,
    label: string,
    value: string,
    type: 'text' | 'email' | 'password',
    placeholder: string,
    errorMessage: string,
    disabled: boolean,
    pattern: string,
    onChange: () => void,
    onInput: ()=> void,

}

export class InputTextProfile extends Block {

    constructor(props: IInputTextProfile) {
        super('inputProfile', props);

    }

    render() {

        return this.compile(InputTextProfileTmpl, {
        ...this.props,
            children: this.children,

        })
    }
}
