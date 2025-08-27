import email from "infra/email.js";

describe("infra/email.js", () => {
  test("send()", async () => {
    await email.send({
      from: "HunterCityNews <contato@huntercitynews.com.br>",
      to: "Anthony <anthonyleierlw@gmail.com>",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });
  });
});
