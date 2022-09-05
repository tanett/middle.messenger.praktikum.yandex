import { EventBus } from './EventBus'
import { nanoid } from 'nanoid'

class Block<Props extends {}> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  public id = nanoid(6)
  protected props: Props
  public children: Record<string, Block<Props>>
  private eventBus: () => EventBus
  private _element: HTMLElement | null = null
  private _meta: { props: any }
  public componentName: string

  /** JSDoc
   * @param {string} name
   * @param {Object} propsWithChildren
   *
   * @returns {void}
   */
  public constructor(name: string, propsWithChildren: any = {}) {
    const eventBus = new EventBus()
    this.componentName = name
    const { props, children } = this._getChildrenAndProps(propsWithChildren)

    this._meta = {
      props,
    }

    this.children = children
    this.props = this._makePropsProxy(props)

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)

    eventBus.emit(Block.EVENTS.INIT)
  }

//----------------------------------------------------------------------------------------------------------------------
  private _getChildrenAndProps(childrenAndProps: any) {
    const props: Record<string, any> = {}
    const children: Record<string, Block<Props>> = {}

    Object.entries(childrenAndProps).forEach(([ key, value ]) => {
      if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { props, children }
  }

//----------------------------------------------------------------------------------------------------------------------
  private _addEvents() {
    const { events = {} } = this.props as unknown as {
      events: Record<string, () => void>;
    }

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName])
    })
  }

//----------------------------------------------------------------------------------------------------------------------
  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

//----------------------------------------------------------------------------------------------------------------------
  private _createResources() {
    // const { tagName } = this._meta;
    // this._element = this._createDocumentElement(tagName);
  }

//----------------------------------------------------------------------------------------------------------------------
  private _init() {
    //  this._createResources();

    this.init()

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

//----------------------------------------------------------------------------------------------------------------------
  protected init() {}

//----------------------------------------------------------------------------------------------------------------------
  private _componentDidMount() {
    this.componentDidMount()
  }

//----------------------------------------------------------------------------------------------------------------------
  public componentDidMount() {}

//----------------------------------------------------------------------------------------------------------------------
  get element() {
    return this._element
  }

//----------------------------------------------------------------------------------------------------------------------
  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)

    Object.values(this.children).forEach((child) =>
                                           child.dispatchComponentDidMount(),
    )
  }

//----------------------------------------------------------------------------------------------------------------------
  public dispatchComponentDidUpdate() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDU)

    Object.values(this.children).forEach((child) =>
                                           child.dispatchComponentDidUpdate(),
    )
  }

//----------------------------------------------------------------------------------------------------------------------
  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

//----------------------------------------------------------------------------------------------------------------------
  protected componentDidUpdate(oldProps: any, newProps: any) {
    return true
  }

//----------------------------------------------------------------------------------------------------------------------
  public setProps = (nextProps: any) => {
    if (!nextProps) {
      return
    }
    Object.assign(this.props, nextProps)
  }

//----------------------------------------------------------------------------------------------------------------------
  private _render() {
    const fragment = this.render()

    const newElement = fragment.firstElementChild as HTMLElement

    this._element?.replaceWith(newElement)

    this._element = newElement

    this._addEvents()
  }

//----------------------------------------------------------------------------------------------------------------------
  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context }

    Object.entries(this.children).forEach(([ name, component ]) => {
      contextAndStubs[name] = `<div data-id='${ component.id }'></div>`
    })

    const html = template(contextAndStubs)

    const temp = document.createElement('template')

    temp.innerHTML = html

    Object.entries(this.children).forEach(([ _, component ]) => {
      const stub = temp.content.querySelector(`[data-id="${ component.id }"]`)
      if (!stub) {
        return
      }
      stub.replaceWith(component.getContent()!)
    })

    return temp.content
  }

//----------------------------------------------------------------------------------------------------------------------
  protected render(): DocumentFragment {
    return new DocumentFragment()
  }

//----------------------------------------------------------------------------------------------------------------------
  public getContent() {
    return this.element
  }

//----------------------------------------------------------------------------------------------------------------------
  private _makePropsProxy(props: any) {

    const self = this

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop, value) {
        const oldTarget = { ...target }

        target[prop] = value

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

//----------------------------------------------------------------------------------------------------------------------
  protected _createDocumentElement(tagName: string) {
    return document.createElement(tagName)
  }

//----------------------------------------------------------------------------------------------------------------------
  protected show() {
    this.getContent()!.style.display = 'block'
  }

//----------------------------------------------------------------------------------------------------------------------
  protected hide() {
    this.getContent()!.style.display = 'none'
  }
}

//----------------------------------------------------------------------------------------------------------------------
export default Block
