export enum METHODS {
  GET = 'Get',
  POST = 'Post',
  PUT = 'Put',
  PATCH = 'Patch',
  DELETE = 'Delete'
}


export type typeOptionsRequest =
  {
    method: METHODS;
    data?: any;
    sendFile?: boolean
  }


type typeHttpTransport = {
  url: string,
  options: typeOptionsRequest,
}

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2'
  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = `${ HTTPTransport.API_URL }${ endpoint }`
  }


  public get<Response>(path = '/'): Promise<Response> {
    return this.request<Response>(this.endpoint + path)
  }

  public post<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.POST,
      data,
    })
  }

  public put<Response = void>(path: string, data: unknown, sendFile?: boolean): Promise<Response> {

    return this.request<Response>(this.endpoint + path, {
      method: METHODS.PUT,
      data,
      sendFile: sendFile
    })
  }

  public patch<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.PATCH,
      data,
    })
  }

  public delete<Response>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.DELETE,
      data,
    })
  }

  private request<Response>(url: string, options: typeOptionsRequest = { method: METHODS.GET }): Promise<Response> {

    // @ts-ignore
    const { method, data } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)

      xhr.onreadystatechange = (e) => {

        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response)
          } else {
            reject(xhr.response)
          }
        }
      }

      xhr.onabort = () => reject({ reason: 'abort' })
      xhr.onerror = () => reject({ reason: 'network error' })
      xhr.ontimeout = () => reject({ reason: 'timeout' })


      if (options.sendFile) {

        xhr.withCredentials = true
        xhr.responseType = 'json'

          xhr.send(data)

      } else {
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.withCredentials = true
        xhr.responseType = 'json'

        if (method === METHODS.GET || !data) {
          xhr.send()
        } else {
          xhr.send(JSON.stringify(data))
        }
      }

    })
  }
}

