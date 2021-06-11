const Page = require("./helpers/page");
const { deleteUserCollection } = require("./factories/userFactory");
// const jwtFactory = require("./factories/jwtFactory");

let page;

beforeAll(async () => {
  await deleteUserCollection();
});

beforeEach(async () => {
  page = await Page.build();
  await page.goto(Page.baseUrl);
});

afterEach(async () => {
  await page.close();
});

it("The logo is visible", async () => {
  const logo = await page.getContentOf('.navigation > a.item[href="/"]');
  expect(logo).not.toBeNull();
});

describe("Login button should work", () => {
  beforeEach(async () => {
    await page.goToLoginPage();
  });

  it("After clicking, page route should change)", async () => {
    const url = await page.url();
    expect(url).toMatch(/\/login/);
  });

  it("Go to dashboard page after login process", async () => {
    await page.login();
  });
});
