import Block from '../../utils/Block'

import errorPageLayoutTmpl from './errorPageLayoutTmpl.hbs'

interface IErrorPageLayout {
  content?: any;
}

export class ErrorPageLayout extends Block<IErrorPageLayout> {
  constructor(props: IErrorPageLayout) {
    super('errorLayout', props)
  }

  render(): any {
    return this.compile(errorPageLayoutTmpl, this.props)
  }
}
