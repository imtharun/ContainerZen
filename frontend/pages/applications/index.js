import Head from "next/head";
import Table from "@/components/Table";

const Application = () => {
  return (
    <>
      <Head>
        <title>Applications</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
      </Head>
      <main>
        <Table
          headers={[
            "Name",
            "Project",
            "Status",
            "Image",
            "Ports",
            "Created At",
          ]}
          rows={[
            {
              name: "affectionate_bhaskara",
              project: "-",
              status: "running",
              image: "wsong008/mab-malware",
              ports: "8000",
              createdAt: "March 15, 2023 9:54 PM",
            },

            {
              name: "qbittorrent",
              project: "-",
              status: "running",
              image: "lscr.io/linuxserver/qbittorrent",
              ports: "9000",
              createdAt: "March 15, 2023 9:54 PM",
            },
          ]}
        />
      </main>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  return {
    props: { heading: "Applications " },
  };
};

export default Application;
