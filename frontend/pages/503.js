import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>Error</title>
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
      <main className="h-screen flex flex-col justify-center items-center bg-dark">
        <p className="text-light text-center bottom-20 text-xl font-mono font-semibold left-1/2">
          Make sure your Docker app is up and running!
        </p>
        <button className="inline-block rounded bg-light text-dark py-2 px-4 text-lg font-medium hover:opacity-50 disabled:opacity-50 mx-1 my-2 transition-all duration-300">
          <Link href={"/"}>Back to Home</Link>
        </button>
      </main>
    </>
  );
};

export async function getStaticProps(context) {
  return {
    props: { noLayout: true },
  };
}

export default Custom404;
