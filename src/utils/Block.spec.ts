import { Block } from './Block.ts';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Тестируем Block', () => {
  let PageBlock: typeof Block;

  before(() => {
    class TestBlock extends Block {
      constructor(props: any) {
        super({ ...props });
      }

      protected render(): string {
        // eslint-disable-next-line
        return `<div ><span id="test-string">{{testString}}</span></div>`;
      }
    }
    PageBlock = TestBlock;
  });

  it('Проверяем правильное создание компонента с пропсами', () => {
    const testString = 'test';
    const pageComponent = new PageBlock({ testString });
    const spanText = pageComponent.element?.querySelector('#test-string')?.innerHTML;
    expect(spanText).to.be.equal(testString);
  });

  it('Проверяем правильное переопределение пропсов', () => {
    const testString = 'test';
    const anotherTestString = 'anotherTestString';
    const pageComponent = new PageBlock({ testString });
    pageComponent.setProps({ testString: anotherTestString });
    const spanText = pageComponent.element?.querySelector('#test-string')?.innerHTML;
    expect(spanText).to.be.equal(anotherTestString);
  });

  it('Проверяем добавление событий компоненту', () => {
    const eventStub = sinon.stub();
    const pageComponent = new PageBlock({
      events: {
        click: eventStub,
      },
    });
    const event = new MouseEvent('click');
    pageComponent?.element?.dispatchEvent(event);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(eventStub.calledOnce).to.be.true;
  });
});
