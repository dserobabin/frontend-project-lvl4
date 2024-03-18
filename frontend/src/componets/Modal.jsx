import { useRef, useEffect } from 'react';
import {
  Modal as BootstrapModal,
  Form,
  Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  useAddChannelMutation,
  useGetChannelsQuery,
} from '../services/channelsApi.js';

import { actions as modalSlice } from '../slices/modalSlice';

const getValidationSchema = (channels) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Required')
    .min(3, 'min')
    .max(20, 'max')
    .notOneOf(channels, 'uniq'),
});

const AddChannelForm = ({ handleClose }) => {
  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels.map((channel) => channel.name);
  const inputRef = useRef(null);
  const [addChannel] = useAddChannelMutation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getValidationSchema(channelNames),
    onSubmit: async ({ name }, { setSubmitting }) => {
      const channel = { name };
      try {
        addChannel(channel);
        handleClose();
      } catch (e) {
        console.log(e);
        setSubmitting(false);
        inputRef.current.select();
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>Добавить</BootstrapModal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              disabled={formik.isSubmitting}
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={formik.errors.name && formik.touched.name}
              name="name"
              id="name"
            />
            <Form.Label className="visually-hidden" htmlFor="name">Добавление канала</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                Отменить
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Отправить
              </Button>
            </div>
          </Form.Group>
        </Form>
      </BootstrapModal.Body>
    </>
  );
};

const modals = {
  addChannel: AddChannelForm,
};

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpened, type } = useSelector((state) => state.modal);
  const handleClose = () => {
    dispatch(modalSlice.closeModal());
  };
  const SelectedModal = modals[type];

  return (
    <BootstrapModal show={isOpened} onHide={handleClose} centered>
      {SelectedModal && <SelectedModal handleClose={handleClose} />}
    </BootstrapModal>
  );
};

export default Modal;
