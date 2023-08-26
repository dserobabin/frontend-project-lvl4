import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './Chat.jsx';
import Login from './Login.jsx';
import routes from '../routes.js';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.ChatPath()} element={<Chat />} />
      <Route path={routes.LoginPath()} element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
