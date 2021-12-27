import '../styles/globals.css'
import Layout from './../components/Layout';
import NextNProgress from 'nextjs-progressbar';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
