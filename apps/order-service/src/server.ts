import Fastify from 'fastify';

const app = Fastify({
  logger: true,
});

interface Order {
  id: number;
  productId: number;
  quantity: number;
  createdAt: string;
}

const orders: Order[] = [];

let nextId = 1;

app.get('/orders', async () => {
  return orders;
});

app.post<{ Body: { productId: number; quantity: number } }>(
  '/orders',
  async (request, reply) => {
    const { productId, quantity } = request.body;

    const order: Order = {
      id: nextId++,
      productId,
      quantity,
      createdAt: new Date().toISOString(),
    };

    orders.push(order);

    return reply.status(201).send(order);
  }
);

const start = async () => {
  try {
    await app.listen({
      port: 3002,
      host: '0.0.0.0',
    });

    console.log('🚀 Order Service running on port 3002');
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();