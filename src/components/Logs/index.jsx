import Link from 'next/link';
import styles from './styles.module.css';
import { useState } from 'react';
import { createCompletedDate } from '../../services/helpers';
import logs from './logs';

export default function Logs() {
  const [isLoading, setIsLoading] = useState(false);

  createCompletedDate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Logs</h1>
      <h1 className={styles.title}>Log</h1>
      <h1 className={styles.title}>Log</h1>
      <h1 className={styles.title}>Log</h1>
      <h1 className={styles.title}>Log</h1>
      <h1 className={styles.title}>Log</h1>
      <h1 className={styles.title}>Log</h1>
      <h1 className={styles.title}>Log</h1>
      <h1 className={styles.title}>Log</h1>
      <h1 className={styles.title}>Log</h1>
      <h1 className={styles.title}>Log</h1>
      <h1 className={styles.title}>Log</h1>
      <h1 className={styles.title}>Log</h1>
      <h1 className={styles.title}>Log</h1>
    </div>
  )
}
