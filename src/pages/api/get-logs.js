import { getLogs } from '../../services/database';

export default async function handler(req, res) {

  const resultLogsList = await getLogs();

  if (!resultLogsList) {
    return res.status(404).json({ error: 'Ocorreu um problema', orderList: [] });
  }

  return res.status(200).json({ sucess: "Logs gerados",  orderList: resultLogsList ? resultLogsList : [] });
}
