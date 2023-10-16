const request = require("supertest");
const app = require("../server/routes/receipt"); // Replace this with the path to your server file

describe("Receipt API endpoints", () => {
  it("should create a new receipt", async () => {
    const res = await request(app).post("/api/receipt").send({
      productname: "Sample Product",
      productQuantity: 10,
      deliveryDate: "2023-10-20",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.productname).toBe("Sample Product"); // assertion for the product name
    expect(res.body.productQuantity).toBe(10); // assertion for the product quantity
    expect(res.body.deliveryDate).toBe("2023-10-20"); // assertion for the delivery date
  });

  it("should not create a new receipt with invalid data", async () => {
    const res = await request(app).post("/api/receipt").send({
      productname: "",
      productQuantity: 10,
      deliveryDate: "2023-10-20",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Please add the product name"); // Example assertion for the specific error message returned
  });

  it("should fetch all receipts", async () => {
    const res = await request(app).get("/api/allreceipts");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.receipts)).toBeTruthy(); // Assertion to check if the response body contains an array of receipts
  });

  it("should update a receipt", async () => {
    const createResponse = await request(app).post("/api/receipt").send({
      productname: "Sample Product",
      productQuantity: 10,
      deliveryDate: "2023-10-20",
    });

    const createdReceiptId = createResponse.body._id; // Assuming the ID of the created receipt is returned in the response

    // Use the obtained ID to update the receipt and test the endpoint
    const res = await request(app)
      .put("/api/receipt")
      .send({
        id: createdReceiptId, // Provide the ID of the receipt to be updated
        productname:
          "Updated Product " + Math.random().toString(36).substring(7), // Updated data with a random string
        productQuantity: Math.floor(Math.random() * 10) + 1, // Updated data with a random number between 1 and 10
        deliveryDate: "2023-10-" + (Math.floor(Math.random() * 10) + 20), // Updated data with a random date between 2023-10-20 and 2023-10-29
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.productname).toContain("Updated Product"); // Assertion to check if the product name was successfully updated
    expect(res.body.productQuantity).toBeGreaterThanOrEqual(1); // Assertion to check if the product quantity was successfully updated
    expect(res.body.productQuantity).toBeLessThanOrEqual(10); // Assertion to check if the product quantity was successfully updated
    expect(res.body.deliveryDate).toContain("2023-10-"); // Assertion to check if the delivery date was successfully updated
  });

  it("should delete a receipt", async () => {
    const createResponse = await request(app).post("/api/receipt").send({
      productname: "Sample Product",
      productQuantity: 10,
      deliveryDate: "2023-10-20",
    });

    const createdReceiptId = createResponse.body._id; // Assuming the ID of the created receipt is returned in the response

    // Use the obtained ID to delete the receipt and test the endpoint
    const res = await request(app).delete(
      `/api/deletereceipt/${createdReceiptId}`
    ); // Replace :id with the actual ID

    expect(res.statusCode).toEqual(200);
    expect(res.body.receipts).toBeDefined(); // Assertion to check if the list of receipts is returned
  });
});
