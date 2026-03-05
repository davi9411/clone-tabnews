import { Client } from "pg";

const databaseName = process.env.POSTGRES_DB;

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === `development` ? false : true,
  });
  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error("Database  error:", error);
    throw error;
  } finally {
    await client.end();
  }
}

async function getVersion() {
  const result = await query("SHOW server_version;");
  return result.rows[0].server_version;
}

async function getMaxConnections() {
  const result = await query("SHOW max_connections;");
  return parseInt(result.rows[0].max_connections);
}

async function getCurrentConnections() {
  const result = await query({
    text: "SELECT count(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  return parseInt(result.rows[0].count);
}

export default {
  query: query,
  getVersion: getVersion,
  getMaxConnections: getMaxConnections,
  getCurrentConnections: getCurrentConnections,
};
