const puppeteer = require("puppeteer");

const { createTestUser, testUser } = require("../factories/userFactory");

class CustomPage {
  static baseUrl = "http://localhost:3000";
  static baseAPIUrl = "http://localhost:5050";

  constructor(page) {
    this.page = page;
  }

  static async build() {
    const browser = await puppeteer.launch({
      headless: true
    });
    const page = await browser.newPage();

    const customPage = new CustomPage(page);

    return new Proxy(customPage, {
      get: (_, property) => customPage[property] || browser[property] || page[property]
    });
  }

  async getContentOf(selector) {
    return await this.page.$eval(selector, el => el.innerHTML);
  }

  async goToLoginPage() {
    await this.page.click('.right > a.item[href="/login"]');
  }

  async login() {
    await createTestUser();
    // Type email & password
    await this.page.type('.form input[type="email"]', testUser.email);
    await this.page.type('.form input[type="password"]', testUser.password);

    await this.page.click('.form button[type="submit"]');

    await this.page.waitFor(".toggle.checkbox");

    const url = await this.page.url();

    expect(url).toMatch(/\/me\/settings/);
  }

  request(method, path, data) {
    return this.page.evaluate(
      (_method, _path, _data, _baseUrl) =>
        fetch(`${_baseUrl}${_path}`, {
          method: _method,
          credentials: "same-origin",
          body: JSON.stringify(_data),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => res.json()),
      method,
      path,
      data,
      CustomPage.baseAPIUrl
    );
  }
}

module.exports = CustomPage;
