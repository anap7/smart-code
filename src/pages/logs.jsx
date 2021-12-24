import Logs from '../components/Logs';
import Menu from '../components/Menu';

export default function Page({ logList }) {
  return (
    <Menu>
      <Logs logList={logList} />
    </Menu>
  )
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