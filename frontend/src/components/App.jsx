import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './Chat.jsx';
import Login from './Login.jsx';
import Error from './Error.jsx';
import routes from '../routes.js';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.ChatPath()} element={<Chat />} />
      <Route path={routes.LoginPath()} element={<Login />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
);

export default App;
