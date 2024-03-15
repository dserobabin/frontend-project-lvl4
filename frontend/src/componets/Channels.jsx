import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

import { useGetChannelsQuery } from '../services/channelsApi.js';

const Channel = ({
  channel,
}) => (
  <li key={channel.id} className="nav-item w-100">
    {channel.name}
  </li>
);

const Channels = () => {
  const { data: channels } = useGetChannelsQuery();
  const { currentChannelId } = useSelector((state) => state.currentChannel);

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
          />
        ))}
      </ul>
    </>
  );
};

export default Channels;
