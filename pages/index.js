import DefaultLayout from "interface/DefaultLayout";

function Home() {
  return (
    <>
      <DefaultLayout
        metadata={{
          description:
            "Notícias sobre a melhor cidade do meio-oeste catarinense",
        }}
      >
        <h1>Notícias sobre a melhor cidade do meio-oeste catarinense</h1>
      </DefaultLayout>
    </>
  );
}

export default Home;
