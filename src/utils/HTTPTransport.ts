

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
}
  | {}

type typeHttpTransport = {
  url: string,
  options: typeOptionsRequest,
}

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }
//
//  public get<Response>(path = '/'): Promise<Response> {
//     return this.request(
//       url,
//
//       { ...options, method: METHODS.GET },
//       // @ts-ignore
//       options.timeout,
//     )
//   }
//
// public  post = (url: string, options = {}) => {
//     return this.request(
//       url,
//       // @ts-ignore
//       { ...options, method: METHODS.POST },
//       // @ts-ignore
//       options.timeout,
//     )
//   }
//
//  public put = (url: string, options = {}) => {
//     // @ts-ignore
//     return this.request(
//       url,
//       // @ts-ignore
//       { ...options, method: METHODS.PUT },
//       // @ts-ignore
//       options.timeout,
//     )
//   }
//
//  public delete = (url: string, options: typeOptionsRequest) => {
//     return this.request(
//       url,
//       // @ts-ignore
//       { ...options, method: METHODS.DELETE },
//       // @ts-ignore
//       options.timeout,
//     )
//   }
//
//   request = (
//     url: string,
//     options: {
//       headers: { [p: string]: string },
//       data: any,
//       method: string,
//       timeout?: number,
//     },
//     timeout: number | undefined,
//   ) => {
//     const { headers = {}, method, data } = options
//
//     return new Promise(function(resolve, reject) {
//       if (!method) {
//         reject('No method')
//         return
//       }
//
//       const xhr = new XMLHttpRequest()
//       const isGet = method === METHODS.GET
//
//       xhr.open(method, isGet && !!data ? `${ url }${ queryStringify(data) }` : url)
//
//       Object.keys(headers).forEach((key) => {
//         xhr.setRequestHeader(key, headers[key])
//       })
//
//       xhr.onload = function() {
//         resolve(xhr)
//       }
//
//       xhr.onabort = reject
//       xhr.onerror = reject
//
//       if (typeof timeout === 'number') {
//         xhr.timeout = timeout
//       }
//       xhr.ontimeout = reject
//
//       if (isGet || !data) {
//         xhr.send()
//       } else {
//         xhr.send(data)
//       }
//     })
//   }
  public get<Response>(path = '/'): Promise<Response> {
    return this.request<Response>(this.endpoint + path);
  }

  public post<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.POST,
      data,
    });
  }

  public put<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.PUT,
      data,
    });
  }

  public patch<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.PATCH,
      data,
    });
  }

  public delete<Response>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.DELETE,
      data
    });
  }

  private request<Response>(url: string, options: typeOptionsRequest = {method: METHODS.GET}): Promise<Response> {

    // @ts-ignore
    const {method, data} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = (e) => {

        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({reason: 'abort'});
      xhr.onerror = () => reject({reason: 'network error'});
      xhr.ontimeout = () => reject({reason: 'timeout'});

      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

