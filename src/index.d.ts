import Router from './utils/Router.ts';

declare global {
  interface Window {
    router: Router;
  }
}
