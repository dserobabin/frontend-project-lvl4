import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateOutlet = () => {
  const auth = useSelector((state) => state.auth.user);

  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateOutlet;
