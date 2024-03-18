import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { actions as currentChannelSlice } from '../slices/currentChannelSlice.js';
import { actions as modalSlice } from '../slices/modalSlice.js';

import { useGetChannelsQuery } from '../services/channelsApi.js';

const Channel = ({
  channel,
  handleChangeChannel,
  handleRemoveChannel,
  handleRenameChannel,
  isCurrent,
}) => {
  const { t } = useTranslation();
  const variant = isCurrent ? 'secondary' : null;
  return (
    <li key={channel.id} className="nav-item w-100">
      {channel.removable
        ? (
          <Dropdown as={ButtonGroup} className="d-flex">
            <Button
              type="button"
              key={channel.id}
              className="w-100 rounded-0 text-start text-truncate"
              onClick={handleChangeChannel}
              variant={variant}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
            <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
              <span className="visually-hidden">{t('channels.menu')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleRemoveChannel(channel.id)}>{t('channels.remove')}</Dropdown.Item>
              <Dropdown.Item onClick={handleRenameChannel(channel.id)}>{t('channels.rename')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
        : (
          <Button
            type="button"
            variant={variant}
            key={channel.id}
            className="w-100 rounded-0 text-start"
            onClick={handleChangeChannel}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
        )}
    </li>
  );
};

const Channels = () => {
  const { data: channels } = useGetChannelsQuery();
  const { currentChannelId } = useSelector((state) => state.currentChannel);
  const dispatch = useDispatch();

  const handleChangeChannel = (channelId) => () => {
    dispatch(currentChannelSlice.changeCurrentChannelId(channelId));
  };
  const handleAddChannel = () => {
    dispatch(modalSlice.openModal({ type: 'addChannel' }));
  };
  const handleRemoveChannel = (channelId) => () => {
    dispatch(modalSlice.openModal({ type: 'removeChannel', extra: { channelId } }));
  };
  const handleRenameChannel = (channelId) => () => {
    dispatch(modalSlice.openModal({ type: 'renameChannel', extra: { channelId } }));
  };

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={handleAddChannel}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            isCurrent={channel.id === currentChannelId}
            channel={channel}
            handleChangeChannel={handleChangeChannel(channel.id)}
            handleRemoveChannel={handleRemoveChannel}
            handleRenameChannel={handleRenameChannel}
          />
        ))}
      </ul>
    </>
  );
};

export default Channels;
