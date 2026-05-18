import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe("Unit test list product use case", () => {
  const product1 = new Product("1", "Product 1", 100);
  const product2 = new Product("2", "Product 2", 200);

  const MockRepository = () => ({
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockResolvedValue([product1, product2]),
  });

  it("should list products", async () => {
    const repository = MockRepository();
    const usecase = new ListProductUseCase(repository);

    const output = await usecase.execute({});

    expect(output).toEqual({
      products: [
        {
          id: product1.id,
          name: product1.name,
          price: product1.price,
        },
        {
          id: product2.id,
          name: product2.name,
          price: product2.price,
        },
      ],
    });
  });
});
