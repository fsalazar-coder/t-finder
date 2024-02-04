import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/context/ContextAuth';
import { AuthDataProvider } from '@/context/ContextAuthData';
import { AuthSocketProvider } from '@/context/ContextAuthSocket';
import { UIProvider } from '@/context/ContextUI';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UIProvider>
        <AuthDataProvider>
          <AuthSocketProvider>
            <Component {...pageProps} />
          </AuthSocketProvider>
        </AuthDataProvider>
      </UIProvider>
    </AuthProvider>
  )
}
