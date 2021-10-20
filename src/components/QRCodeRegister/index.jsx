import styles from './styles.module.css';
import { returnDateTime, register } from '../../services/helpers';
import { useState } from 'react';
import Loader from '../Loader';
import Link from 'next/link';

export default function QRCodeRegister() {
  const [status, setStatus] = useState({
    isThereError: false,
    wasSucess: false,
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [src, setSrc] = useState('');
  const [randomOrderNumber, setRandomOrderNumber] = useState(null);


  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const qrCodeValue = e.target.QRNumber.value.trim();
    const orderNumber = e.target.newOrderNumber.value.trim();
    const date = returnDateTime(e.target.date.value);

    const obj = {
      qrCodeValue,
      orderNumber,
      ...date,
    }

    await register(obj, setStatus, setSrc, setRandomOrderNumber);

    setIsLoading(false);

    return false;
  }

  if (isLoading) return <Loader />

  return (
    <div className={styles.mainContent}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formContent}>
          <h1 className={styles.mainTitle}>Registrando novo pedido</h1>
          <label className={styles.label}>Insira o número do QRCode gerado ou da URL fornecida no QRCode</label>
          <input className={styles.input} type="text" placeholder="Número do QRCode ou URL" name="QRNumber" required />

          <label className={styles.label}>Insira o novo número do pedido</label>
          <input className={styles.input} type="text" placeholder="Número novo do pedido" name="newOrderNumber" required />

          <label className={styles.label}>Insira o horário desse pedido</label>
          <input className={styles.input} type="datetime-local" name="date" required />

          <button className={styles.button}>Registrar novo pedido</button>

          {
            status.isThereError &&
            <p className={styles.warning}>{status.description}</p>
          }

          {
            status.wasSucess &&
            <p className={styles.sucess}>{status.description}</p>
          }
        </div>
      </form>

      {
        randomOrderNumber &&
        <div className={styles.qrcodeResultContent}>
          <h1 className={styles.title} >Novo QRCode registrado!</h1>

          <img src={src} alt="QRCode" width={250} height={250} />

          <p className={styles.description}>Número do QRCode gerado: <span>{randomOrderNumber}</span></p>

          <div className={styles.buttonContent}>
            <Link href={`${process.env.URL}/order/${randomOrderNumber}`}>
              <a title="url" target="_blank">
                <button className={`${styles.button} ${styles.buttonLast}`}>
                  Acessar detalhes do pedido
                </button>
              </a>
            </Link>

            <a title="qrcodedownload" href={src} download>
              <button className={`${styles.button} ${styles.buttonLast}`}>
                Download do QRCode
              </button>
            </a>
          </div>
        </div>
      }
    </div>
  )
}
