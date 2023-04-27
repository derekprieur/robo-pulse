import Head from 'next/head'
import '../styles/globals.css'
import { Provider } from 'react-redux'

import { DarkModeProvider } from '../contexts/darkModeContext';
import store from '../store'
import { Footer, Header } from '../components'
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <div className='min-h-screen bg-[#fefefe]'>
      <Head>
        <title>Robo Pulse</title>
        <meta name="description" content="A description of your website" />
        <link rel="icon" href="/robo.png" />
      </Head>
      <Provider store={store}>
        <DarkModeProvider>
          <Toaster />
          <Header />
          <Component {...pageProps} />
          <Footer />
        </DarkModeProvider>
      </Provider>
    </div>
  )
}
