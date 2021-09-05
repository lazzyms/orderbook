import { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { selectBook, updateBuy, updateSell } from './slices/bookSlice';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

const client = new W3CWebSocket('wss://api-pub.bitfinex.com/ws/2');
const inputDetails = {
  event: 'subscribe',
  channel: 'book',
  symbol: 'tBTCUSD',
  pricision: 'P0'
};

function App() {
  const dispatch = useDispatch();
  const book = useSelector(selectBook);
  const [sell, setSell] = useState([]);
  const [buy, setBuy] = useState([]);

  const sortAndUpdate = (records) => {
    // const sorted = _.sortBy([...items, records], [0], ['desc']);
    if (records[2] > 0) {
      setBuy((items) => _.sortBy([...items, records], [0], ['desc']));
      dispatch(updateBuy({ buy }));
    } else {
      setSell((items) => _.sortBy([...items, records], [0], ['desc']));
      dispatch(updateSell({ sell }));
    }
  };

  if (book.buy > 0) {
    setBuy(book.buy);
  }
  if (book.sell > 0) {
    setBuy(book.sell);
  }

  useEffect(() => {
    client.onopen = () => {
      client.send(JSON.stringify(inputDetails));
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      // console.log(dataFromServer);
      let records = dataFromServer[1];
      if (
        Array.isArray(dataFromServer) &&
        Array.isArray(records) &&
        records.length === 3
      ) {
        sortAndUpdate(records);
      }
    };
    /* eslint-disable */
  }, []);

  return (
    <>
      <h1 className='text-center font-medium text-xl my-2'>Order Book</h1>
      <main>
        <div>
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
              {buy &&
                buy.slice(0, 14).map((item, index) => (
                  <tr key={index}>
                    <td>{item[1]}</td>
                    <td>{parseFloat(item[2]).toFixed(4)}</td>
                    <td>#</td>
                    <td>{item[0]}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th scope='col'>Price</th>
                <th scope='col'>Total</th>
                <th scope='col'>Amount</th>
                <th scope='col'>Count</th>
              </tr>
            </thead>
            <tbody>
              {sell &&
                sell.slice(0, 14).map((item, index) => (
                  <tr key={index}>
                    <td>{item[0]}</td>
                    <td>#</td>
                    <td>{parseFloat(-1 * item[2]).toFixed(4)}</td>
                    <td>{item[1]}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default App;
