import { ThemeProvider } from 'next-themes'
import { type AppProps } from 'next/app'

const NextApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <Component {...pageProps} />
  </ThemeProvider>
)

export default NextApp
