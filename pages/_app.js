import { Header } from '../components'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className='min-h-screen bg-[#fefefe]'>
      <Header />
      <Component {...pageProps} />
    </div>
  )
}
