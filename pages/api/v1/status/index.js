import database from "infra/database.js";
import { version } from "react";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseVersion = await database.getVersion();
  const databaseMaxConnections = await database.getMaxConnections();
  const databaseCurrentConnections = await database.getCurrentConnections();
  response.status(200).json({
    update_at: updatedAt,
    depenendencies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(databaseMaxConnections),
        current_connections: parseInt(databaseCurrentConnections),
      },
    },
  });
}
export default status;
