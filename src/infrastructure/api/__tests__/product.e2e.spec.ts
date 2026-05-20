import request from "supertest";
import { app, sequelize } from "../express";
import ProductModel from "../../product/repository/sequelize/product.model";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product A",
      price: 100,
    });

    await ProductModel.create({
      id: "2",
      name: "Product B",
      price: 200,
    });

    const response = await request(app).get("/product").send();

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(2);
    expect(response.body.products).toEqual(
      expect.arrayContaining([
        {
          id: "1",
          name: "Product A",
          price: 100,
        },
        {
          id: "2",
          name: "Product B",
          price: 200,
        },
      ])
    );

    const responseXML = await request(app)
      .get("/product")
      .set("Accept", "application/xml")
      .send();

    expect(responseXML.status).toBe(200);
    expect(responseXML.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`
    );
    expect(responseXML.text).toContain(`<products>`);
    expect(responseXML.text).toContain(`<product>`);
    expect(responseXML.text).toContain(`<id>1</id>`);
    expect(responseXML.text).toContain(`<name>Product A</name>`);
    expect(responseXML.text).toContain(`<price>100</price>`);
    expect(responseXML.text).toContain(`<id>2</id>`);
    expect(responseXML.text).toContain(`<name>Product B</name>`);
    expect(responseXML.text).toContain(`<price>200</price>`);
    expect(responseXML.text).toContain(`</product>`);
    expect(responseXML.text).toContain(`</products>`);
  });
});
