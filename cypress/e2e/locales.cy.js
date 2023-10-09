describe('locales', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('.primary').click();
  });

  // Test 1
  it('validate filters bar with contains value', () => {
    cy.clickInFirst('a[href="/admin/locales/"]');

    cy.get('[id="criteria_code_value"]').type('en');

    cy.get('*[class^="ui blue labeled icon button"]').click();

    cy.get('*[class^="ui labeled icon button "]').last().click();

    cy.get('body').should('contain', 'English (United States)');
  });

  // Test 2
  it('should create a new locale', () => {
    cy.clickInFirst('a[href="/admin/locales/"]');

    cy.get('*[class^="ui right floated buttons"]').click();

    cy.get('*[id="sylius_locale_code"]').select('ak');

    cy.get('button.ui.labeled.icon.primary.button').click();

    cy.get('body').should('contain', 'ak Akan');
  });

  // Test 3
  it('should filter locales by equal filter', () => {
    cy.clickInFirst('a[href="/admin/locales/"]');

    cy.get('*[id="criteria_code_type"]').select('equal');

    cy.get('*[id="criteria_code_value"]').type('de_DE');

    cy.findByRole('button', { name: 'Filter' }).click();

    cy.findByText('English (United States)').should('not.exist');
    cy.get('body').should('contain', 'de_DE German (Germany)');
  });

  // Test 4
  it('should filter locales by not equal filter', () => {
    cy.clickInFirst('a[href="/admin/locales/"]');

    cy.get('*[id="criteria_code_type"]').select('not_equal');

    cy.get('*[id="criteria_code_value"]').type('de_DE');

    cy.findByRole('button', { name: 'Filter' }).click();

    cy.findByText('de_DE German (Germany)').should('not.exist');
    cy.get('body').should('contain', 'English (United States)');
  });

  // Test 5
  it('should clear filters', () => {
    cy.clickInFirst('a[href="/admin/locales/"]');

    cy.get('*[id="criteria_code_type"]').select('equal');

    cy.get('*[id="criteria_code_value"]').type('de_DE');

    cy.findByRole('button', { name: 'Filter' }).click();

    cy.findByText('English (United States)').should('not.exist');

    cy.findByRole('link', { name: /Clear filters/i }).click();

    cy.get('body').should('contain', 'English (United States)');
  });

  // Test 6
  it.only('should show a success message when edit a locale', () => {
    cy.clickInFirst('a[href="/admin/locales/"]');

    cy.get('*[class^="ui labeled icon button "]').last().click();

    cy.findByRole('button', { name: 'Save changes' }).click();

    cy.findByText('Locale has been successfully updated.').should('exist');

    cy.get('*[class^="close icon"]').last().click();

    cy.findByText('Locale has been successfully updated.').should('not.be.visible');
  });
});
