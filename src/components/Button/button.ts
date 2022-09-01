import Block from '../../utils/Block';
import template from './ButtonTmpl.hbs';
// @ts-ignore
import * as styles from './style.css';

interface IButtonProps {
  text: string,
  classNames: string,
  type: 'button' | 'submit',
  id: string,
  onClick: () => void;
}

export class Button extends Block {
  constructor(props: IButtonProps) {

    super( 'Button',{
      text: props.text,
      classNames: props.classNames,
      type: props.type,
      id: props.id,
      events: {click: props.onClick}
           });

  }


  render() {

    return this.compile(template, { ...this.props, styles: styles });
  }
}
