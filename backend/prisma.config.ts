import 'dotenv/config';

export default {
  schema: 'prisma/schema.prisma',
  
  datasource: {
    url: 'file:./dev.db',
  },
  
  migrations: {
    path: 'prisma/migrations',
  },
};
