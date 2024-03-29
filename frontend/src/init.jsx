import { Provider } from 'react-redux';
import i18next from 'i18next';
import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import App from './componets/App';
import store from './store';
import { messagesApi } from './services/messagesApi';
import { channelsApi } from './services/channelsApi';
import { actions as currentChannelSlice } from './slices/currentChannelSlice.js';
import resources from './locales/index.js';

const init = async (socket) => {
  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);

  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

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
  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      const filteredChannels = draftChannels.filter((channel) => channel.id !== payload.id);
      const state = store.getState();
      if (state.currentChannel.currentChannelId === payload.id) {
        store.dispatch(currentChannelSlice.changeCurrentChannelId('1'));
      }
      return filteredChannels;
    }));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      const channel = draftChannels.find((item) => item.id === payload.id);
      channel.name = payload.name;
    }));
  });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'production',
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  const vdom = (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );

  return vdom;
};

export default init;
