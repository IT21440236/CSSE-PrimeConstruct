const request = require("supertest");
const app = require("../server/routes/site");

describe("Site API endpoints", () => {
  it("should create a new site", async () => {
    const res = await request(app).post("/api/site").send({
      sitename: "Sample Site",
      siteAddress: "123 Street, City",
      contactno: 1234567890,
      budget: 100000,
      siteManager: "John Doe",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.sitename).toBe("Sample Site"); // assertion for the site name
    expect(res.body.siteAddress).toBe("123 Street, City"); // assertion for the site address
    expect(res.body.budget).toBe(100000); // assertion for the budget
    expect(res.body.siteManager).toBe("John Doe"); // assertion for the site manager
  });

  it("should not create a new site with invalid data", async () => {
    const res = await request(app).post("/api/site").send({
      sitename: "", // Empty site name to test invalid data
      siteAddress: "123 Street, City",
      contactno: 1234567890,
      budget: 100000,
      siteManager: "John Doe",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Please add a site name"); // Example assertion for the specific error message returned
  });

  it("should fetch all sites", async () => {
    const res = await request(app).get("/api/allsites");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.sites)).toBeTruthy(); // Assertion to check if the response body contains an array of sites
  });

  it("should update a site", async () => {
    const createResponse = await request(app).post("/api/site").send({
      sitename: "Sample Site",
      siteAddress: "123 Street, City",
      contactno: 1234567890,
      budget: 100000,
      siteManager: "John Doe",
    });

    const createdSiteId = createResponse.body._id; // Assuming the ID of the created site is returned in the response

    // Use the obtained ID to update the site and test the endpoint
    const res = await request(app).put("/api/site").send({
      id: createdSiteId, // Provide the ID of the site to be updated
      sitename: "Updated Site Name", // Updated data
      siteAddress: "456 Street, City", // Updated data
      contactno: 9876543210, // Updated data
      budget: 150000, // Updated data
      siteManager: "Jane Doe", // Updated data
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.sitename).toEqual("Updated Site Name"); // Assertion to check if the site name was successfully updated
    expect(res.body.siteAddress).toEqual("456 Street, City"); // Assertion to check if the site address was successfully updated
    expect(res.body.contactno).toEqual(9876543210); // Assertion to check if the contact number was successfully updated
    expect(res.body.budget).toEqual(150000); // Assertion to check if the budget was successfully updated
    expect(res.body.siteManager).toEqual("Jane Doe"); // Assertion to check if the site manager was successfully updated
  });

  it("should delete a site", async () => {
    const createResponse = await request(app).post("/api/site").send({
      sitename: "Sample Site",
      siteAddress: "123 Street, City",
      contactno: 1234567890,
      budget: 100000,
      siteManager: "John Doe",
    });

    const createdSiteId = createResponse.body._id; // Assuming the ID of the created site is returned in the response

    // Use the obtained ID to delete the site and test the endpoint
    const res = await request(app).delete(`/api/deletesite/${createdSiteId}`); // Replace :id with the actual ID

    expect(res.statusCode).toEqual(200);
    expect(res.body.sites).toBeDefined(); // Assertion to check if the list of sites is returned
  });

  afterAll((done) => {
    // Close the server connection after all tests
    app.close();
    done();
  });
});
