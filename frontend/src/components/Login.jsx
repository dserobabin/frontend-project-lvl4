import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import login from '../assets/login.jpeg';

const Login = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Должно быть заполнено!'),
      password: Yup.string()
        .required('Должно быть заполнено!'),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  console.log(formik);
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6">
                <div className="d-flex justify-content-center align-items-center">
                  <img className="rounded-circle" alt="tota" src={login} />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <h1 className="text-center mb-4">Войти</h1>
                <Form>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      id="username"
                      placeholder="Ваш ник"
                      ref={inputRef}
                    />
                    <Form.Label htmlFor="username">Ваш ник</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      id="password"
                      placeholder="Пароль"
                    />
                    <Form.Label htmlFor="password">Пароль</Form.Label>
                  </Form.Group>
                </Form>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
              </div>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <a href="/">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
