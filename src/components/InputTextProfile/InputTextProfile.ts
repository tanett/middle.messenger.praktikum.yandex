import InputTextProfileTmpl  from './InputTextProfileTmpl.hbs'
import './style.css'
import  Block  from '../../utils/Block';



interface IInputTextProfile  { id: string, name: string, label: string, type: 'text' | 'email' | 'password',
    placeholder: string, errorMessage: string, disabled: boolean
}

export class InputTextProfile extends Block {
    props;
    constructor(props: IInputTextProfile) {
        super('inputProfile', props);
        this.props = props
    }

    render() {
     const {id, name, label, type, placeholder, errorMessage, disabled} = this.props
        return this.compile(InputTextProfileTmpl, {id, name, label, type, placeholder,errorMessage, disabled , children: this.children,})
    }
}
