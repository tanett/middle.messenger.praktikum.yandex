import Block from '../../utils/Block'
import template from './ButtonTmpl.hbs'
import styles from './style.css'

interface IButtonProps {
  text: string;
  classNames: string;
  type: 'button' | 'submit';
  id: string;
  onClick: () => void;
}

export class Button extends Block<IButtonProps> {
  static componentName: string='Button'

  constructor(props: { onClick: (e: Event) => void; classNames: string; text: string; id: string; type: string }) {
    super('Button', {
      text: props.text,
      classNames: props.classNames,
      type: props.type,
      id: props.id,
      events: { click: props.onClick },
    })
  }

  render() {
    const classN = styles[this.props.classNames]
    return this.compile(template, { ...this.props, styles, classNames: `${styles.button} ${classN}` })
  }
}
