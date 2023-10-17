import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './Chat.jsx';
import Login from './Login.jsx';
import Error from './Error.jsx';
import routes from '../routes.js';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.chat()} element={<Chat />} />
      <Route path={routes.login()} element={<Login />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
);

export default App;
