import Logs from '../components/Logs';

export default function Page({ logList }) {
  return <Logs logList={logList} />
}

export async function getServerSideProps(context) {
  const logList = await fetch(`${process.env.URL}/api/get-logs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(res => res.json());

  return {
    props: {
      logList: logList?.orderList ? logList?.orderList : []
    }
  }
}