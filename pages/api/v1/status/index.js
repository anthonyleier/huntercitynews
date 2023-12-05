import database from "infra/database.js";

async function Status(request, response) {
  const updatedAt = new Date().toISOString();

  let result = await database.query("SHOW server_version;");
  const postgresVersion = result.rows[0].server_version;

  result = await database.query("SHOW max_connections;");
  const maxConnections = parseInt(result.rows[0].max_connections);

  result = await database.query(
    "SELECT COUNT(*) AS opened_connections FROM pg_stat_activity;"
  );
  const openedConnections = parseInt(result.rows[0].opened_connections);

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: postgresVersion,
        max_connections: maxConnections,
        opened_connections: openedConnections,
      },
    },
  });
}

export default Status;
