
import  InputTextTmpl  from './InputTextTmpl.hbs'
import './style.css'
import  Block  from '../../utils/Block';


interface  IInputText {
    id:string,
    name: string ,
    label:string,
    type: string,
    placeholder: string,
    errorMessage:string,
    disabled: boolean,
    onClick: () => void
}

export class InputText extends Block {
    props;

    constructor(props: IInputText) {
        super('InputText', {
            id: props.id,
            name: props.name ,
            label: props.label,
            type: props.type,
            placeholder: props.placeholder,
            errorMessage:props.errorMessage,
            disabled: props.disabled,
            events: {
                click: props.onClick
            }
        });
        this.props = props
    }

    render() {

        return this.compile(InputTextTmpl,this.props)
    }
}
