import database from "infra/database.js";

async function Status(request, response) {
  const updatedAt = new Date().toISOString();

  const postgresVersionResult = await database.query("SHOW server_version;");
  const postgresVersion = postgresVersionResult.rows[0].server_version;

  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnections = parseInt(maxConnectionsResult.rows[0].max_connections);

  const openedConnectionsResult = await database.query(
    "SELECT COUNT(*) AS opened_connections FROM pg_stat_activity;"
  );
  const openedConnections = parseInt(
    openedConnectionsResult.rows[0].opened_connections
  );

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
