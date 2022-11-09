import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="bg-gray-200">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
