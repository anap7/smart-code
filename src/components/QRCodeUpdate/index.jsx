import styles from './styles.module.css';
import { returnDateTime, update } from '../../services/helpers';
import { useState } from 'react';
import Loader from '../Loader';
import Link from 'next/link';

export default function QRCodeUpdate() {
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

    const inputValue = e.target.QRNumber.value.trim();
    const orderNumber = e.target.newOrderNumber.value.trim();
    const date = returnDateTime(e.target.date.value);

    const obj = {
      inputValue,
      orderNumber,
      ...date,
    }

    await update(obj, setStatus, setSrc, setRandomOrderNumber);

    setIsLoading(false);

    return false;
  }

  if (isLoading) return <Loader />

  return (
    <div className={styles.mainContent}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formContent}>
          <h1 className={styles.mainTitle}>Alterar Pedido</h1>
          <label className={styles.label}>Insira o número do pedido gerado, número do QRCode ou URL fornecida</label>
          <input className={styles.input} type="text" placeholder="QRCode, URL ou número do pedido" name="QRNumber" required />

          <label className={styles.label}>Insira a data e o horário do pedido registrado</label>
          <input className={styles.input} type="datetime-local" name="date" required />

          <label className={styles.label}>Insira o novo número do pedido</label>
          <input className={styles.input} type="text" required placeholder="Número novo do pedido" name="newOrderNumber" maxLength="12" required />

          <button className={styles.button} type="submit">Alterar Pedido</button>

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
          <h2 className={styles.title}>Pedido substituido no QRCode</h2>

          <img src={src} alt="QRCode" width={250} height={250} />

          <p className={styles.description}>Novo número do pedido substituido: <span>{randomOrderNumber}</span></p>

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
