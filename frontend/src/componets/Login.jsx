import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useLoginMutation } from '../services/authApi';
import { actions as authActions } from '../slices/authSlice';
import loginImage from '../assets/login.jpeg';

const Login = () => {
  const { t } = useTranslation();
  const [isValid, setIsValid] = useState(false);
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const validationSchema = Yup.object({
    username: Yup.string()
      .required(t('signup.required')),
    password: Yup.string()
      .required(t('signup.required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (credentials) => {
      setIsValid(false);
      try {
        const user = await login(credentials).unwrap();
        dispatch(authActions.setCredentials(user));
        navigate('/');
      } catch (err) {
        setIsValid(true);
        inputRef.current.select();
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginImage} className="rounded-circle" alt={t('login.header')} />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('login.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    id="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder={t('login.username')}
                    autoComplete="username"
                    isInvalid={isValid}
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    name="password"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder={t('login.password')}
                    autoComplete="current-password"
                    isInvalid={isValid}
                    required
                    type="password"
                  />
                  <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                  {isValid && <Form.Control.Feedback type="invalid" tooltip>{t('login.authFailed')}</Form.Control.Feedback>}
                </Form.Group>
                <Button className="w-100 mb-3" type="submit" variant="outline-primary">{t('login.submit')}</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.newToChat')}</span>
                <Link to="/login">{t('login.signup')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
