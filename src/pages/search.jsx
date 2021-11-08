import styles from '../styles/search.module.css';
import Loader from '../components/Loader';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState(null);
  
  function searchOrder() {
    setIsLoading(true);
    router.push(`/order/${qrCodeValue}`);
  }

  if (isLoading) return <Loader />

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Insira o número do QRCode</h1>
      <input
        type="text"
        className={styles.input}
        onChange={(e) => setQrCodeValue(e.target.value)}
        placeholder="Número do QRCode"
        id="QRNumber"
        name="codeNumber"
        required
      />
      <button className={styles.button} onClick={searchOrder}>Buscar Pedido</button>
    </div>
  )
}
