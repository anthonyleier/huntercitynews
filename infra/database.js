import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
  });
  await client.connect();
  const result = await client.query(queryObject);
  await client.end();
  return result;
}

export default {
  query: query,
};
