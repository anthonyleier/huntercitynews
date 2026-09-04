import DefaultLayout from "interface/DefaultLayout";
import { Banner } from "@primer/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ActivateUserPage() {
  const router = useRouter();

  const activationTokenId = router.query.activationTokenId;

  useEffect(() => {
    if (!activationTokenId) return;

    sendActivationRequest();

    async function sendActivationRequest() {
      try {
        const response = await fetch(
          `/api/v1/activations/${activationTokenId}`,
          {
            method: "PATCH",
          },
        );

        const activationResponseBody = await response.json();

        if (response.status === 200) {
          console.log("Sucesso:", activationResponseBody);
          // sucesso na interface
          return;
        }

        // sinal de fracasso na interface
        console.log("Fracasso:", activationResponseBody);
      } catch {
        // sinal de fracasso absoluto na interface
        console.log("Fracasso2");
      }
    }
  }, [activationTokenId]);

  return (
    <DefaultLayout contentWidth="small" metadata={{ title: "Ativar cadastro" }}>
      <Banner
        variant="warning"
        title="Aguarde"
        description="Abra o email enviado pelo HunterCityNews e clique no link de confirmação"
      />
    </DefaultLayout>
  );
}
