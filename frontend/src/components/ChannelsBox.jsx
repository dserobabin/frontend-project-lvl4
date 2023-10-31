import { useSelector } from 'react-redux';
import { selectors } from '../slices/channelsSlice.js';

const Channel = ({
  channel,
}) => {
  console.log('channels');
  return (
    <li key={channel.id} className="nav-item w-100">
      <div>
        <span className="me-1">#</span>
        {channel.name}
      </div>
    </li>
  );
};

const ChannelsBox = () => {
  const channels = useSelector(selectors.selectAll);
  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
          />
        ))}
      </ul>
    </>
  );
};

export default ChannelsBox;
