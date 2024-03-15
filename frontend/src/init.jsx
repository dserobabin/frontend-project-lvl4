import { Provider } from 'react-redux';
import App from './componets/App';
import store from './store';

const init = () => {
  const vdom = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  return vdom;
};

export default init;
