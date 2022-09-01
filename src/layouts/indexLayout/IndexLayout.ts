import  Block  from '../../utils/Block';


import indexLayoutTmpl from './indexLayoutTmpl.hbs';


interface IIndexLayout {
    title: string,
    content?: any
}

export class IndexLayout extends Block {
    props;


    constructor(props:IIndexLayout ) {
        super('IndexLayout', props);
        this.props = props

    }


    render(): any {

        return this.compile(indexLayoutTmpl, {
            title: this.props.title,
            onClick:()=> {console.log('Click')},
            children: this.children,

        })
    }
}

