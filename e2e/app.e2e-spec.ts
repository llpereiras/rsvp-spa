import { RsvpSpaPage } from './app.po';

describe('rsvp-spa App', function() {
  let page: RsvpSpaPage;

  beforeEach(() => {
    page = new RsvpSpaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
