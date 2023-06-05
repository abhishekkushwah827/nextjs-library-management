import Header from '@/components/Layout/Header';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  // if (Component?.getLayout) {  //getting Typescript error, we will try to fix this in upcoming builds
  //   return Component?.getLayout(<Component {...pageProps} />)
  // }
  
  if(Component.name=="LoginPage"){
    return <Component {...pageProps} />
  }

  return (<>
    <SessionProvider session={pageProps.session}>
      <div className='min-h-screen'>
        <Header />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  </>)
}
