import { Product } from './types';

// Retrieve config from .env file
require('dotenv').config();

// Require necessary dependencies
const postgres = require('postgres');

// Connect to PostgreSQL
//
// Host, user, password and database are read from the .env file.
//
// If we wanted to configure this manually, we would do this:
// const sql = postgres(
//   `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:5432/${process.env.PGDATABASE}`,
// );
const sql = postgres();

export async function getAllProducts(): Promise<Product[]> {
  const products = await sql`
    SELECT * FROM products;
  `;
  return products;
}
