import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import MainPage from './MainPage';
import NotFoundPage from './NotFoundPage';
import PrivateOutlet from './PrivateOutlet';

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <Routes>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="" element={<MainPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
