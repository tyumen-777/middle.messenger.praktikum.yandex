import Router from './utils/Router.ts';

export {};

declare global {
  interface Window {
    router: Router;
  }
}
