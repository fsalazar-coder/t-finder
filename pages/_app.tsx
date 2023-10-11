import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/authContext';
import { Provider } from '../context/authContext';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  )
}
