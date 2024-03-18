import { Provider } from 'react-redux';
import App from './componets/App';
import store from './store';
import { messagesApi } from './services/messagesApi';
import { channelsApi } from './services/channelsApi';
import { actions as currentChannelSlice } from './slices/currentChannelSlice.js';

const init = async (socket) => {
  socket.on('newMessage', (payload) => {
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
      draftMessages.push(payload);
    }));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      draftChannels.push(payload);
      store.dispatch(currentChannelSlice.changeCurrentChannelId(payload.id));
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
