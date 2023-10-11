const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('locales', () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  });

  after(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    driver.manage().deleteAllCookies();
    await driver.get('http://localhost:9990/admin');
    // await driver.get('http://150.165.75.99:9990/admin');
    await driver.findElement(By.id('_username')).sendKeys('sylius');
    await driver.findElement(By.id('_password')).sendKeys('sylius');
    await driver.findElement(By.css('.primary')).click();
    // await driver.sleep(1000);
  });

  // Test 1
  it('validate filters bar with contains value', async () => {
    // Click in locales in side menu
    await driver.findElement(By.linkText('Locales')).click();

    // Type in value input to search for specify locale
    await driver.findElement(By.id('criteria_code_value')).sendKeys('en');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the last locale
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[buttons.length - 1].click();

    // Assert that locale is English (United States)
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('English (United States)'));
  });

  // Test 2
  it('should create a new locale', async () => {
    await driver.findElement(By.linkText('Locales')).click();

    await driver.findElement(By.css('*[class^="ui right floated buttons"]')).click();

    await driver.findElement(By.id('sylius_locale_code')).sendKeys('ak');

    await driver.findElement(By.css('button.ui.labeled.icon.primary.button')).click();

    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('ak Akan'));
  });

  // Test 3
  it('should filter locales by equal filter', async () => {
    await driver.findElement(By.css('a[href="/admin/locales/"]')).click();

    const criteriaCodeType = await driver.findElement(By.id('criteria_code_type'));
    await criteriaCodeType.findElement(By.css('option[value="equal"]')).click();

    await driver.findElement(By.id('criteria_code_value')).sendKeys('de_DE');

    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('de_DE German (Germany)'));
    assert(!bodyText.includes('English (United States)'));
  });

  // Test 4
  it('should filter locales by not equal filter', async () => {
    await driver.findElement(By.css('a[href="/admin/locales/"]')).click();

    const criteriaCodeType = await driver.findElement(By.id('criteria_code_type'));
    await criteriaCodeType.findElement(By.css('option[value="not_equal"]')).click();

    await driver.findElement(By.id('criteria_code_value')).sendKeys('de_DE');

    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(!bodyText.includes('de_DE German (Germany)'));
    assert(bodyText.includes('English (United States)'));
  });

  // Test 5
  it('should clear filters', async () => {
    await driver.findElement(By.css('a[href="/admin/locales/"]')).click();

    const criteriaCodeType = await driver.findElement(By.id('criteria_code_type'));
    await criteriaCodeType.findElement(By.css('option[value="equal"]')).click();

    await driver.findElement(By.id('criteria_code_value')).sendKeys('de_DE');

    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    let bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(!bodyText.includes('English (United States)'));

    await driver.findElement(By.css('*[class^="icon remove"]')).click();

    bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('English (United States)'));
  });

  // Test 6
  it('should show a success message when edit a locale', async () => {
    await driver.findElement(By.css('a[href="/admin/locales/"]')).click();

    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[buttons.length - 1].click();

    await driver.findElement(By.css('*[id="sylius_save_changes_button"]')).click();

    let bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Locale has been successfully updated.'));
  });

  // Test 7
  it('should order by Name in descending order after filter with starts_with', async () => {
    await driver.findElement(By.css('a[href="/admin/locales/"]')).click();
    
    await driver.findElement(By.css('*[class^="icon remove"]')).click();

    const criteriaCodeType = await driver.findElement(By.id('criteria_code_type'));
    await criteriaCodeType.findElement(By.css('option[value="starts_with"]')).click();

    await driver.findElement(By.id('criteria_code_value')).sendKeys('e');

    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    let nameColumnHeader = await driver.findElement(By.css('*[class^="sortable sylius-table-column-name"]'));
    await nameColumnHeader.click();
    nameColumnHeader = await driver.findElement(By.css('*[class^="sortable sorted ascending sylius-table-column-name"]'));
    await nameColumnHeader.click();

    const firstRowText = await driver.findElement(By.css('tbody tr.item:first-child td:nth-child(2)')).getText();
    assert(firstRowText.includes('es_MX Spanish (Mexico)'));
  });

  // Test 8
  it('should order by Name in descending order after filter with not contains', async () => {
    await driver.findElement(By.css('a[href="/admin/locales/"]')).click();
    
    await driver.findElement(By.css('*[class^="icon remove"]')).click();

    const criteriaCodeType = await driver.findElement(By.id('criteria_code_type'));
    await criteriaCodeType.findElement(By.css('option[value="not_contains"]')).click();

    await driver.findElement(By.id('criteria_code_value')).sendKeys('e');

    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    let nameColumnHeader = await driver.findElement(By.css('*[class^="sortable sylius-table-column-name"]'));
    await nameColumnHeader.click();
    nameColumnHeader = await driver.findElement(By.css('*[class^="sortable sorted ascending sylius-table-column-name"]'));
    await nameColumnHeader.click();

    const firstRowText = await driver.findElement(By.css('tbody tr.item:first-child td:nth-child(2)')).getText();
    assert(firstRowText.includes('zh_CN Chinese (China)'));
  });


  // Test 9
  it('should filter locales by starts with filter', async () => {
    await driver.findElement(By.css('a[href="/admin/locales/"]')).click();

    const criteriaCodeType = await driver.findElement(By.id('criteria_code_type'));
    await criteriaCodeType.findElement(By.css('option[value="starts_with"]')).click();

    await driver.findElement(By.id('criteria_code_value')).sendKeys('e');

    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(!bodyText.includes('Polish (Poland)'));
    assert(bodyText.includes('en_US English (United States)'));
  });

  // Test 10
  it('should filter locales by not in filter', async () => {
    await driver.findElement(By.css('a[href="/admin/locales/"]')).click();

    const criteriaCodeType = await driver.findElement(By.id('criteria_code_type'));
    await criteriaCodeType.findElement(By.css('option[value="not_in"]')).click();

    await driver.findElement(By.id('criteria_code_value')).sendKeys('pt_pt');

    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(!bodyText.includes('Portuguese (Portugal)'));
    assert(bodyText.includes('fr_FR French (France)'));
  });
});
