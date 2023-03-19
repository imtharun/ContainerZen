import "@/styles/globals.css";
import Layout from "@/sections/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout heading={pageProps.heading}>
      <Component {...pageProps} />
    </Layout>
  );
}
