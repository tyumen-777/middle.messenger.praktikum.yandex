import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import HTTPTransport from './HttpTransport.ts';
import { expect } from 'chai';

describe('Тестируем HttpTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let request: SinonFakeXMLHttpRequest;
  let http: HTTPTransport;
  const baseURL = 'https://ya-praktikum.tech/api/v2';
  const testUrl = '/test';

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = (req) => {
      request = req;
    };

    http = new HTTPTransport();
  });

  afterEach(() => xhr.restore());

  describe('Тестируем GET запрос', () => {
    beforeEach(() => {
      http.get(testUrl).catch(console.error);
    });

    it('Проверяем запрос на GET метод', () => {
      expect(request.method).to.be.equal('GET');
    });

    it('Проверяем URL', () => {
      expect(request.url).to.be.equal(baseURL + testUrl);
    });

    it('Проверяем URL с query параметрами', () => {
      http.get(testUrl, { data: { test1: 'test1', test2: 'test2' } }).catch(console.error);
      const queryParams = '?test1=test1&test2=test2';
      expect(request.url).to.be.equal(baseURL + testUrl + queryParams);
    });
  });

  describe('Тестируем POST запрос', () => {
    const data = { test1: 'test1' };

    beforeEach(() => {
      http.post(testUrl, { data }).catch(console.error);
    });
    it('Проверяем запрос на POST метод', () => {
      expect(request.method).to.be.equal('POST');
    });
    it('Проверяем URL', () => {
      expect(request.url).to.be.equal(baseURL + testUrl);
    });
    it('Проверяем URL с body', () => {
      const preparedData = JSON.stringify(data);
      expect(request.requestBody).to.be.equal(preparedData);
    });
  });

  describe('Тестируем PUT запрос', () => {
    const data = { test1: 'test1' };

    beforeEach(() => {
      http.put(testUrl, { data }).catch(console.error);
    });

    it('Проверяем запрос на PUT метод', () => {
      expect(request.method).to.be.equal('PUT');
    });

    it('Проверяем URL', () => {
      expect(request.url).to.be.equal(baseURL + testUrl);
    });

    it('Проверяем URL с body', () => {
      const preparedData = JSON.stringify(data);
      expect(request.requestBody).to.be.equal(preparedData);
    });
  });

  describe('Тестируем DELETE запрос', () => {
    const data = { test1: 'test1' };

    beforeEach(() => {
      http.delete(testUrl, { data }).catch(console.error);
    });

    it('Проверяем запрос на DELETE метод', () => {
      expect(request.method).to.be.equal('DELETE');
    });

    it('Проверяем URL', () => {
      expect(request.url).to.be.equal(baseURL + testUrl);
    });

    it('Проверяем URL с body', () => {
      const preparedData = JSON.stringify(data);
      expect(request.requestBody).to.be.equal(preparedData);
    });
  });
});
