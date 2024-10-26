import { EventBus } from './EventBus.ts';
import { v4 as uuidv4 } from 'uuid';
import Handlebars from 'handlebars';

interface BlockProps {
  [key: string]: any;
}

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  protected props: BlockProps;

  protected _id: string = uuidv4();

  protected children: Record<string, Block>;

  private eventBus: () => EventBus;

  protected componentDidMount(): void {}

  protected _element: HTMLElement | null = null;

  protected parentNode: Node | null = null;

  // _meta = null;

  constructor(propsWithChildren: BlockProps = {}) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenPropsAndProps(propsWithChildren);
    this.children = children;

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents(): void {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element?.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _removeEvents(): void {
    const { events } = this.props;
    if (events) {
      Object.keys(events).forEach((eventName) => {
        if (this._element) {
          this._element.removeEventListener(eventName, events[eventName]);
        }
      });
    }
  }

  // _createResources() {
  //   const { tagName } = this._meta;
  //   this._element = this._createDocumentElement(tagName);
  // }

  protected init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._render();
    }
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(_oldProps: BlockProps, _newProps: BlockProps): boolean {
    return true;
  }

  private _getChildrenPropsAndProps(propsAndChildren: BlockProps): {
    children: Record<string, Block>;
    props: BlockProps;
    lists: Record<string, any[]>;
  } {
    const children: Record<string, Block> = {};
    const props: BlockProps = {};
    const lists: Record<string, any[]> = {};

    //TODO: check
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  protected addAttributes(): void {
    const { attr = {} } = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value as string);
      }
    });
  }

  public setProps = (nextProps: BlockProps): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const propsAndStubs = { ...this.props };
    // const randId: string = uuidv4();

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    //TODO: check
    const childrenProps: Block[] = [];
    Object.entries(propsAndStubs).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        propsAndStubs[key] = value
          .map((item) => {
            if (item instanceof Block) {
              childrenProps.push(item);
              return `<div data-id="${item._id}"></div>`;
            }

            return item;
          })
          .join('');
      }
    });

    // Object.entries(this.lists).forEach(([key]) => {
    //   propsAndStubs[key] = `<div data-id="__l_${randId}"></div>`;
    // });

    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    [...Object.values(this.children), ...childrenProps].forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    // Object.entries(this.lists).forEach(([, child]) => {
    //   const listCont = this._createDocumentElement('template');
    //   child.forEach((item) => {
    //     if (item instanceof Block) {
    //       listCont.content.append(item.getContent());
    //     } else {
    //       listCont.content.append(`${item}`);
    //     }
    //   });
    //   const stub = fragment.content.querySelector(`[data-id="__l_${randId}"]`);
    //   if (stub) {
    //     stub.replaceWith(listCont.content);
    //   }
    // });

    if (this._element) {
      this._removeEvents();
    }

    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
    this.addAttributes();
  }

  // Может переопределять пользователь, необязательно трогать
  protected render(): string {
    return '';
  }

  public getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('Element is not created');
    }
    return this._element;
  }

  private _makePropsProxy(props: BlockProps): BlockProps {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target: BlockProps, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target: BlockProps, prop: string, value: any) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },

      deleteProperty() {
        throw new Error('Нет прав');
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLTemplateElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  public show() {
    const content = this.getContent();
    if (content) {
      this.parentNode?.appendChild(content);
    }
  }

  public hide() {
    const content = this.getContent();
    this.parentNode = this._element?.parentElement as HTMLElement;

    if (content) {
      content.remove();
    }
  }
}
