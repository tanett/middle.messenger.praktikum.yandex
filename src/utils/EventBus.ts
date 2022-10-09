export class EventBus {
  listeners: Record<string, any[]>

  public constructor() {
    this.listeners = {}
  }

  on(event: string, callback: any) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  protected off(event: string, callback: (props: any) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${ event }`)
    }
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    )
  }

  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${ event }`)
    }

    this.listeners[event].forEach(function(listener) {
      listener(...args)
    })
  }
}
