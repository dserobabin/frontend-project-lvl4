import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import MainPage from './MainPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
