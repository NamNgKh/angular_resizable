import { ResizablePage } from './app.po';

describe('resizable App', () => {
  let page: ResizablePage;

  beforeEach(() => {
    page = new ResizablePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
