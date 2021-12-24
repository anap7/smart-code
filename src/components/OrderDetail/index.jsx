import styles from './styles.module.css';
import Header from './components/Header';
import OrderContent from './components/OrderContent';
import DownloadContent from './components/DownloadContent';
import OrderDetails from './components/OrderDetails';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

export default function OrderDetail({ codeNumber, orderNumber = null, qrcode = null }) {
  return (
    <>
      <Header />
      {
        codeNumber === "QR420726" ?
          <>
            <main className={styles.container}>
              <OrderContent />
              <DownloadContent />
              <OrderDetails />
            </main>
            <Footer />
          </>
        :
        <NotFound codeNumber={codeNumber} />
      }
    </>
  )
}
