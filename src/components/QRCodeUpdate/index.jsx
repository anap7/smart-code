import styles from './styles.module.css';
import Link from 'next/link';

export default function QRCodeUpdate() {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Insira o número do pedido gerado ou a URL fornecida do QRCode</label>
      <input className={styles.input} type="text" />

      <label className={styles.label}>Insira o novo número do pedido</label>
      <input className={styles.input} type="text" required/>

      <label className={styles.label}>Insira o horário desse pedido</label>
      <input className={styles.input} type="date" required/>
      <input className={styles.input} type="time" min="00:00" max="23:59" required/>

      <button className={styles.button}>Alterar</button>
    </div>
  )
}
