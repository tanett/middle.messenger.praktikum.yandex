import InputTextProfileTmpl from './InputTextProfileTmpl.hbs'
import './style.css'
import Block from '../../utils/Block'

interface IInputTextProfile {
  id: string;
  name: string;
  label: string;
  value: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  errorMessage: string;
  disabled: boolean;
  pattern: string;
  onChange: () => void;
  onInput: () => void;
}

export class InputTextProfile extends Block<IInputTextProfile> {

  constructor(props: IInputTextProfile) {
    super('inputProfile', props)
    // console.log('=====', Object.values(this.children).find(child=>child.componentName = 'Input')!.element.value)
  }

  render() {

    return this.compile(InputTextProfileTmpl, {
      id: this.props.id,
      name: this.props.name,
      label: this.props.label,
      type: this.props.type,
      placeholder: this.props.placeholder,
      disabled: this.props.disabled,
      pattern: this.props.pattern,
      errorMessage: this.props.errorMessage,
      value: this.props.value,
      onInput: this.props.onInput,
      onChange: this.props.onChange,
      children: this.children,
    })
  }
}
