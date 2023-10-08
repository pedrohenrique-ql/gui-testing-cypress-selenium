describe('locales', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('.primary').click();
  });

  it('validate filters bar with contains value', () => {
    cy.clickInFirst('a[href="/admin/locales/"]');

    cy.get('[id="criteria_code_value"]').type('en');

    cy.get('*[class^="ui blue labeled icon button"]').click();

    cy.get('*[class^="ui labeled icon button "]').last().click();

    cy.get('body').should('contain', 'English (United States)');
  });

  it('should create a new locale', () => {
    cy.clickInFirst('a[href="/admin/locales/"]');

    cy.get('*[class^="ui right floated buttons"]').click();

    cy.get('*[id="sylius_locale_code"]').select('ak');

    cy.get('button.ui.labeled.icon.primary.button').click();

    cy.get('body').should('contain', 'ak Akan');
  });

  it('should filter locales with equal constraint', () => {
    cy.clickInFirst('a[href="/admin/locales/"]');

    cy.get('*[id="criteria_code_type"]').select('equal');

    cy.get('*[id="criteria_code_value"]').type('de_DE');

    cy.findByRole('button', { name: 'Filter' }).click();

    cy.findByText('English (United States)').should('not.exist');
    cy.get('body').should('contain', 'de_DE German (Germany)');
  });

  it('should clear filters', () => {
    cy.clickInFirst('a[href="/admin/locales/"]');

    cy.get('*[id="criteria_code_type"]').select('equal');

    cy.get('*[id="criteria_code_value"]').type('de_DE');

    cy.findByRole('button', { name: 'Filter' }).click();

    cy.findByText('English (United States)').should('not.exist');

    cy.findByRole('link', { name: /Clear filters/i }).click();

    cy.get('body').should('contain', 'English (United States)');
  });

  it('should clear filters', () => {
    cy.clickInFirst('a[href="/admin/locales/"]');

    cy.get('*[id="criteria_code_type"]').select('equal');

    cy.get('*[id="criteria_code_value"]').type('de_DE');

    cy.findByRole('button', { name: 'Filter' }).click();

    cy.findByText('English (United States)').should('not.exist');

    cy.findByRole('link', { name: /Clear filters/i }).click();

    cy.get('body').should('contain', 'English (United States)');
  });

  it.only('should edit a locale', () => {
    cy.clickInFirst('a[href="/admin/locales/"]');

    cy.scrollTo('bottom');

    cy.get('*[class^="ui labeled icon button "]').last().click();

    cy.findByRole('option', 'Chinese (China)').should('exist');

    cy.findByRole('button', { name: 'Save changes' }).click();

    cy.get('body').should('contain', 'zh_CN Chinese (China)');
  });
});
