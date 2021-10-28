import styles from './styles.module.css';
import { update, findOrder } from '../../services/helpers';
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
  const [foundNumber, setFoundNumber] = useState({
    wasFound: false,
    content: {}
  });

  async function handleSubmit(e) {
    e.preventDefault();

    setFoundNumber((prevState) => ({
      ...prevState,
      wasFound: false,
      content: {}
    }));

    setIsLoading(true);

    const inputValue = foundNumber?.content?.codeNumber;
    const orderNumber = e.target.newOrderNumber.value.trim();

    const obj = {
      inputValue,
      orderNumber
    }

    await update(obj, setStatus, setSrc, setRandomOrderNumber);

    setIsLoading(false);

    return false;
  }

  async function handleClick(e) {
    e.preventDefault();

    setIsLoading(true);
    setSrc('');
    setRandomOrderNumber(null);

    const inputValue = document.getElementsByName("QRNumber")[0].value;

    await findOrder(inputValue, setStatus, setFoundNumber);

    setIsLoading(false);

    return false;
  }

  function searchAgain() {
    setSrc('');
    setRandomOrderNumber(null);
    setFoundNumber((prevState) => ({
      ...prevState,
      wasFound: false,
      content: {}
    }));
  }

  if (isLoading) return <Loader />

  return (
    <div className={styles.mainContent}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formContent}>
          <h1 className={styles.mainTitle}>Alterar Pedido</h1>
          
          {
            !foundNumber.wasFound &&
            <>
              <label className={styles.label}>Insira o número do pedido, número do QRCode ou URL gerada</label>
              <input className={styles.input} type="text" placeholder="QRCode, URL ou número do pedido" name="QRNumber" maxLength="12" required />
              <button className={`${styles.button} ${styles.searchButton}`} onClick={handleClick}>Buscar Pedido</button>
            </>
          }

          {
            foundNumber.wasFound &&
            <>
              <div className={styles.foundContent}>
                <h2 className={styles.subTitle}>Pedido encontrado!</h2>
                <p className={styles.subTitleItem}>Número original do QRCode: <span>{foundNumber?.content?.codeNumber}</span></p>
                <p className={styles.subTitleItem}>Número do pedido Atual: <span>{foundNumber?.content?.orderNumber}</span></p>
              </div>

              <label className={styles.label}>Insira o novo número do pedido</label>
              <input className={styles.input} type="text" required placeholder="Número novo do pedido" name="newOrderNumber" maxLength="12" required />
              
              <p className={styles.buttonContent}>
                <button className={`${styles.button} ${styles.searchButton}`} type="submit">Alterar Pedido</button>
                <button className={`${styles.button} ${styles.searchButton}`} onClick={searchAgain}>Buscar Novamente</button>
              </p>
            </>
          }

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
