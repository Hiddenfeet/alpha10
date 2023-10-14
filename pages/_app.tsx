import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider 
      activeChain={{
        chainId: 25,
        rpc: ["https://mainnet.cronoslabs.com/v1/55e37d8975113ae7a44603ef8ce460aa"],
        nativeCurrency: {
          decimals: 18,
          name: "Cronos",
          symbol: "CRO",
        },
        shortName: "CRO",
        slug: "Cronos",
        testnet: false,
        chain: "Cronos Mainnet",
        name: "Cronos Mainnet",
      }}>
      <Component {...pageProps} />
      <Toaster />
    </ThirdwebProvider>
  );
}

export default MyApp;
