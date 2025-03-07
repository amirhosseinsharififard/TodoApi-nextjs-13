import {SessionProvider} from "next-auth/react";
import Layout from "../components/layout/Layout";
import "../styles/globals.css";

export default function App({Component, pageProps}) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
