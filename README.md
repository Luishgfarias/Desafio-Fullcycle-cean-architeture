# fc-clean-architecture

## Como rodar

Instale as dependencias:

```bash
npm install
```

Suba a API em ambiente de desenvolvimento:

```bash
npm run dev
```

A API ficara disponivel em:

```text
http://localhost:3000
```

Endpoints disponiveis para listagem:

```text
GET /customer
GET /product
```

Para buscar a listagem de produtos em JSON:

```bash
curl http://localhost:3000/product
```

Para buscar a listagem de produtos em XML:

```bash
curl -H "Accept: application/xml" http://localhost:3000/product
```

## Testes

Execute todos os testes:

```bash
npm test
```

Execute apenas os testes E2E da API:

```bash
npx jest src/infrastructure/api/__tests__
```

Execute apenas o teste E2E da listagem de produtos:

```bash
npx jest src/infrastructure/api/__tests__/product.e2e.spec.ts
```

Se quiser executar apenas os testes dos use cases de `Product`:

```bash
npx jest src/usecase/product
```
