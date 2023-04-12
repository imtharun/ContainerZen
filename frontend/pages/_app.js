import "@/styles/globals.css";
import Layout from "@/sections/Layout";

export default function App({ Component, pageProps }) {
  return (
    <>
      {pageProps.noLayout ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}
