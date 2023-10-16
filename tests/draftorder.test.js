const request = require("supertest");
const app = require("../server/routes/draftorder");

describe("Draft Order API endpoints", () => {
  it("should create a new draft order", async () => {
    const res = await request(app).post("/api/addDraftOrder").send({
      placedDate: "2023-10-10",
      requiredDate: "2023-10-15",
      supplier: "Sample Supplier",
      draftStatus: "Pending",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.placedDate).toBe("2023-10-10"); // assertion for the placed date
    expect(res.body.requiredDate).toBe("2023-10-15"); // assertion for the required date
    expect(res.body.supplier).toBe("Sample Supplier"); // assertion for the supplier
    expect(res.body.draftStatus).toBe("Pending"); // assertion for the draft status
  });

  it("should not create a new draft order with incomplete data", async () => {
    const res = await request(app).post("/api/addDraftOrder").send({
      placedDate: "2023-10-10",
      requiredDate: "2023-10-15",
      supplier: "",
      draftStatus: "Pending",
    });
    expect(res.statusCode).toEqual(422);
    expect(res.text).toContain("plz fill the data"); // Example assertion for the specific error message returned
  });

  it("should fetch all draft orders", async () => {
    const res = await request(app).get("/api/getdraftdata");
    expect(res.statusCode).toEqual(201);
    expect(Array.isArray(res.body)).toBeTruthy(); // Assertion to check if the response body contains an array of draft orders
  });

  it("should delete a draft order", async () => {
    const createResponse = await request(app).post("/api/addDraftOrder").send({
      placedDate: "2023-10-10",
      requiredDate: "2023-10-15",
      supplier: "Sample Supplier",
      draftStatus: "Pending",
    });

    const createdDraftId = createResponse.body._id;

    // Use the obtained ID to delete the draft order and test the endpoint
    const res = await request(app).delete(`/api/deletedraft/${createdDraftId}`); // Replace :id with the actual ID

    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeDefined(); // Assertion to check if the deleted draft order exists
  });
});
