import styles from './styles.module.css';
import Link from 'next/link';

export default function OrderDetail({ codeNumber, orderNumber = null, qrcode = null }) {

  return (
    <div className={styles.container}>
      {
        !orderNumber || !qrcode ?
          <>
            <h1 className={`${styles.title} ${styles.titleNotFound}`}>Pedido não encontrado!</h1>
            <p className={styles.description}>
              Parece que <span className={styles.mark}>o número do QRCode não foi inserido corretamente</span> ou você ainda 
              <span className={styles.mark}> o QRCode não foi associado a um pedido ainda</span>. Por favor, faça um desses processos 
              e tente novamente.
            </p>
            <Link href={`/search`}>
              <a title="url" target="_blank">
                <button className={styles.button}>
                  Buscar novamente
                </button>
              </a>
            </Link>
          </>
          :
          <>
            <h1 className={`${styles.title} ${styles.titleFound}`}>Pedido encontrado!</h1>
            <p className={styles.description}>Número do pedido: <span>{orderNumber}</span></p>
            <p className={styles.description}>Número do QRCode: <span>{codeNumber}</span></p>

            <img src={qrcode} alt="QRCode" className={styles.image} />

            <a title="qrcodedownload" href={qrcode} download>
              <button className={styles.button}>
                Download do QRCode
              </button>
            </a>
          </>
      }
    </div>
  )
}
