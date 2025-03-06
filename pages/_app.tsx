import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

const NextApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default NextApp;
