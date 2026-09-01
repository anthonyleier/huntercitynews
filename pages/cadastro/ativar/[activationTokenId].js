import DefaultLayout from "interface/DefaultLayout";
import { Banner } from "@primer/react";
import { useRouter } from "next/router";

export default function ActivateUserPage() {
  const router = useRouter();
  console.log(router.query.activationTokenId);

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
