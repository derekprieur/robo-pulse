import Head from 'next/head';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { DarkModeProvider } from '../contexts/darkModeContext';
import store, { persistor } from '../store';
import { Footer, Header } from '../components';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Head>
        <title>Robo Pulse</title>
        <meta name="description" content="A description of your website" />
        <link rel="icon" href="/robo.png" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <DarkModeProvider>
            <Toaster />
            <Header />
            <Component {...pageProps} />
            <Footer />
          </DarkModeProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}
