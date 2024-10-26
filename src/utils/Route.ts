import { Block } from './Block.ts';
import { isEqual } from './isEqual.ts';

export default class Route {
  private _pathname: string;

  private _block: Block | null;

  private readonly _blockClass: typeof Block;

  private _props: Record<string, any>;

  constructor(pathname: string, view: typeof Block, props: Record<string, any>) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  private renderDom(query: string, block: Block) {
    const root = document.getElementById(query);

    if (root) {
      root.append(block.getContent());
      block.dispatchComponentDidMount();
    }

    return root;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      this.renderDom(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}
