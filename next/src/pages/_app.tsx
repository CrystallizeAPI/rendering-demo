import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Crystallize | Next.js Rendering Demo</title>
        <meta
          name="description"
          content="Crystallize Rendering Demo with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
