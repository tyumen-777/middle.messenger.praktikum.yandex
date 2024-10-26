enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method?: METHODS;
  timeout?: number;
  headers?: Record<string, string>;
  data?: any;
};

type HTTPMethod = <R = unknown>(url: string, options?: Options) => Promise<R>;

function queryStringify(data: Record<string, string>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export default class HTTPTransport {
  baseURL: string = 'https://ya-praktikum.tech/api/v2';

  get: HTTPMethod = (url, options) => {
    return this.request(this.baseURL + url, { ...options, method: METHODS.GET }, options?.timeout);
  };

  post: HTTPMethod = (url, options) => {
    return this.request(this.baseURL + url, { ...options, method: METHODS.POST }, options?.timeout);
  };

  put: HTTPMethod = (url, options) => {
    return this.request(this.baseURL + url, { ...options, method: METHODS.PUT }, options?.timeout);
  };

  delete: HTTPMethod = (url, options) => {
    return this.request(
      this.baseURL + url,
      { ...options, method: METHODS.DELETE },
      options?.timeout,
    );
  };

  request(url: string, options: Options = {}, timeout = 5000): Promise<any> {
    const { headers = {}, method, data } = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        if (xhr.status < 400) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      };

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      xhr.onabort = () => reject(new Error('Request was aborted!'));
      xhr.onerror = () => reject(new Error(`There is an error during request ${xhr.statusText}`));

      xhr.timeout = timeout;
      xhr.ontimeout = () => reject(new Error('Timeout while requesting!'));

      if (isGet || !data) {
        xhr.send();
      } else {
        const preparedData = data instanceof FormData ? data : JSON.stringify(data);
        if (!(data instanceof FormData)) {
          xhr.setRequestHeader('Content-type', 'application/json');
        }
        xhr.send(preparedData);
      }
    });
  }
}
