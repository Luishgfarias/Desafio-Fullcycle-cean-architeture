import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

describe("Unit test find product use case", () => {
  const product = new Product("123", "Product 1", 100);

  const MockRepository = () => ({
    find: jest.fn().mockResolvedValue(product),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  });

  it("should find a product", async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Product 1",
      price: 100,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new FindProductUseCase(productRepository);

    await expect(
      usecase.execute({
        id: "123",
      })
    ).rejects.toThrow("Product not found");
  });
});
