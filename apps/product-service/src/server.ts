import Fastify from 'fastify';

const app = Fastify({
  logger: true,
});

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Notebook Pro',
    price: 3500,
    stock: 10,
  },
  {
    id: 2,
    name: 'Mouse Gamer',
    price: 150,
    stock: 25,
  },
  {
    id: 3,
    name: 'Teclado Mecânico',
    price: 400,
    stock: 15,
  },
];

app.get('/products', async () => {
  return products;
});

app.get<{ Params: { id: string } }>(
  '/products/:id',
  async (request, reply) => {
    const id = Number(request.params.id);

    const product = products.find((p) => p.id === id);

    if (!product) {
      return reply.status(404).send({
        error: 'Produto não encontrado',
      });
    }

    return product;
  }
);

const start = async () => {
  try {
    await app.listen({
      port: 3001,
      host: '0.0.0.0',
    });

    console.log('🚀 Product Service running on port 3001');
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();