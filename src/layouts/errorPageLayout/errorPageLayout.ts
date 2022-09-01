import Block  from '../../utils/Block';


import errorPageLayoutTmpl  from './errorPageLayoutTmpl.hbs';

interface IErrorPageLayout {
    content?: any
}

export class ErrorPageLayout extends Block{
    props;

    constructor(props:IErrorPageLayout) {
        super('errorLayout', props);
        this.props = props
    }

    render(): any {

    return this.compile(errorPageLayoutTmpl, this.props)
    }
}
