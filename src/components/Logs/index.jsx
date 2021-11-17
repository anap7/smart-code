import Link from 'next/link';
import styles from './styles.module.css';
import { useState } from 'react';

export default function Logs({ logList }) {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  if (!logList || logList.length === 0) return <span className={styles.warning}>Não há logs registrados no momento</span>

  return (
    <main className={styles.logContent}>
      {
        logList.map((log, index) => {
          return (
            <section className={styles.logItem} key={index}>
              <div className={styles.logHeader}>
                <h1 className={styles.title}>N° do pedido atual: <span className={styles.emphasisBlue}>{log?.orderNumber}</span></h1>
                <div className={styles.logHeaderDescription}>
                  <p className={styles.description}>Criado em: <span className={styles.emphasisBlue}>{log?.createdAt}</span></p>
                  {
                    log?.ordersUpdateList?.length > 0 &&
                    <p className={styles.description}>Última atualização em: <span className={styles.emphasisBlue}> {log?.ordersUpdateList[0]?.updatedAt}</span></p>
                  }
                </div>
              </div>
              <div className={styles.logDescription}>
                <p className={styles.description}>Número do QRCode associado: <span className={styles.emphasisBlue}>{log?.codeNumber}</span></p>

                {
                  log?.orderAttachedAt &&
                  <p className={styles.description}>Pedido associado em: <span className={styles.emphasisBlue}>{log?.orderAttachedAt}</span></p>
                }
                
              </div>

              {
                log?.ordersUpdateList ?
                  <div className={styles.contentToggleUpdateList}>
                    <button className={styles.button} onClick={() => {setIsClicked(!isClicked), setSelectedNumber(index)}}>Ver logs de atualização</button>
                  </div>
                  :
                  <span style={{ fontSize: '1em', color: 'tomato' }}> Esse pedido não foi atualizado ainda </span>
              }

              {
                isClicked && (selectedNumber === index) &&
                log?.ordersUpdateList?.map((updateItem, updateIndex) => {
                  return (
                    <div className={styles.updateListItem} key={index + updateIndex}>
                      <p className={styles.description}>Número do pedido: <span className={styles.emphasisBlue}>{updateItem?.orderNumber}</span></p>
                      <p className={styles.description}>{ updateItem?.status === "update" ? "Atualizado em" : "Associado em"}: <span className={styles.emphasisBlue}>{updateItem?.updatedAt}</span></p>
                    </div>
                  )
                })
              }
            </section>
          )
        })
      }
    </main>
  )
}
