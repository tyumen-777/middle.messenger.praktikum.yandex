import { Block } from './Block.ts';
import Route from './Route.ts';
import { AuthRoutes, ROUTES } from '../constants/routes.ts';

export default class Router {
  private static __instance: Router;

  public routes: Array<Route> = [];

  private _rootQuery: string = '';

  public history: History = window.history;

  private _currentRoute: Route | null = null;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  public start() {
    window.onpopstate = ({ currentTarget }) => {
      if (
        currentTarget &&
        'location' in currentTarget &&
        currentTarget.location instanceof Location
      ) {
        this._onRoute(window.location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    const isLogged = localStorage.getItem('isLogged');
    const isPrivateRoute = AuthRoutes.some((item) => item === (pathname as ROUTES));

    if (isPrivateRoute && isLogged) {
      this.go(ROUTES.LOGIN);
      return;
    }

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  public go(pathname: ROUTES) {
    if (pathname) {
      this.history.pushState({}, '', pathname);
      this._onRoute(pathname);
    }
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  public getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
