import { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { selectBook } from './slices/bookSlice';
import _ from 'lodash';
import { useSelector } from 'react-redux';

const client = new W3CWebSocket('wss://api-pub.bitfinex.com/ws/2');
const inputDetails = {
  event: 'subscribe',
  channel: 'book',
  symbol: 'tBTCUSD'
};

function App() {
  const book = useSelector(selectBook);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (book.length > 0) {
      setData(book);
    }
    client.onopen = () => {
      client.send(JSON.stringify(inputDetails));
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (Array.isArray(dataFromServer) && Array.isArray(dataFromServer[1])) {
        setData([...data, dataFromServer[1]]);
      }
    };
  }, []);

  return (
    <div class='flex flex-col m-5'>
      <div class='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div class='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <h1 class='text-center font-medium text-lg mb-2'>Order Book</h1>
          <div class='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <table>
              <thead>
                <tr>
                  <th scope='col'>Count</th>
                  <th scope='col'>Amount</th>
                  <th scope='col'>Total</th>
                  <th scope='col'>Price</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>{item[1]}</td>
                      <td>{item[2]}</td>
                      <td>#{item[2]}</td>
                      <td>{item[0]}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
