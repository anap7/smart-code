import Head from 'next/head';
import '../styles/global.css';
import Menu from '../components/Menu';

function MyApp({ Component, pageProps }) {
  return (
    <Menu>
      <Head>
        <title>SmartCode</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;600&display=swap" rel="stylesheet" />
      </Head>
      <div className="container">
        <Component {...pageProps} />
      </div>
    </ Menu>
  );
}

export default MyApp
