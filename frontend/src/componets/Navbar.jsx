import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../slices/authSlice';

const Navbar = () => {
  const auth = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const logOut = () => dispatch(actions.removeCredentials());

  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <BootstrapNavbar.Brand as={Link} to="/">Hexlet chat</BootstrapNavbar.Brand>
        {!!auth.token && <Button onClick={logOut}>Выйти</Button>}
      </div>
    </BootstrapNavbar>
  );
};

export default Navbar;
