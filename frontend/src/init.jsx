import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './slices/index.js';

const init = () => <Provider store={store}><App /></Provider>;

export default init;
