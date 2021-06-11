const Page = require("../helpers/page");

let page;

beforeEach(async () => {
  page = await Page.build();
});

afterEach(async () => {
  await page.close();
});

describe("When user is not logged in", () => {
  it("User can not book a tour", async () => {
    const result = await page.request(
      "GET",
      "/api/v1/bookings/checkout-session/tourId"
    );

    expect(result.error.statusCode).toBe(401);
    expect(result.message).toBe("Please log in to get access");
  });
});
