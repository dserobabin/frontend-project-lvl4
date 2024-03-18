import { useRef, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useTranslation } from 'react-i18next';
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
  useRemoveChannelMutation,
  useChangeChannelNameMutation,
} from '../services/channelsApi.js';

import { actions as modalSlice } from '../slices/modalSlice';

const AddChannelForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels.map((channel) => channel.name);
  const inputRef = useRef(null);
  const [addChannel] = useAddChannelMutation();

  const getValidationSchema = (ch) => yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('modals.required'))
      .min(3, t('modals.min'))
      .max(20, t('modals.max'))
      .notOneOf(ch, t('modals.uniq')),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getValidationSchema(channelNames),
    onSubmit: async ({ name }, { setSubmitting }) => {
      const filteredName = leoProfanity.clean(name);
      try {
        addChannel(filteredName);
        handleClose();
        toast.success(t('channels.created'));
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
        <BootstrapModal.Title>{t('modals.add')}</BootstrapModal.Title>
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
            <Form.Label className="visually-hidden" htmlFor="name">{t('modals.channelName')}</Form.Label>
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
                {t('modals.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('modals.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </BootstrapModal.Body>
    </>
  );
};
const RemoveChannelForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [removeChannel] = useRemoveChannelMutation();

  const channelId = useSelector((state) => state.modal.extra?.channelId);
  const handleRemove = async () => {
    setLoading(true);
    try {
      removeChannel(channelId);
      handleClose();
      toast.success(t('channels.removed'));
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{t('modals.remove')}</BootstrapModal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
            disabled={loading}
          >
            {t('modals.cancel')}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
            disabled={loading}
          >
            {t('modals.confirm')}
          </Button>
        </div>
      </BootstrapModal.Body>
    </>
  );
};

const RenameChannelForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const { data: channels } = useGetChannelsQuery(undefined);
  const [changeChannelName] = useChangeChannelNameMutation();
  const selectedChannels = channels.map((channel) => channel.name);
  const channelId = useSelector((state) => state.modal.extra?.channelId);
  const channel = channels.find((el) => channelId === el.id);
  const inputRef = useRef(null);

  const getValidationSchema = (ch) => yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('modals.required'))
      .min(3, t('modals.min'))
      .max(20, t('modals.max'))
      .notOneOf(ch, t('modals.uniq')),
  });
  useEffect(() => {
    setTimeout(() => inputRef.current.select());
  }, []);
  const f = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema: getValidationSchema(selectedChannels),
    onSubmit: async ({ name }, { setSubmitting }) => {
      const filteredName = leoProfanity.clean(name);
      const data = { name: filteredName, id: channelId };
      try {
        changeChannelName(data);
        handleClose();
        toast.success(t('modals.rename'));
      } catch (e) {
        setSubmitting(false);
        inputRef.current.select();
        if (!e.isAxiosError) {
          throw e;
        }
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{t('modals.rename')}</BootstrapModal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form onSubmit={f.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              disabled={f.isSubmitting}
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              isInvalid={f.errors.name && f.touched.name}
              name="name"
              id="name"
            />
            <label className="visually-hidden" htmlFor="name">{}</label>
            <Form.Control.Feedback type="invalid">
              {f.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                {t('modals.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={f.isSubmitting}
              >
                {t('modals.confirm')}
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
  removeChannel: RemoveChannelForm,
  renameChannel: RenameChannelForm,
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
