import Head from 'next/head'
import { Header } from '../components'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className='min-h-screen bg-[#fefefe]'>
      <Head>
        <title>Robo Pulse</title>
        <meta name="description" content="A description of your website" />
        <link rel="icon" href="/robo.png" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </div>
  )
}
