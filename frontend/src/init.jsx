import { Provider } from 'react-redux';
import App from './componets/App';
import store from './store';
import { messagesApi } from './services/messagesApi';

const init = async (socket) => {
  socket.on('newMessage', (payload) => {
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
      draftMessages.push(payload);
    }));
  });
  const vdom = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  return vdom;
};

export default init;
