import InputTextTmpl from './InputTextTmpl.hbs'
import './style.css'
import Block from '../../utils/Block';


interface IInputText {
    id: string,
    name: string,
    label: string,
    type: string,
    placeholder: string,
    errorMessage: string,
    disabled: boolean,
    value: string,
    onChange: () => void,
    onInput: ()=> void,
    pattern: string
}

export class InputText extends Block {

    constructor(props: IInputText) {
        super('InputText', props);

    }

    // onBlurHandler(e:Event){
    //     console.log('onBlur')
    //   // @ts-ignore
    //     this.setProps({errorMessage:e.target.validationMessage})
    //     console.log('onBlur valid Msg', this.props.errorMessage)
    // }

    render() {

        return this.compile(InputTextTmpl, {
            id: this.id,
            name: this.props.name,
            label: this.props.label,
            type: this.props.type,
            placeholder: this.props.placeholder,
            errorMessage: this.props.errorMessage,
            disabled: this.props.disabled,
            value: this.props.value,
            onChange: this.props.onChange,
            onInput: this.props.onInput,
            pattern: this.props.pattern,
            children: this.children
        })
    }
}
