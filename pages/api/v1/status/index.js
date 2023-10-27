import database from "../../../../infra/database.js";

async function Status(request, response) {
  const result = await database.query("SELECT 1+1 as sum;");
  console.log(result.rows);
  response.status(200).json({ mensagem: "deu boa mermão" });
}

export default Status;
