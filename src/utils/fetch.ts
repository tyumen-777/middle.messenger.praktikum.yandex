export enum METHOD_TYPES {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

interface IOptions {
  headers?: Record<string, string>,
  method: METHOD_TYPES,
  data?: Document | XMLHttpRequestBodyInit;
  timeout?: number;
}

function queryStringify(queryObj: Record<string, unknown>) {
  const keys = Object.keys(queryObj);
  return keys.reduce((result, key, index) => `${result}${key}=${queryObj[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export class HTTPTransport {
  public get = (url: string, options: IOptions = { method: METHOD_TYPES.GET }) => {
    this.request(url, { ...options, method: METHOD_TYPES.GET });
  };

  public put = (url: string, options: IOptions = { method: METHOD_TYPES.GET }) => {
    this.request(url, { ...options, method: METHOD_TYPES.PUT });
  };

  public post = (url: string, options: IOptions = { method: METHOD_TYPES.GET }) => {
    this.request(url, { ...options, method: METHOD_TYPES.POST });
  };

  public delete = (url: string, options: IOptions = { method: METHOD_TYPES.GET }) => {
    this.request(url, { ...options, method: METHOD_TYPES.DELETE });
  };

  public request = (url: string, options: IOptions, queryObj: Record<string, unknown> = {}) => {
    const {
      data, method, timeout, headers,
    } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      let fullUrl = url;

      if (method === METHOD_TYPES.GET && queryObj) {
        fullUrl = `${url}${queryStringify(queryObj)}`;
      }

      xhr.open(method, fullUrl);

      if (timeout) {
        xhr.timeout = timeout;
      }

      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onload = resolve;

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.ontimeout = reject;

      if (method === METHOD_TYPES.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
