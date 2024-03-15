import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { actions as currentChannelSlice } from '../slices/currentChannelSlice.js';

import { useGetChannelsQuery } from '../services/channelsApi.js';

const Channel = ({
  channel,
  isCurrent,
  handleChangeChannel,
}) => {
  const variant = isCurrent ? 'secondary' : null;
  return (
    <li key={channel.id} className="nav-item w-100">
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

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
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
          />
        ))}
      </ul>
    </>
  );
};

export default Channels;
