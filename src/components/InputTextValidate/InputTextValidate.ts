import InputTextValidateTmpl from './InputTextValidateTmpl.hbs'
import './style.css'
import Block from '../../utils/Block'


interface IInputTextValidate {
  message: string
  id: string;
  name: string;
  label: string;
  value: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  errorMessage: string;
  disabled: boolean;
  pattern: string;
  classInput: string;
  classLabel: string;
}

export class InputTextValidate extends Block<IInputTextValidate> {
 private inputValue: string = this.props.value
 private valid: boolean = true

  constructor(props: IInputTextValidate) {
    super('InputTextValidate', props)
  }

 private onInputHandler(e: Event): void {
    this.inputValue = ( e.target as HTMLInputElement ).value
  }

 private onChangeHandler(e: Event): void {

    this.props.value = ( e.target as HTMLInputElement ).value
    this.valid = !!this.inputValue.match(this.props.pattern)
    if (!this.valid) {
      this.setProps({ message: this.props.errorMessage.toString() })
    } else {
      this.setProps({ message: '' })
    }
  }

 public getValue(){
    return this.inputValue
  }

  render() {

    return this.compile(InputTextValidateTmpl, {
      id: this.props.id,
      name: this.props.name,
      label: this.props.label,
      type: this.props.type,
      placeholder: this.props.placeholder,
      disabled: this.props.disabled,
      pattern: this.props.pattern,
      errorMessage: this.props.message,
      value: this.props.value,
      classInput: this.props.classInput,
      classLabel: this.props.classLabel,
      onInput: ( (e: Event) => this.onInputHandler(e) ).bind(this),
      onChange: ( (e: Event) => this.onChangeHandler(e) ).bind(this),
      children: this.children,
    })
  }
}
