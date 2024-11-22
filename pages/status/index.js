import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseInfo />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";
  if (!isLoading && data)
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseInfo() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let maxConnections = "Carregando...";
  let openedConnections = "Carregando...";
  let version = "Carregando...";

  if (!isLoading && data) {
    maxConnections = data.dependencies.database.max_connections;
    openedConnections = data.dependencies.database.opened_connections;
    version = data.dependencies.database.version;
  }

  return (
    <>
      <div>Versão do PostgreSQL: {version}</div>
      <div>Conexões abertas: {openedConnections}</div>
      <div>Máximo de conexões: {maxConnections}</div>
    </>
  );
}
