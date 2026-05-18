import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

describe("Unit test update product use case", () => {
  const product = new Product("1", "Product 1", 100);

  const MockRepository = () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockResolvedValue(product),
    update: jest.fn(),
  });

  it("should update a product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: product.id,
      name: "Product 2",
      price: 200,
    };

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
