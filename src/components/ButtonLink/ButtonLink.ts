import BtnLinkTmpl from './BtnLinkTmpl.hbs'
import './style.css'
import Block from '../../utils/Block'

interface IButtonLink {
  id: string;
  text: string;
  classNames: string;
  onClick: () => void;
}

export class ButtonLink extends Block<IButtonLink> {
  constructor(props: IButtonLink) {
    super('ButtonLink', {
      text: props.text,
      classNames: props.classNames,
      id: props.id,
      events: {
        click: props.onClick,
      },
    })
  }

  render() {
    const { id, text, classNames, onClick } = this.props
    return this.compile(BtnLinkTmpl, { id, text, classNames, onClick })
  }
}
