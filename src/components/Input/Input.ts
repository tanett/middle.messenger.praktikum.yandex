import InputTmpl from './InputTmpl.hbs'
import './style.css'
import Block from '../../utils/Block'

interface IInput {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  disabled: boolean;
  value: string;
  onChange: () => void;
  onInput: () => void;
  classInput: string;
  pattern: string;
}

export class Input extends Block<IInput> {
  constructor(props: IInput) {
    super('Input', {
      id: props.id,
      name: props.name,
      type: props.type? props.type : 'text',
      placeholder: props.placeholder? props.placeholder: '',
      disabled: props.disabled,
      value: props.value,
      classInput: props.classInput? props.classInput : '',
      pattern: props.pattern,
      events: {
        input: props.onInput,
        change: props.onChange,
      },
    })
  }

  render() {
    return this.compile(InputTmpl, this.props)
  }
}
