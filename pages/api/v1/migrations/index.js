import { resolve } from "node:path";
import migrationRunner from "node-pg-migrate";
import database from "infra/database.js";
import { createRouter } from "next-connect";
import { InternalServerError, MethodNotAllowedError } from "infra/errors";

const router = createRouter();
router.get(getHandler);
router.post(postHandler);
export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandler,
});

const defaultMigrationsOptions = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onErrorHandler(error, request, response) {
  const publicErrorObject = new InternalServerError({ cause: error });

  console.log("\n Erro dentro do catch do next-connect:");
  console.error(publicErrorObject);

  response.status(500).json(publicErrorObject);
}

async function getHandler(request, response) {
  try {
    const dbClient = await database.getNewClient();
    const pendingMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dbClient,
    });
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  } finally {
    await dbClient.end();
  }
}

async function postHandler(request, response) {
  try {
    const dbClient = await database.getNewClient();
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dbClient,
      dryRun: false,
    });

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  } finally {
    await dbClient.end();
  }
}
