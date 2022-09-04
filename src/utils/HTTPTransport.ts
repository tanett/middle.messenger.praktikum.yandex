enum METHODS  {
    GET='GET',
    POST= 'POST',
    PUT ='PUT',
    DELETE= 'DELETE'
}

// Самая простая версия. Реализовать штучку со всеми проверками им предстоит в конце спринта
// Необязательный метод
function queryStringify(data) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    // Здесь достаточно и [object Object] для объекта
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

export type typeOptionsRequest = {
    headers: {[key: string]: string}
    data: any,
    timeout?: number,
    method?: string
}

type typeHttpTransport ={
    url: string,
    options: typeOptionsRequest
}

export class HTTPTransport {

    get = (url:string, options: typeOptionsRequest) => {

        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    };

    post = (url, options = {}) => {

        // @ts-ignore
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    put = (url, options = {}) => {
        // @ts-ignore
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    delete = (url, options = {}) => {
        // @ts-ignore
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    request = (url: string, options: { headers: { [p: string]: string }; data: any; method: string; timeout?: number }, timeout: number | undefined) => {
        const {headers = {}, method, data} = options;

        return new Promise(function(resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            if (typeof timeout === 'number') {xhr.timeout = timeout;}
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
