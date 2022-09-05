import Block from '../../utils/Block'
import template from './ButtonTmpl.hbs'
import './style.css'

interface IButtonProps {
  text: string;
  classNames: string;
  type: 'button' | 'submit';
  id: string;
  onClick: () => void;
}

export class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super('Button', {
      text: props.text,
      classNames: props.classNames,
      type: props.type,
      id: props.id,
      events: { click: props.onClick },
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
