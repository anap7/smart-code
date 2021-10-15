import styles from './styles.module.css';
import { returnDateTime, register } from '../../services/helpers';
import { useState } from 'react';
import Loader from '../Loader';

export default function QRCodeRegister() {
  const [status, setStatus] = useState({
    isThereError: false,
    wasSucess: false,
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const QRNumber = e.target.QRNumber.value;
    const orderNumber = e.target.newOrderNumber.value;
    const date = returnDateTime(e.target.date.value);

    const obj = {
      QRNumber,
      orderNumber,
      ...date,
    }

    const result = await register(obj, setStatus);

    setIsLoading(false);

    if (!result) return;
  }

  if (isLoading) return <Loader />

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <label className={styles.label}>Insira o número do QRCode gerado ou da URL fornecida no QRCode</label>
        <input className={styles.input} type="text" placeholder="Número do QRCode" name="QRNumber" required />

        <label className={styles.label}>Insira o novo número do pedido</label>
        <input className={styles.input} type="text" placeholder="Número novo do pedido" name="newOrderNumber" required />

        <label className={styles.label}>Insira o horário desse pedido</label>
        <input className={styles.input} type="datetime-local" name="date" required />

        <button className={styles.button}>Registrar novo pedido</button>
      </div>

      {
        status.isThereError &&
        <p className={styles.warning}>{status.description}</p>
      }

    {
        status.wasSucess &&
        <p className={styles.sucess}>{status.description}</p>
      }
    </form>
  )
}
