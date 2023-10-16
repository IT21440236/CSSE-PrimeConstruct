const request = require("supertest");
const app = require("../server/routes/supProduct"); // Replace this with the path to your server file

describe("Supplier API endpoints", () => {
  it("should create a new product for the supplier", async () => {
    const res = await request(app).post("/api/addProductSup").send({
      supplierName: "Sample Supplier",
      productName: "Sample Product",
      productPrice: 100,
      productDescription: "Sample Product Description",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.supplierName).toBe("Sample Supplier"); // assertion for the supplier name
    expect(res.body.productName).toBe("Sample Product"); // assertion for the product name
    expect(res.body.productPrice).toBe(100); // assertion for the product price
    expect(res.body.productDescription).toBe("Sample Product Description"); // assertion for the product description
  });

  it("should not create a new product for the supplier with incomplete data", async () => {
    const res = await request(app).post("/api/addProductSup").send({
      supplierName: "Sample Supplier",
      productName: "",
      productPrice: 100,
      productDescription: "Sample Product Description",
    });
    expect(res.statusCode).toEqual(422);
    expect(res.text).toContain("plz fill the data"); // Example assertion for the specific error message returned
  });

  it("should fetch products for the supplier", async () => {
    const res = await request(app).get("/api/getProduct");
    expect(res.statusCode).toEqual(201);
    expect(Array.isArray(res.body)).toBeTruthy(); // Assertion to check if the response body contains an array of products
  });

  it("should delete a product for the supplier", async () => {
    const createResponse = await request(app).post("/api/addProductSup").send({
      supplierName: "Sample Supplier",
      productName: "Sample Product",
      productPrice: 100,
      productDescription: "Sample Product Description",
    });

    const createdProductId = createResponse.body._id; // Assuming the ID of the created product is returned in the response

    // Use the obtained ID to delete the product and test the endpoint
    const res = await request(app).delete(
      `/api/deleteproductsup/${createdProductId}`
    ); // Replace :id with the actual ID

    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeDefined(); // Assertion to check if the deleted product exists
  });

  it("should update a product for the supplier", async () => {
    const createResponse = await request(app).post("/api/addProductSup").send({
      supplierName: "Sample Supplier",
      productName: "Sample Product",
      productPrice: 100,
      productDescription: "Sample Product Description",
    });

    const createdProductId = createResponse.body._id; // Assuming the ID of the created product is returned in the response

    // Use the obtained ID to update the product and test the endpoint
    const res = await request(app)
      .patch(`/api/updateproductsup/${createdProductId}`)
      .send({
        supplierName: "Updated Supplier",
        productName: "Updated Product",
        productPrice: 150,
        productDescription: "Updated Product Description",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.supplierName).toEqual("Updated Supplier"); // Assertion to check if the supplier name was successfully updated
    expect(res.body.productName).toEqual("Updated Product"); // Assertion to check if the product name was successfully updated
    expect(res.body.productPrice).toEqual(150); // Assertion to check if the product price was successfully updated
    expect(res.body.productDescription).toEqual("Updated Product Description"); // Assertion to check if the product description was successfully updated
  });

  it("should fetch a single product for the supplier", async () => {
    const createResponse = await request(app).post("/api/addProductSup").send({
      supplierName: "Sample Supplier",
      productName: "Sample Product",
      productPrice: 100,
      productDescription: "Sample Product Description",
    });

    const createdProductId = createResponse.body._id; // Assuming the ID of the created product is returned in the response

    // Use the obtained ID to fetch the single product and test the endpoint
    const res = await request(app).get(
      `/api/getOneSupProduct/${createdProductId}`
    );

    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeDefined(); // Assertion to check if the single product exists
  });
});
