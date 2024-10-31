import Router from './Router.ts';
import { beforeEach } from 'mocha';
import { ROUTES } from '../constants/routes.ts';
import { expect } from 'chai';
import { Block } from './Block.ts';
import sinon from 'sinon';

describe('Тестируем Router', () => {
  let router: Router | null;

  beforeEach(() => {
    router = new Router('app');
    router.start();
  });

  afterEach(() => {
    sinon.restore();
    router = null;
  });

  it('Тестируем изначальную страницу', () => {
    router?.go(ROUTES.LOGIN);
    expect(window.location.pathname).to.equal(ROUTES.LOGIN);
  });

  it('Тестируем переход по страницам', () => {
    router?.use('/test', Block);
    const route = router?.getRoute('/test');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(route).to.exist;
  });

  it('Тестируем переход на страницу назад', () => {
    const goBack = sinon.stub(router!.history, 'back');
    router?.back();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(goBack.calledOnce).to.be.true;
  });

  it('Тестируем переход на страницу вперед', () => {
    const goForward = sinon.stub(router!.history, 'forward');
    router?.forward();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(goForward.calledOnce).to.be.true;
  });
});
