import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useAddMessageMutation } from '../services/messagesApi.js';

const NewMessageForm = ({ channel }) => {
  const { t } = useTranslation();
  const { username } = useSelector((state) => state.auth.user);
  const inputRef = useRef(null);
  const [addMessage] = useAddMessageMutation();

  const validationSchema = yup.object().shape({
    body: yup
      .string()
      .trim()
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema,
    onSubmit: async ({ body }) => {
      const message = {
        body,
        channelId: channel.id,
        username,
      };
      try {
        addMessage(message);
        formik.resetForm();
        formik.setSubmitting(false);
        inputRef.current.focus();
      } catch (err) {
        console.log(err);
      }
    },
    validateOnBlur: false,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [channel, formik.isSubmitting]);

  const isInvalid = !formik.dirty || !formik.isValid;

  return (
    <Form noValidate onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
      <InputGroup hasValidation={isInvalid}>
        <Form.Control
          name="body"
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          ref={inputRef}
          disabled={formik.isSubmitting}
          aria-label="Новое сообщение"
          placeholder={t('chat.newMessage')}
          className="border-0 p-0 ps-2"
        />
        <Button variant="group-vertical" type="submit" disabled={isInvalid}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">{t('chat.send')}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessageForm;
