// import { EventBus } from './EventBus';
// import {v4 as makeUUID} from 'uuid';
// import * as Handlebars from 'handlebars';
//
//
// export class Block {
//     static EVENTS = {
//         INIT: "init",
//         FLOW_CDM: "flow:component-did-mount",
//         FLOW_CDU: "flow:component-did-update",
//         FLOW_RENDER: "flow:render"
//     };
//    public id ;
//     protected props: any;
//     public children: Record<string, Block>;
//     private eventBus: () => EventBus;
//     private _element: HTMLElement | null = null;
//     private _meta: { props: any; };
//
//
//
//     constructor( propsAndChildren: object = {}) {
//         const { children, props } = this._getChildren(propsAndChildren);
//         const eventBus = new EventBus();
//
//         this._meta = {
//
//             props
//         };
//
//         this.id = makeUUID();
//         this.props = this._makePropsProxy({ ...props, _id: this.id });
//         this.children= children;
//         this.eventBus = () => eventBus;
//
//         this._registerEvents(eventBus);
//         eventBus.emit(Block.EVENTS.INIT);
//     }
// //----------------------------------------------------------------------------------------------------------------------
//     _getChildren(propsAndChildren: any) {
//         const props: Record<string, any> = {};
//         const children: Record<string, Block> = {};
//
//         Object.entries(propsAndChildren).forEach(([key, value]) => {
//             if (value instanceof Block) {
//                 children[key] = value;
//             } else {
//                 props[key] = value;
//             }
//         });
//
//         return { children, props };
//     }
// //----------------------------------------------------------------------------------------------------------------------
//   protected compile(template: (context: any) => string, props: any) {
//       console.log(";compile")
//         if(typeof (props) === undefined){props = this.props}
//
//         const propsAndStubs = { ...props };
//
//         Object.entries(this.children).forEach(([key, child]) => {
//
//             // @ts-ignore
//             propsAndStubs[key] = `<div data-id="${child._id}"></div>`
//         });
//
// const html = Handlebars.compile(template)( propsAndStubs)//template(propsAndStubs);
//       console.log('html', html)
//         const fragment = document.createElement('template');
//
//         fragment.innerHTML =   html                     //Handlebars.compile(template)( propsAndStubs);
//
//         Object.values(this.children).forEach(child => {
//
//             const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
//
//            if(stub) {
//                child.getContent()?.append(...Array.from(stub.childNodes));
//                stub.replaceWith(child.getContent()!);
//            }
//         });
//
//         return fragment.content;
//     }
// //----------------------------------------------------------------------------------------------------------------------
//     _registerEvents(eventBus: any) {
//         eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
//         eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
//         eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
//         eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
//     }
// //----------------------------------------------------------------------------------------------------------------------
//     _createResources() {
//
//         // const { tagName } = this._meta;
//      //   this._element = this._createDocumentElement('template');
//     }
// //----------------------------------------------------------------------------------------------------------------------
//    protected init() {}
// //----------------------------------------------------------------------------------------------------------------------
//    private _init() {
//   this._createResources();
//        this.init()
//        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
//    }
//
//
//     _componentDidMount() {
//
//         this.componentDidMount();
//
//         Object.values(this.children).forEach(child => {
//
//             child.dispatchComponentDidMount();
//         });
//
//     }
//
//     componentDidMount() {}
//
//    public dispatchComponentDidMount() {
//         this.eventBus().emit(Block.EVENTS.FLOW_CDM);
//        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
//     }
//
//   // @ts-ignore
//     private  _componentDidUpdate(oldProps, newProps) {
//       if (this.componentDidUpdate(oldProps, newProps)) {
//           this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
//       }
//     }
//
//   // @ts-ignore
//     protected  componentDidUpdate(oldProps, newProps) {
//         return true;
//     }
//
//   // @ts-ignore
//     public  setProps = nextProps => {
//         if (!nextProps) {
//             return;
//         }
//
//         Object.assign(this.props, nextProps);
//     };
//
//     get element() {
//         return this._element;
//     }
//
//    private _render() {
//
//         const fragment= this.render(); // render теперь возвращает DocumentFragment
//        console.log('-render fragment', fragment)
//         this._removeEvents();
//
//         const newElement = fragment.firstElementChild as HTMLElement
//
//         this._element?.replaceWith(newElement)
//
//        this._element = newElement
//
//         this._addEvents();
//         this._addAttribute()
//     }
//
//    protected render():DocumentFragment {
//        return new DocumentFragment();
//    }
//
//  public  getContent() {
//         return this._element;
//     }
//
//     // @ts-ignore
//     _makePropsProxy(props) {
//         // Можно и так передать this
//         // Такой способ больше не применяется с приходом ES6+
//         const self = this;
//
//         return new Proxy(props, {
//             get(target, prop) {
//                 const value = target[prop];
//                 return typeof value === "function" ? value.bind(target) : value;
//             },
//             set(target, prop, value) {
//                 target[prop] = value;
//
//                 // Запускаем обновление компоненты
//                 // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
//                 self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
//                 return true;
//             },
//             deleteProperty() {
//                 throw new Error("Нет доступа");
//             }
//         });
//     }
//
//     _createDocumentElement(tagName: string) {
//         const element = document.createElement(tagName);
//         element.setAttribute('data-id', this.id);
//         return element;
//     }
//
//     show() {
//
//         this.getContent()!.style.display = "block";
//     }
//
//     hide() {
//
//         this.getContent()!.style.display = "none";
//     }
//
//     _addEvents() {
//         const {events = {}} = this.props as { events: Record<string, () =>void> };;
//
//         Object.keys(events).forEach(eventName => {
//
//             this._element!.addEventListener(eventName, events[eventName]);
//         });
//     }
//     _removeEvents() {
//         const {events = {}} = this.props;
//
//         Object.keys(events).forEach(eventName => {
//
//             // @ts-ignore
//             this._element!.removeEventListener(eventName, events[eventName]);
//         });
//     }
//     _addAttribute(){
//         const{ attr = {}}=this.props
//         Object.entries(attr).forEach(([key,value])=>{
//             this.element?.setAttribute(key, value as string)
//         })
//     }
// }
import { EventBus } from './EventBus';
import { nanoid } from 'nanoid';


class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    };

    public id = nanoid(6);
    protected props: any;
    public children: Record<string, Block>;
    private eventBus: () => EventBus;
    private _element: HTMLElement | null = null;
    private _meta: { props: any; };
    public componentName: string;



    /** JSDoc
     * @param {string} name
     * @param {Object} propsWithChildren
     *
     * @returns {void}
     */
    constructor(name: string, propsWithChildren: any = {}) {
        const eventBus = new EventBus();
        this.componentName = name;
        const { props, children } = this._getChildrenAndProps(propsWithChildren);

        this._meta = {

            props
        };

        this.children = children;
        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

//----------------------------------------------------------------------------------------------------------------------
    _getChildrenAndProps(childrenAndProps: any) {
        const props: Record<string, any> = {};
        const children: Record<string, Block> = {};

        Object.entries(childrenAndProps).forEach(([ key, value ]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { props, children };
    }

//----------------------------------------------------------------------------------------------------------------------
    _addEvents() {
        const { events = {} } = this.props as { events: Record<string, () => void> };

        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

//----------------------------------------------------------------------------------------------------------------------
    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

//----------------------------------------------------------------------------------------------------------------------
    _createResources() {
        // const { tagName } = this._meta;
        // this._element = this._createDocumentElement(tagName);
    }

//----------------------------------------------------------------------------------------------------------------------
    private _init() {
        //  this._createResources();

        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

//----------------------------------------------------------------------------------------------------------------------
    protected init() {}

//----------------------------------------------------------------------------------------------------------------------
    private _componentDidMount() {
        this.componentDidMount();
    }

//----------------------------------------------------------------------------------------------------------------------
    public componentDidMount() {}
//----------------------------------------------------------------------------------------------------------------------
    get element() {
        return this._element;
    }
//----------------------------------------------------------------------------------------------------------------------
    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }
//----------------------------------------------------------------------------------------------------------------------
    public dispatchComponentDidUpdate() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);

        Object.values(this.children).forEach(child => child.dispatchComponentDidUpdate());
    }
//----------------------------------------------------------------------------------------------------------------------
    private _componentDidUpdate(oldProps: any, newProps: any) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);

        }
    }

//----------------------------------------------------------------------------------------------------------------------
    protected componentDidUpdate(oldProps: any, newProps: any) {

        return true;
    }
//----------------------------------------------------------------------------------------------------------------------
    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
        //   this.dispatchComponentDidUpdate()
    };
//----------------------------------------------------------------------------------------------------------------------
    private _render() {

        const fragment = this.render();
        // this._removeEvents();
        const newElement = fragment.firstElementChild as HTMLElement

        this._element?.replaceWith(newElement)

        this._element = newElement

        this._addEvents();
    }

//----------------------------------------------------------------------------------------------------------------------
    protected compile(template: (context: any) => string, context: any) {
        const contextAndStubs = { ...context };

        Object.entries(this.children).forEach(([name, component]) => {
            contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
        });

        const html = template(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;

        Object.entries(this.children).forEach(([ _, component ]) => {
            const stub = temp.content.querySelector(`[data-id="${ component.id }"]`);

            if (!stub) {
                return;
            }

            //component.getContent()?.append(...Array.from(stub.childNodes));

            stub.replaceWith(component.getContent()!);

        });

        return temp.content;
    }

//----------------------------------------------------------------------------------------------------------------------
    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

//----------------------------------------------------------------------------------------------------------------------
    getContent() {
        return this.element;
    }

//----------------------------------------------------------------------------------------------------------------------
    _makePropsProxy(props: any) {
        // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldTarget = { ...target }

                target[prop] = value;

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }

//----------------------------------------------------------------------------------------------------------------------
    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

//----------------------------------------------------------------------------------------------------------------------
    show() {
        this.getContent()!.style.display = 'block';
    }

//----------------------------------------------------------------------------------------------------------------------
    hide() {
        this.getContent()!.style.display = 'none';
    }
}

//----------------------------------------------------------------------------------------------------------------------
export default Block;
